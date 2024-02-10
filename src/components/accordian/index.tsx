
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
  const [enableMultiselection, setEnableMultiselection] = useState(false);

  const [multiple, setMultiple] = useState<string[]>([]);

  const handleSingleSelection = (getCurrentId: string) => {
    // if (selected === null) return;
    setSelected(getCurrentId === selected ? '' : getCurrentId);
    // console.log(getCurrentId + " : " + selected);
  }

  const handleMultiSelection = (getCurrentId: string) => {
    let cpyMultiple = [...multiple];
    const findIndexofCurrentId = cpyMultiple.indexOf(getCurrentId);
    // console.log(findIndexofCurrentId);

    if (findIndexofCurrentId === -1) cpyMultiple.push(getCurrentId)
    else cpyMultiple.splice(findIndexofCurrentId, 1);

    setMultiple(cpyMultiple)
    // console.log(cpyMultiple);
  }

  return (
    <div className="wrapper">
      <button
        onClick={() => setEnableMultiselection(!enableMultiselection)}
      >
        Enable Multiselect
      </button>
      <div className="accordian">
        {
          data && data.length > 0 ?
            (data.map(dataItem => (
              <div className="item">
                <div
                  onClick={
                    enableMultiselection
                      ? () => handleMultiSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)}
                  className='title'
                >
                  <h3>{dataItem.question}</h3>
                  <span>+</span>
                </div>
                {
                  enableMultiselection ? (
                    multiple.indexOf(dataItem.id) !== -1 && (
                      <div className="content">{dataItem.answer}</div>
                    )
                  ) : (
                    selected === dataItem.id && (
                      <div className="content">{dataItem.answer}</div>
                    )
                  )

                }
                {/* {
                  selected === dataItem.id ||
                    multiple.indexOf(dataItem.id) !== -1 ? (
                    <div className="content">
                      {dataItem.answer}
                    </div>
                  ) : null
                } */}
              </div>
            ))) : (
              <div>No Data Found</div>
            )
        }
      </div>
    </div >
  )
}

export default Accordian;