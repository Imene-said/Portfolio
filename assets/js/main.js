/* YEAR (if you keep id="year" somewhere else, optional) */

/* REVEAL */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.add("visible");
      io.unobserve(en.target);
    }
  });
}, {threshold:0.12});
document.querySelectorAll(".reveal").forEach(el=> io.observe(el));

/* FAQ accordion */
document.querySelectorAll(".faq").forEach(box=>{
  const q = box.querySelector(".q");
  const a = box.querySelector(".a");
  if(!q || !a) return;
  q.addEventListener("click", ()=>{
    const open = box.classList.toggle("open");
    a.style.maxHeight = open ? (a.scrollHeight + "px") : "0px";
  });
});

/* TYPEWRITER (index only) */
const typeEl = document.getElementById("typeText");
if (typeEl){
  const words = [
    "Réseaux • Services • Sécurité.",
    "SAE + preuves concrètes.",
    "Approche rigoureuse et claire."
  ];
  let wi=0, ci=0, deleting=false;

  function tick(){
    const w = words[wi];
    if(!deleting){
      ci++;
      typeEl.textContent = w.slice(0, ci);
      if(ci === w.length){
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
    }else{
      ci--;
      typeEl.textContent = w.slice(0, ci);
      if(ci === 0){
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 28 : 34);
  }
  tick();
}

/* PARTICLES */
const canvas = document.getElementById("particles");
if(canvas){
  const ctx = canvas.getContext("2d");
  let W,H,particles;

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    particles = Array.from({length: Math.min(90, Math.floor(W/14))}, () => ({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*2.2 + 0.6,
      vx: (Math.random()-.5)*0.55,
      vy: (Math.random()-.5)*0.55,
      a: Math.random()*0.55 + 0.25
    }));
  }
  window.addEventListener("resize", resize);
  resize();

  function draw(){
    ctx.clearRect(0,0,W,H);

    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.x< -20) p.x = W+20;
      if(p.x> W+20) p.x = -20;
      if(p.y< -20) p.y = H+20;
      if(p.y> H+20) p.y = -20;

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(0,212,255,${p.a})`;
      ctx.fill();
    }

    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d < 120){
          ctx.strokeStyle = `rgba(122,92,255,${(1 - d/120)*0.22})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* MODAL + gallery rendering */
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const mTitle = document.getElementById("mTitle");
const mDesc  = document.getElementById("mDesc");
const mImg   = document.getElementById("mImg");
const mChips = document.getElementById("mChips");
const mBullets = document.getElementById("mBullets");
const mDownloads = document.getElementById("mDownloads");

function openProject(p){
  if(!modal) return;
  mTitle.textContent = p.title || "";
  mDesc.textContent  = p.desc || "";
  mImg.src = p.img || "";

  mChips.innerHTML = (p.tags||[]).map(t => `<span class="chip">${t}</span>`).join("");
  mBullets.innerHTML = (p.bullets||[]).map(b => `<li>${b}</li>`).join("");

  if(p.downloads && p.downloads.length){
    mDownloads.innerHTML = p.downloads.map(d => `
      <a class="dl" href="${d.href}" download>
        ⬇️ <span>${d.label}</span> <small>(télécharger)</small>
      </a>
    `).join("");
  } else {
    mDownloads.innerHTML = `<span class="chip">Aucun fichier à télécharger</span>`;
  }

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeProject(){
  if(!modal) return;
  modal.classList.remove("show");
  document.body.style.overflow = "";
}
if(closeModal) closeModal.addEventListener("click", closeProject);
if(modal) modal.addEventListener("click", (e)=>{ if(e.target === modal) closeProject(); });
window.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeProject(); });

function renderGallery(targetId, items){
  const root = document.getElementById(targetId);
  if(!root) return;

  root.innerHTML = items.map((p, idx) => `
    <div class="cardP" role="button" tabindex="0" data-idx="${idx}">
      <div class="thumb">
        <img src="${p.img}" alt="Aperçu ${p.title}">
        <div class="openHint">Ouvrir</div>
      </div>
      <div class="cardBody">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <div class="tagRow">
          ${(p.tags||[]).slice(0,4).map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");

  root.querySelectorAll(".cardP").forEach(card=>{
    card.addEventListener("keydown", (e)=>{ if(e.key === "Enter") card.click(); });
  });

  root.addEventListener("click", (e)=>{
    const card = e.target.closest(".cardP");
    if(!card) return;
    const idx = Number(card.dataset.idx);
    openProject(items[idx]);
  });
}

if(window.PRO_DATA) renderGallery("proGallery", window.PRO_DATA);