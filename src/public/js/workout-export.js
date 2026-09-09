window.WorkoutExport = {
  capture: function (el) {
    return html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
  },

  toImage: function (exportDocEl, filename) {
    return this.capture(exportDocEl).then(function (canvas) {
      var link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = filename + ".png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  },

  toPdf: function (exportDocEl, filename) {
    var self = this;
    var jsPDF = window.jspdf.jsPDF;
    var pdf = new jsPDF("p", "pt", "a4");
    var pageWidth = pdf.internal.pageSize.getWidth();
    var pageHeight = pdf.internal.pageSize.getHeight();
    var margin = 24;
    var usableWidth = pageWidth - margin * 2;
    var cursorY = margin;
    var blocks = Array.prototype.slice.call(exportDocEl.querySelectorAll(".export-block"));

    return blocks
      .reduce(function (chain, block) {
        return chain.then(function () {
          return self.capture(block).then(function (canvas) {
            var imgHeight = (canvas.height * usableWidth) / canvas.width;
            if (cursorY + imgHeight > pageHeight - margin && cursorY > margin) {
              pdf.addPage();
              cursorY = margin;
            }
            pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, cursorY, usableWidth, imgHeight);
            cursorY += imgHeight + 14;
          });
        });
      }, Promise.resolve())
      .then(function () { pdf.save(filename + ".pdf"); });
  }
};
