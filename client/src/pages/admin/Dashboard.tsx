import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import axiosInstance from "../../lib/http/axios.config";

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [countProducts, setCountProducts] = useState(0)
  const [categories, setCategories] = useState([])
  const [countCategories, setCountCategories] = useState(0)
  const handleFetchProducts = async() => {
    try {
      const res = await axiosInstance.get("products/all-products", {
        withCredentials:true
      })
      setProducts(res.data.data)
      setCountProducts(res.data.data.length)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    handleFetchProducts()
  }, [])
  const handleFetchCategories = async() => {
    try {
      const res = await axiosInstance.get("category/get-data", {
        withCredentials:true
      });
      setCategories(res.data.data)
      setCountCategories(res.data.data.length)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    handleFetchCategories()
  }, [])
  return (
    <div>
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-gray-500">Total Products</h2>
        <p className="text-2xl font-bold">{countProducts}</p>
      </div>

      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-gray-500">Total Categories</h2>
        <p className="text-2xl font-bold">{countCategories}</p>
      </div>

        <div className="bg-white p-4 rounded shadow">
          Orders

        </div>
      </div>
      
    </div>
    
  );
};

export default Dashboard;