import Link from 'next/link';
import db from '../lib/db';
export async function getServerSideProps(){
  const courses = db.prepare('SELECT id,title,description FROM courses ORDER BY created_at DESC').all();
  return { props: { courses } };
}
export default function Home({ courses }){
  return (
    <>
      <header><div className="container nav"><div className="logo">I Can Learn Academy</div>
      <div className="navlinks"><Link href='/login'>Login</Link> <Link href='/register'>Register</Link> <Link href='/admin'>Admin</Link></div></div></header>
      <main className="container">
        <section style={{padding:'40px 0',textAlign:'center'}}><h1>Master O-Levels with Confidence</h1><p>Live classes • Personalized LMS • Top Tutors</p><Link className='btn' href="/dashboard">Student Portal</Link></section>
        <section><h2>Courses</h2><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:16}}>
          {courses.map(c=>(
            <div key={c.id} className="card"><h3>{c.title}</h3><p>{c.description}</p></div>
          ))}
        </div></section>
      </main>
      <footer className="footer">© 2025 I Can Learn Academy</footer>
    </>
  )
}
