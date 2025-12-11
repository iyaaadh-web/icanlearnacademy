import db from '../../lib/db';
export default function handler(req,res){
  if(req.method==='GET'){
    const courses = db.prepare('SELECT * FROM courses ORDER BY created_at DESC').all();
    return res.json(courses);
  }
  if(req.method==='POST'){
    const { title, description, teacher_id } = req.body;
    const id = require('uuid').v4();
    db.prepare('INSERT INTO courses (id,title,description,teacher_id,created_at) VALUES (?,?,?,?,?)')
      .run(id,title,description,teacher_id,Date.now());
    return res.json({ ok:true });
  }
  res.status(405).end();
}
