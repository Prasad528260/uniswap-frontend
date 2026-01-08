import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { addPendingOrder } from "../../utils/pendingOrderSlice";
import { addCompletedOrder } from "../../utils/completedOrderSlice";

const OrderPage = () => {
  const dispatch = useDispatch();
  const pendingOrders = useSelector((state) => state.pendingOrder);
  const completedOrders = useSelector((state) => state.completedOrder);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const type = useParams().type;

  // * DEPENDING ON TYPE RENDER THE DATA LIKE PENDING AND COMPLETED
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        if (type === "pending") {
          if (pendingOrders?.length > 0) return;
          try {
            const res = await axios.get(`${BASE_URL}/order/reciever/pending`, {
              withCredentials: true,
            });
            // console.log(res);

            dispatch(addPendingOrder(res.data));
          } catch (error) {
            console.log(error);
            toast.error(
              error?.response?.data?.message || "Failed to load orders"
            );
          }
        } else if (type === "completed") {
          if (completedOrders?.length > 0) return;

          try {
            const res = await axios.get(
              `${BASE_URL}/order/reciever/completed`,
              {
                withCredentials: true,
              }
            );
            // console.log(res);
            dispatch(addCompletedOrder(res.data));
          } catch (error) {
            console.log(error);
            toast.error(
              error?.response?.data?.message || "Failed to load orders"
            );
          }
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [type]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4 text-2xl">{error}</div>;
  }
  if (completedOrders?.length === 0 && pendingOrders?.length === 0) {
    return (
      <div className="text-center text-2xl text-secondary py-8">
        No orders found
      </div>
    );
  }

  if (type === "pending") {
    return (
      <div className="space-y-6">
        {pendingOrders?.length > 0 ? (
          pendingOrders.map((order, index) => (
            <OrderCard
              key={order._id ?? `${order.createdAt}-${index}`}
              order={order}
            />
          ))
        ) : (
          <div className="text-center text-2xl text-secondary py-8">
            No pending orders found
          </div>
        )}
      </div>
    );
  }
  // console.log(completedOrders);
  if (type === "completed") {
    return (
      <div className="space-y-6">
        {completedOrders?.length > 0 ? (
          completedOrders.map((order, index) => (
            <OrderCard
              key={order._id ?? `${order.createdAt}-${index}`}
              order={order}
            />
          ))
        ) : (
          <div className="text-center text-2xl text-secondary py-8">
            No completed orders found
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default OrderPage;
