import React,{useState} from 'react'
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	}

    const handleSubmit = (event) =>{
        event.preventDefault();
        const payload = {
            email : inputs.email,
            password : inputs.password 
        };
        axios({
            url : 'http://localhost:8080/api/v1/auth/authenticate',
            method : "POST",
            data : payload
        }).then((res) =>{
            if(res.data.token){
                localStorage.setItem('token', JSON.stringify(res.data.token))
                const decoded = jwt(JSON.stringify(res.data.token))
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
            else{
                console.log(res.data.error)
            }
        }).catch((res) =>{
            console.log(res.data.error)
        })
    }

    return (
        <div className='contact'>
            <h1 className='contact-h1'>Login</h1>
            <hr className="dotted-hr"/>
            <form onSubmit={handleSubmit}>
                <div className='contact-form'>                    
                    <input type="email" placeholder='Email' name="email" value={inputs.email || ""} onChange={handleChange}/>
                    <input type="password" placeholder='Password' name="password" value={inputs.password || ""} onChange={handleChange}/>
                    <Button type = 'submit'>Login</Button>
                </div>
            </form>
        </div>
    )
}
