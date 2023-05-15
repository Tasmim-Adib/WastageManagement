import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../CSS/Navbar.css';
import { useNavigate } from 'react-router-dom';
import Bars from './Bars';

export default function DonorNavbar() {

  const navigate = useNavigate();

  const handleLogout = (event) =>{
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role')
    navigate("/")
  }
  return (
    <nav>
        <input type="checkbox" id="check"></input>
        <label for="check" className='checkbtn'><Bars/></label>
        <label className='logo'>Ahararthi</label>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/showDonation'>Show Donation</Link></li>
            <li><Link to='/history'>History</Link></li>
            <li><Link to="/donation"><Button variant='outline-primary'>Donate</Button></Link></li>
            <li><Button onClick={handleLogout}>Logout</Button></li>
        </ul>
    </nav>
  )
}
