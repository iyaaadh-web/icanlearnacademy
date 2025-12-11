import { useState } from 'react';
import Router from 'next/router';
export default function Login(){
  const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [msg,setMsg]=useState('');
  async function submit(e){e.preventDefault();
    const res = await fetch('/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,password})});
    const data = await res.json();
    if(res.ok){Router.push('/dashboard')} else setMsg(data.error || 'Invalid');
  }
  return (
    <div className="container" style={{paddingTop:40}}>
      <div style={{maxWidth:480,margin:'0 auto'}} className="card">
        <h2>Student Login</h2>
        <form className="form" onSubmit={submit}>
          <label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          <label>Password</label><input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
          <div style={{marginTop:12}}><button className="btn" type="submit">Login</button></div>
          {msg && <p style={{color:'red'}}>{msg}</p>}
        </form>
      </div>
    </div>
  )
}
