import { Carousel } from "react-bootstrap";

const CarouselComponent = (props) => {
  return (
    <Carousel
      interval={3000}
      indicators={false}
      style={{
        backdropFilter: "blur(5px)",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      {props.images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            style={{ width: "100%", height: "500px" }}
            className="d-block w-100"
            src={image}
            alt={`Slide ${index + 1}`}
          />
          <Carousel.Caption>
            <h3 className="text-primary"> Cold- Cast Friday </h3>
            <p className="text-warning">
              {index === 0
                ? "listening to podcasts."
                : index === 1
                ? "New podcasts every day."
                : " stay tuned. "}{" "}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
