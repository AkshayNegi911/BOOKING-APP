import { Link, Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import Image from "../Image"

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        list of all added places
        <br />
        <Link
          to={"/account/places/new"}
          className="bg-primary text-white py-2 px-6 rounded-full inline-flex gap-1"
        >
          <svg
            xmlns="https://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4 ">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              key={place._id}
              to={"/account/places/" + place._id}
              className="flex bg-gray-100 gap-4 m-2 p-4 rounded-2xl cursor-pointer"
            >
              <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                {<PlaceImg place={place}/>}
              </div>
              <div className="grow-0 shrink " >
                <h2 className="text-xl text-left ">{place.title}</h2>
                <p className="text-small mt-2 text-left">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
