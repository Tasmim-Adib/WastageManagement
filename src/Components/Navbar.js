import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../CSS/Navbar.css';
import Bars from './Bars';

export default function Navbars() {
  return (
    <nav>
        <input type="checkbox" id="check"></input>
        <label for="check" className='checkbtn'><Bars/></label>
        <label className='logo'>Ahararthi</label>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to="/register"><Button variant='outline-primary'>Register</Button></Link></li>
            <li><Link to="/login"><Button>Login</Button></Link></li>
        </ul>
    </nav>
  );
}
