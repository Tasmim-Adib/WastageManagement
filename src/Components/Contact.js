import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import '../CSS/Contact.css'

export default function Contact() {
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs)

  	}

  return (
    <div className='contact'>
        <h1 className='contact-h1'>Contact</h1>
        <hr className="dotted-hr"/>
        <form onSubmit={handleSubmit}>
			<div className='contact-form'>
				<input type="email" placeholder='Your email' name="email" value={inputs.email || ""} onChange={handleChange}/>
				<input type="text" placeholder='Subject' name="subject" value={inputs.subject || ""} onChange={handleChange}/>
				<textarea type='text' placeholder='Write your message' name = "msgbody" value={inputs.msgbody || ""} onChange={handleChange}/>
				<Button type = 'submit'>Send Message</Button>
			</div>
			
    	</form>
    </div>
  )
}
