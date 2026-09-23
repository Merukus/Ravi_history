(function(){
  const spacing=150;
  const positions=[50,37,63,24,50,76,37,63,50,24];
  const startX=85;
  const endPadding=100;

  function modal(){return document.getElementById("timelineModal")}
  function hide(){const m=modal();if(m)m.classList.remove("visible")}
  function show(el){
    const e=(window.raviTimeline||[])[+el.dataset.index],m=modal();
    if(!e||!m)return;
    timelineModalImage.src=e.image;
    timelineModalIndex.textContent=String(+el.dataset.index+1).padStart(2,"0");
    timelineModalDate.textContent=e.date;
    timelineModalTitle.textContent=e.title;
    timelineModalDescription.textContent=e.description;
    m.classList.add("visible");
    const r=el.getBoundingClientRect(),w=Math.min(330,innerWidth-30);
    let l=Math.max(15,Math.min(r.left+r.width/2-w/2,innerWidth-w-15)),t=r.top-355;
    if(t<15)t=r.bottom+22;
    m.style.left=l+"px";m.style.top=t+"px";
  }

  function create(){
    const events=document.getElementById("timelineEvents");
    const score=document.getElementById("timelineScore");
    const data=window.raviTimeline||[];
    if(!events||!score)return;
    events.innerHTML="";

    /* Un único ancho gobierna pentagrama, eventos y scroll. */
    const eventsWidth=Math.max(760,startX+Math.max(0,data.length-1)*spacing+endPadding);
    const clefWidth=90;
    const scorePadding=55;
    const scoreWidth=scorePadding*2+clefWidth+eventsWidth;
    score.style.width=scoreWidth+"px";
    score.style.minWidth=scoreWidth+"px";
    score.style.flex="0 0 "+scoreWidth+"px";
    events.style.width=eventsWidth+"px";
    events.style.flex="0 0 "+eventsWidth+"px";

    data.forEach((e,i)=>{
      const el=document.createElement("div");
      el.className="timeline-event";el.tabIndex=0;el.dataset.index=i;
      el.style.left=(startX+i*spacing)+"px";
      el.style.top=positions[i%positions.length]+"%";
      el.innerHTML='<div class="timeline-note" aria-hidden="true"></div><span class="timeline-date">'+e.date+'</span>';
      events.appendChild(el);
      el.addEventListener("mouseenter",()=>show(el));
      el.addEventListener("mouseleave",hide);
      el.addEventListener("focus",()=>show(el));
      el.addEventListener("blur",hide);
      if(i>0&&i%4===0){const b=document.createElement("div");b.className="timeline-bar";b.style.left=(startX+i*spacing-spacing/2)+"px";events.appendChild(b)}
    });
  }
  window.RaviTimeline={create,hideModal:hide};
  addEventListener("resize",()=>{hide();create()});
})();
