import React, { useState, useEffect } from 'react'
import { Container, Tab, Tabs, Button , Row, Col } from 'react-bootstrap'
import { BiSolidCrown } from 'react-icons/bi';
import SideBar from '../../components/member/side-bar'
import FavProductCard from '../../components/member/fav-product-card'
import FavCourseCard from '@/components/member/fav-course-card';
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import Link from 'next/link';
import axios from 'axios';
import { logDOM } from '@testing-library/react';
import Swal from 'sweetalert2';


export default function MemberCenter() {
  const { authJWT,favoriteProducts, setFavoriteProducts, favoriteCourses, setFavoriteCourses, getFavoriteProducts,
    getFavoriteCourses } = useAuthJWT()
  const memberId = authJWT.memberData.id
  const [products, setProducts] = useState([])
  const [courses, setCourses] = useState([])
// 收藏的商品----------------------------------------
  const getProducts = async () => {
    const res = await axios.get(
      'http://localhost:3005/member/fav-products',
      {
        withCredentials: true,
      }
    )
      // console.log('this is product res.data:',res.data);
    if (res.data.products) {
      const productsWithChecked = res.data.products.map((product) => ({
        ...product,
        checked: false, // 新增 checked 屬性，初始值為 false
      }));
      setProducts(productsWithChecked)
    }
  }

  useEffect(() => {
    getProducts()
    getCourses()
  }, [])
// console.log('products:',products);
// console.log('courses:',courses);


//   // 收藏的課程----------------------------------------
  const getCourses = async () => {
    const res = await axios.get(
      'http://localhost:3005/member/fav-courses',
      {
        withCredentials: true,
      }
    )
      // console.log('this is res.data:',res.data);
    if (res.data.courses) {
      const coursesWithChecked = res.data.courses.map((course) => ({
        ...course,
        checked: false, // 新增 checked 屬性，初始值為 false
      }));
      setCourses(coursesWithChecked)
    }
  }


  const triggerCourseFav = (courses, id) => {
    return courses.map((v, i) => {
      if (v.id === id) return { ...v, is_favorite: !v.is_favorite }
      return { ...v }
    })
  }

  const handleTriggerCourseFav = (id) => {
    setCourses(triggerCourseFav(courses, id))
  }
  // 切換商品的 checked 狀態
const toggleProductCheck = (productId) => {
  const updatedProducts = products.map((product) => {
    if (product.id === productId) {
      return { ...product, checked: !product.checked };
    }
    return product;
  });
  setProducts(updatedProducts);
};

// 處理取消收藏的邏輯，並將選中的商品傳遞給它
const handleCancelFavProductClick = async (products) => {
  const selectedProductsToCancel = products.filter((product) => product.checked);
  const idsToCancel = selectedProductsToCancel.map((product) => product.id);
  // 在這裡可以處理取消收藏的邏輯
  console.log('selectedProductsToCancel',idsToCancel);
  try{
    const res = await axios.delete(`http://localhost:3005/member/${idsToCancel}`,
    {
      data:{memberId},
      withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
    })
    console.log(res.data);
    if(res.data.message === '已取消收藏'){
      await Swal.fire({
        icon: 'success',
        title: '商品已取消收藏',
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: '35%',
        padding: '0 0 3.25em',
        customClass: {
          width:'shadow-sm'
        }
      })
    }
  }catch(error){
    console.log(error);
  }
  // console.log('選中的商品：', selectedProductsToCancel);
  getProducts()
};

// 切換課程的 checked 狀態
const toggleCourseCheck = (courseId) => {
  const updatedCourses = courses.map((course) => {
    if (course.id === courseId) {
      return { ...course, checked: !course.checked };
    }
    return course;
  });
  setCourses(updatedCourses);
};

// 處理取消收藏的邏輯，並將選中的課程傳遞給它
const handleCancelFavCourseClick = async (courses) => {
  const selectedCoursesToCancel = courses.filter((course) => course.checked);
  const idsToCancel = selectedCoursesToCancel.map((course) => course.id);
  // 在這裡可以處理取消收藏的邏輯
  // console.log('selectedCoursesToCancel',idsToCancel);
  try{
    const res = await axios.delete(`http://localhost:3005/member/course/${idsToCancel}`,
    {
      data:{memberId},
      withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
    })
    console.log(res.data);
    if(res.data.message === '已取消收藏'){
      await Swal.fire({
        icon: 'success',
        title: '課程已取消收藏',
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        // width: '35%',
        padding: '0 0 3.25em',
        customClass: {
          width:'shadow-sm'
        }
      })
    }
  }catch(error){
    console.log(error);
  }
  // console.log('選中的商品：', selectedCoursesToCancel);
  getCourses()
};


useEffect(()=>{
  getFavoriteProducts()
  },[products])
  
useEffect(()=>{
  getFavoriteCourses()
  },[courses])
    

  // 全選商品
  const handleSelectAllProduct = () => {
    const allSelected = products.every((product)=>product.checked)
    const updatedProducts = products.map((product) => {
      return { ...product, checked: !allSelected };
    });
    setProducts(updatedProducts);
  }
    // 全選課程
    const handleSelectAllCourse = () => {
      const allSelected = courses.every((course)=>course.checked)
      const updatedCourses = courses.map((course) => {
        return { ...course, checked: !allSelected };
      });
      setCourses(updatedCourses);
    }
  return (
    <>
  <Row>
<Col md='3' className='p-3  offset-md-1 side-bar-border-right'>
  <SideBar/>
</Col>
<Col md='7' className='p-3'>
<Container className='my-3'>
            <div className='fs-2 mb-3'>我的收藏</div>
{/* 收藏的商品/收藏的課程導覽列 */}
    <Tabs
      defaultActiveKey="product"
      id="uncontrolled-tab-example"
      className="mb-3 fav-header"
    >
      <Tab eventKey="product" title="收藏商品">
{/* 全選/取消收藏/加入購物車 */}
<div className='text-end fav-select-all'>
        <input type='checkbox' onChange={handleSelectAllProduct}/> 全選
        <Button className='mx-3 update-profile-btn'
         onClick={()=>handleCancelFavProductClick(products)} 
        >取消收藏</Button>
        {/* <Button className='update-profile-btn'>加入購物車</Button> */}
      </div>
{/* 收藏的商品內容 */}
        <FavProductCard products={products} toggleProductCheck={toggleProductCheck}/>
      </Tab>

      <Tab eventKey="course" title="收藏課程" className='member-fav-course'>
      {/* 全選/取消收藏/加入購物車 */}
      <div className='text-end fav-select-all'>
        <input type='checkbox' onChange={handleSelectAllCourse}/> 全選
        <Button className='mx-3 update-profile-btn'
        onClick={()=>handleCancelFavCourseClick(courses)}>取消收藏</Button>
        {/* <Button className='update-profile-btn'>加入購物車</Button> */}
      </div>
{/* 收藏的課程內容 */}
          <FavCourseCard courses={courses} toggleCourseCheck={toggleCourseCheck}/>
      </Tab>
    </Tabs>


{/* 商品card */}
            <div></div>
{/* 課程card */}
            <div></div>
{/* 分頁按鈕 */}
      </Container>
</Col>

</Row>

    </>
  )
}