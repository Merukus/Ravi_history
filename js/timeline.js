(function(){
  const spacing=150,positions=[50,37,63,24,50,76,37,63,50,24],startX=85,endPadding=100;
  let bar=null;
  function modal(){return document.getElementById("timelineModal")}
  function hide(){const m=modal();if(m)m.classList.remove("visible")}
  function positionModal(el){
    const m=modal();
    if(!m||!el)return;

    const noteRect=el.getBoundingClientRect();
    const modalRect=m.getBoundingClientRect();
    const margin=12,gap=16;
    const modalWidth=modalRect.width;
    const modalHeight=modalRect.height;
    const viewportWidth=window.innerWidth;
    const viewportHeight=window.innerHeight;

    let left=noteRect.left+(noteRect.width/2)-(modalWidth/2);
    let top=noteRect.top-modalHeight-gap;

    if(top<margin) top=noteRect.bottom+gap;
    if(top+modalHeight>viewportHeight-margin) top=viewportHeight-modalHeight-margin;
    if(top<margin) top=margin;
    if(left<margin) left=margin;
    if(left+modalWidth>viewportWidth-margin) left=viewportWidth-modalWidth-margin;

    m.style.left=Math.round(left)+"px";
    m.style.top=Math.round(top)+"px";
  }

  function show(el){
    const e=(window.raviTimeline||[])[+el.dataset.index],m=modal();
    if(!e||!m)return;
    document.getElementById("timelineModalImage").src=e.image;
    document.getElementById("timelineModalIndex").textContent=String(+el.dataset.index+1).padStart(2,"0");
    document.getElementById("timelineModalDate").textContent=e.date;
    document.getElementById("timelineModalTitle").textContent=e.title;
    document.getElementById("timelineModalDescription").textContent=e.description;
    m.classList.add("visible");
    requestAnimationFrame(()=>positionModal(el));
  }

  function ensureScrollbar(){
    const wrapper=document.querySelector('.timeline-score-wrapper'),scroller=document.querySelector('.timeline-scroll');
    if(!wrapper||!scroller)return;
    let track=wrapper.querySelector('.custom-scrollbar-x');
    if(!track){track=document.createElement('div');track.className='custom-scrollbar-x';track.innerHTML='<div class="custom-thumb"></div>';wrapper.appendChild(track)}
    const thumb=track.querySelector('.custom-thumb');let dragging=false,startXPointer=0,startScroll=0;
    function update(){
      const max=scroller.scrollWidth-scroller.clientWidth,ratio=Math.min(1,scroller.clientWidth/scroller.scrollWidth);
      const tw=Math.max(34,track.clientWidth*ratio),travel=Math.max(0,track.clientWidth-tw);
      thumb.style.width=tw+'px';thumb.style.left=(max>0?(scroller.scrollLeft/max)*travel:0)+'px';track.classList.toggle('is-disabled',max<=1);
    }
    thumb.addEventListener('pointerdown',e=>{dragging=true;startXPointer=e.clientX;startScroll=scroller.scrollLeft;thumb.setPointerCapture(e.pointerId);e.preventDefault()});
    thumb.addEventListener('pointermove',e=>{if(!dragging)return;const max=scroller.scrollWidth-scroller.clientWidth,travel=track.clientWidth-thumb.offsetWidth;if(travel>0)scroller.scrollLeft=startScroll+(e.clientX-startXPointer)*(max/travel)});
    thumb.addEventListener('pointerup',()=>dragging=false);thumb.addEventListener('pointercancel',()=>dragging=false);
    track.addEventListener('click',e=>{if(e.target===thumb)return;const r=track.getBoundingClientRect(),max=scroller.scrollWidth-scroller.clientWidth;scroller.scrollLeft=((e.clientX-r.left)/r.width)*max});
    scroller.addEventListener('scroll',()=>{hide();update()},{passive:true});
    bar={update};requestAnimationFrame(update);
  }

  function create(){
    const floatingModal=document.getElementById("timelineModal");
    if(floatingModal&&floatingModal.parentElement!==document.body) document.body.appendChild(floatingModal);
    const events=document.getElementById("timelineEvents"),score=document.getElementById("timelineScore"),data=window.raviTimeline||[];
    if(!events||!score)return;events.innerHTML="";
    const eventsWidth=Math.max(760,startX+Math.max(0,data.length-1)*spacing+endPadding),clefWidth=90,scorePadding=55,scoreWidth=scorePadding*2+clefWidth+eventsWidth;
    score.style.width=scoreWidth+"px";score.style.minWidth=scoreWidth+"px";score.style.flex="0 0 "+scoreWidth+"px";events.style.width=eventsWidth+"px";events.style.flex="0 0 "+eventsWidth+"px";
    data.forEach((e,i)=>{const el=document.createElement("div");el.className="timeline-event";el.tabIndex=0;el.dataset.index=i;el.style.left=(startX+i*spacing)+"px";el.style.top=positions[i%positions.length]+"%";el.innerHTML='<div class="timeline-note" aria-hidden="true"></div><span class="timeline-date">'+e.date+'</span>';events.appendChild(el);el.addEventListener("mouseenter",()=>show(el));el.addEventListener("mouseleave",hide);el.addEventListener("focus",()=>show(el));el.addEventListener("blur",hide);if(i>0&&i%4===0){const b=document.createElement("div");b.className="timeline-bar";b.style.left=(startX+i*spacing-spacing/2)+"px";events.appendChild(b)}});
    ensureScrollbar();
  }
  function updateScrollbar(){requestAnimationFrame(()=>bar?.update())}
  window.RaviTimeline={create,hideModal:hide,updateScrollbar};
  addEventListener("resize",()=>{hide();requestAnimationFrame(()=>bar?.update())});
})();
