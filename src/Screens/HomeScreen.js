import React, { useEffect } from 'react'
import Contact from '../Components/Contact'
import Intro from '../Components/Intro'
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';


export default function HomeScreen() {
  const navigate = useNavigate();

  useEffect(() =>{
    const userInfo = localStorage.getItem("token");
    if(userInfo){
      const decoded = jwt(userInfo)
      const url = `http://localhost:8080/api/v1/auth/getUser/${decoded.sub}`
      const fetchData = async() =>{
        try{
          const response = await fetch(url);
          const json = await response.json();
          localStorage.setItem('role', JSON.stringify(json.role))
          navigate('/showDonation')
        }
        catch(error){
          console.log(error);
        }
        
      }
      fetchData();
    }
}, [navigate])
  return (
    <div>
        <Navbar/>
        <Intro/>
        <Contact/>      
    </div>
  )
}
