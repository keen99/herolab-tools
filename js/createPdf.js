function createPdf(extractedData, headerAndFooter, columns, download = false) {
// requires
// <script src='https://cdn.jsdelivr.net/npm/pdfkit@latest/build/pdfkit.js'></script>
//  <script src='https://github.com/devongovett/blob-stream/releases/download/v0.1.3/blob-stream.js'></script>

  // const doc = new PDFDocument();
  const doc = new PDFDocument({bufferPages: true})

  const stream = doc.pipe(blobStream());

  var header = headerAndFooter.querySelector(".page-header").innerHTML;
  var footer = headerAndFooter.querySelector(".page-footer").innerHTML;


  // add this to doc, even though pdfkit doesnt use it, so we can easily query it later
  doc.columns = columns;


  // console.log("extractedData", extractedData);
  // console.log("headerAndFooter", headerAndFooter);
  // console.log("header", header);
  // console.log("footer", footer);


  for (var i = 0; i < extractedData.length; i++) {
      var container = extractedData[i].container;
      var name = extractedData[i].name;
      var description = container.querySelector('.description-text').textContent;
      var path = container.querySelector('.element-path').textContent;

  // https://github.com/foliojs/pdfkit/blob/master/docs/text.md
      // console.log("build pdf for name: ", name, path);
      doc
          .font('Times-Bold', 13)
          .text(name.trim(), {
            continued: true,
            columns: columns,
              align: 'left',
           })
          .moveDown()
          .font('Times-Italic', 8)
          .text(path.trim(), {
            continued: true,
              align: 'right',
           })
          // we dont want to use moveDown
          // moveDown keeps the vertical position the same
          // so it creates odd indent artifacts
          .text("\n\n", {continued: true})
          .font('Times-Roman', 10)
          .text(description.trim(), {
            continued: true,
            // columns: columns
              align: 'left',
              indent: 0
           })
          .text("\n\n\n", {continued: true})
          // draw a horizonal line the width of the column.  lineWidth in this case is always the text width, regardless of the columns
          // "move from where we are, to linewidth to the right, and draw a line"
          .moveTo(doc.x, doc.y)
             .lineTo(doc.x +  doc._wrapper.lineWidth, doc.y)
             .stroke()
          .text("\n\n", {continued: true})

  } // end for var...

  doc.text('', 0, 0) // must reset our position.  this might be an artifact of how we're building the doc that others dont encounter.  otherwise, we end up top right on the first page instead of bottom.
  // from https://stackoverflow.com/questions/42571696/how-to-add-header-and-footer-content-to-pdfkit-for-node-js
  //Global Edits to All Pages (Header/Footer, etc)
  let pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);

    //Header: Add page number
    let oldTopMargin = doc.page.margins.top;
    doc.page.margins.top = 0 //Dumb: Have to remove top margin in order to write into it
    doc
      .text(
        header,
        doc.page.margins.left,
        (oldTopMargin/2), // Centered vertically in top margin
        { align: 'left' }
      );
    doc.page.margins.top = oldTopMargin; // ReProtect top margin

    //Footer: Add page number
    let oldBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0 //Dumb: Have to remove bottom margin in order to write into it
    doc
      .text(
        `${footer} Page: ${i + 1} of ${pages.count}`,
        doc.page.margins.right,
        doc.page.height - (oldBottomMargin/2), // Centered vertically in bottom margin
        { align: 'right' }
      );
    doc.page.margins.bottom = oldBottomMargin; // ReProtect bottom margin
  }

  stream.on('finish', function() {
    if(download) {
      var downloadLink = document.createElement("a");
      // downloadLink.download = "generated.pdf";
      // console.log("processedFileName", processedFileName);
      let downloadfile = strip_extension(basename(processedFileName));
      console.log("createPDF downloadfile: ", downloadfile)+ ".pdf";
      downloadLink.download = `${downloadfile}.pdf`;
      downloadLink.href = stream.toBlobURL('application/pdf');
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    // populate the iframe anyway so we can toggle the show
    // inject the iframe into the pdf-container div
    const pdfContainer = document.querySelector('.pdf-container');
    const pdfFrame = document.getElementById('pdf-frame');
    if (!pdfFrame) {
        const pdfFrame = document.createElement('iframe');
        pdfFrame.id = 'pdf-frame';
        pdfFrame.classList.add('pdf-frame');
        pdfFrame.src = stream.toBlobURL('application/pdf');
        pdfContainer.appendChild(pdfFrame);
    }
    // now populate the iframe with the pdf
    var iframe = document.getElementById("pdf-frame");
    iframe.src = stream.toBlobURL('application/pdf');
  });


  console.log("doc: ", doc);
  doc.end();

  // return this in case we want to use it elsewhere
  return doc;

}
