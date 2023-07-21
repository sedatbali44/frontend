import React from "react";

const Home = () => {
  // Retrieve user ID and name from local storage
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("username");

  return (
    <div>
      <h1>Welcome to the Home page, {userName}!</h1>
      <p>Your user ID: {userId}</p>
      {/* Add your home page content here */}
    </div>
  );
};

export default Home;
