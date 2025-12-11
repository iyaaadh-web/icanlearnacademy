import { getUserFromReq } from '../../lib/auth';
import db from '../../lib/db';
export default function handler(req,res){
  const u = getUserFromReq(req);
  if(!u) return res.status(401).json({ error:'not authenticated' });
  // fetch fresh data
  const user = db.prepare('SELECT id,name,email,role,enrolled_courses FROM students WHERE id = ?').get(u.id);
  if(!user) return res.status(404).json({ error:'not found' });
  res.json(user);
}
