import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useState } from "react";
import HistoryCard from "./HistoryCard";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const History = () => {
  const [history, setHistory] = useState([]);
  const getHistory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/order/history`, {
        withCredentials: true,
      });
      // console.log(res.data);
      setHistory(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to load history");
    }
  };
  useEffect(() => {
    getHistory();
  }, []);
  // console.log(history);
  if (!history || history.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <div className="text-lg font-medium mb-2">No History Available</div>
        <div className="text-sm">You haven't completed any Exchange yet.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          Transaction Details
        </h3>
     
      </div>
      {history?.map((item, index) => (
        <HistoryCard key={index} data={item} />
      ))}
    </div>
  );
};

export default History;
