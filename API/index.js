const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/Users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefrawaefopkfpkacmevhakbfakavilrfnai";
const imageDownloader = require("image-downloader");
const {S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const fs = require("fs");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const bucket = 'akshaybooking-app';
const mime = require('mime-types');
const path = require('path');  


require("dotenv").config();

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));




// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_BASE_URL,
    methods: ["POST", "GET","PUT"],
    optionsSuccessStatus: 200,
  })
)


// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

async function uploadToS3(path , originalFilename , mimetype) {
  const client  = new S3Client({
    region : 'us-east-1',
    credentials:{
      accessKeyId : process.env.S3_ACCESS_KEY,
      secretAccessKey : process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  
  const parts = originalFilename.split('.');
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + '.' + ext;
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body : fs.readFileSync(path),
    Key: newFilename,
    ContentType : mimetype ,
    ACL : 'public-read',
  }));
  return `http://${bucket}.s3.amazonaws.com/${newFilename}`;
}


app.get("/", (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    res.json("text ok");
  } catch (e) {
    res.status(422).json(e);
  }
  
});

app.get("/api/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = __dirname + "/uploads/" + imageName;

  // Send the image file
  res.sendFile(imagePath);
});

app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(422).json("not found");
  }
});

app.get("/api/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/api/upload-by-link", async (req, res) => {
  const { Link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  console.log(__dirname); // it stores the current directory name
  await imageDownloader
  .image({
    url: Link,
    dest: "/tmp/" + newName,
  })
  .then(({ filename }) => {
    console.log("Saved to", filename);
  })
  .catch((err) => console.error(err));
  const url = await uploadToS3("/tmp/" + newName , newName , mime.lookup("/tmp/" + newName));
  res.json(url);
});

const photosMiddleware = multer({dest:'/tmp'});

app.post("/api/upload", photosMiddleware.array('photos',100), async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname,mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname,mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

app.post("/api/places", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/api/user-places", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/api/places/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/api/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/api/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Place.find());
});

app.post("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
  req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    throw err;
  });
});

app.get("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate('place'));
});

// app.get('*',(req,res) =>{
//   res.sendFile(path.join(__dirname+'/temp.html'));
// })


// akshay912 - password mongo
app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});
