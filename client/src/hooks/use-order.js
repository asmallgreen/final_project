import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  use,
} from "react";
import { useRouter } from "next/router";
import axios from "axios";

const OrderContext = createContext(null);
export const OrderProvider = ({ children }) => {
  const [orderInfo, setOrderInfo] = useState({
    payment: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
  });

  useEffect(() => {
    setOrderInfo(orderInfo);
  }, [orderInfo]);
  return (
    <OrderContext.Provider value={{ orderInfo, setOrderInfo }}>
      {children}
    </OrderContext.Provider>
  );
};
export const useOrder = () => useContext(OrderContext);
