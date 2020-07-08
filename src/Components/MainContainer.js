/* Helpful Links 
https://blog.logrocket.com/programmatic-file-downloads-in-the-browser-9a5186298d5c/
https://developer.mozilla.org/en-US/docs/Web/API/Blob
https://developer.mozilla.org/en-US/docs/Web/API/FileReader
https://www.xul.fr/en/html5/filereader.php
https://www.npmjs.com/package/file-saver
https://stuk.github.io/jszip/
*/

import React from "react";
import JSZip from "jszip";
import saveAs from "file-saver";
import styles from "./MainContainer.module.css";
import ImageBox from "./ImageBox";
import ImageBoxListItem from "./ImageBoxListItem";

export default class MainContainer extends React.Component {
  state = {
    filename: "",
    highlightColor: "rgb(0,0,0)",

    mouseX: 0,
    mouseY: 0,

    imageSrc: "",
    imageData: "",
    imageHeight: 0,
    imageWidth: 0,

    imageBoxAdjustIndex: 0,
    imageBoxes: [],
    // imageBoxes: [
    //   {
    //     active: true, // if its clicked
    //     topLeft: [20, 20], // coord of topleft corner
    //     bottomRight: [100, 100], // coord of topright corner
    //     displayText: ""
    //   },
    // ],
  };

  componentWillUnmount = () => {
    window.removeEventListener("mousemove", this.startDrawImageBox);
    window.removeEventListener("mouseup", this.stopDrawImageBox);

    window.removeEventListener("mousemove", this.startMoveImageBox);
    window.removeEventListener("mouseup", this.stopMoveImageBox);
  };

  imageContainer_mousedown = (event) => {
    var imageX = document
        .getElementById("imageContainer")
        .getBoundingClientRect().left,
      imageY = document.getElementById("imageContainer").getBoundingClientRect()
        .top;

    var newImageBox = {
      boxNumber: this.state.imageBoxes.length,
      active: true,
      topLeft: [window.event.clientX - imageX, window.event.clientY - imageY],
      bottomRight: [
        window.event.clientX - imageX + 5,
        window.event.clientY - imageY + 5,
      ],
      action: "clickText",
      displayText: "",
    };

    var imageBoxes = [...this.state.imageBoxes];
    for (let i = 0; i < imageBoxes.length; ++i) {
      imageBoxes[i].active = false;
    }

    window.addEventListener("mousemove", this.startDrawImageBox);
    window.addEventListener("mouseup", this.stopDrawImageBox);

    this.setState({
      imageBoxes: [...imageBoxes, newImageBox],
      imageBoxAdjustIndex: this.state.imageBoxes.length,
    });
  };

  startDrawImageBox = () => {
    const imageBound = document
      .getElementById("imageContainer")
      .getBoundingClientRect();

    var updatedBox = JSON.parse(
      JSON.stringify(this.state.imageBoxes[this.state.imageBoxAdjustIndex])
    );
    updatedBox.bottomRight = [
      window.event.clientX - imageBound.left,
      window.event.clientY - imageBound.top,
    ];

    for (let i = 0; i < this.state.imageBoxes.length; ++i) {
      if (
        i !== this.state.imageBoxAdjustIndex &&
        this.boxesIntersect(updatedBox, this.state.imageBoxes[i])
      ) {
        return;
      }
    }

    if (updatedBox.bottomRight[0] > imageBound.right - imageBound.left) {
      updatedBox.bottomRight[0] = imageBound.right - imageBound.left - 1;
    } else if (updatedBox.bottomRight[0] < updatedBox.topLeft[0] + 10) {
      updatedBox.bottomRight[0] = updatedBox.topLeft[0] + 10;
    }

    if (updatedBox.bottomRight[1] > imageBound.bottom - imageBound.top) {
      updatedBox.bottomRight[1] = imageBound.bottom - imageBound.top - 1;
    } else if (updatedBox.bottomRight[1] < updatedBox.topLeft[1] + 10) {
      updatedBox.bottomRight[1] = updatedBox.topLeft[1] + 10;
    }

    var imageBoxes = [...this.state.imageBoxes];
    imageBoxes[this.state.imageBoxAdjustIndex] = updatedBox;
    this.setState({ imageBoxes });
  };

  stopDrawImageBox = () => {
    window.removeEventListener("mousemove", this.startDrawImageBox);
    window.removeEventListener("mouseup", this.stopDrawImageBox);
  };

