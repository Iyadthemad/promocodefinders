const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
function closeNav(){if(!nav||!toggle)return;nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}
if(toggle&&nav){document.documentElement.classList.add('js-nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});nav.addEventListener('click',e=>{if(e.target.closest('a'))closeNav();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeNav();toggle.focus();}});}
const toast=document.querySelector('.toast');let toastTimer;
function showToast(message){if(!toast)return;clearTimeout(toastTimer);toast.textContent=message;toast.classList.add('show');toastTimer=setTimeout(()=>toast.classList.remove('show'),5000);}
async function copyCode(code,button){
try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(code);showToast(code+' copied. Check eligibility on '+(button.dataset.retailer||'the retailer website')+'.');document.querySelector('.copy-fallback')?.remove();}
catch{document.querySelector('.copy-fallback')?.remove();const input=document.createElement('input');input.className='copy-fallback';input.value=code;input.readOnly=true;input.setAttribute('aria-label','Select and copy code '+code+' manually');const container=button.closest('.card-footer,.deal-strip-actions,.mini-code,td');if(container)container.append(input);else button.after(input);input.focus();input.select();showToast('Automatic copying is unavailable. Select and copy '+code+' manually.');}}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',()=>copyCode(button.dataset.copy,button)));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());


// Only mark an exact navigation destination as the current page.
document.querySelectorAll('.nav a').forEach(link=>{if(link.pathname===location.pathname)link.setAttribute('aria-current','page');});
