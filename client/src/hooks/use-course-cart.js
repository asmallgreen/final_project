import React, { useReducer, useContext, createContext, useEffect } from 'react'
import { reducer, init } from './cart-reducer'
import useLocalStorage from './use-localstorage'

const CourseCartContext = createContext(null)

// initialState = {
//   items: [],
//   isEmpty: true,
//   totalItems: 0,
//   cartTotal: 0,
// }

// const item = {
//     id: '',
//     price: 0,
// }

//以後要取用的話，就用useCourseCart()，就可以取得課程購物車的資料
export const useCourseCart = () => useContext(CourseCartContext);

export const CourseCartProvider = ({
    children,
    initialCartItems = [], //初始化購物車的加入項目
    localStorageKey = 'course-cart', //初始化localStorage的鍵名
  }) => {
    // 如果localStorage有此鍵中的值，則套入使用作為初始items
    // localStorage中只儲存 items
    let items = initialCartItems
  
    if (!items.length) {
      try {
        // Get from local storage by key
        // fix next issue
        if (typeof window !== 'undefined') {
          const item = window.localStorage.getItem(localStorageKey)
          // Parse stored json or if none return initialValue
          items = item ? JSON.parse(item) : []
        }
      } catch (error) {
        items = []
        console.log(error)
      }
    }
  
    // init state, init來自cartReducer中
    const [state, dispatch] = useReducer(reducer, items, init)
  
    // init setValue(localStoage), setValue用於存入localStorage中
    const [storedValue, setValue] = useLocalStorage(localStorageKey, items)
  
    // 當 state.items 更動時 -> 更動 localStorage 中的值
    useEffect(() => {
      // 使用字串比較
      if (JSON.stringify(state.items) !== storedValue) {
        setValue(state.items)
      }
    }, [state])
  
    /**
     * 加入新項目(quantity:1)，重覆項目 quantity: quantity + 1
     * @param  {Object} item
     * @returns {void}
     */
    const addCourse = (item) => {
      
      if (isInCourseCart(item.id)) {
        alert(`課程 ${item.name} 已存在於購物車中`);
      } else {
        alert('已加入購物車')
        dispatch({
          type: 'ADD_ITEM',
          payload: item,
        });
      }
    };
  
    /**
     * 給定一id值，將這商品移出陣列中
     * @param {string} id
     * @returns {void}
     */
    const removeCourse = (id) => {
      dispatch({
        type: 'REMOVE_ITEM',
        payload: {
          id,
        },
      })
    }
  
    /**
     * 給定一item物件，依照id尋找後更新其中的屬性值
     * @param {Object} item
     * @returns {void}
     */
    const updateCourse = (item) => {
      dispatch({
        type: 'UPDATE_ITEM',
        payload: item,
      })
    }
  
    /**
     * 清空整個購物車
     * @returns {void}}
     */
    const clearCourseCart = () => {
      dispatch({
        type: 'CLEAR_CART',
      })
    }
  
    /**
     * 給定一id值，回傳是否存在於購物車中
     * @param {string} id
     * @returns {boolean}
     */
    const isInCourseCart = (id) => {
      return state.items.some((item) => item.id === id)
    }
  
  
    return (
      <CourseCartContext.Provider
        value={{
          courseCart: state,
          courses: state.items,
          addCourse,
          removeCourse,
          updateCourse,
          clearCourseCart,
          isInCourseCart,
        }}
      >
        {children}
      </CourseCartContext.Provider>
    )
  }  