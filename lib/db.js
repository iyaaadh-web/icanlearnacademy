const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_PATH = path.join(process.cwd(), 'data.sqlite');
const MIGRATION = path.join(process.cwd(), 'migrations', 'init.sql');

function ensure(){
  if(!fs.existsSync(DB_PATH)){
    const db = new Database(DB_PATH);
    const sql = fs.readFileSync(MIGRATION,'utf8');
    db.exec(sql);
    db.close();
  }
}

ensure();
const db = new Database(DB_PATH);
module.exports = db;
