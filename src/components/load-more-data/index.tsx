import { useEffect, useState } from "preact/hooks";
import "./styles.css"

type ProductProps = {
  brand: string,
  category: string,
  description: string,
  discountPercentage: number,
  id: number,
  images: string[],
  price: number,
  rating: number,
  stock: number,
  thumbnail: string,
  title: string,
}

type ResultProps = {
  limit: number,
  products: ProductProps[],
  skip: number,
  total: number,
}


/**
 * @todo
 * - Create a component that renders data coming
 * from an API but only renders a certain amount
 * of data at a time. 
 * - Add a `Load More Data` button at the end 
 * to load the next chunk of data.
 * - When the `100` units of the data has been
 * rendered, disable the button
 * @docs
 * API -> https://dummyjson.com/products?limit=20&skip=10
 * 
 */
const LoadMoreData = () => {

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [count, setCount] = useState<number>(0);
  const [disableButton, setDisableButton] = useState<boolean>(false)

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`
      )

      const result: ResultProps = await response.json();
      console.log(result);

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [
          ...prevData,
          ...result.products
        ]);
        // setProducts(result.products);
        setLoading(false);
      }

    } catch (error) {
      console.log(error);
      setLoading(false);

    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 100) setDisableButton(true);
  }, [products])

  if (loading) {
    return <div>
      Loading Data!!! Please Wait
    </div>
  }

  return (
    <div className="load-more-container">
      <div className="product-container">
        {
          products && products.length ? (
            products.map(item => (
              <div
                className="product"
                key={item.id}
              >
                <div className="product-id"><p>{item.id}</p></div>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                />
                <p>{item.title}</p>
              </div>
            ))
          ) : null
        }
      </div>
      <div className="button-container">
        <button
          disabled={disableButton}
          onClick={() => setCount(count + 1)}
        >Load More Products</button>
      </div>
      {
        disableButton ? (
          <p>You have reached 100 products</p>
        ) : null
      }
    </div>
  )
};

export default LoadMoreData;