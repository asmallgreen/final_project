import React, {
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";

const OrderContext = createContext(null);
export const OrderProvider = ({ children }) => {
  const [orderInfo, setOrderInfo] = useState({
    payment: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    productTotal:0,
    courseTotal:0,
    coupon_id:"",
    discount:0,
  });

  // useEffect(() => {
  //   setOrderInfo(orderInfo);
  // }, [orderInfo]);
  return (
    <OrderContext.Provider value={{ orderInfo, setOrderInfo }}>
      {children}
    </OrderContext.Provider>
  );
};
export const useOrder = () => useContext(OrderContext);
