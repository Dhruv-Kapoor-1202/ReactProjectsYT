
/**
 * TODO: Create an Accordian Component
 * It should by default do `Single Selection`
 * of the item. 
 * It should have a button to open `Multiple
 * Selection` as well
 * 
 */

import { useState } from "preact/hooks";
import data from "./data";
import './styles.css'

const Accordian = () => {

  const [selected, setSelected] = useState('');

  const handleSingleSelection = (getCurrentId: string) => {
    // if (selected === null) return;
    setSelected(getCurrentId === selected ? '' : getCurrentId);
    // console.log(getCurrentId + " : " + selected);
  }

  return (
    <div className="wrapper">
      <div className="accordian">
        {
          data && data.length > 0 ?
            (data.map(dataItem => (
              <div className="item">
                <div
                  onClick={() => handleSingleSelection(dataItem.id)}
                  className='title'
                >
                  <h3>{dataItem.question}</h3>
                  <span>+</span>
                </div>
                {
                  selected === dataItem.id ? (
                    <div className="content">
                      {dataItem.answer}
                    </div>
                  ) : null
                }
              </div>
            ))) : (
              <div>No Data Found</div>
            )
        }
      </div>
    </div>
  )
}

export default Accordian;