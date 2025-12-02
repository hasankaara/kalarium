import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Giriş</h1>
      <input placeholder="Kullanıcı adı" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button onClick={handleLogin}>Giriş Yap</button>
      <p>{message}</p>
    </div>
  );
}
