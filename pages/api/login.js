import db from '../../lib/db';
import bcrypt from 'bcryptjs';
import { sign } from '../../lib/auth';
import cookie from 'cookie';
export default function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  const { email,password } = req.body;
  const user = db.prepare('SELECT * FROM students WHERE email = ?').get(email);
  if(!user) return res.status(400).json({ error:'Invalid' });
  const ok = bcrypt.compareSync(password, user.password);
  if(!ok) return res.status(400).json({ error:'Invalid' });
  const token = sign({ id: user.id, name: user.name, email: user.email, role: user.role || 'student' });
  res.setHeader('Set-Cookie', cookie.serialize(process.env.SESSION_COOKIE_NAME||'icanlearn_session', token, { httpOnly:true, path:'/', maxAge:60*60*24*7 }));
  res.json({ ok:true });
}
