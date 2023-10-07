import { useCart } from '@/hooks/use-cart'
import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'


export default function List({mode}) {

  

  // 使用hooks 解出所需的狀態與函式(自context)
  const { cart, items, plusOne, minusOne, removeItem } = useCart()

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
    return v[mode+"_id"] !== null
  })
  



  return (
    <>
        
          {newItems.map((v, i) => {
            

            return (
              <div className='listTitle' key={v.id}>
                <Col>{v.id}</Col>
                
                <Col>{v.price}</Col>
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
                <Col>{v.itemTotal}</Col>
                <Col>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      removeItem(v.id)
                    }}
                  >
                    x
                  </button>
                </Col>
                </div>
            )
          })}
        
      
      <div>
        items: {cart.totalItems} / total: {cart.cartTotal}
        <br />
        {cart.isEmpty && '購物車為空'}
        <hr />
      </div>
    </>
  )
}
