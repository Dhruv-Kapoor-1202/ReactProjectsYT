import { useEffect, useState } from "preact/hooks";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import "./styles.css";

type ImageSliderProps = {
  url: string,
  limit: string,
  page: string
}

type ImageProps = {
  author: string,
  download_url: string,
  height: number,
  id: string,
  url: string,
  width: number
}

/**
 * @todo
 * - Create an Image Slider component that
 * takes in the data from API and renders
 * the images in carousal 
 * - It takes in the parameters the API `url`
 * and the `limit`, the number of images. 
 * 
 * @todo
 * fix the trycatch Error type
*/
const ImageSlider = ({ url, limit = '5', page = '1' }: ImageSliderProps) => {

  const [images, setImages] = useState<ImageProps[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchImages = async (getUrl: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data: ImageProps[] = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error: unknown) {
      // if (typeof error === 'string') {
      //   setErrorMsg("Uh Oh! An Error Occured");
      // } else
      //   setErrorMsg(error.message);
      setErrorMsg('Oh No! An Error Occured')
      setLoading(false);
    }
  }

  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
  }

  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }


  useEffect(() => {
    if (url !== '') fetchImages(url);
  }, [url])

  console.log(images);


  if (loading) {
    return (
      <div>
        Loading Data! Please Wait
      </div>
    )
  }

  if (errorMsg) {
    return (
      <div>
        Error occured!<br />
        {errorMsg}
      </div>
    )
  }
  return (
    <div className="outer">
      <div className='container'>
        <BsArrowLeftCircleFill
          onClick={handlePrevious}
          className='arrow arrow-left'
        />
        {images && images.length ?
          images.map((iamgeItem, index) => (
            <img
              key={iamgeItem.id}
              alt={iamgeItem.download_url}
              src={iamgeItem.download_url}
              // className='current-image'
              className={
                currentSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
          : null
        }
        <BsArrowRightCircleFill
          onClick={handleNext}
          className='arrow arrow-right'
        />
        <span
          className='circle-indicators'
        >
          {images && images.length ?
            images.map((_, index) => (
              <button
                key={index}
                // className='current-indicator'
                className={
                  currentSlide === index
                    ? 'current-indicator'
                    : 'current-indicator inactive-indicator'
                }
                onClick={() => setCurrentSlide(index)}
              >
              </button>
            ))
            : null
          }
        </span>
      </div>
    </div>
  )
};

export default ImageSlider;