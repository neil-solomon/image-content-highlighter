const buildHtml = (filename, imageBoxes) => {
  var container = document.createElement("DIV");

  var scriptTag = document.createElement("SCRIPT");
  scriptTag.innerHTML =
    make_updateImageSize(filename) +
    make_showText(filename, imageBoxes) +
    make_hideText(filename);
  container.appendChild(scriptTag);

  var styleTag = document.createElement("STYLE");
  styleTag.innerHTML = make_style();
  container.appendChild(styleTag);

  var imageContainer = document.createElement("DIV");
  imageContainer.style.position = "relative";
  imageContainer.style.display = "inline-block";
  imageContainer.id = "imageMapper_imageContainer_" + filename;
  container.appendChild(imageContainer);

  imageContainer.innerHTML +=
    "<img src='./image.png' alt='imageMapper' onload='updateImageSize()' id='imageMapper_image_" +
    filename +
    "'/>";

  const imageElement = document.getElementById("imageContainer");
  var imageHeight = 1,
    imageWidth = 1;
  if (imageElement) {
    imageHeight = imageElement.getBoundingClientRect().height;
    imageWidth = imageElement.getBoundingClientRect().width;
  }
  if (imageHeight < 1) {
    imageHeight = 1;
  }
  if (imageWidth < 1) {
    imageWidth = 1;
  }

  for (const imageBox of imageBoxes) {
    if (imageBox.displayText !== "") {
      if (imageBox.clickUrl !== "") {
        imageContainer.innerHTML +=
          "<a href='" +
          imageBox.clickUrl +
          "' target='" +
          imageBox.clickTarget +
          "' rel=noopener>" +
          " <div class='imageMapper_mapArea' style='top: " +
          (100 * imageBox.topLeft[1]) / imageHeight +
          "%; left: " +
          (100 * imageBox.topLeft[0]) / imageWidth +
          "%; width: " +
          (100 * (imageBox.bottomRight[0] - imageBox.topLeft[0])) / imageWidth +
          "%; height: " +
          (100 * (imageBox.bottomRight[1] - imageBox.topLeft[1])) /
            imageHeight +
          "%' onmouseenter='showText(" +
          imageBox.boxNumber +
          " , " +
          (100 * imageBox.bottomRight[1]) / imageHeight +
          " , " +
          (100 * imageBox.topLeft[0]) / imageWidth +
          ")' onmouseleave='hideText()'></div></a>";
      } else {
        imageContainer.innerHTML +=
          " <div class='imageMapper_mapArea' style='top: " +
          (100 * imageBox.topLeft[1]) / imageHeight +
          "%; left: " +
          (100 * imageBox.topLeft[0]) / imageWidth +
          "%; width: " +
          (100 * (imageBox.bottomRight[0] - imageBox.topLeft[0])) / imageWidth +
          "%; height: " +
          (100 * (imageBox.bottomRight[1] - imageBox.topLeft[1])) /
            imageHeight +
          "%' onmouseenter='showText(" +
          imageBox.boxNumber +
          " , " +
          (100 * imageBox.bottomRight[1]) / imageHeight +
          " , " +
          (100 * imageBox.topLeft[0]) / imageWidth +
          ")' onmouseleave='hideText()'></div>";
      }
    }
  }

  var textArea = document.createElement("DIV");
  textArea.classList.add("imageMapper_textArea");
  textArea.id = "imageMapper_textArea_" + filename;
  imageContainer.appendChild(textArea);

  return container;
};

export default buildHtml;

const make_updateImageSize = (filename) => {
  return (
    " function updateImageSize() { " +
    " image = document.getElementById('imageMapper_image_" +
    filename +
    "'); " +
    " if (image.naturalWidth > image.parentElement.parentElement.clientWidth) { " +
    " image.style.width = image.parentElement.parentElement.clientWidth; " +
    " image.style.height *= image.naturalWidth / image.style.width; " +
    " } " +
    " if (image.naturalHeight > image.parentElement.parentElement.clientHeight) { " +
    " var firstHeight = image.style.height; " +
    " image.style.height = image.parentElement.parentElement.clientHeight; " +
    " image.style.width *= firstHeight / image.style.height; " +
    " } " +
    " imageContainer = document.getElementById('imageMapper_imageContainer_" +
    filename +
    "'); " +
    " imageContainer.style.height = image.style.height; " +
    " imageContainer.style.width = image.style.width; " +
    " } "
  );
};

const make_showText = (filename, imageBoxes) => {
  var htmlString =
    " function showText(index, top, left){ " +
    " var newText = ''; " +
    " switch (index) { ";
  for (const imageBox of imageBoxes) {
    htmlString +=
      " case " +
      imageBox.boxNumber +
      ": newText = '" +
      imageBox.displayText +
      "';  break; ";
  }
  htmlString +=
    " default: break;} " +
    " textArea = document.getElementById('imageMapper_textArea_" +
    filename +
    "'); " +
    " textArea.innerHTML = newText; " +
    " textArea.style.opacity = 1; " +
    " textArea.style.top = top.toString() + '%'; " +
    " textArea.style.left = left.toString() + '%'; " +
    " } ";

  return htmlString;
};

const make_hideText = (filename) => {
  return (
    "function hideText(index){ " +
    " textArea = document.getElementById('imageMapper_textArea_" +
    filename +
    "'); " +
    " textArea.style.opacity = 0; " +
    " } "
  );
};

const make_style = () => {
  return (
    " .imageMapper_mapArea{ " +
    " cursor: pointer; " +
    " position: absolute; " +
    " } " +
    " .imageMapper_textArea{ " +
    " font-size: 30px; " +
    " color: white; " +
    " padding: 5px; " +
    " border: 1px solid black; " +
    " border-radius: 10px; " +
    " background: rgb(0,0,0,.75); " +
    " opacity: 0; " +
    " transition: opacity .25s; " +
    " position: absolute; " +
    " top: 0; " +
    " left: 0; " +
    " } "
  );
};
