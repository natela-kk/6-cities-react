type Images = {
  images: string[];
}

function Gallery({images}: Images): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((image) => (
          <div className="property__image-wrapper"  key={image}>
            <img className="property__image" src={image} alt="studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
