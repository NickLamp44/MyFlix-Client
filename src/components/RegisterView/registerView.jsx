import React, { useState } from "react";

export const RegisterView = () => {
  const urlAPI = "http://localhost:8080";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Match field names expected by the backend
    const data = {
      username,
      password,
      Email: email,
      Birthday: birthday,
    };

    try {
      const response = await fetch(urlAPI + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
