// 初始化狀態
// isEmpty, totalItems, cartTotal為最後計算得出
export const initialState = {
    items: [],
    isEmpty: true,
    totalItems: 0,
    cartTotal: 0,
    productTotal:0,
    courseTotal:0,
    productTotalItems:0,
    courseTotalItems:0,
  }
  
  // 置於上述items陣列中的每個項目的物件模型
  // id, quantity, price為必要屬性
  // const item = {
  //   id: '',
  //   quantity: 0,
  //   name: '',
  //   price: 0,
  //   color: '',
  //   size: '',
  // }
  
  const setChecked = (state, action) => {

    for(let i = 0; i < state.items.length; i++){
      
      if(state.items[i].id === action.payload.id){

        state.items[i].isChecked = action.payload.isChecked

      }
    }
    return state.items
  }
  const addItem = (state, action) => {
    // 尋找是否有已存在的索引值
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    )
  
    const payloadQuantity = action.payload.quantity
  
    // 如果有存在，加入項目(以給定的quantity，或沒給定時quantity+1)
    if (existingItemIndex > -1) {
      const item = state.items[existingItemIndex]
      const id = item.id
  
      const quantity = payloadQuantity
        ? item.quantity + payloadQuantity
        : item.quantity + 1
      
      const isChecked = document.querySelector(`.cartChk[data-itemid="${id}"]`)

      const action = {
        type: 'UPDATE_ITEM',
        payload: { id, quantity ,isChecked},
      }
      
      
      return updateItem(state, action)
    }
    return [...state.items, action.payload]
  }
  
  const removeItem = (state, action) => {
    
    return state.items.filter((item) => item.id !== action.payload.id)
  }
  
  /**
   * upateItem (ex. quantity, color, name, price...)
   * ex. action = {type="UPDATE_ITEM", payload: {id:1, quantity:1, color:'red'}
   * @param  {} state
   * @param  {} action
   */
  
  const updateItem = (state, action) => {
    // 尋找是否有已存在的索引值
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    )
  
    if (existingItemIndex > -1) {
      const newState = [...state.items]
      newState[existingItemIndex] = {
        ...newState[existingItemIndex],
        ...action.payload,
      }
      return newState
    }
  
    return [...state.items]
  }
  
  // 類似於addItem，但固定quantity + 1
  const plusItemQuantityOnce = (state, action) => {
    // 尋找是否有已存在的索引值
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    )
  
    if (existingItemIndex > -1) {
      //const newState = [...state.items]
      const item = state.items[existingItemIndex]
      const id = item.id
      const quantity = item.quantity + 1
  
      const action = {
        type: 'UPDATE_ITEM',
        payload: { id, quantity },
      }
  
      return updateItem(state, action)
    }
  
    return [...state.items]
  }
  
  // 類似於addItem，但固定quantity - 1
  const minusItemQuantityOnce = (state, action) => {
    // 尋找是否有已存在的索引值
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    )
  
    if (existingItemIndex > -1) {
      const item = state.items[existingItemIndex]
      const id = item.id
      const quantity = item.quantity > 1 ? item.quantity - 1 : 1
  
      const action = {
        type: 'UPDATE_ITEM',
        payload: { id, quantity },
      }
  
      return updateItem(state, action)
    }
  
    return [...state.items]
  }
  
  // 以下為最後計算三者itemTotal(每項目種小計), totalItems(整體項目), cartTotal(整體總計)
  const calculateItemTotals = (items) =>
    items.map((item) => ({
      ...item,
      itemTotal: item.price * item.quantity,
    }))
  
  

  const calProductsTotal = (items) => {
    if(items.product_id !== null){
      return items.filter((v, i) => {
        return v.product_id !== null
      }
      ).reduce((total, item) => (item.isChecked ? total + item.quantity * item.price :total), 0)
    }
  }

  const calCoursesTotal = (items) => {
    if(items.course_id !== null){
      return items.filter((v, i) => {
        return v.course_id !== null
      }
      ).reduce((total, item) =>  (item.isChecked ? total + item.quantity * item.price :total), 0, 0)
    }
  }

  const calProductsTotalItems = (items) => {
    if(items.product_id !== null){
      return items.filter((v, i) => {
        return v.product_id !== null
      }
      ).reduce((sum, item) =>  (item.isChecked ? sum + item.quantity : sum), 0)
    }
  }
  
  const calCoursesTotalItems = (items) => {
    if(items.course_id !== null){
      return items.filter((v, i) => {
        return v.course_id !== null
      }
      ).reduce((sum, item) => (item.isChecked ? sum + item.quantity : sum), 0)
    }
  }
  
  

  const calculateTotal = (items) =>
    items.reduce((total, item) => (item.isChecked ? total + item.quantity * item.price : total), 0)
  
  const calculateTotalItems = (items) =>
    items.reduce((sum, item) => (item.isChecked ? sum + item.quantity : sum), 0);
  
  // 最後將更新後的state，與initialState整理成新的state
  const generateCartState = (state, items) => {
    // isEmpty為布林值
  const isEmpty = items.length === 0

  
  
    return {
      ...initialState,
      ...state,
      items: calculateItemTotals(items),
      
      totalItems: calculateTotalItems(items),
      cartTotal: calculateTotal(items),
      productTotal: calProductsTotal(items),
      courseTotal: calCoursesTotal(items),
      productTotalItems: calProductsTotalItems(items),
      courseTotalItems: calCoursesTotalItems(items),
      isEmpty,
    }
  }
  
  // for useReducer init use
  export const init = (items) => {
    return generateCartState({}, items)
  }
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case 'INIT':
        return generateCartState(state, action.payload )
      case 'ADD_ITEM':
        return generateCartState(state, addItem(state, action))
      case 'REMOVE_ITEM':
        return generateCartState(state, removeItem(state, action))
      case 'UPDATE_ITEM':
        return generateCartState(state, updateItem(state, action))
      case 'PLUS_ONE':
        return generateCartState(state, plusItemQuantityOnce(state, action))
      case 'MINUS_ONE':
        return generateCartState(state, minusItemQuantityOnce(state, action))
      case 'SET_CHECKED':
        return generateCartState(state, setChecked(state, action))
      case 'CLEAR_CART':
        return initialState
      default:
        throw new Error('No action specified')
    }
  }
  