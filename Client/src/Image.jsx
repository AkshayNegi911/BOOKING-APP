export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'https://localhost:4000/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }