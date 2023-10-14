import { useState, useEffect  }from 'react'

export default function CountCom({setCartQuantity}) {
    const [num, setNum] = useState(0)

    const handleAdd = () => {
        const newNum = num === 0 ? 0 :num
        setNum(newNum +1)
        
    }
    
    const handleDec = () => {
        const newNum = num === 0 ? 0 :num
        setNum(newNum -1)
        
    }

    useEffect(() => {
        setCartQuantity(num)
        console.log(num);
      }, [num]);

  return (
    
        <div className="quantity-btn btn-group btn border">
          <div className="symbol btn" onClick={handleDec}>
            -
          </div>
          <div className="quantity btn">{num}</div>
          <div className="symbol btn" onClick={handleAdd}>
            +
          </div>
        </div>
      
  )
}
