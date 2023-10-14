import { useCart } from '@/hooks/use-cart'
import { useEffect, useState, useReducer } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { reducer } from '@/hooks/cart-reducer.js'
import { AddCartCourse } from '@/components/cart/addCartCourse.js'
import { set } from 'lodash'

export default function List({ mode }) {

  // 使用hooks 解出所需的狀態與函式(自context)
  const { cart, items, plusOne, minusOne, removeItem, setChecked } = useCart()

  const [producDtl, setProductDtl] = useState({})

  const handleSelectChange = (event, productId, index) => {
    const newValue = event.target.value;
    setProductDtl((prevValues) => ({
      ...prevValues,
      [productId]: {
        ...prevValues[productId],
        [index]: newValue,
      },
    }));
    console.log(producDtl)
  };

  const handleSendDtl = () => {

  }

  const handleCheckboxChange = (event) => {
    let thisEle = event.target
    let itemid = +thisEle.getAttribute("data-itemid")
    let isChecked = thisEle.checked

    setChecked(itemid, isChecked)
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

        let aaa = v.product_detail
        let arr = aaa

        if (aaa != null && aaa.length > 0) {
          let temArr = aaa.split(',')
          arr = temArr

        }


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
            <Col>{v.image}</Col>

            <Col className={`${mode === 'course' ? 'd-none' : ''} d-flex flex-column g-1`} >
              {
                mode !== 'course' && arr !== "" ?
                  v.cateList.map((eachCate, j) => {

                    return (
                      <select
                        key={j}
                        id={j}
                        className='m-1'
                        defaultValue={arr[j]}
                        onChange={(e) => { handleSelectChange(e, j) }}
                      >
                        <option value="0">{eachCate.cate_name}</option>
                        {eachCate.data.map((eachData, k) => {
                          return (
                            <option key={eachData.id} value={eachData.id}>{eachData.id}</option>

                          )
                        })
                        }
                      </select>
                    )
                  })
                  : ""
              }


            </Col>
            <Col className={`${mode === 'course' ? 'd-none' : ''}`}>${v.price}</Col>
            <Col className={`${mode === 'course' ? 'd-none' : ''}`}>
              <div className=" mr-2 calGroup" role="group">
                <button
                  type="button"
                  className="btn btn-light calBtn"
                  onClick={() => {
                    minusOne(v.id)
                  }}
                >
                  -
                </button>
                <div className='numSquare'>
                  {v.quantity}
                </div>
                <button
                  type="button"
                  className="btn btn-light calBtn"
                  onClick={() => {
                    plusOne(v.id)
                  }}
                >
                  +
                </button>
              </div>
            </Col>
            <Col className={`${mode === 'product' ? 'd-none' : ''}`}>
              <div className='d-flex flex-column align-items-start justify-contents-start '>
                <span className='mb-1'>日期&nbsp;{v.start_date}</span>
                <span className='mb-1'>時間&nbsp;{v.hour}小時</span>
                <span className='mb-1'>地點&nbsp;{v.location}</span>
                <span className='mb-1'>授課教師&nbsp;{v.teacher_name}</span>
              </div>
            </Col>
            <Col>${v.itemTotal}</Col>
          </div>
        )
      })}



    </>
  )
}
