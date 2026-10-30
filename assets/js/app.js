
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
let currentUser=null,pendingRegistration=false;
const supabaseClient=window.supabase?.createClient(window.MILAN_SUPABASE_URL,window.MILAN_SUPABASE_KEY);
const grid=document.getElementById("eventGrid");
function renderEvents(){
 const term=document.getElementById("searchInput").value.trim().toLowerCase();
 const shown=events.filter(e=>(activeCategory==="All"||e.category===activeCategory)&&[e.title,e.category,e.desc,e.venue].some(v=>v.toLowerCase().includes(term)));
 grid.innerHTML=shown.length?shown.map(e=>'<article class="event-card"><img class="event-img" src="'+categoryImages[e.category]+'" alt="'+e.category+' event artwork" loading="lazy"><div class="event-content"><div class="tag">'+e.category+' · MILAN 26</div><h3>'+e.title+'</h3><p>'+e.desc+'</p><div class="event-meta">◷ '+e.date+'<br>⌖ '+e.venue+'</div><button class="text-btn" data-details="'+e.id+'">Explore event ↗</button><button class="save-event" data-save="'+e.id+'" type="button">♡ Save event</button></div></article>').join(""):'<div class="empty"><strong>No events match that search.</strong><p>Try another keyword or category.</p><button class="pill gold" id="resetSearch">Clear filters</button></div>';
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
function openRegistration(){if(!selectedEvent)return;if(!currentUser){pendingRegistration=true;document.getElementById("authStatus").textContent="Sign in or create an account to register. Guest browsing is still available.";openModal("authModal");return;}document.getElementById("registerFor").textContent="Registering interest for "+selectedEvent.title+".";document.getElementById("registrationForm").reset();document.querySelectorAll(".error").forEach(x=>x.textContent="");document.getElementById("successMessage").classList.remove("show");const submit=document.querySelector("#registrationForm .submit");submit.disabled=false;submit.textContent="Submit registration ↗";openModal("registerModal")}
document.getElementById("registrationForm").addEventListener("submit",async e=>{
 e.preventDefault();
 if(!currentUser){pendingRegistration=true;closeModal("registerModal");openModal("authModal");return;}
 const values={fullName:document.getElementById("fullName").value.trim(),email:document.getElementById("email").value.trim(),college:document.getElementById("college").value.trim(),year:document.getElementById("year").value};
 const errors={nameError:!values.fullName?"Please enter your name.":"",emailError:!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email)?"Enter a valid email address.":"",collegeError:!values.college?"Please enter your institution.":"",yearError:!values.year?"Please select your year.":""};
 Object.entries(errors).forEach(([id,msg])=>document.getElementById(id).textContent=msg);
 if(Object.values(errors).some(Boolean))return;
 const submit=e.target.querySelector(".submit");submit.disabled=true;submit.textContent="Submitting…";
 const {error}=await supabaseClient.from("event_registrations").insert({user_id:currentUser.id,event_id:selectedEvent.id,full_name:values.fullName,email:values.email,college:values.college,study_year:values.year});
 const success=document.getElementById("successMessage");
 if(error){success.textContent=error.code==="23505"?"You are already registered for this event.":error.message;success.classList.add("show");submit.disabled=false;submit.textContent="Try again ↗";return;}
 success.textContent="Your interest has been saved to your Milan account.";success.classList.add("show");submit.textContent="Saved ✓";
});
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
document.querySelectorAll(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m.id)}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal-backdrop.show").forEach(m=>closeModal(m.id));if(e.key==="Tab"){const modal=document.querySelector(".modal-backdrop.show .modal");if(!modal)return;const items=[...modal.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(x=>x.offsetParent!==null);if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
function browseAsGuest(){document.getElementById("authModal").classList.remove("show");document.body.style.overflow="";const note=document.createElement("div");note.className="guest-toast";note.textContent="You're browsing Milan as a guest. Event discovery is open to everyone.";document.body.append(note);setTimeout(()=>note.remove(),4200)}
document.getElementById("guestBtn").addEventListener("click",browseAsGuest);
document.getElementById("guestBtnBottom").addEventListener("click",()=>{browseAsGuest();document.getElementById("categories").scrollIntoView({behavior:"smooth"})});

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


