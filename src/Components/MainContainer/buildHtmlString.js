const buildHtmlString = (imageBoxes, filename) => {
  console.log(filename);
  var htmlString =
    "<div> \n" +
    "\t <script> \n" +
    "\t\t function updateImageSize() { \n" +
    "\t\t\t image = document.getElementById('imageContentHighlighter_image_" +
    filename +
    "'); \n" +
    "\t\t\t if (image.naturalWidth > image.parentElement.parentElement.clientWidth) { \n" +
    "\t\t\t\t image.style.width = image.parentElement.parentElement.clientWidth; \n" +
    "\t\t\t\t image.style.height *= image.naturalWidth / image.style.width; \n" +
    "\t\t\t } \n" +
    "\t\t\t if (image.naturalHeight > image.parentElement.parentElement.clientHeight) { \n" +
    "\t\t\t\t var firstHeight = image.style.height; \n" +
    "\t\t\t\t image.style.height = image.parentElement.parentElement.clientHeight; \n" +
    "\t\t\t\t image.style.width *= firstHeight / image.style.height; \n" +
    "\t\t\t } \n" +
    "\t\t\t imageContainer = document.getElementById('imageContentHighlighter_imageContainer_" +
    filename +
    "'); \n" +
    "\t\t\t imageContainer.style.height = image.style.height; \n" +
    "\t\t\t imageContainer.style.width = image.style.width; \n" +
    "\t\t } \n\n" +
    "\t\t function showText(index, top, left){ \n" +
    "\t\t\t var newText = ''; \n" +
    "\t\t\t switch (index) { \n";

  for (const imageBox of imageBoxes) {
    htmlString +=
      "\t\t\t\t case " +
      imageBox.boxNumber +
      ":\n\t\t\t\t\t newText = '" +
      imageBox.displayText +
      "'; \n\t\t\t\t break; \n";
  }

  htmlString +=
    "\t\t\t } \n" +
    "\t\t\t textArea = document.getElementById('imageContentHighlighter_textArea_" +
    filename +
    "'); \n" +
    "\t\t\t\t textArea.innerHTML = newText; \n" +
    "\t\t\t textArea.style.opacity = 1; \n" +
    "\t\t\t textArea.style.top = top.toString() + '%'; \n" +
    "\t\t\t textArea.style.left = left.toString() + '%'; \n" +
    "\t\t } \t\t\n" +
    "\t\t function hideText(index){ \n" +
    "\t\t\t textArea = document.getElementById('imageContentHighlighter_textArea_" +
    filename +
    "'); \n" +
    "\t\t\t textArea.style.opacity = 0; \n" +
    "\t\t } \t\t\n" +
    "\t </script> \n" +
    "\t <style> \n" +
    "\t\t .imageContentHighlighter_mapArea{ \n" +
    "\t\t\t cursor: pointer; \n" +
    "\t\t\t position: absolute; \n" +
    "\t\t } \n" +
    "\t\t .imageContentHighlighter_textArea{ \n" +
    "\t\t\t font-size: 30px; \n" +
    "\t\t\t color: white; \n" +
    "\t\t\t padding: 5px; \n" +
    "\t\t\t border: 1px solid black; \n" +
    "\t\t\t border-radius: 10px; \n" +
    "\t\t\t background: rgb(0,0,0,.75); \n" +
    "\t\t\t opacity: 0; \n" +
    "\t\t\t transition: opacity .25s; \n" +
    "\t\t\t position: absolute; \n" +
    "\t\t\t top: 0; \n" +
    "\t\t\t left: 0; \n" +
    "\t\t } \n" +
    "\t </style> \n" +
    "\t <div style='position: relative; display: inline-block' id='imageContentHighlighter_imageContainer_" +
    filename +
    "'> \n" +
    "\t\t <img src='./image.png' alt='imageContentHighlighter' onload='updateImageSize()' id='imageContentHighlighter_image_" +
    filename +
    "'/> \n";

  const imageBound = document
    .getElementById("imageContainer")
    .getBoundingClientRect();

  for (const imageBox of imageBoxes) {
    htmlString +=
      "\t\t <div class='imageContentHighlighter_mapArea' style='top: " +
      (100 * imageBox.topLeft[1]) / imageBound.height +
      "%; left: " +
      (100 * imageBox.topLeft[0]) / imageBound.width +
      "%; width: " +
      (100 * (imageBox.bottomRight[0] - imageBox.topLeft[0])) /
        imageBound.width +
      "%; height: " +
      (100 * (imageBox.bottomRight[1] - imageBox.topLeft[1])) /
        imageBound.height +
      "%' onmouseenter='showText(" +
      imageBox.boxNumber +
      " , " +
      (100 * imageBox.bottomRight[1]) / imageBound.height +
      " , " +
      (100 * imageBox.topLeft[0]) / imageBound.width +
      ")' onmouseleave='hideText()'></div> \n";
  }

  htmlString +=
    "\t\t <div class='imageContentHighlighter_textArea' id='imageContentHighlighter_textArea_" +
    filename +
    "'></div> \n" +
    "\t </div> \n" +
    "</div>";

  return htmlString;
};

export default buildHtmlString;
