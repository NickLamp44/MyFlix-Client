import React, { useState } from "react";

export const RegisterView = () => {
  const urlAPI = "http://localhost:8080";
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the data the server needs
    const data = {
      firstName: firstname,
      lastName: lastname,
      userName: username,
      password: password,
      email: email,
      birthDate: birthday,
    };
    console.log(data);

    // Send a request to the server for authentication
    fetch(urlAPI + "/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="firstname"
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="lastname"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          required
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          minLength="3"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(event) => setBirthday(event.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
