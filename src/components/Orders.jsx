import axios from 'axios'
import React from 'react'
import Card from './OrderCard/Card'
import { useNavigate } from 'react-router'

const Orders = () => {
  const navigate = useNavigate();

  const handleRoute = (type) =>{
    // console.log(type);
    
    navigate(`/get-orders/${type}`)
  }

  return (
  
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <Card headText="Pending Orders" buttonText="View" color="#3B82F6" description = "View pending orders" onClick={()=>handleRoute('pending')}/>
      <Card headText="Completed Orders" buttonText="View" color="#10B981" description = "View your orders" onClick={()=>handleRoute('completed')}/>
     
    </div>
  
  )
}

export default Orders