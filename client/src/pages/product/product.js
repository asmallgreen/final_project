import Nav from 'react-bootstrap/Nav';

function PublicNav() {
  return (
    <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link className='public-nav' href="/home">關於良弓</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link className='public-nav' eventKey="link-1">首頁</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link className='public-nav' eventKey="link-2">商品</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link className='public-nav' eventKey="link-2">課程</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link className='public-nav' eventKey="link-2">場地租借</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default PublicNav;