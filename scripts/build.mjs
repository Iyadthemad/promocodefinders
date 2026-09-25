import fs from 'node:fs';
import path from 'node:path';
import {repository,source,validate,walk} from './validate.mjs';
import {generateProducts} from './generate-products.mjs';
generateProducts();
validate();
const output=path.join(repository,'dist');
// The destination is fixed under the repository; never accept a deletion target from input.
if(path.dirname(output)!==repository||path.basename(output)!=='dist')throw new Error('Unsafe output directory');
fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(output,{recursive:true});
for(const file of walk(source)) {
  const relative=path.relative(source,file);
  if(relative.endsWith('.md'))continue;
  const destination=path.join(output,relative);fs.mkdirSync(path.dirname(destination),{recursive:true});fs.copyFileSync(file,destination);
}
validate(output);
console.log('Static production build written to dist/');
