import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();

    fetch('http://localhost:5000', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: name, password })
    })
    .then(res => {
      if (res.ok) return navigate('/dashboard');
      else alert('Login failed');
    });
  }

  return (
    <form onSubmit={submit}>
      <input onChange={e => setName(e.target.value)} placeholder="Username" />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button>Login</button>
    </form>
  );
}
