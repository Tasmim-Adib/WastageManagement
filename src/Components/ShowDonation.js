import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import DonorNavbar from './DonorNavbar';
import CollectorNavbar from './CollectorNavbar';

export default function ShowDonation() {
    const [isCollector, setCollector] = useState(false)
    const navigate = useNavigate();
    const [pageNo, setPageNo] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(0)


    const date = new Date();

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	let currentDate = `${day}-${month}-${year}`;

    const url = `http://localhost:8080/api/v1/auth/food/date/${currentDate}/${pageNo}/${pageSize}`
    const fetchData = async() =>{
        try{
            const response = await fetch(url);
            const json = await response.json();
            setData(json.content)
            setTotalPages(json.totalPages)
            console.log(pageNo)
        }
        catch(error){
            console.log(error);
        }
          
    }
    useEffect(() =>{
        const userInfo = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");
        
        if(!userInfo){
          navigate("/")
        }
        else{
          if(userRole.match("COLLECTOR")){
            setCollector(true)
          }
        }

        
        fetchData();
    }, [navigate])

    const handleForwardPagination = (event) =>{
        event.preventDefault();
        setPageNo(pageNo + 1)
        fetchData()
    }

    const handleBackwardPagination = (event) =>{
        event.preventDefault();
        setPageNo(pageNo - 1)
        fetchData()
    }
    const generatePdf = (event) =>{
      event.preventDefault();
    }

  return (
    <div>
        {isCollector?<CollectorNavbar/> : <DonorNavbar/>}
        
        {isCollector ? data && Object.keys(data).map((hist, index) => {
            return (
            <p key={index}>{data[hist].id} 

            {data[hist].name}
            {data[hist].address} 
            {data[hist].available}
                {data[hist].total}
                 <Button>Request</Button>
            </p>

            );
        }) : data && Object.keys(data).map((hist, index) => {
            return (
            <p key={index}>{data[hist].id} {data[hist].name} {data[hist].available}

            </p>

            );
        })}     


        <Button onClick={handleBackwardPagination} disabled={pageNo === 0}>Previous</Button>
        <Button onClick={handleForwardPagination} disabled={pageNo === totalPages}>Next</Button>
        
        <Button onClick={generatePdf}>Generate Pdf</Button>
    </div>
  )
}
