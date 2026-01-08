import React, { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Success = ({order}) => {
  const navigate = useNavigate();
  useEffect(() => {
    completeOrder();
  }, []);
  const completeOrder = async () => {
    try {
      const res = await axios.put(`/order/complete/${order._id}`, {}, { withCredentials: true });
      console.log(res);
      toast.success("Order completed successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to complete order");
    }
  };
  return (
    <div className='flex justify-center items-center h-64'>
      <div className='text-2xl font-bold text-green-500'>Success</div>
      <button onClick={() => navigate("/view-orders/completed")}>Go to Completed Orders</button>
    </div>
  )
}

export default Success  