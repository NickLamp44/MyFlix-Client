import React from "react";

export const ProfileView = ({ user }) => (
  <div>
    <h2>User Profile</h2>
    <p>Username: {user.Username}</p>
    <p>Email: {user.Email}</p>
    <p>Birthday: {user.Birthday}</p>
  </div>
);
