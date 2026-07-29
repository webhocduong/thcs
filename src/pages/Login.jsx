import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login(){
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const displayName = name.trim() || email.split('@')[0].trim();
    if (!displayName) return;

    login({ name: displayName });
    setPassword('');
    navigate('/profile');
  }

  return <><section className="page-head"><span className="eyebrow">Tài khoản</span><h1>Đăng nhập</h1><p>Giai đoạn 1 chỉ chuyển sang trạng thái đăng nhập giả lập, chưa kết nối xác thực thật.</p></section><form className="postContainer" onSubmit={handleSubmit} autoComplete="off"><input type="text" name="mock-display-name" placeholder="Tên hiển thị" value={name} onChange={(event)=>setName(event.target.value)} autoComplete="off"/><input type="email" name="mock-login-email" placeholder="Email" value={email} onChange={(event)=>setEmail(event.target.value)} autoComplete="off"/><input type="password" name="mock-login-password" placeholder="Mật khẩu" value={password} onChange={(event)=>setPassword(event.target.value)} autoComplete="new-password"/><button type="submit" disabled={!name.trim() && !email.trim()}>Đăng nhập</button></form></>;
}
