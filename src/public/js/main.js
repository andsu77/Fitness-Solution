(function(){
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;

  // Header shadow + halter 3D scroll animation + scroll progress bar
  var header = document.getElementById("siteHeader");
  var halter = document.getElementById("halter");
  var progressBar = document.getElementById("scrollProgress");
  var ticking = false;
  function onScroll(){
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
    if (halter && !reduceMotion){
      var rotate = window.scrollY * 0.6;
      var lift = Math.sin(window.scrollY / 60) * 6;
      halter.style.transform = "rotate(" + rotate + "deg) translateY(" + lift + "px)";
    }
    if (progressBar){
      var scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      progressBar.style.width = pct + "%";
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

  // SolutionAI chat widget
  var saiToggle = document.getElementById("saiToggle");
  var saiPanel = document.getElementById("saiPanel");
  var saiClose = document.getElementById("saiClose");
  var saiForm = document.getElementById("saiForm");
  var saiInput = document.getElementById("saiInput");
  var saiMessages = document.getElementById("saiMessages");

  if (saiToggle && saiPanel && saiForm && saiInput && saiMessages){
    var HISTORY_KEY = "solutionai_history";
    var OPEN_KEY = "solutionai_open";
    var sending = false;

    function loadHistory(){
      try { return JSON.parse(sessionStorage.getItem(HISTORY_KEY)) || []; }
      catch (e) { return []; }
    }
    function saveHistory(history){
      try { sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-20))); }
      catch (e) {}
    }
    function renderMessage(role, text){
      var div = document.createElement("div");
      div.className = "sai-msg " + role;
      div.textContent = text;
      saiMessages.appendChild(div);
      saiMessages.scrollTop = saiMessages.scrollHeight;
    }
    function showTyping(){
      var el = document.createElement("div");
      el.className = "sai-typing";
      el.id = "saiTypingIndicator";
      el.innerHTML = "<span></span><span></span><span></span>";
      saiMessages.appendChild(el);
      saiMessages.scrollTop = saiMessages.scrollHeight;
    }
    function hideTyping(){
      var el = document.getElementById("saiTypingIndicator");
      if (el) el.remove();
    }

    var history = loadHistory();
    if (history.length === 0){
      var greeting = "Oi! Eu sou a SolutionAI 💪 Pergunte sobre treino, exercícios, alimentação ou hábitos saudáveis.";
      history.push({ role: "assistant", content: greeting });
      saveHistory(history);
    }
    history.forEach(function(m){ renderMessage(m.role, m.content); });

    function openPanel(){
      saiPanel.hidden = false;
      requestAnimationFrame(function(){ saiPanel.classList.add("open"); });
      saiToggle.setAttribute("aria-expanded", "true");
      try { sessionStorage.setItem(OPEN_KEY, "1"); } catch (e) {}
      saiInput.focus();
    }
    function closePanel(){
      saiPanel.classList.remove("open");
      saiToggle.setAttribute("aria-expanded", "false");
      try { sessionStorage.setItem(OPEN_KEY, "0"); } catch (e) {}
      setTimeout(function(){ saiPanel.hidden = true; }, 250);
    }

    saiToggle.addEventListener("click", function(){
      if (saiPanel.classList.contains("open")) closePanel(); else openPanel();
    });
    if (saiClose) saiClose.addEventListener("click", closePanel);

    saiForm.addEventListener("submit", function(e){
      e.preventDefault();
      var text = saiInput.value.trim();
      if (!text || sending) return;
      saiInput.value = "";
      renderMessage("user", text);
      history.push({ role: "user", content: text });
      saveHistory(history);
      sending = true;
      showTyping();

      fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) })
      })
        .then(function(r){ return r.json(); })
        .then(function(data){
          hideTyping();
          var reply = (data && data.reply) || "Não consegui responder agora. Tente novamente.";
          renderMessage("assistant", reply);
          history.push({ role: "assistant", content: reply });
          saveHistory(history);
        })
        .catch(function(){
          hideTyping();
          var reply = "Não consegui me conectar agora. Verifique sua internet e tente de novo.";
          renderMessage("assistant", reply);
          history.push({ role: "assistant", content: reply });
          saveHistory(history);
        })
        .finally(function(){ sending = false; });
    });

    try {
      if (sessionStorage.getItem(OPEN_KEY) === "1") openPanel();
    } catch (e) {}
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