import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Footer.css'

export default function Footer() {
  return (
    <footer>
        <div className="footer-container">
                <div className="footer sec footer-aboutus">
                  <h4>About Us</h4>
                  <p>As a leading industry innovator, Oro Fresh Dental Care is oppening up new opportunities,
                        for dental patients.Contact us to find out what we have offer you.</p>
                      <div className="footer-sci">
                        <Link to="/"><img src="/images/facebook.png" alt='facebook-img'></img></Link>
                        <Link to="/about"><img src="/images/instagram.png" alt='instagram-img'></img></Link>
                        <Link to="/service"><img src="/images/twitter.png" alt='twitter-img'></img></Link>
                        <Link to="/contact"><img src="/images/linkedin.png" alt='linkedin-img'></img></Link>
                    </div>
                </div>

                <div className="footer-sec footer-quickLink">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link className="list-link" to="/">Home</Link></li>
                        <li> <Link className="list-link" to="/about">About</Link></li>
                        <li><Link className="list-link" to="/contact">Contact</Link></li>
                        <li><Link className="list-link" to='/donate'>Donate</Link></li>
                        <li><Link className="list-link" to='/showDonation'>Show Donation</Link></li>
                    </ul>
                </div>

            <div className="footer-sec footer-contact">
                <h4>Organized By</h4>
                <ul>
                   
                    <li><span>Department of Computer Science and Engineering</span></li>
                    <li><span>University of Dhaka</span></li>
                    <li><span>01568 759018</span></li>
                    <li><span>ahararthi@gmail.com</span></li>
                </ul>
            </div>
                
        </div>
    </footer>
  )
}
