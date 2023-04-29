
import './Orders.css';
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {  deleteOrderByAdmin, getOrderList } from '../../../redux/actions/Orders';



export default function Orders() {
    const orders  = useSelector((state) => state.orders.orders);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getOrderList())
      }, [dispatch]);
      console.log(orders);

      const handeldelete = (id) => {
        console.log(id);
        dispatch(deleteOrderByAdmin(id));
      };
    
    return (
        <>
            <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Orders Details</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">orderDate</th>
                      <th className="border-0">isPaid</th>
                      <th className="border-0">userId</th>
                      <th className="border-0">paymentMethode</th>
                      <th className="border-0">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item,index) => (
                      <tr key={item._id}>
                        <td>{index+1}</td>
                        <td>{item.createdAt}</td>
                        <td>{`${item.isPaid}`}</td>
                        {/* <td>{console.log(`${item.isPaid}`)}</td> */}
                        <td>{item.userId}</td>
                        <td>{item.paymentmethod}</td>
                        <td><i
              className="bi bi-trash-fill delicon   col-12 d-flex col-md-4 justify-content-center text-center align-content-center"
              onClick={() => handeldelete(item._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Delete"
            ></i></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
        </>
    );
}