import Accordion from 'react-bootstrap/Accordion';

function ProductInfoAccordion(props) {
  const { pidData } = props
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className='product-info-title'>商品說明</Accordion.Header>
        <Accordion.Body className='accordion-content'>
        {pidData.description}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header className='product-info-title'>注意事項</Accordion.Header>
        <Accordion.Body className='accordion-content'>
        <strong>購物須知</strong>
          <ol>
            <li>
              星線底部可能會有划痕，這是由於軸的製造工藝而不可避免的，並非划痕。請注意，性能沒有問題。
            </li>
            <li>若對商品有疑問，請洽 免費客服專線 03-4253057。 </li>
          </ol>

          <strong>送貨時間為何？</strong>
          <ol>
            <li>
              線上購買 - 標準運送：每日 16:00
              前完成訂購，商品將於一個工作天起可宅配至您指定地點。每日 16:00
              後完成訂購，商品將於兩個工作天起可宅配至您指定地點。週日不配送，如遇週日則將延後至週一配送。
            </li>
            <li>
              原則上本島地區商品會於 2
              個工作天內送達，離島地區配送區域:台東縣綠島鄉蘭嶼鄉、澎湖縣、金門縣、連江縣、屏東縣琉球鄉。收貨地址如為離島地區，配送時間約
              3 - 7 天。
            </li>
            <li>
              實際到達時間、配送相關服務視配送地點及天候狀況而定。
              恕無法使用快速到貨，貨到付款服務亦因配送地區將有所限制，詳情請洽
              免費客服專線 03-4253057。
            </li>
            <li>
              若收貨人資訊不完整、收貨人無法收貨、遇颱風地震等天災、公共工程、或系統設備維護等情況，出貨時間將視實際狀況順延。
            </li>
          </ol>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header className='product-info-title'>付款方式</Accordion.Header>
        <Accordion.Body className='accordion-content'>
        <ol>
            <li>
              信用卡 – Visa、MasterCard 或 JCB 信用卡，不包含美國運通信用卡。
            </li>
            <li>貨到付款</li>
          </ol>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ProductInfoAccordion;




