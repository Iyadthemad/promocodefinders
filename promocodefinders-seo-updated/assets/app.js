const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
function closeNav(){if(!nav||!toggle)return;nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});nav.addEventListener('click',e=>{if(e.target.closest('a'))closeNav();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeNav();toggle.focus();}});}
const toast=document.querySelector('.toast');let toastTimer;
function showToast(message){if(!toast)return;clearTimeout(toastTimer);toast.textContent=message;toast.classList.add('show');toastTimer=setTimeout(()=>toast.classList.remove('show'),5000);}
async function copyCode(code,button){
try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(code);showToast(code+' copied. Check eligibility on Temu.');document.querySelector('.copy-fallback')?.remove();}
catch{document.querySelector('.copy-fallback')?.remove();const input=document.createElement('input');input.className='copy-fallback';input.value=code;input.readOnly=true;input.setAttribute('aria-label','Select and copy code '+code+' manually');const container=button.closest('.card-footer,.deal-strip-actions,.mini-code,td');if(container)container.append(input);else button.after(input);input.focus();input.select();showToast('Automatic copying is unavailable. Select and copy '+code+' manually.');}}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',()=>copyCode(button.dataset.copy,button)));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

function formatDate(value){
  if(!value)return 'Not recorded';
  const d=new Date(value+'T12:00:00Z');
  if(Number.isNaN(d.getTime()))return value;
  return new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(d);
}
async function loadCouponTracker(){
  const targets=document.querySelectorAll('[data-coupon-code],[data-tracker-last-checked]');
  if(!targets.length)return;
  try{
    const response=await fetch('/data/coupons.json',{cache:'no-store'});
    if(!response.ok)throw new Error('Unable to load coupon verification data');
    const data=await response.json();
    const byCode=new Map((data.coupons||[]).map(item=>[item.code,item]));
    document.querySelectorAll('[data-coupon-code]').forEach(row=>{
      const item=byCode.get(row.dataset.couponCode);
      if(!item)return;
      row.querySelectorAll('[data-field]').forEach(el=>{
        const field=el.dataset.field;
        if(field==='last_checked')el.textContent=formatDate(item[field]);
        else if(field==='status')el.textContent=item[field]==='checked-by-publisher'?'Checked by publisher':item[field];
        else el.textContent=item[field]||'—';
      });
      const time=row.querySelector('time[data-field="last_checked"]');
      if(time)time.setAttribute('datetime',item.last_checked||'');
    });
    const dates=(data.coupons||[]).map(item=>item.last_checked).filter(Boolean).sort();
    const latest=dates.at(-1);
    document.querySelectorAll('[data-tracker-last-checked]').forEach(el=>{
      el.textContent=formatDate(latest);
      if(el.tagName==='TIME')el.setAttribute('datetime',latest||'');
    });
  }catch(error){
    console.warn(error);
  }
}
loadCouponTracker();
