import React from 'react'
import axios from 'axios'

const Regitration = () => {
  async function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if(email.length===0||name.length===0||password.length===0){
      alert("Fields must not be empty")
      return
    }
  
    // Create an object to store the form data
    const userData = {
      name,
      email,
      password,
    };
    const apiUrl = 'http://localhost:5000/api/users/register';

    axios.post(apiUrl, userData)
  .then(response => {
    const data = response.data;
    console.log('Response:', data.message);
    alert(data.message);

  })
  .catch(error => {
    console.error('Error:', error.message);
  });
  }
  return (
    <>
      <body class="bg-gray-100 min-h-screen flex items-center justify-center">

        <div class="max-w-md w-full bg-white p-8 rounded shadow-md">
          <h2 class="text-2xl font-semibold mb-6">Registration Page</h2>
            <div>
              <label for="name" class="block text-sm font-medium text-gray-600">Name:</label>
              <input type="text" id="name" class="mt-1 p-2 w-full border rounded-md"/>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-600">Email:</label>
              <input type="email" id="email" class="mt-1 p-2 w-full border rounded-md"/>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-600">Password:</label>
              <input type="password" id="password" class="mt-1 p-2 w-full border rounded-md"/>
            </div>
            <button onClick = {()=>registerUser()} type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Register</button>
          <p id="errorMessage" class="text-red-500 mt-4"></p>
        </div>
      </body>
    </>
  )
}

export default Regitration