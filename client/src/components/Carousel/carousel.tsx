import React, { useRef, ReactNode } from "react";
import "./carousel.scss";

interface CarouselProps {
  children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handlePrev = () => {
    if (sliderRef.current) {
      const width = sliderRef.current?.clientWidth;
      sliderRef.current.scrollLeft -= width;
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollLeft += width;
    }
  };

  return (
    <div className="carousel-container">
      <div className="prev-button" onClick={handlePrev}>
        <p className="button-text"> &lt; </p>
      </div>
      <div className="carousel" ref={sliderRef}>
        {props.children}
      </div>
      <div className="next-button" onClick={handleNext}>
        <p className="button-text"> &gt; </p>
      </div>
    </div>
  );
};

export default Carousel;
