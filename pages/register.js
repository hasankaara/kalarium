import { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Siteye Kayıt</h1>
      <input placeholder="Kullanıcı adı" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button onClick={handleRegister}>Kayıt Ol</button>
      <p>{message}</p>
    </div>
  );
}
