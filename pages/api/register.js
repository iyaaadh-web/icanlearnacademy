import db from '../../lib/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { sign } from '../../lib/auth';
import { notifySignup } from '../../lib/mailer';
export default function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end();
  const { name,email,password } = req.body;
  if(!name || !email || !password) return res.status(400).json({ error:'Missing' });
  const exists = db.prepare('SELECT id FROM students WHERE email = ?').get(email);
  if(exists) return res.status(400).json({ error:'Email exists' });
  const hashed = bcrypt.hashSync(password, 10);
  const id = uuidv4();
  db.prepare('INSERT INTO students (id,name,email,password,role,created_at,enrolled_courses) VALUES (?,?,?,?,?,?,?)')
    .run(id,name,email,hashed,'student',Date.now(),'[]');
  // notify sales and welcome
  try{ notifySignup({name,email}); }catch(e){}
  // sign token and set cookie
  const token = sign({ id, name, email, role: 'student' });
  res.setHeader('Set-Cookie', require('cookie').serialize(process.env.SESSION_COOKIE_NAME||'icanlearn_session', token, { httpOnly:true, path:'/', maxAge:60*60*24*7 }));
  return res.json({ ok:true });
}
