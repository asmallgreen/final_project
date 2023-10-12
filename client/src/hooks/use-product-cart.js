import React, { useReducer, useContext, createContext, useEffect } from "react";
import { reducer, init } from "./cart-reducer";
import useLocalStorage from "./use-localstorage";
import { useAuthJWT } from "./use-auth-jwt";


const ProductCartContext = createContext(null);


// initialState = {
//   items: [],
//   isEmpty: true,
//   totalItems: 0,
//   cartTotal: 0,
// }

// const item = {
//     id: '',
//     detail_1:'',
//     detail_2:'',
//     detail_3:'',
//     quantity: 0,
//     price: 0,
// }

//以後要取用的話，就用useProductCart()，就可以取得商品購物車的資料
export const useProductCart = () => useContext(ProductCartContext);

export const ProductCartProvider = ({
  children,
  initialCartItems = [], //初始化購物車的加入項目
  localStorageKey = "product-cart", //初始化localStorage的鍵名
}) => {
  let items = initialCartItems;

  //若items為空陣列，則從localStorage取得資料
  if (!items.length) {
    try {
      // Get from local storage by key "product-cart"
      if (typeof window !== "undefined") {
        const localStorage = window.localStorage.getItem(localStorageKey);
        // Parse stored json or if none return initialValue
        items = localStorage ? JSON.parse(localStorage) : [];
      }
    } catch (error) {
      items = [];
      console.log(error);
    }
  }

  // init state, init來自cartReducer中
  const [state, dispatch] = useReducer(reducer, items, init);

  // init setValue(localStoage), setValue用於存入localStorage中
  const [storedValue, setValue] = useLocalStorage(localStorageKey, items);

  // 當 state.items 更動時 -> 更動 localStorage 中的值
  useEffect(() => {
    // 使用字串比較
    if (JSON.stringify(state.items) !== storedValue) {
      setValue(state.items);
    }
  }, [state]);

  /**
   * 加入新項目(quantity:1)，重覆項目 quantity: quantity + 1
   * @param  {Object} item
   * @returns {void}
   */
  const addProduct = (item) => {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  };

  /**
   * 給定一id值，將這商品移出陣列中
   * @param {string} id
   * @returns {void}
   */
  const removeProduct = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id,
      },
    });
  };

  /**
   * 給定一item物件，依照id尋找後更新其中的屬性值
   * @param {Object} item
   * @returns {void}
   */
  const updateProduct = (item) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: item,
    });
  };

  /**
   * 清空整個購物車
   * @returns {void}}
   */
  const clearProductCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  /**
   * 給定一id值，回傳是否存在於購物車中
   * @param {string} id
   * @returns {boolean}
   */
  const isInProductCart = (id) => {
    return state.items.some((item) => item.id === id);
  };

  /**
   * 給定一id值，有尋找到商品時，設定quantity: quantity + 1
   * @param {string} id
   * @returns {void}
   */
  const plusOneProduct = (id) => {
    return dispatch({
      type: "PLUS_ONE",
      payload: {
        id,
      },
    });
  };

  /**
   * 給定一id值，有尋找到商品時，設定quantity: quantity - 1，但 quantity 最小值為1
   * @param {string} id
   * @returns {void}
   */
  const minusOneProduct = (id) => {
    return dispatch({
      type: "MINUS_ONE",
      payload: {
        id,
      },
    });
  };

  return (
    <ProductCartContext.Provider
      value={{
        productCart: state,
        products: state.items,
        addProduct,
        removeProduct,
        updateProduct,
        clearProductCart,
        isInProductCart,
        plusOneProduct,
        minusOneProduct,
      }}
    >
      {children}
    </ProductCartContext.Provider>
  );
};
