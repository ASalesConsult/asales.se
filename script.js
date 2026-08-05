const b=document.getElementById('langBtn');
let sv=true;
b.onclick=()=>{
sv=!sv;
document.getElementById('title').textContent=sv?'Skapar tillväxt genom försäljning, relationer och resultat.':'Creating growth through sales, relationships and results.';
document.getElementById('subtitle').textContent=sv?'Specialister inom Sales, Key Account Management och Business Development.':'Experts in Sales, Key Account Management and Business Development.';
b.textContent=sv?'English':'Svenska';
};