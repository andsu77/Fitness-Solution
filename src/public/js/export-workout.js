(function(){
  var btnPdf = document.getElementById("exportPdfBtn");
  var btnImg = document.getElementById("exportImgBtn");
  var exportDoc = document.getElementById("exportTemplate");
  if (!exportDoc || (!btnPdf && !btnImg)) return;

  var slug = window.WORKOUT_SLUG || "treino";

  function setBusy(btn, busyText){
    var original = btn.textContent;
    btn.textContent = busyText;
    btn.disabled = true;
    return function(){ btn.textContent = original; btn.disabled = false; };
  }

  if (btnImg){
    btnImg.addEventListener("click", function(){
      var done = setBusy(btnImg, "Gerando imagem...");
      window.WorkoutExport.toImage(exportDoc, slug)
        .catch(function(){ alert("Não foi possível gerar a imagem agora. Tente novamente."); })
        .finally(done);
    });
  }

  if (btnPdf){
    btnPdf.addEventListener("click", function(){
      var done = setBusy(btnPdf, "Gerando PDF...");
      window.WorkoutExport.toPdf(exportDoc, slug)
        .catch(function(){ alert("Não foi possível gerar o PDF agora. Tente novamente."); })
        .finally(done);
    });
  }
})();