  startMoveImageBox = (event) => {
    const xChange = event.clientX - this.state.mouseX,
      yChange = event.clientY - this.state.mouseY,
      imageBound = document
        .getElementById("imageContainer")
        .getBoundingClientRect();

    var updatedBox = JSON.parse(
      JSON.stringify(this.state.imageBoxes[this.state.imageBoxAdjustIndex])
    );
    updatedBox.topLeft[0] += xChange;
    updatedBox.topLeft[1] += yChange;
    updatedBox.bottomRight[0] += xChange;
    updatedBox.bottomRight[1] += yChange;

    for (let i = 0; i < this.state.imageBoxes.length; ++i) {
      if (
        i !== this.state.imageBoxAdjustIndex &&
        this.boxesIntersect(updatedBox, this.state.imageBoxes[i])
      ) {
        return;
      }
    }

    if (updatedBox.bottomRight[0] >= imageBound.right - imageBound.left) {
      return;
    }
    if (updatedBox.bottomRight[1] >= imageBound.bottom - imageBound.top) {
      return;
    }
    if (updatedBox.topLeft[0] < 0) {
      return;
    }
    if (updatedBox.topLeft[1] < 0) {
      return;
    }

    var imageBoxes = [...this.state.imageBoxes];
    imageBoxes[this.state.imageBoxAdjustIndex] = updatedBox;
    this.setState({ imageBoxes, mouseX: event.clientX, mouseY: event.clientY });
  };

  stopMoveImageBox = () => {
    window.removeEventListener("mousemove", this.startMoveImageBox);
    window.removeEventListener("mouseup", this.stopMoveImageBox);
  };

  boxesIntersect = (box1, box2) => {
    /* return true if box1 and box2 intersect
      boxes are defined by two points: topLeft and bottomRight
      check if any point in box1 is inside box2 and vice versa
    */
    var box1Points = [
        box1.topLeft,
        [box1.bottomRight[0], box1.topLeft[1]],
        box1.bottomRight,
        [box1.topLeft[0], box1.bottomRight[1]],
      ],
      box2Points = [
        box2.topLeft,
        [box2.bottomRight[0], box2.topLeft[1]],
        box2.bottomRight,
        [box2.topLeft[0], box2.bottomRight[1]],
      ];

    // check if box1 overlaps box2 horizontally
    if (
      box1Points[0][0] <= box2Points[0][0] &&
      box1Points[1][0] >= box2Points[1][0] &&
      ((box1Points[0][1] >= box2Points[0][1] &&
        box1Points[0][1] <= box2Points[2][1]) ||
        (box1Points[2][1] >= box2Points[0][1] &&
          box1Points[2][1] <= box2Points[2][1]))
    ) {
      return true;
    }

    // check if box1 overlaps box2 vertically
    if (
      box1Points[0][1] <= box2Points[0][1] &&
      box1Points[2][1] >= box2Points[2][1] &&
      ((box1Points[0][0] >= box2Points[0][0] &&
        box1Points[0][0] <= box2Points[1][0]) ||
        (box1Points[1][0] >= box2Points[0][0] &&
          box1Points[1][0] <= box2Points[1][0]))
    ) {
      return true;
    }

    // check if any point in box1 is inside box2
    for (let i = 0; i < box1Points.length; ++i) {
      if (
        box1Points[i][0] >= box2Points[0][0] - 1 &&
        box1Points[i][0] <= box2Points[1][0] + 1 &&
        box1Points[i][1] >= box2Points[0][1] - 1 &&
        box1Points[i][1] <= box2Points[2][1] + 1
      ) {
        return true;
      }
    }

    // check if any point in box2 is inside box1
    for (let i = 0; i < box2Points.length; ++i) {
      if (
        box2Points[i][0] >= box1Points[0][0] - 1 &&
        box2Points[i][0] <= box1Points[1][0] + 1 &&
        box2Points[i][1] >= box1Points[0][1] - 1 &&
        box2Points[i][1] <= box1Points[2][1] + 1
      ) {
        return true;
      }
    }
    return false;
  };

