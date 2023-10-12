import { useCart } from '@/hooks/use-cart'
import { useEffect, useState ,useReducer } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { reducer } from '@/hooks/cart-reducer.js'
import { AddCartCourse } from '@/components/cart/addCartCourse.js'

export default function List({ mode }) {

  // 使用hooks 解出所需的狀態與函式(自context)
  const { cart, items, plusOne, minusOne, removeItem ,setChecked} = useCart()

  const handleCheckboxChange = (event) => {
    let thisEle = event.target
    let itemid = +thisEle.getAttribute("data-itemid")
    let isChecked = thisEle.checked

    setChecked(itemid,isChecked)
    // console.log(items)
    //setCheckValue();
    
  };
  // 修正 Next hydration 錯誤
  // https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }
  // fix end
  

  // 請把items中product_id為null的移除

  const newItems = items.filter((v, i) => {
    return v[mode + "_id"] !== null
  })


  return (
    <>

      {newItems.map((v, i) => {


        return (
          <div className={`${mode}List`} key={v.id}>
            <Col xs={1}><input
              type='checkbox'
              data-itemid={v.id}
              className='expand cartChk'
              onChange={handleCheckboxChange}

              checked={v.isChecked ? v.isChecked : ''}
              
            /></Col>
            <Col>{v.name}</Col>
            <Col>{v.name}</Col>
            <Col className={`${mode === 'course' ? 'd-none' : ''} d-flex flex-column g-1`} >
              <select className='m-1'>
                <option value="0">請選擇</option>
                <option value="1">S</option>
                <option value="2">M</option>
              </select>

              <select className='m-1'>
                <option value="0">請選擇</option>
                <option value="1">S</option>
                <option value="2">M</option>
              </select>
              <select className='m-1'>
                <option value="0">請選擇</option>
                <option value="1">S</option>
                <option value="2">M</option>
              </select>
            </Col>
            <Col>
              <div className="btn-group mr-2" role="group">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    minusOne(v.id)
                  }}
                >
                  -
                </button>
                <button type="button" className="btn btn-light">
                  {v.quantity}
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    plusOne(v.id)
                  }}
                >
                  +
                </button>
              </div>
            </Col>
            <Col>{v.price}</Col>
            <Col>{v.itemTotal}</Col>
          </div>
        )
      })}



    </>
  )
}
