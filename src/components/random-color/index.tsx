/**
 * TODO: 
 * Create A Random Color Generator
 * And display the Color Value on Sreen
 * 
 * *Addons: 
 * Create two seperate buttons, one to 
 * display the RGB value of the color and 
 * other to display the HEX value 
 */

import { useEffect, useState } from "preact/hooks";

const RandomColor = () => {

  const [typeOfColor, setTypeOfColor] = useState<string>('hex');
  const [color, setColor] = useState<string>('#000000');

  const randomColorUtility = (length: number): number => {
    return Math.floor(Math.random() * length);
  }

  const handleCreateRandomHexColor = () => {
    const hex: string[] = [
      '0', '1', '2', '3', '4', '5', '6', '7',
      '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'
    ]

    let hexColor: string = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }

    // console.log(hexColor);
    setColor(hexColor);
  }

  const handleCreateRandomRgbColor = () => {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);

    setColor(`rgb(${r}, ${g}, ${b})`)
  }

  useEffect(() => {
    if (typeOfColor === 'rgb') handleCreateRandomRgbColor()
    else handleCreateRandomHexColor()
  }, [typeOfColor]);

  return (
    <div style={{
      height: "100vh",
      background: color,
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid black',
      borderTop: '0'
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
      }}>
        <button
          style={{
            padding: '1em',
            flex: '1'
          }}
          onClick={() => setTypeOfColor('hex')}
        >
          Create HEX Color
        </button>
        <button
          style={{
            padding: '1em',
            flex: '1'

          }}
          onClick={() => setTypeOfColor('rgb')}
        >
          Create RGB Color
        </button>
      </div>
      <button
        style={{
          padding: '1em',
        }}

        onClick={typeOfColor === 'hex' ? (
          handleCreateRandomHexColor
        ) : (
          handleCreateRandomRgbColor
        )}
      >
        Generate Random Color
      </button>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2rem',
          color: 'white',
          gap: '1em'
        }}
      >
        <div
          style={{
            fontSize: '1rem'
          }}
        >
          {typeOfColor === 'hex' ? 'HEX COLOR' : 'RGB COLOR'}
        </div>
        <div
          style={{
            fontSize: '1.5em',
            fontWeight: '900'
          }}
        >
          {color}
        </div>
      </div>

    </div>
  )
};

export default RandomColor;