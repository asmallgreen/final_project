import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

export default function Venue() {
  const [VenueData, setVenueData] = useState(null)
  const [reserveData, setReserveData] = useState(null);

  useEffect(() => {
    async function fetchVenueData() {
      try {
        const response = await axios.get('http://127.0.0.1:3005/venue');
        setVenueData(response.data.allVenue);
      } catch (error) {
        console.error('資料庫連結錯誤:', error);
      }
    }
    async function fetchVenueReserveData(){
      try {
        const response = await axios.get('http://127.0.0.1:3005/venue_reserve');
        setReserveData(response.data.allVenueReserve);

      } catch (error) {
        console.error('資料庫連結錯誤:', error);
      }
    }

    fetchVenueData();
    fetchVenueReserveData()
  }, [])
  console.log(VenueData)
  console.log(reserveData)
  return (
    <>
      <Container>
        {/* <div className='mt-5'>
          <div className="d-flex align-items-end">
            <h2 className="">北部道場</h2>
            <h5 className="dojo-name">藏月弓道場</h5>
          </div>
          <a href="/venue/date">
            <img src="/images/venue/dojo_n.png"></img>
          </a>
        </div>
        <div className='mt-5'>
          <div className="d-flex align-items-end">
            <h2 className="">中部道場</h2>
            <h5 className="dojo-name">岡達弓道場</h5>
          </div>
          <a href="/venue/date">
            <img src="/images/venue/dojo_s.png"></img>
          </a>
        </div>
        <div className='mt-5 mb-5'>
          <div className="d-flex align-items-end">
            <h2 className="">南部道場</h2>
            <h5 className="dojo-name">駁二弓道場</h5>
          </div>
          <a href="/venue/date">
            <img src="/images/venue/dojo_m.png"></img>
          </a>
        </div> */}
        {
          VenueData && VenueData.map((venue, index) => {
            return <div className='mt-3 mb-5' key={index}>
              <div className="d-flex align-items-end">
                <h2 className="">{venue.venue_position}</h2>
                <h5 className="dojo-name">{venue.venue_name}</h5>
              </div>
              <a href={`/venue/date?id=${venue.id}`}>
                <img src={`/images/venue/${venue.venue_img}`}></img>
              </a>
            </div>
          })
        }
      </Container>
    </>
  )
}