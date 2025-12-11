import { useState } from 'react';
import Router from 'next/router';

export default function Register(){
  const [name,setName]=useState('');const [email,setEmail]=useState('');const [password,setPassword]=useState('');
  const [msg,setMsg]=useState('');
  async function submit(e){e.preventDefault();
    const res = await fetch('/api/register',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name,email,password})});
    const data = await res.json();
    if(res.ok){Router.push('/login')} else setMsg(data.error || 'Error');
  }
  return (
    <div className="container" style={{paddingTop:40}}>
      <div style={{maxWidth:600,margin:'0 auto'}} className="card">
        <h2>Create Student Account</h2>
        <form className="form" onSubmit={submit}>
          <label>Name</label><input value={name} onChange={e=>setName(e.target.value)} required />
          <label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          <label>Password</label><input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
          <div style={{marginTop:12}}><button className="btn" type="submit">Sign Up</button></div>
          {msg && <p style={{color:'red'}}>{msg}</p>}
        </form>
      </div>
    </div>
  )
}
