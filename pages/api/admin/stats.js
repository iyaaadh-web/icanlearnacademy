import { getUserFromReq } from '../../../lib/auth';
import db from '../../../lib/db';
export default function handler(req,res){
  const u = getUserFromReq(req);
  if(!u || u.role!=='admin') return res.status(401).json({ error:'unauthorized' });
  const students = db.prepare('SELECT id,name,email,enrolled_courses FROM students ORDER BY created_at DESC').all();
  const courses = db.prepare('SELECT id,title FROM courses ORDER BY created_at DESC').all();
  res.json({ students, courses });
}
