import React, { useEffect } from "react";
import RequestCard from "./RequestCard";
import { useSelector,useDispatch } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { toast } from "react-hot-toast";
const Requests = () => {

  const dispatch = useDispatch();
  const requests = useSelector((state) => state.request);
  const [error, setError] = useState(null);
  const getRequests = async () => {
    try {
       if(requests || requests.length >= 0) return;
      const res = await axios.get(`${BASE_URL}/request/view`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data));
      toast.success("Requests loaded successfully");
      setError(null);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Failed to load requests. Please try again later.");
      toast.error(err?.response?.data?.message || "Failed to load requests. Please try again later.");
    }
  };


  useEffect(() => {
   
        getRequests();
  
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <div className="text-secondary text-3xl">No requests found</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 space-y-6">
      {requests.map((request) => (
        <RequestCard key={request._id} request={request} />
      ))}
    </div>
  );
};

export default Requests;
