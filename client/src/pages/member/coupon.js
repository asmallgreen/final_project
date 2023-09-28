import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap'
import { BiSolidCrown } from 'react-icons/bi';
import SideBar from '../../components/member/side-bar'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


export default function MemberCenter() {
  return (
    <>
  <Row>
<Col md='3' className='p-3  offset-md-1 side-bar-border-right'>
  <SideBar/>
</Col>
<Col md='7' className='p-3'>
    
</Col>

</Row>

    </>
  )
}