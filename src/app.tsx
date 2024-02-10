import Accordian from "./components/accordian"
import './App.css';
import RandomColor from "./components/random-color";
import StarRating from "./components/star-rating";

export function App() {

  return (
    <>
      {/* Accordian Component */}
      <Accordian />

      {/* Random Color Generator Component */}
      <RandomColor />

      {/* Star Rating Component */}
      <StarRating noOfStars={6} />
    </>
  )
}
