import { axiosInstance } from "../../netWork/netWork";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config = {
  headers: {
    "content-type":
      "multipart/form-data; boundary=--------------------------037384031508980924639346",
  },
};



export var total;
export const getOrderList = (pag, x) => async (dispatch) => {
  try {
    const response = await axiosInstance
      .post(`/order/filter?page=${pag}`,x);
    total = response.data.pages;
    dispatch({
      type: 'GET_Orders_LIST',
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};


// delete order
export const deleteOrderByAdmin = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.delete(`/order/${id}`);
    const response = await axiosInstance.post(`/order/filter?page=1`);
    dispatch({
      type: "DELETE_ORDER_BY_ADMIN",
      payload: response.data,
    });
    console.log(res);
    toast.success(`Item deleted successfully`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (err) {
    console.log(id);
    console.log(err);
    toast.error(`${err.message} error from delete `, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

// delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.put(`/order/cancel/${id}`);
    // const res = await axiosInstance.post(`/order/filter?page=1`);
    dispatch({
      type: "DELETE_ORDER",
      payload: res.data,
    });
    console.log(res);
    toast.success(`Item deleted successfully`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (err) {
    console.log(id);
    console.log(err);
    toast.error(`${err.message} error from delete `, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};



// post order

export const AddNewOrder = (order) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/createOrder", order, config);
    dispatch({
      type: "ADD_ORDER",
      payload: response.data,
    });
    toast.success(`Order was added successfully`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (err) {
    toast.error(`${err.message} `, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

// get order by id 
export const GetSingleOrder = (id) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/products/details/${id}`);
    dispatch({
      type: "GET_SINGLE_ORDER",
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};