  download = () => {
    var htmlString =
      "<div> \n" +
      "\t <script> \n" +
      "\t\t function updateImageSize() { \n" +
      "\t\t\t image = document.getElementById('imageContentHighlighter_image_" +
      this.state.filename +
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
      this.state.filename +
      "'); \n" +
      "\t\t\t imageContainer.style.height = image.style.height; \n" +
      "\t\t\t imageContainer.style.width = image.style.width; \n" +
      "\t\t } \n\n" +
      "\t\t function showText(index){ \n" +
      "\t\t\t var newText = ''; \n" +
      "\t\t\t switch (index) { \n";

    for (const imageBox of this.state.imageBoxes) {
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
      this.state.filename +
      "'); \n" +
      "\t\t\t textArea.classList.remove('imageContentHighlighter_fadeIn'); \n" +
      "\t\t\t textArea.classList.add('imageContentHighlighter_fadeOut'); \n" +
      "\t\t\t setTimeout( function f(){ \n" +
      "\t\t\t\t textArea.innerHTML = newText; \n" +
      "\t\t\t\t textArea.classList.remove('imageContentHighlighter_fadeOut'); \n" +
      "\t\t\t\t textArea.classList.add('imageContentHighlighter_fadeIn'); \n" +
      "\t\t\t }, 250); \n" +
      "\t\t } \t\t\n" +
      "\t </script> \n" +
      "\t <style> \n" +
      "\t\t .imageContentHighlighter_mapArea{ \n" +
      "\t\t\t cursor: pointer; \n" +
      "\t\t\t position: absolute; \n" +
      "\t\t } \n" +
      "\t\t .imageContentHighlighter_fadeIn{ \n" +
      "\t\t\t animation: imageContentHighlighter_fadeIn .25s forwards; \n" +
      "\t\t } \n" +
      "\t\t @keyframes imageContentHighlighter_fadeIn{ \n" +
      "\t\t\t from {opacity: 0;} \n" +
      "\t\t\t to {opacity: 1;} \n" +
      "\t\t} \n" +
      "\t\t .imageContentHighlighter_fadeOut{ \n" +
      "\t\t\t animation: imageContentHighlighter_fadeOut .25s forwards; \n" +
      "\t\t } \n" +
      "\t\t @keyframes imageContentHighlighter_fadeOut{ \n" +
      "\t\t\t from {opacity: 1;} \n" +
      "\t\t\t to {opacity: 0;} \n" +
      "\t\t } \n" +
      "\t </style> \n" +
      "\t <div style='position: relative; display: inline-block' id='imageContentHighlighter_imageContainer'> \n" +
      "\t\t <img src='./image.png' alt='imageContentHighlighter' onload='updateImageSize()' id='imageContentHighlighter_image_" +
      this.state.filename +
      "'/> \n";

    const imageBound = document
      .getElementById("imageContainer")
      .getBoundingClientRect();

    for (const imageBox of this.state.imageBoxes) {
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
        "%' onclick='showText(" +
        imageBox.boxNumber +
        ")'></div> \n";
    }

    htmlString +=
      "\t </div> \n" +
      "\t <p id='imageContentHighlighter_textArea_" +
      this.state.filename +
      "'></p> \n" +
      "</div>";

    var zip = new JSZip();
    zip.file(
      "imageContentHighlighter-" + this.state.filename + ".html",
      htmlString
    );
    zip.file("image.png", this.state.imageData, { base64: true });
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(
        content,
        "imageContentHighlighter-" + this.state.filename + ".zip"
      );
    });
  };

  loadImage = () => {
    var filename = document.getElementById("fileUpload").files[0];
    var readUrl = new FileReader();
    readUrl.onload = this.update_imageSrc;
    readUrl.readAsDataURL(filename);
    var readData = new FileReader();
    readData.onload = this.update_imageData;
    readData.readAsArrayBuffer(filename);
  };

  update_imageSrc = (event) => {
    this.setState({ imageSrc: event.target.result });
  };

  update_imageSize = (event) => {
    var imageWidth, imageHeight;
    if (event.target.naturalWidth > event.target.naturalHeight) {
      imageWidth = window.innerWidth - 550;
      imageHeight =
        event.target.naturalHeight * (imageWidth / event.target.naturalWidth);
    } else {
      imageHeight = window.innerHeight * 0.8;
      imageWidth =
        event.target.naturalWidth * (imageHeight / event.target.naturalHeight);
    }
    this.setState({ imageHeight, imageWidth });
  };

  update_imageData = (event) => {
    this.setState({ imageData: event.target.result });
  };

  update_filename = (event) => {
    this.setState({ filename: event.target.value });
  };

  updateActiveImageBox = (event) => {
    console.log(event.target);
    if (
      !event.target.id.includes("title") &&
      !event.target.id.includes("imageBox")
    ) {
      return;
    }

    const index = parseInt(event.target.id.split("_")[1]);
    var imageBoxes = [...this.state.imageBoxes];
    for (let i = 0; i < imageBoxes.length; ++i) {
      if (i === index) {
        imageBoxes[i].active = true;
      } else {
        imageBoxes[i].active = false;
      }
    }
    this.setState({ imageBoxes });
  };

  imageBoxResize = (event) => {
    const index = parseInt(event.target.id.split("_")[1]);
    this.setState({ imageBoxAdjustIndex: index });
    window.addEventListener("mousemove", this.startDrawImageBox);
    window.addEventListener("mouseup", this.stopDrawImageBox);
  };

  imageBoxMove = (event) => {
    if (event.target.id.includes("Handle")) {
      return;
    }
    const index = parseInt(event.target.id.split("_")[1]);

    this.setState({
      imageBoxAdjustIndex: index,
      mouseX: event.clientX,
      mouseY: event.clientY,
    });

    window.addEventListener("mousemove", this.startMoveImageBox);
    window.addEventListener("mouseup", this.stopMoveImageBox);
  };

  update_displayText = (event) => {
    const index = parseInt(event.target.id.split("_")[1]);
    var imageBoxes = [...this.state.imageBoxes];
    imageBoxes[index].displayText = event.target.value;
    this.setState({ imageBoxes });
  };

  update_action = (event) => {
    const index = parseInt(event.target.id.split("_")[1]);
    var imageBoxes = [...this.state.imageBoxes];
    imageBoxes[index].action = event.target.value;
    this.setState({ imageBoxes });
  };

  update_highlightColor = (event) => {
    this.setState({ highlightColor: event.target.value });
  };

  deleteImageBox = (boxNumber) => {
    var imageBoxes = [],
      boxNumberCount = 0;
    for (let i = 0; i < this.state.imageBoxes.length; ++i) {
      if (i !== boxNumber) {
        imageBoxes.push(this.state.imageBoxes[i]);
        imageBoxes[imageBoxes.length - 1].boxNumber = boxNumberCount;
        boxNumberCount += 1;
      }
    }
    this.setState({ imageBoxes: imageBoxes });
  };

  render() {
    return (
      <div>
        <div className={styles.menu}>
          Upload Image
          <input
            id="fileUpload"
            alt="uploadedImage"
            type="file"
            multiple={false}
            accept="image/*"
            onChange={this.loadImage}
          ></input>
          <input
            type="text"
            id="filenameInput"
            placeholder="Enter a filename"
            onChange={this.update_filename}
          ></input>
          <button onClick={this.download} disabled={this.state.filename === ""}>
            Download Files
          </button>
          <br></br>
          Select Highlight Color:
          <select onChange={this.update_highlightColor}>
            <option value="rgb(0,0,0)">black</option>
            <option value="rgb(255,255,255)">white</option>
            <option value="rgb(255,0,0)">red</option>
            <option value="rgb(0,255,0)">green</option>
            <option value="rgb(0,0,255)">blue</option>
            <option value="rgb(255,255,0)">yellow</option>
          </select>
          <div
            style={{ backgroundColor: this.state.highlightColor }}
            className={styles.highlightColorIndicator}
          ></div>
        </div>
        <div
          id="imageContainer"
          className={styles.imageContainer}
          style={{
            width: this.state.imageWidth,
            height: this.state.imageHeight,
            marginLeft: (window.innerWidth - this.state.imageWidth - 500) / 2,
          }}
        >
          <div
            className={styles.imageOverlay}
            onMouseDown={this.imageContainer_mousedown}
          ></div>
          {this.state.imageSrc !== "" && (
            <img
              id="uploadedImage"
              alt="image"
              src={this.state.imageSrc}
              className={styles.image}
              style={{
                width: this.state.imageWidth,
                height: this.state.imageHeight,
              }}
              onLoad={this.update_imageSize}
            ></img>
          )}
          {this.state.imageBoxes.map((box) => (
            <ImageBox
              key={"imageBox" + box.boxNumber}
              boxNumber={box.boxNumber}
              left={box.topLeft[0]}
              top={box.topLeft[1]}
              width={box.bottomRight[0] - box.topLeft[0]}
              height={box.bottomRight[1] - box.topLeft[1]}
              active={box.active}
              highlightColor={this.state.highlightColor}
              updateActiveImageBox={this.updateActiveImageBox}
              imageBoxResize={this.imageBoxResize}
              imageBoxMove={this.imageBoxMove}
            />
          ))}
        </div>
        {this.state.imageBoxes.length > 0 && (
          <div className={styles.imageBoxList} id="imageBoxList">
            {this.state.imageBoxes.reverse().map((box) => (
              <ImageBoxListItem
                key={"imageBoxListItem" + box.boxNumber}
                boxNumber={box.boxNumber}
                active={box.active}
                displayText={box.displayText}
                action={box.action}
                updateActiveImageBox={this.updateActiveImageBox}
                update_displayText={this.update_displayText}
                update_action={this.update_action}
                deleteImageBox={this.deleteImageBox}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
