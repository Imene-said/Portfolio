(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ========= REVEAL ========= */
  const revealEls = $$(".reveal");
  if (revealEls.length) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, {threshold:0.12});
    revealEls.forEach(el=> io.observe(el));
  }

  /* ========= FAQ accordion ========= */
  $$(".faq").forEach((box)=>{
    const q = $(".q", box);
    const a = $(".a", box);
    if(!q || !a) return;

    a.style.maxHeight = "0px";
    q.addEventListener("click", ()=>{
      const open = box.classList.toggle("open");
      a.style.maxHeight = open ? (a.scrollHeight + "px") : "0px";
    });
  });

  /* ========= Contact confirmation (?sent=1) ========= */
  const params = new URLSearchParams(window.location.search);
  if (params.get("sent") === "1") {
    const slot = $("#contactSuccess");
    if (slot) {
      slot.innerHTML = `
        <div class="alert">
          ✅ Message envoyé avec succès. Merci ! Je te répondrai dès que possible.
        </div>
      `;
    }
  }

  /* ========= MODAL générique (pour pages compétences) =========
     - La page doit définir: window.PAGE_ITEMS = [ ... ] (6 items)
     - Les cartes doivent avoir: data-item="0..5"
     - La page doit contenir le HTML du modal (mêmes ids que pro.html)
  */
  const modal = $("#modal");
  const closeBtn = $("#closeModal");

  const mTitle = $("#mTitle");
  const mDesc  = $("#mDesc");
  const mImg   = $("#mImg");
  const mChips = $("#mChips");
  const mBullets = $("#mBullets");
  const mDownloads = $("#mDownloads");

  function openModalWith(item){
    if(!modal || !item) return;

    if(mTitle) mTitle.textContent = item.title || "";
    if(mDesc)  mDesc.textContent  = item.desc  || "";
    if(mImg){
      mImg.src = item.img || "";
      mImg.alt = item.title ? `Preuve — ${item.title}` : "Preuve";
    }

    if(mChips){
      const tags = item.tags || [];
      mChips.innerHTML = tags.map(t => `<span class="chip">${t}</span>`).join("");
    }

    if(mBullets){
      const bullets = item.bullets || [];
      mBullets.innerHTML = bullets.map(b => `<li>${b}</li>`).join("");
    }

    if(mDownloads){
      const dls = item.downloads || [];
      if(dls.length){
        mDownloads.innerHTML = dls.map(d => `
          <a class="dl" href="${d.href}" download>⬇️ <span>${d.label}</span></a>
        `).join("");
      } else {
        mDownloads.innerHTML = `<span class="chip">Aucun fichier à télécharger</span>`;
      }
    }

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal(){
    if(!modal) return;
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  if(closeBtn) closeBtn.addEventListener("click", closeModal);
  if(modal) modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });
  window.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeModal(); });

  // Active seulement si la page définit PAGE_ITEMS + si le modal existe
  if(modal && Array.isArray(window.PAGE_ITEMS)){
    document.addEventListener("click", (e)=>{
      const card = e.target.closest("[data-item]");
      if(!card) return;

      const idx = Number(card.dataset.item);
      const item = window.PAGE_ITEMS[idx];
      if(item) openModalWith(item);
    });

    // accessibilité clavier
    document.addEventListener("keydown", (e)=>{
      if(e.key !== "Enter") return;
      const el = document.activeElement;
      if(el && el.hasAttribute && el.hasAttribute("data-item")){
        el.click();
      }
    });
  }

  /* ========= PARTICLES (points + lignes, comme au début) ========= */
  const canvas = $("#particles");
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

      // dots
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

      // lines
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a = particles[i], b = particles[j];
          const dx = a.x-b.x, dy = a.y-b.y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if(d < 120){
            ctx.strokeStyle = `rgba(30,123,255,${(1 - d/120)*0.25})`;
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
})();