/* Milan Supabase integration: public guest browsing, email/password accounts, saved events and registrations. */
function setAuthMode(mode){
 document.querySelectorAll("[data-auth-mode]").forEach(b=>b.classList.toggle("active",b.dataset.authMode===mode));
 document.getElementById("authNameField").hidden=mode!=="signup";
 document.getElementById("authPassword").autocomplete=mode==="signup"?"new-password":"current-password";
 document.getElementById("authSubmit").textContent=mode==="signup"?"Create account ↗":"Sign in ↗";
 document.getElementById("authStatus").textContent="";
 document.getElementById("authHeading").innerHTML=mode==="signup"?"Join the <em>feeling.</em>":"Welcome <em>back.</em>";
}
document.querySelectorAll("[data-auth-mode]").forEach(b=>b.addEventListener("click",()=>setAuthMode(b.dataset.authMode)));
document.getElementById("authForm").addEventListener("submit",async e=>{
 e.preventDefault();const mode=document.querySelector("[data-auth-mode].active")?.dataset.authMode||"signin";
 const email=document.getElementById("authEmail").value.trim(),password=document.getElementById("authPassword").value;
 const status=document.getElementById("authStatus"),submit=document.getElementById("authSubmit");
 submit.disabled=true;status.textContent=mode==="signup"?"Creating your account…":"Signing you in…";
 let result;
 if(mode==="signup")result=await supabaseClient.auth.signUp({email,password,options:{data:{display_name:document.getElementById("authName").value.trim()}}});
 else result=await supabaseClient.auth.signInWithPassword({email,password});
 submit.disabled=false;
 if(result.error){status.textContent=result.error.message;return;}
 if(mode==="signup"&&!result.data.session){status.textContent="Account created. Check your email to confirm your address, then sign in.";return;}
 currentUser=result.data.user;updateAuthUI();closeModal("authModal");status.textContent="";
 if(pendingRegistration){pendingRegistration=false;openRegistration();}
});
function updateAuthUI(){
 const button=document.getElementById("loginBtn");
 if(currentUser){button.textContent="Sign out ↗";button.setAttribute("aria-label","Sign out");}
 else{button.textContent="Sign in ↗";button.setAttribute("aria-label","Sign in");}
}
document.getElementById("loginBtn").addEventListener("click",async e=>{
 if(currentUser){e.preventDefault();await supabaseClient.auth.signOut();currentUser=null;updateAuthUI();return;}
 setAuthMode("signin");openModal("authModal");
});
function attachCardMotion(){
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 document.querySelectorAll(".event-card").forEach(card=>{
  card.classList.add("reveal-item","is-visible");
  if(reduced||card.dataset.motionReady)return;
  card.dataset.motionReady="true";
  card.addEventListener("pointermove",event=>{
   const rect=card.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;
   card.style.setProperty("--tilt-x",(-y*4).toFixed(2)+"deg");card.style.setProperty("--tilt-y",(x*5).toFixed(2)+"deg");
  });
  card.addEventListener("pointerleave",()=>{card.style.setProperty("--tilt-x","0deg");card.style.setProperty("--tilt-y","0deg");});
 });
}
async function loadBackendEvents(){
 const {data,error}=await supabaseClient.from("events").select("id,title,description,schedule_label,venue_label,image_url,category_id,event_categories(name)").eq("is_published",true).order("id");
 if(error){console.error("Milan events could not be loaded:",error);return;}
 if(!data?.length)return;
 const mapped=data.map(row=>({id:row.id,title:row.title,category:row.event_categories?.name||"Other",desc:row.description,date:row.schedule_label,venue:row.venue_label,image:row.image_url}));
 events.splice(0,events.length,...mapped);
 data.forEach(row=>{if(row.event_categories?.name&&row.image_url)categoryImages[row.event_categories.name]=row.image_url;});
 renderEvents();attachCardMotion();
}
async function toggleSavedEvent(eventId,button){
 if(!currentUser){pendingRegistration=false;setAuthMode("signin");document.getElementById("authStatus").textContent="Sign in to save events. You can keep browsing as a guest.";openModal("authModal");return;}
 const {data:existing,error:readError}=await supabaseClient.from("saved_events").select("event_id").eq("user_id",currentUser.id).eq("event_id",eventId).maybeSingle();
 if(readError){button.textContent="Try again";return;}
 if(existing){const {error}=await supabaseClient.from("saved_events").delete().eq("user_id",currentUser.id).eq("event_id",eventId);if(!error)button.textContent="♡ Save event";}
 else{const {error}=await supabaseClient.from("saved_events").insert({user_id:currentUser.id,event_id:eventId});if(!error)button.textContent="♥ Saved";}
}
grid.addEventListener("click",e=>{const save=e.target.closest("[data-save]");if(save){e.stopPropagation();toggleSavedEvent(Number(save.dataset.save),save);}});
async function initMilanBackend(){
 if(!supabaseClient){document.getElementById("authStatus").textContent="Account service is temporarily unavailable.";return;}
 const {data}=await supabaseClient.auth.getSession();currentUser=data.session?.user||null;updateAuthUI();
 supabaseClient.auth.onAuthStateChange((_event,session)=>{currentUser=session?.user||null;updateAuthUI();});
 await loadBackendEvents();
}
initMilanBackend();
