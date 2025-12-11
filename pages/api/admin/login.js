import db from '../../../lib/db';
import bcrypt from 'bcryptjs';
import { sign } from '../../../lib/auth';
import cookie from 'cookie';
export default function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  const { email,password } = req.body;
  const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email);
  if(!admin) return res.status(400).json({ error:'Invalid' });
  const ok = bcrypt.compareSync(password, admin.password);
  if(!ok) return res.status(400).json({ error:'Invalid' });
  const token = sign({ id: admin.id, email: admin.email, role: 'admin' });
  res.setHeader('Set-Cookie', cookie.serialize(process.env.SESSION_COOKIE_NAME||'icanlearn_session', token, { httpOnly:true, path:'/', maxAge:60*60*24*7 }));
  res.json({ ok:true });
}
