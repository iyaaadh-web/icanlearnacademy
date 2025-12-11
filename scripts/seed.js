const db = require('../lib/db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

function seed(){
  // Admin
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@icanlearn.test';
  const adminPass = process.env.ADMIN_PASSWORD || 'adminpass123';
  const row = db.prepare('SELECT * FROM admins WHERE email = ?').get(adminEmail);
  if(!row){
    const hashed = bcrypt.hashSync(adminPass, 10);
    db.prepare('INSERT INTO admins (id,email,password,created_at) VALUES (?,?,?,?)')
      .run(uuidv4(), adminEmail, hashed, Date.now());
    console.log('Seeded admin:', adminEmail, adminPass);
  }

  // Courses
  const count = db.prepare('SELECT COUNT(*) as c FROM courses').get().c;
  if(!count){
    const insert = db.prepare('INSERT INTO courses (id,title,description,created_at) VALUES (?,?,?,?)');
    insert.run(uuidv4(), 'Mathematics (O-Level)', 'Comprehensive O-Level maths course', Date.now());
    insert.run(uuidv4(), 'Physics (O-Level)', 'Theory + practical past papers', Date.now());
    insert.run(uuidv4(), 'English (O-Level)', 'Writing, comprehension & grammar', Date.now());
    console.log('Seeded courses');
  }
}

seed();
console.log('Seeding complete');
