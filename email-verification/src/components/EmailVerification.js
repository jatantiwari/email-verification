import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const para = useParams()
  const apiUrl = `http://localhost:5000/api/users/verify/${para.id}`;

    axios.put(apiUrl)
  .then(response => {
    const data = response.data;
    console.log('Response:', data.message);
    alert(data.message);

  })
  .catch(error => {
    console.error('Error:', error.message);
  });
  return (
    <div>EmailVerification</div>
  )
}

export default EmailVerification