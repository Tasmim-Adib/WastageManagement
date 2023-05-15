import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import '../CSS/Register.css';
import axios from 'axios';

export default function Register() {
    const [inputs, setInputs] = useState({});
    const [role, setRole] = useState("Donor")
    const [isDonor,setIsDonor] = useState(true)
    const [showCommunityData, setShowCommunityData] = useState(false)
    const navigate = useNavigate();
    const [communityData, setCommunityData] = useState([])

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	}
   
    const handleDonorClick = (event) =>{
        event.preventDefault();
        setIsDonor(true)
        setRole("Donor")
        setShowCommunityData(false)
    }

    const handleCollectorClick = (e) =>{
        setIsDonor(false);
        setRole("Collector")
        setShowCommunityData(false)
    }

	const handleSubmit = (event) => {
		event.preventDefault();
		const payload = {
            name : inputs.name,
            role : role,
            phone : inputs.phone,
            address : inputs.address,
            branComName : inputs.branComName,
            email : inputs.email,
            password : inputs.password
        };
        axios({
            url : 'http://localhost:8080/api/v1/auth/register',
            method : "POST",
            data : payload
        }).then((res) =>{
            if(res.data.token){
                localStorage.setItem('token', JSON.stringify(res.data.token))
                localStorage.setItem('role',JSON.stringify(role))
                navigate("/showDonation")
            }
            else{
                console.log(res.data.error)
            }
        }).catch((res) =>{
            console.log(res.data.error)
        })
        console.log(localStorage)
  	}

    const fetchCommunityData = (event) =>{
        event.preventDefault();
        const url = `http://localhost:8080/api/v1/auth/community/${inputs.communityCode}`
		const fetchData = async() =>{
			try{
				const response = await fetch(url);
				const json = await response.json();
                setCommunityData(json)
			}
			catch(error){
				console.log(error);
			}
				
		}
		fetchData();

        setShowCommunityData(true)
        
    }
  return (
    <div className='contact'>
        <h1 className='contact-h1'>Registration</h1>
        <hr className="dotted-hr"/>
        <div className='styleRole'>
            <h3>Choose Your Role : </h3>
            <div className='styleRoleButton'>
                <Button onClick={handleDonorClick}>Donor</Button>
                <Button onClick={handleCollectorClick}>Collector</Button>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
            {isDonor ? 
                    <div className='contact-form'>
                        <input type="text" placeholder='Name' name="name" value={inputs.name || ""} onChange={handleChange}/>
                        <input type="text" placeholder='Phone' name="phone" value={inputs.phone || ""} onChange={handleChange}/>
                        <input type="text" placeholder='Address' name="address" value={inputs.address || ""} onChange={handleChange}/>
                        <input type = "text" placeholder='Branch Name' name = "branComName" value ={inputs.branComName || ""} onChange={handleChange}/>
                        <input type="email" placeholder='Email' name="email" value={inputs.email || ""} onChange={handleChange}/>
                        <input type="password" placeholder='Password' name="password" value={inputs.password || ""} onChange={handleChange}/>
                        <Button type = 'submit'>Register</Button>
                    </div>
                
            : 
                <div>
                    <div className='contact-form'>
                        <input type = "text" placeholder='Community Code' name = "communityCode" value ={inputs.communityCode || ""} onChange={handleChange}/>
                        <Button onClick={fetchCommunityData}>Proceed</Button>
                    </div>
                    
                    {showCommunityData ?
                        <div className='contact-form'>
                            <li>Community Name : {communityData.name}</li>
                            <li>Community Address : {communityData.address}</li>
                            <li>Number of members : {communityData.members}</li>
                            <input type="text" placeholder='Name' name="name" value={inputs.name || ""} onChange={handleChange}/>
                            <input type="text" placeholder='Phone' name="phone" value={inputs.phone || ""} onChange={handleChange}/>
                            <input type="text" placeholder='Address' name="address" value={inputs.address || ""} onChange={handleChange}/>
                            <input type = "text" placeholder='Community Code' name = "branComName" value ={inputs.branComName || ""} onChange={handleChange}/>
                            <input type="email" placeholder='Email' name="email" value={inputs.email || ""} onChange={handleChange}/>
                            <input type="password" placeholder='Password' name="password" value={inputs.password || ""} onChange={handleChange}/>
                            <Button type = 'submit'>Register</Button>
                        </div>:<div></div>
                    }
                </div>
            }
            
        </form>
    </div>
  )
}
