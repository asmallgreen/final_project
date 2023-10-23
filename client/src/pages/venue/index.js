import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Link from "next/link";

//我來marge
export default function Venue() {
  const [VenueData, setVenueData] = useState(null)

  useEffect(() => {
    async function fetchVenueData() {
      try {
        const response = await axios.get('http://localhost:3005/venue');
        setVenueData(response.data.allVenue);
      } catch (error) {
        console.error('資料庫連結錯誤:', error);
      }
    }
    fetchVenueData();
  }, [])
  // console.log(VenueData)
  return (
    <div className='idh'>
      <Container>
        {
          VenueData && VenueData.map((venue, index) => {
            return <div className='mt-3 mb-5' key={index}>
              <div className="d-flex align-items-end">
                <h2 className="">{venue.venue_position}</h2>
                <h5 className="dojo-name">{venue.venue_name}</h5>
              </div>
              <Link
                className='in_img'
                type="button"
                href={`/venue/date?id=${venue.id}`}
              >
                <img src={`/images/venue/${venue.venue_img}`}
                  className="responsive-image"
                />
              </Link>
            </div>
          })
        }
      </Container>
    </div>
  )
}