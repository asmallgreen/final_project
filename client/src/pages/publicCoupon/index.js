import React ,{ useState }from 'react'
import { Container, Row ,Button} from 'react-bootstrap';

export default function Index() {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClickOne = ()=>{
    setIsDisabled(true)
  }

  const [isDisabledTwo, setIsDisabledTwo] = useState(false);

  const handleClickTwo = ()=>{
    setIsDisabledTwo(true)
  }
  return (
    <>
      <div className='couponBg'>
        <div className='ruleMain'>
          <div className='ruleTitle mb-5'>會員累積消費說明</div>
          <div className='ruleImg mb-5' />
          <div className='ruleTitle mb-5'>限時促銷</div>
          <div className='flashRule mb-1'>
            <div className='couponFlashSales fs-4 d-lg-flex d-none'>
              <span>中秋節全館商品&nbsp;8折</span>
              <Button 
              className='clickTake'
              onClick={handleClickOne}
              disabled={isDisabled}
              >
              點擊領取</Button>
            </div>
            <div className='couponLine d-lg-flex d-none' />
            <div className='couponFlashSales fs-4 d-lg-flex d-none'>
              <span>雙十節全館商品&nbsp;滿千折百</span>
              <Button 
              className='clickTake'
              onClick={handleClickTwo}
              disabled={isDisabledTwo}
              >
              點擊領取</Button>
            </div>
            {/* ------------phone------------ */}
            <div className='couponFlashSales fs-4 d-sm-none d-flex'>
              <span>中秋節全館商品&nbsp;8折</span>
            </div>
            <div className='couponLine d-sm-none d-flex' />
            <div className='couponFlashSales fs-4 d-sm-none d-flex'>
              <Button 
              className='clickTake'
              onClick={handleClickOne}
              disabled={isDisabled}
              >
              點擊領取</Button>
            </div>
          </div>
            {/* ------------phone------------ */}
          <div className='flashRule'>
            <div className='couponFlashSales fs-4 d-sm-none d-flex'>
              <span>雙十節全館商品&nbsp;滿千折百</span>
            </div>
            <div className='couponLine d-sm-none d-flex' />
            <div className='couponFlashSales fs-4 d-sm-none d-flex'>
              <Button 
              className='clickTake'
              onClick={handleClickTwo}
              disabled={isDisabledTwo}
              >
              點擊領取</Button>
            </div>
          </div>
          <div className='rulePoint'>*優惠券僅可使用一次&nbsp;且限用於商品</div>
        </div>
      </div>
    </>
  )
}
