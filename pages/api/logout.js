import cookie from 'cookie';
export default function handler(req,res){
  res.setHeader('Set-Cookie', cookie.serialize(process.env.SESSION_COOKIE_NAME||'icanlearn_session', '', { httpOnly:true, path:'/', expires: new Date(0) }));
  res.json({ ok:true });
}
