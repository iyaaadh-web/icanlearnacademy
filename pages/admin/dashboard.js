import { useEffect, useState } from 'react';
import Router from 'next/router';
export default function AdminDashboard(){
  const [data,setData]=useState(null);
  useEffect(()=>{ fetch('/api/admin/stats').then(r=>r.json()).then(d=>{ if(d?.error) Router.push('/admin'); else setData(d) }) },[]);
  if(!data) return <div className="container" style={{paddingTop:40}}>Loading...</div>;
  return (
    <div className="container" style={{paddingTop:40}}>
      <div className="card">
        <h2>Admin Dashboard</h2>
        <p>Students: {data.students.length}</p>
        <p>Courses: {data.courses.length}</p>
        <h3>Students</h3>
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Enrolled</th></tr></thead>
          <tbody>{data.students.map(s=>(
            <tr key={s.id}><td>{s.name}</td><td>{s.email}</td><td>{JSON.parse(s.enrolled_courses||'[]').length}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
