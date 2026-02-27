import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dash() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/dashboard', {
      credentials: 'include'
    })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => setUser(data))
    .catch(() => navigate('/'));
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Welcome {user.username}</h1>

      <button onClick={() => {
        fetch('http://localhost:5000/logout', {
          method: 'POST',
          credentials: 'include'
        }).then(() => navigate('/'));
      }}>
        Logout
      </button>
      <input type="file" accept="image/*" />
    </div>
  );
}
