import { useProductCart } from '@/hooks/use-product-cart'
import { useEffect, useState } from 'react'

export default function List() {
  // 使用hooks 解出所需的狀態與函式(自context)
  const { productCart, products, plusOneProduct, minusOneProduct, removeProduct } = useProductCart()

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

  return (
    <div>
      <table
        className="table"
        cellPadding="0"
        border="1"
        width="100%"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>id</th>
            <th>名稱</th>
            <th>規格</th>
            <th>單價</th>
            <th>數量</th>
            <th>小計</th>
            <th>移除</th>
          </tr>
        </thead>
        <tbody>
          {products.map((v, i) => {
            return (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.name} </td>
                <td>
                  <div>{v.detail_1}</div>
                  <div>{v.detail_2}</div>
                  <div>{v.detail_3}</div>
                </td>
                <td>{v.price}</td>
                <td>
                  <div className="btn-group mr-2" role="group">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        minusOneProduct(v.id)
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
                        plusOneProduct(v.id)
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{v.itemTotal}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      removeProduct(v.id)
                    }}
                  >
                    x
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        items: {productCart.totalItems} / total: {productCart.cartTotal}
        <br />
        {productCart.isEmpty && '購物車為空'}
        <hr />
      </div>
    </div>
  )
}
