import { useState } from "preact/hooks";
import { FaStar } from "react-icons/fa"
import './styles.css';

type StarRatingPropTypes = {
  noOfStars: number;
}

/**
 * Creates a Star Rating Component which 
 * should take a parameter `noOfStars` and
 * displays that many stars on the screen 
 * and the user can select the stars and give
 * ratings.
 * 
 * @param {StarRatingPropTypes} noOfStars -Number of stars to be present on screen
 * 
 * 
*/
const StarRating = ({ noOfStars = 5 }: StarRatingPropTypes) => {

  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);


  const handleClick = (getCurrentIndex: number) => {
    // console.log(getCurrentIndex);
    setRating(getCurrentIndex);
  }

  const handleMouseEnter = (getCurrentIndex: number) => {
    // console.log(getCurrentIndex)
    setHover(getCurrentIndex)

  }

  const handleMouseLeave = () => {
    setHover(rating);
  }

  return (
    <div className="star-rating">
      {
        [...Array(noOfStars)].map((_, index) => {
          index += 1;

          return (
            <FaStar
              key={index}
              className={index <= (hover || rating) ? 'active' : 'inactive'}
              onClick={() => handleClick(index)}
              onMouseMove={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave()}
              size={40}
            />
          )
        })
      }
    </div>
  )
};

export default StarRating;