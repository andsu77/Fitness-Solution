(function(){
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;

  // Header shadow + halter 3D scroll animation
  var header = document.getElementById("siteHeader");
  var halter = document.getElementById("halter");
  var ticking = false;
  function onScroll(){
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
    if (halter && !reduceMotion){
      var rotate = window.scrollY * 0.6;
      var lift = Math.sin(window.scrollY / 60) * 6;
      halter.style.transform = "rotate(" + rotate + "deg) translateY(" + lift + "px)";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function(){
    if (!ticking){ requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav){
    navToggle.addEventListener("click", function(){
      var open = siteNav.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    siteNav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        siteNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in-view"); });
  }

  // 3D tilt on cards / hero card
  if (canHover && !reduceMotion){
    var tiltEls = document.querySelectorAll(".card, .hero-card");
    tiltEls.forEach(function(el){
      el.addEventListener("mousemove", function(e){
        var rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = "perspective(800px) rotateX(" + (-y * 10) + "deg) rotateY(" + (x * 10) + "deg) translateY(-4px)";
      });
      el.addEventListener("mouseleave", function(){
        el.style.transform = "";
      });
    });
  }
})();

function out(html){document.getElementById("result").innerHTML=html}
function calcIMC(){const p=+document.getElementById("weight").value,h=+document.getElementById("height").value;if(!p||!h)return out("Preencha os campos.");const imc=p/(h*h);let c=imc<18.5?"Abaixo do peso":imc<25?"Faixa considerada normal":imc<30?"Sobrepeso":"Obesidade";out(`<h3>IMC: ${imc.toFixed(1)}</h3><p>${c}. O IMC é apenas uma medida de triagem e não avalia composição corporal individual.</p>`)}
function calcProtein(){const p=+document.getElementById("weight").value,f=+document.getElementById("factor").value;if(!p||!f)return out("Preencha os campos.");out(`<h3>${Math.round(p*f)} g/dia</h3><p>Estimativa baseada no fator informado. Necessidades variam conforme objetivo e contexto individual.</p>`)}
function calcCalories(){const p=+document.getElementById("weight").value,h=+document.getElementById("height").value,a=+document.getElementById("age").value,s=document.getElementById("sex").value;if(!p||!h||!a)return out("Preencha os campos.");const bmr=s==="m"?10*p+6.25*h-5*a+5:10*p+6.25*h-5*a-161;out(`<h3>${Math.round(bmr)} kcal/dia</h3><p>Estimativa de metabolismo basal pela equação de Mifflin-St Jeor. Não é uma prescrição alimentar.</p>`) }