import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomeScreen from "./Screens/HomeScreen";
import Donation from "./Components/Donation";
import Footer from './Components/Footer'
import CommunityRegister from "./Components/CommunityRegister";
import ContactScreen from "./Screens/ContactScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen";
import ShowDonation from "./Components/ShowDonation";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomeScreen/>} exact/>
          <Route path="/register" element={<RegisterScreen/>}/>
          <Route path = "/donation" element={<Donation/>}/>
          <Route path="/contact" element={<ContactScreen/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/showDonation" element={<ShowDonation/>}/>
          <Route path="/communityRegistration" element={<CommunityRegister/>}/>
          
        </Routes>
        <Footer/>
    </Router>
    
  );
}

export default App;
