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

  function renderBlock(el){
    return html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
  }

  function triggerDownload(href, filename){
    var link = document.createElement("a");
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (btnImg){
    btnImg.addEventListener("click", function(){
      var done = setBusy(btnImg, "Gerando imagem...");
      renderBlock(exportDoc)
        .then(function(canvas){
          triggerDownload(canvas.toDataURL("image/png"), slug + ".png");
        })
        .catch(function(){
          alert("Não foi possível gerar a imagem agora. Tente novamente.");
        })
        .finally(done);
    });
  }

  if (btnPdf){
    btnPdf.addEventListener("click", function(){
      var done = setBusy(btnPdf, "Gerando PDF...");
      var jsPDF = window.jspdf.jsPDF;
      var pdf = new jsPDF("p", "pt", "a4");
      var pageWidth = pdf.internal.pageSize.getWidth();
      var pageHeight = pdf.internal.pageSize.getHeight();
      var margin = 24;
      var usableWidth = pageWidth - margin * 2;
      var cursorY = margin;
      var blocks = Array.prototype.slice.call(exportDoc.querySelectorAll(".export-block"));

      blocks
        .reduce(function(chain, block){
          return chain.then(function(){
            return renderBlock(block).then(function(canvas){
              var imgHeight = (canvas.height * usableWidth) / canvas.width;
              if (cursorY + imgHeight > pageHeight - margin && cursorY > margin){
                pdf.addPage();
                cursorY = margin;
              }
              pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, cursorY, usableWidth, imgHeight);
              cursorY += imgHeight + 14;
            });
          });
        }, Promise.resolve())
        .then(function(){ pdf.save(slug + ".pdf"); })
        .catch(function(){
          alert("Não foi possível gerar o PDF agora. Tente novamente.");
        })
        .finally(done);
    });
  }
})();
