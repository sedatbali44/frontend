import React from 'react'

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("username");

  return (
    <div>
      <h1>Welcome to the Home page, {userName}!</h1>
      <p>Your user ID: {userId}</p>
      <p>Your user userName: {userName}</p>
      {/* Add your home page content here */}
    </div>
  )
}
