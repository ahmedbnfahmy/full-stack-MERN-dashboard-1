import React, { useEffect } from "react";

import { Link } from "react-router-dom";

// import Chart from 'react-apexcharts'
import Chart from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import Badge from "../components/badge/Badge";

// import statusCards from "../assets/JsonData/status-card-data.json";
import {
  getOrderList,
  DailyOrders,
  top10Client,
  latestWeekIncome,
} from "./../redux/actions/Orders";
import { getUserList } from "./../redux/actions/user";
// import { GetProductsCategories } from "./../redux/actions/Product";
import moment from "moment";

const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Store Customers",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const topCustomers = {
  head: ["user", "total orders", "total spending"],
  body: [
    {
      username: "john doe",
      order: "490",
      price: "$15,870",
    },
    {
      username: "frank iva",
      order: "250",
      price: "$12,251",
    },
    {
      username: "anthony baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "frank iva",
      order: "110",
      price: "$9,251",
    },
    {
      username: "anthony baker",
      order: "80",
      price: "$8,840",
    },
  ],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  const { users } = useSelector((state) => state.users);
  const { orders } = useSelector((state) => state.orders);
  // const { dailyOrders } = useSelector((state) => state.orders);
  // const { TopCustomers } = useSelector((state) => state.orders);
  // const { WeekIncome } = useSelector((state) => state.orders);
  // const { productsCategories } = useSelector((state) => state.products);
  var totalIncom = 0;
  var totalIncomberweek = 0;
  var date = new Date();
  date.setDate(date.getDate() - 7);
  var today = moment(date).format("YYYY-MM-DD hh:mm:ss");

  // const today=moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
  // console.log(today,date2)
  var x = 0;
  // orders.map((val, i) => {
  //   // if(today<=val.createdAt){
  //   // console.log(val.createdAt,val._id,x++)}
  //   return val.orderItems.map((p, i) => {
  //     totalIncom += p.price;
  //     return totalIncom;
  //   });
  // });

  // orders.map((val, i) => {
  //   if (today <= val.createdAt) {
  //     return val.orderItems.map((p, i) => {
  //       totalIncomberweek += p.price;
  //       return totalIncomberweek;
  //     });
  //   }
  // });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList(1,null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderList(1,null));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(DailyOrders());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(GetProductsCategories());
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(top10Client());
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(latestWeekIncome());
  // }, [dispatch]);

  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  return (
    <div>
      <div className="row m-1">
        <div className="col-12 col-lg-6 col-md-12 col-sm-6 m-0 d-flex align-content-center">
          <div className="row m-0">
            <div className="row col-12 m-0">
              <div className="col-12 ">
                <div className="row">
                  <div className="col-12 ">
                    <div className="status-card">
                      <div className="status-card__icon">
                        <i class="bi bi-currency-dollar"></i>
                      </div>
                      <div className="status-card__info">
                        <h4 >{0}</h4>
                        <span>Total Income in latest week</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 ">
                <div className="row">
                  <div className="col-12">
                    <div className="status-card">
                      <div className="status-card__icon">
                        <i class="bi bi-currency-dollar"></i>
                      </div>
                      <div className="status-card__info">
                        <h4>{0}</h4>
                        <span>Total Income</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="col-12 ">
                <div className="row">
                  <div className="col-12">
                    <div className="status-card">
                      <div className="status-card__icon">
                        <i class="bi bi-card-checklist"></i>
                      </div>
                      <div className="status-card__info">
                        <h4 className="fs-3">{orders.length}</h4>
                        <span>Total Orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 ">
                <div className="row">
                  <div className="col-12">
                    <div className="status-card">
                      <div className="status-card__icon">
                        <i class="bi bi-person"></i>
                      </div>
                      <div className="status-card__info">
                        <h4 className="fs-3">{users.length}</h4>
                        <span>Total Users</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      

    </div>
  );
};

export default Dashboard;
