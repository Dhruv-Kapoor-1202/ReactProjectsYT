import Accordian from "./components/accordian"
import './App.css';
import RandomColor from "./components/random-color";
import StarRating from "./components/star-rating";
import ImageSlider from "./components/image-slider";

export function App() {

  return (
    <>
      {/* Accordian Component */}
      <Accordian />

      {/* Random Color Generator Component */}
      <RandomColor />

      {/* Star Rating Component */}
      <StarRating noOfStars={6} />

      {/* Image Slider Component */}
      <ImageSlider
        url="https://picsum.photos/v2/list"
        page="1"
        limit="10"
      />
    </>
  )
}
