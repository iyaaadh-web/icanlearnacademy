const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const SECRET = process.env.JWT_SECRET || 'secret123';
const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'icanlearn_session';

function sign(payload){
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

function verify(token){
  try{
    return jwt.verify(token, SECRET);
  }catch(e){
    return null;
  }
}

function getUserFromReq(req){
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies[COOKIE_NAME];
  if(!token) return null;
  return verify(token);
}

function createSetCookie(token){
  return cookie.serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7*24*60*60,
    sameSite: 'lax',
    path: '/'
  });
}

module.exports = { sign, verify, getUserFromReq, createSetCookie };
