import React from 'react'

export default function OrderDetail() {
  return (
    <>
      <table className='order-table-pc'>
        <thead>
          <tr>
            <td>#</td>
            <td>名稱</td>
            <td>單價</td>
            <td>數量</td>
            <td>規格</td>
            <td>小計</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src='/images/member/default_member.png' /></td>
            <td>雞雞弓箭</td>
            <td>777</td>
            <td>7</td>
            <td>火雞毛</td>
            <td>500</td>
          </tr>
        </tbody>
      </table>
      <div>Here is detail</div>
    </>
  )
}
