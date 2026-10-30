
const categoryImages={
  "Movies & Dramatics":"https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1000&q=85",
  "Creative Arts":"https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85",
  "Music":"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85",
  "Dance":"https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1000&q=85",
  "Gaming":"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=85",
  "Quiz":"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
  "Self Defence":"https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1000&q=85"
};
const events=[
{id:1,title:"Short Film Showcase",category:"Movies & Dramatics",desc:"A space for student filmmakers to screen original stories, explore visual storytelling and share their craft.",date:"Schedule to be announced",venue:"Screening venue · TBA"},
{id:2,title:"Stage Play",category:"Movies & Dramatics",desc:"Bring characters to life through theatre, dialogue, movement and a story that stays with the audience.",date:"Schedule to be announced",venue:"Auditorium · TBA"},
{id:3,title:"Canvas Clash",category:"Creative Arts",desc:"A creative challenge celebrating illustration, sketching, colour and original visual ideas.",date:"Schedule to be announced",venue:"Creative studio · TBA"},
{id:4,title:"Design Sprint",category:"Creative Arts",desc:"Turn a fresh brief into a bold visual concept in this fast-paced design showcase.",date:"Schedule to be announced",venue:"Creative studio · TBA"},
{id:5,title:"Battle of Bands",category:"Music",desc:"Bring your band, find your sound and take the stage in a celebration of live music.",date:"Schedule to be announced",venue:"Main stage · TBA"},
{id:6,title:"Solo Vocals",category:"Music",desc:"A spotlight for powerful voices, original expression and unforgettable performances.",date:"Schedule to be announced",venue:"Main stage · TBA"},
{id:7,title:"Street Dance Crew",category:"Dance",desc:"Crews bring their own style, energy and choreography to the dance floor.",date:"Schedule to be announced",venue:"Performance arena · TBA"},
{id:8,title:"Classical Showcase",category:"Dance",desc:"Celebrate classical movement, technique and storytelling through dance.",date:"Schedule to be announced",venue:"Performance arena · TBA"},
{id:9,title:"Campus Esports",category:"Gaming",desc:"Competitive gaming brings players together for a test of teamwork, focus and strategy.",date:"Schedule to be announced",venue:"Gaming zone · TBA"},
{id:10,title:"Retro Arcade Challenge",category:"Gaming",desc:"A friendly competition inspired by classic arcade games and quick reflexes.",date:"Schedule to be announced",venue:"Gaming zone · TBA"},
{id:11,title:"The Big Quiz",category:"Quiz",desc:"Put your knowledge across pop culture, science, sport and current affairs to the test.",date:"Schedule to be announced",venue:"Quiz hall · TBA"},
{id:12,title:"Puzzle League",category:"Quiz",desc:"Solve clues, spot patterns and work together through a series of brain teasers.",date:"Schedule to be announced",venue:"Quiz hall · TBA"},
{id:13,title:"Boxing Basics",category:"Self Defence",desc:"A supervised introduction to boxing fundamentals, movement and sporting discipline.",date:"Schedule to be announced",venue:"Sports area · TBA"},
{id:14,title:"Kick-boxing Showcase",category:"Self Defence",desc:"A demonstration of kick-boxing technique, fitness and controlled athletic skill.",date:"Schedule to be announced",venue:"Sports area · TBA"}
];
let activeCategory="All",selectedEvent=null,lastFocusedElement=null;
const grid=document.getElementById("eventGrid");
function renderEvents(){
 const term=document.getElementById("searchInput").value.trim().toLowerCase();
 const shown=events.filter(e=>(activeCategory==="All"||e.category===activeCategory)&&[e.title,e.category,e.desc,e.venue].some(v=>v.toLowerCase().includes(term)));
 grid.innerHTML=shown.length?shown.map(e=>'<article class="event-card"><img class="event-img" src="'+categoryImages[e.category]+'" alt="'+e.category+' event artwork" loading="lazy"><div class="event-content"><div class="tag">'+e.category+' · MILAN 26</div><h3>'+e.title+'</h3><p>'+e.desc+'</p><div class="event-meta">◷ '+e.date+'<br>⌖ '+e.venue+'</div><button class="text-btn" data-details="'+e.id+'">Explore event ↗</button></div></article>').join(""):'<div class="empty"><strong>No events match that search.</strong><p>Try another keyword or category.</p><button class="pill gold" id="resetSearch">Clear filters</button></div>';
}
function setCategory(category){activeCategory=category;document.querySelectorAll(".filter").forEach(b=>{const active=b.dataset.category===category;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});renderEvents()}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("button[data-category]");if(b)setCategory(b.dataset.category)});
document.getElementById("categoryGrid").addEventListener("click",e=>{const card=e.target.closest("[data-category]");if(!card)return;setCategory(card.dataset.category);document.getElementById("events").scrollIntoView({behavior:"smooth"})});
document.getElementById("searchInput").addEventListener("input",renderEvents);
grid.addEventListener("click",e=>{if(e.target.id==="resetSearch"){document.getElementById("searchInput").value="";setCategory("All");return}const b=e.target.closest("[data-details]");if(b)showDetails(Number(b.dataset.details))});
function openModal(id){lastFocusedElement=document.activeElement;const modal=document.getElementById(id);modal.classList.add("show");document.body.style.overflow="hidden";modal.querySelector(".close")?.focus()}
function closeModal(id){document.getElementById(id).classList.remove("show");if(!document.querySelector(".modal-backdrop.show")){document.body.style.overflow="";lastFocusedElement?.focus()}}
function showDetails(id){selectedEvent=events.find(e=>e.id===id);if(!selectedEvent)return;document.getElementById("detailContent").innerHTML='<img class="detail-img" src="'+categoryImages[selectedEvent.category]+'" alt="'+selectedEvent.category+' event artwork"><div class="eyebrow dark-eye" style="margin-top:18px">'+selectedEvent.category+' · MILAN 26</div><h2>'+selectedEvent.title+'</h2><p>'+selectedEvent.desc+'</p><p><strong>Schedule:</strong> '+selectedEvent.date+'<br><strong>Venue:</strong> '+selectedEvent.venue+'</p><p class="foot-note">This is sample event content. Official dates, venues and registration rules will replace these placeholders when published.</p><button class="submit" id="detailRegister">Register interest ↗</button>';openModal("detailModal")}
document.getElementById("detailContent").addEventListener("click",e=>{if(e.target.id==="detailRegister"){closeModal("detailModal");openRegistration()}});
function openRegistration(){if(!selectedEvent)return;document.getElementById("registerFor").textContent="Registering interest for "+selectedEvent.title+". This demo form will not submit or store personal details until the backend is connected.";document.getElementById("registrationForm").reset();document.querySelectorAll(".error").forEach(x=>x.textContent="");document.getElementById("successMessage").classList.remove("show");const submit=document.querySelector("#registrationForm .submit");submit.disabled=false;submit.textContent="Submit registration ↗";openModal("registerModal")}
document.getElementById("registrationForm").addEventListener("submit",e=>{e.preventDefault();const values={fullName:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim(),college:document.getElementById("college").value.trim(),year:document.getElementById("year").value};const errors={nameError:!values.fullName?"Please enter your name.":"",emailError:!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)?"Enter a valid email address.":"",collegeError:!values.college?"Please enter your institution.":"",yearError:!values.year?"Please select your year.":""};Object.entries(errors).forEach(([id,msg])=>document.getElementById(id).textContent=msg);if(Object.values(errors).some(Boolean))return;const success=document.getElementById("successMessage");success.textContent="Your form passed validation. This is a frontend demo only; connect the approved backend before collecting registrations.";success.classList.add("show");e.target.querySelector(".submit").disabled=true;e.target.querySelector(".submit").textContent="Form validated ✓"});
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
document.querySelectorAll(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m.id)}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal-backdrop.show").forEach(m=>closeModal(m.id));if(e.key==="Tab"){const modal=document.querySelector(".modal-backdrop.show .modal");if(!modal)return;const items=[...modal.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(x=>x.offsetParent!==null);if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
function browseAsGuest(){document.getElementById("authModal").classList.remove("show");document.body.style.overflow="";const note=document.createElement("div");note.className="guest-toast";note.textContent="You're browsing Milan as a guest. Event discovery is open to everyone.";document.body.append(note);setTimeout(()=>note.remove(),4200)}
document.getElementById("guestBtn").addEventListener("click",browseAsGuest);
document.getElementById("guestBtnBottom").addEventListener("click",()=>{browseAsGuest();document.getElementById("categories").scrollIntoView({behavior:"smooth"})});
document.getElementById("loginBtn").addEventListener("click",()=>openModal("authModal"));
document.getElementById("authGuest").addEventListener("click",browseAsGuest);
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("navlinks").classList.toggle("open"));
document.querySelectorAll(".navlinks a").forEach(a=>a.addEventListener("click",()=>document.getElementById("navlinks").classList.remove("open")));
renderEvents();


/* Scroll reveals and pointer-based 3D card motion */
(function enhanceMotion(){
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets=document.querySelectorAll('.intro > *, .section-head, .category-card, .event-card, .guest-inner > *, .footer-row > *');
  revealTargets.forEach((el,index)=>{el.classList.add('reveal-item');if(el.classList.contains('category-card'))el.style.transitionDelay=(index%4)*65+'ms'});
  if('IntersectionObserver' in window && !reduceMotion){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
    }),{threshold:.12,rootMargin:'0px 0px -35px 0px'});
    revealTargets.forEach(el=>observer.observe(el));
  }else revealTargets.forEach(el=>el.classList.add('is-visible'));
  if(reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
  document.querySelectorAll('.category-card,.event-card').forEach(card=>{
    card.addEventListener('pointermove',event=>{
      const rect=card.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      card.style.setProperty('--tilt-x',(-y*5).toFixed(2)+'deg');
      card.style.setProperty('--tilt-y',(x*6).toFixed(2)+'deg');
    });
    card.addEventListener('pointerleave',()=>{
      card.style.setProperty('--tilt-x','0deg');
      card.style.setProperty('--tilt-y','0deg');
    });
  });
})();
