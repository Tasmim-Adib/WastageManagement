import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import '../CSS/Donation.css';
import axios from 'axios';
import jwt from 'jwt-decode'
import DonorNavbar from './DonorNavbar';

export default function Donation() {

    const [inputs, setInputs] = useState({});
	const navigate = useNavigate();
	const [branComName, setBranComName] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() =>{
        const userInfo = JSON.parse(localStorage.getItem('token'))
		
        if(!userInfo){
          navigate("/login")
        }else{			
			const decoded = jwt(userInfo);
			const url = `http://localhost:8080/api/v1/auth/getUser/${decoded.sub}`
			const fetchData = async() =>{
				try{
					const response = await fetch(url);
					const json = await response.json();
					setBranComName(json.branComName);
					setAddress(json.address)
				}
				catch(error){
					console.log(error);
				}
				
			}
			fetchData();
		}
    }, [navigate])

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
		
	}

	const handleSubmit = (event) => {
		event.preventDefault();	
		const date = new Date();

		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();

		let currentDate = `${day}-${month}-${year}`; 

		const payload = {
			name : branComName,
			address : address,
			type : inputs.foodType,
			available : inputs.availableTime,
			total : inputs.portion,
			date : currentDate
		};
		
		axios({
            url : 'http://localhost:8080/api/v1/auth/food/add',
            method : "POST",
            data : payload,
        }).then((res) =>{
            //alert(res.data.msg);
            console.log(res.data);
        }).catch((err) =>{
            //alert(res.data.msg);
            console.log(err)
        })
  	}
  return (
	<div>
		<DonorNavbar/>
		<div className='contact'>
			<h1 className='contact-h1'>Donation</h1>
			<hr className="dotted-hr"/>
			<form onSubmit={handleSubmit}>
				<div className='contact-form'>
					<input type="text" placeholder='Type of Food' name="foodType" value={inputs.foodType || ""} onChange={handleChange}/>
					<input type="number" placeholder='Portion' name="portion" value={inputs.portion || ""} onChange={handleChange}/>
					<input type="time" placeholder='Available at' name="availableTime" value={inputs.availableTime || ""} onChange={handleChange}/>
					<Button type = 'submit'>Save</Button>
				</div>
			</form>
		</div>
	</div>
    
  )
}
