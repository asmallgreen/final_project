import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Link from "next/link";


export default function Venue() {
  const [VenueData, setVenueData] = useState(null)
  const [reserveData, setReserveData] = useState(null);

  useEffect(() => {
    async function fetchVenueData() {
      try {
        const response = await axios.get('http://localhost:3005/venue');
        setVenueData(response.data.allVenue);
      } catch (error) {
        console.error('資料庫連結錯誤:', error);
      }
    }
    async function fetchVenueReserveData(){
      try {
        const response = await axios.get('http://localhost:3005/venue_reserve');
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
        {
          VenueData && VenueData.map((venue, index) => {
            return <div className='mt-3 mb-5' key={index}>
              <div className="d-flex align-items-end">
                <h2 className="">{venue.venue_position}</h2>
                <h5 className="dojo-name">{venue.venue_name}</h5>
              </div>
              <Link
                type="button"
                href={`/venue/date?id=${venue.id}`}
              >
                <img src={`/images/venue/${venue.venue_img}`}></img>
              </Link>
            </div>
          })
        }
      </Container>
    </>
  )
}