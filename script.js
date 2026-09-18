const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
const filters=document.querySelectorAll(".filter"),cards=document.querySelectorAll(".project");
filters.forEach(btn=>btn.addEventListener("click",()=>{
  filters.forEach(b=>b.classList.remove("active")); btn.classList.add("active");
  const f=btn.dataset.filter;
  cards.forEach(c=>c.style.display=(f==="all"||c.dataset.cat===f)?"flex":"none");
}));
/* ===== INTERACTION & ANIMATION ENGINE ===== */
const progress=document.createElement("div"); progress.id="progress"; document.body.appendChild(progress);
const glow=document.createElement("div"); glow.id="cursor-glow"; document.body.appendChild(glow);

window.addEventListener("scroll",()=>{
  const h=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(h>0?(scrollY/h)*100:0)+"%";
},{passive:true});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll(".section-head,.about-grid,.skill-grid article,.project,.timeline-item,.edu-card>div,.contact").forEach((el,i)=>{
  el.classList.add("reveal"); el.style.transitionDelay=(Math.min(i%6,5)*70)+"ms"; revealObserver.observe(el);
});

document.addEventListener("pointermove",e=>{
  glow.style.left=e.clientX+"px"; glow.style.top=e.clientY+"px";
  const card=e.target.closest(".project");
  if(card){
    const r=card.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
    card.style.setProperty("--mx",x+"px"); card.style.setProperty("--my",y+"px");
  }
});

document.querySelectorAll(".project").forEach(card=>{
  card.addEventListener("pointermove",e=>{
    if(innerWidth<850)return;
    const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-5px)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});

document.querySelectorAll(".btn").forEach(btn=>{
  btn.addEventListener("pointermove",e=>{
    if(innerWidth<700)return;
    const r=btn.getBoundingClientRect();
    btn.style.transform=`translate(${((e.clientX-r.left)/r.width-.5)*7}px,${((e.clientY-r.top)/r.height-.5)*5}px)`;
  });
  btn.addEventListener("pointerleave",()=>btn.style.transform="");
});

// Stagger project entrance more naturally.
document.querySelectorAll(".projects .project").forEach((el,i)=>el.style.transitionDelay=(i%3*80)+"ms");
