import { useEffect, useState } from 'react';
import Router from 'next/router';
export default function Dashboard(){
  const [me,setMe]=useState(null);
  useEffect(()=>{ fetch('/api/me').then(r=>r.json()).then(d=>{ if(d?.error){Router.push('/login')} else setMe(d) }) },[]);
  if(!me) return <div className="container" style={{paddingTop:40}}>Loading...</div>;
  return (
    <div className="container" style={{paddingTop:40}}>
      <div className="card">
        <h2>Welcome, {me.name}</h2>
        <p>Email: {me.email}</p>
        <p>Role: {me.role}</p>
        <div style={{marginTop:12}}>
          <a className="btn" href="#" onClick={async e=>{e.preventDefault(); await fetch('/api/logout'); Router.push('/');}}>Logout</a>
        </div>
      </div>
    </div>
  )
}
