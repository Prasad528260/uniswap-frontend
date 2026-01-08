import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSellerCompletedOrders } from "../../utils/sellerCompleted";
import { addSellerPendingOrders } from "../../utils/sellerPendingSlice";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const SellerOrderCard = () => {
  const dispatch = useDispatch();
  const sellerPendingOrders = useSelector((state) => state.sellerPending);
  const sellerCompletedOrders = useSelector((state) => state.sellerCompleted);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { type } = useParams();

  // * DEPENDING ON TYPE RENDER THE DATA LIKE PENDING AND COMPLETED
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        if (type === "pending") {
          if (sellerPendingOrders && sellerPendingOrders.length > 0) return;
          try {
            const res = await axios.get(`${BASE_URL}/order/pending`, {
              withCredentials: true,
            });

            dispatch(addSellerPendingOrders(res.data));
          } catch (error) {
            console.log(error);
            toast.error(
              error?.response?.data?.message || "Failed to load orders"
            );
          }
        } else if (type === "completed") {
          if (sellerCompletedOrders && sellerCompletedOrders.length > 0) return;
          try {
            const res = await axios.get(`${BASE_URL}/order/completed`, {
              withCredentials: true,
            });

            dispatch(addSellerCompletedOrders(res.data));
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
  // console.log(sellerCompletedOrders);
  if (type === "pending") {
    return (
      <div className="space-y-6">
        {sellerPendingOrders?.length > 0 ? (
          sellerPendingOrders.map((order, index) => (
            <OrderCard key={order._id + index} order={order} />
          ))
        ) : (
          <div className="text-center text-2xl text-secondary py-8">
            No pending orders found
          </div>
        )}
      </div>
    );
  }
  if (type === "completed") {
    return (
      <div className="space-y-6">
        {sellerCompletedOrders?.length > 0 ? (
          sellerCompletedOrders.map((order, index) => (
            <OrderCard key={order._id + index} order={order} />
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

export default SellerOrderCard;
