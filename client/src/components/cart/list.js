import { useCart } from '@/hooks/use-cart'
import { set } from 'lodash'
import { useEffect, useState, useReducer, createContext ,useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'




export default function List({ mode, setCartProductDtl ,setCartOriginDtl}) {

  // 使用hooks 解出所需的狀態與函式(自context)
  const { cart, items, plusOne, minusOne, removeItem, setChecked } = useCart()

  const [producDtl, setProductDtl] = useState({})

  const [originDtl, setOriginDtl] = useState([])

  const [activeSelection, setActiveSelection] = useState([]);


  const handleSelectChange = (event, productId, index) => {
    const newValue = event.target.value;
    setProductDtl((prevValues) => ({
      ...prevValues,
      [productId]: {
        ...prevValues[productId],
        
        product_detail: [...(prevValues[productId]?.product_detail || []), Number(newValue)],
      },
    }));
    console.log('productDtL'+producDtl)
    setCartProductDtl(producDtl)
  };

  const handleSendDtl = (v) => {
    if(v!==undefined && v.product_detail!==null){
    const { name, product_detail } = v
    const newObject = { name, product_detail };
    setOriginDtl([...originDtl, newObject]);
    console.log('originDtl'+originDtl) //物件陣列
    setCartOriginDtl(originDtl)
    }
  }

  const handleCheckboxChange = (event, v) => {
    let thisEle = event.target
    let itemid = +thisEle.getAttribute("data-itemid")
    let isChecked = thisEle.checked

    setChecked(itemid, isChecked)
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

  const filterItems = items.filter((v, i) => {
    return v[mode + "_id"] !== null
  }).map((v, i) => {

    const productName = v.name
    return {
      ...v,
      product_id: productName,
    };

  });




  return (
    < >
      {filterItems.map((v, i) => {
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
              onChange={
                handleCheckboxChange

              }
              onClick={() => {
                handleSendDtl(v)
              }}
              checked={v.isChecked ? v.isChecked : ''}

            /></Col>
            <Col className='d-sm-flex d-none'>{v.name}</Col>
            <Col className='d-sm-flex d-none'>{v.image}</Col>

            <Col xs={3} className='d-block d-xl-none'>{v.image}</Col>
            <Col className='d-flex d-xl-none flex-column justify-content-around m-0 align-items-start'>
              <span className='m-0'>{v.name}</span>
              <span className='m-0'>${v.itemTotal}</span>
              <span className={`${mode === 'product' ? 'd-none' : 'd-lg-none d-block'} `}>日期&nbsp;{v.start_date}&nbsp;時間&nbsp;{v.hour}小時</span>
              <span className={`${mode === 'product' ? 'd-none' : 'd-lg-none d-block'} `}>地點&nbsp;{v.location}</span>
              <div className={`${mode === 'course' ? 'd-none' : ''}  d-xl-none calGroup m-0`} role="group">
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
            <Col className={`${mode === 'course' ? 'd-none' : ''} d-flex flex-column g-1`} >
              {
                mode !== 'course' && arr !== "" ?
                  v.cateList.map((eachCate, j) => {
                    const productId = v.product_id;
                    return (
                      <select
                        key={j}
                        id={j}
                        className='m-1'
                        defaultValue={arr[j]}
                        onChange={(e) => { handleSelectChange(e, productId, j) }}
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
            <Col className={`${mode === 'course' ? 'd-none' : 'd-sm-flex d-none'}`}>${v.price}</Col>
            <Col className={`${mode === 'course' ? 'd-none' : 'd-sm-flex d-none'}`}>
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
            <Col className={`${mode === 'product' ? 'd-none' : 'd-lg-block d-none'}`}>
              <div className='d-flex flex-column align-items-start  justify-content-center'>
                <span className='mb-1 ps-5'>日期&nbsp;{v.start_date}</span>
                <span className='mb-1 ps-5'>時間&nbsp;{v.hour}小時</span>
                <span className='mb-1 ps-5'>地點&nbsp;{v.location}</span>
                <span className='mb-1 ps-5'>授課教師&nbsp;{v.teacher_name}</span>
              </div>
            </Col>
            <Col className='d-sm-flex d-none'>${v.itemTotal}</Col>
          </div>
        )
      })}



    </>
  )
}

