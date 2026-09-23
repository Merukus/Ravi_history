/* =========================================================
   INTRO DE RAVI
========================================================= */
(function(){
  function create(){
    const scene=document.getElementById("scene");
    const template=document.getElementById("presentation-template");
    if(!scene||!template)return;

    scene.replaceChildren(template.content.cloneNode(true));
    scene.style.display="block";
    scene.style.opacity="1";

    const presentation=scene.querySelector(".presentation");
    if(!presentation)return;

    const enter=presentation.querySelector(".enter-profile");
    const replay=presentation.querySelector(".replay-intro");
    const skip=presentation.querySelector(".skip-intro");

    if(enter) enter.addEventListener("click",()=>window.RaviArchive?.open());
    if(replay) replay.addEventListener("click",create);
    if(skip) skip.addEventListener("click",()=>showFinalScene(presentation));
  }

  function showFinalScene(presentation){
    /* Detiene todas las animaciones antes de fijar manualmente
       el estado exacto del último fotograma de la presentación. */
    presentation.querySelectorAll("*").forEach(element=>{
      element.style.animation="none";
      element.style.transition="none";
    });

    const q=selector=>presentation.querySelector(selector);

    const background=q(".background img");
    const sunsetFilter=q(".sunset-filter");
    const sunsetLight=q(".sunset-light");
    const sunsetShadow=q(".sunset-shadow");
    const horizonLight=q(".horizon-light");
    const elbaph=q(".elbaph");
    const zunesha=q(".zunesha-wrapper");
    const zuneshaGif=q(".zunesha-gif");
    const zuneshaStatic=q(".zunesha-static");
    const mistBack=q(".mist-back");
    const mistFront=q(".mist-front");
    const newWorld=q(".new-world");
    const elbaphTitle=q(".elbaph-title");
    const reveal=q(".ravi-reveal");
    const content=q(".ravi-content");
    const line=q(".ravi-line");
    const buttons=q(".final-buttons");
    const skip=q(".skip-intro");

    if(background) background.style.transform="scale(1)";

    if(sunsetFilter) sunsetFilter.style.opacity=".88";
    if(sunsetLight) sunsetLight.style.opacity=".62";
    if(sunsetShadow) sunsetShadow.style.opacity=".36";
    if(horizonLight) horizonLight.style.filter="hue-rotate(-18deg) saturate(1.35) brightness(1.05)";

    if(elbaph){
      elbaph.style.opacity="1";
      elbaph.style.transform="translateY(0) scale(1)";
      elbaph.style.filter="blur(0)";
    }

    if(zunesha){
      zunesha.style.opacity="1";
      zunesha.style.right="13%";
      zunesha.style.bottom="-1%";
      zunesha.style.transform="scale(.76)";
      zunesha.style.filter="blur(0)";
    }

    /* El GIF se sustituye por el PNG final para que Zunesha
       quede detenido exactamente en la escena final. */
    if(zuneshaGif){
      zuneshaGif.style.opacity="0";
      zuneshaGif.style.display="none";
    }
    if(zuneshaStatic){
      zuneshaStatic.style.opacity="1";
      zuneshaStatic.style.display="block";
    }

    if(mistBack) mistBack.style.transform="translateX(0)";
    if(mistFront) mistFront.style.transform="translateX(0)";

    if(newWorld){
      newWorld.style.opacity="0";
      newWorld.style.display="none";
    }
    if(elbaphTitle){
      elbaphTitle.style.opacity="0";
      elbaphTitle.style.display="none";
    }

    if(reveal){
      reveal.style.opacity="1";
      reveal.style.visibility="visible";
    }
    if(content){
      content.style.opacity="1";
      content.style.transform="translateY(0)";
    }
    if(line) line.style.width="100%";
    if(buttons){
      buttons.style.opacity="1";
      buttons.style.transform="translateY(0)";
    }
    if(skip) skip.style.display="none";
  }

  window.RaviIntro={create,showFinalScene};
})();
