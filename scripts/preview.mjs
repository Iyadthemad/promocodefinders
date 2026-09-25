import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {repository} from './validate.mjs';
const root=path.join(repository,'dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.xml':'application/xml','.txt':'text/plain','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
  let file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory()){
    if(!pathname.endsWith('/')){res.writeHead(301,{Location:pathname+'/'}).end();return;}
    file=path.join(file,'index.html');
  }
  const exists=fs.existsSync(file)&&fs.statSync(file).isFile();
  if(!exists)file=path.join(root,'404.html');
  res.writeHead(exists?200:404,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);
}).listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173'));
