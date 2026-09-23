(function(){
  let dataBar=null;

  function makeVerticalScrollbar(){
    const panel=document.querySelector('.archive-panel[data-panel="datos"]');
    if(!panel)return;
    let track=panel.querySelector('.custom-scrollbar-y');
    if(!track){
      track=document.createElement('div');
      track.className='custom-scrollbar-y';
      track.innerHTML='<div class="custom-thumb"></div>';
      panel.prepend(track);
    }
    const thumb=track.querySelector('.custom-thumb');
    let dragging=false,startY=0,startScroll=0;

    function update(){
      if(!panel.classList.contains('active'))return;
      const max=panel.scrollHeight-panel.clientHeight;
      const ratio=Math.min(1,panel.clientHeight/panel.scrollHeight);
      const th=Math.max(28,track.clientHeight*ratio);
      const travel=Math.max(0,track.clientHeight-th);
      thumb.style.height=th+'px';
      thumb.style.top=(max>0?(panel.scrollTop/max)*travel:0)+'px';
      track.classList.toggle('is-disabled',max<=1);
    }
    thumb.addEventListener('pointerdown',e=>{dragging=true;startY=e.clientY;startScroll=panel.scrollTop;thumb.setPointerCapture(e.pointerId);e.preventDefault()});
    thumb.addEventListener('pointermove',e=>{
      if(!dragging)return;
      const max=panel.scrollHeight-panel.clientHeight;
      const travel=track.clientHeight-thumb.offsetHeight;
      if(travel>0)panel.scrollTop=startScroll+(e.clientY-startY)*(max/travel);
    });
    thumb.addEventListener('pointerup',()=>dragging=false);
    thumb.addEventListener('pointercancel',()=>dragging=false);
    track.addEventListener('click',e=>{
      if(e.target===thumb)return;
      const r=track.getBoundingClientRect(),max=panel.scrollHeight-panel.clientHeight;
      panel.scrollTop=((e.clientY-r.top)/r.height)*max;
    });
    panel.addEventListener('scroll',update,{passive:true});
    dataBar={update};
    requestAnimationFrame(update);
  }

  function setTab(name){
    const a=document.getElementById("archive");
    a.querySelectorAll(".archive-tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===name));
    a.querySelectorAll(".archive-panel").forEach(p=>{p.classList.toggle("active",p.dataset.panel===name);p.scrollTop=0});
    window.RaviTimeline?.hideModal();
    requestAnimationFrame(()=>{
      if(name==='datos'){ if(!dataBar)makeVerticalScrollbar(); else dataBar.update(); }
      if(name==='cronologia')window.RaviTimeline?.updateScrollbar?.();
    });
  }
  function open(){const a=document.getElementById("archive"),s=document.getElementById("scene");a.style.display="block";a.style.opacity="1";a.setAttribute("aria-hidden","false");s.style.display="none";setTab("datos")}
  function connect(){const a=document.getElementById("archive");a.querySelectorAll(".archive-tab").forEach(t=>t.addEventListener("click",()=>setTab(t.dataset.tab)));a.querySelector(".archive-back").addEventListener("click",()=>{a.style.display="none";a.setAttribute("aria-hidden","true");window.RaviIntro?.create()});a.querySelector(".timeline-scroll")?.addEventListener("scroll",()=>window.RaviTimeline?.hideModal());window.addEventListener('resize',()=>requestAnimationFrame(()=>dataBar?.update()))}
  window.RaviArchive={open,setTab,connect};
})();
