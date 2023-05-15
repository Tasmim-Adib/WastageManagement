import React,{useState} from 'react'
import Button from 'react-bootstrap/esm/Button';

export default function CommunityRegister() {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	}

    const handleSubmit = (event) =>{
        event.preventDefault();
        
    }
    return (
        <div className='contact'>
            <h1 className='contact-h1'>Community Registration</h1>
            <hr className="dotted-hr"/>
            <form onSubmit={handleSubmit}>
                <div className='contact-form'>                    
                    <input type="text" placeholder='Community Name' name="name" value={inputs.name || ""} onChange={handleChange}/>
                    <input type="text" placeholder='Phone' name="phone" value={inputs.phone || ""} onChange={handleChange}/>
                    <input type="text" placeholder='Address' name="address" value={inputs.address || ""} onChange={handleChange}/>
                    <Button type = 'submit'>Register</Button>
                </div>
            </form>
        </div>
    )
}
