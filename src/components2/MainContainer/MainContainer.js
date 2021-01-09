/* Helpful Links 
https://blog.logrocket.com/programmatic-file-downloads-in-the-browser-9a5186298d5c/
https://developer.mozilla.org/en-US/docs/Web/API/Blob
https://developer.mozilla.org/en-US/docs/Web/API/FileReader
https://www.xul.fr/en/html5/filereader.php
https://www.npmjs.com/package/file-saver
https://stuk.github.io/jszip/
*/

import React from "react";
import "antd/dist/antd.css";
import JSZip from "jszip";
import saveAs from "file-saver";
import styles from "./MainContainer.module.css";
import ImageContainer from "../ImageContainer";
import ImageBoxListItem from "../ImageBoxListItem";
import MainMenu from "../MainMenu";
import ProjectMenu from "../ProjectMenu";
import ModalMenu from "../ModalMenu";
import buildHtml from "./buildHtml";
import {
  DatabaseOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default class MainContainer extends React.Component {
  state = {
    projectName: null,
    highlightColor: "#ff5722",
    projectMenuContainerScrollTop: 0,
    modalMenuView: [false, false, false, false], // Account, New Project, Projects, Get Code

    user: null,

    mouseX: 0,
    mouseY: 0,

    imageSrc: "",
    imageData: "",
    imageHeight: 0,
    imageWidth: 0,

    imageBoxAdjustIndex: 0,
    imageBoxes: [],

    /*
    exampleImageBox = 
      {
        active: true, // if its clicked
        topLeft: [x, y], // coord of top-left corner
        bottomRight: [x, y], // coord of bottom-right corner
        displayText: "", // text to display on hover
        clickUrl: ""
        clickTarget: "_self",
      },
    */
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.trigger_update_imageSize);
  };

  componentWillUnmount = () => {
    window.removeEventListener("mousemove", this.startDrawImageBox);
    window.removeEventListener("mouseup", this.stopDrawImageBox);

    window.removeEventListener("mousemove", this.startMoveImageBox);
    window.removeEventListener("mouseup", this.stopMoveImageBox);

    window.removeEventListener("resize", this.trigger_update_imageSize);
  };

  imageContainer_mousedown = (event) => {
    var imageContainer = document.getElementById("imageContainer");

    if (!imageContainer) {
      return;
    }

    var imageX = imageContainer.getBoundingClientRect().left,
      imageY = imageContainer.getBoundingClientRect().top;

    var newImageBox = {
      boxNumber: this.state.imageBoxes.length,
      active: true,
      topLeft: [window.event.clientX - imageX, window.event.clientY - imageY],
      bottomRight: [
        window.event.clientX - imageX + 5,
        window.event.clientY - imageY + 5,
      ],
      displayText: "",
      clickUrl: "",
      clickTarget: "_self",
    };

    var imageBoxes = JSON.parse(JSON.stringify(this.state.imageBoxes));
    for (let i = 0; i < imageBoxes.length; ++i) {
      imageBoxes[i].active = false;
    }

    window.addEventListener("mousemove", this.startDrawImageBox);
    window.addEventListener("mouseup", this.stopDrawImageBox);
    this.scrollProjectMenuContainer(this.state.imageBoxes.length);
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

    var imageBoxes = JSON.parse(JSON.stringify(this.state.imageBoxes));
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

    var imageBoxes = JSON.parse(JSON.stringify(this.state.imageBoxes));
    imageBoxes[this.state.imageBoxAdjustIndex] = updatedBox;
    this.setState({ imageBoxes, mouseX: event.clientX, mouseY: event.clientY });
  };

  stopMoveImageBox = () => {
    window.removeEventListener("mousemove", this.startMoveImageBox);
    window.removeEventListener("mouseup", this.stopMoveImageBox);
  };

  boxesIntersect = (box1, box2) => {
    /* return true if box1 and box2 intersect.
      boxes are defined by two points: topLeft and bottomRight.
      check if any point in box1 is inside box2 and vice versa.
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

  downloadHtml = () => {
    const html = buildHtml(this.state.projectName, this.state.imageBoxes);
    var serilazer = new XMLSerializer();
    var htmlString = serilazer.serializeToString(html);
    htmlString = htmlString.replace(/&gt;/g, ">");

    var zip = new JSZip();
    zip.file("imageMapper-" + this.state.projectName + ".html", htmlString);
    zip.file("image.png", this.state.imageData, { base64: true });
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "imageMapper-" + this.state.projectName + ".zip");
    });
  };

  loadImage = () => {
    var projectName = document.getElementById("fileUpload").files[0];
    var readUrl = new FileReader();
    readUrl.onload = this.update_imageSrc;
    readUrl.readAsDataURL(projectName);
    var readData = new FileReader();
    readData.onload = this.update_imageData;
    readData.readAsArrayBuffer(projectName);
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

    if (
      imageHeight !== this.state.imageHeight ||
      imageWidth !== this.state.imageWidth
    ) {
      this.scaleImageBoxes(imageHeight, imageWidth);
    }
    this.setState({
      imageHeight,
      imageWidth,
      imageHeight_prev: this.state.imageHeight,
      imageWidth_prev: this.state.imageWidth,
    });
  };

  scaleImageBoxes = (newImageHeight, newImageWidth) => {
    const heightRatio = newImageHeight / this.state.imageHeight,
      widthRatio = newImageWidth / this.state.imageWidth;

    var imageBoxes = JSON.parse(JSON.stringify(this.state.imageBoxes));

    for (let i = 0; i < imageBoxes.length; ++i) {
      imageBoxes[i].topLeft[0] *= widthRatio;
      imageBoxes[i].topLeft[1] *= heightRatio;
      imageBoxes[i].bottomRight[0] *= heightRatio;
      imageBoxes[i].bottomRight[1] *= widthRatio;
    }

    this.setState({ imageBoxes });
  };

  update_imageData = (event) => {
    this.setState({ imageData: event.target.result });
  };

  trigger_update_imageSize = () => {
    const imageElement = document.getElementById("uploadedImage");

    if (imageElement) {
      const loadEvent = new Event("load");
      imageElement.dispatchEvent(loadEvent);
    }
  };

  updateActiveImageBox = (event) => {
    if (
      !event.target.id.includes("title") &&
      !event.target.id.includes("imageBox")
    ) {
      return;
    }

    const index = parseInt(event.target.id.split("_")[1]);
    var imageBoxes = JSON.parse(JSON.stringify(this.state.imageBoxes));
    for (let i = 0; i < imageBoxes.length; ++i) {
      if (i === index) {
        imageBoxes[i].active = true;
      } else {
        imageBoxes[i].active = false;
      }
    }

    this.scrollProjectMenuContainer(index);
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
    var imageBoxes = JSON.parse(JSON.stringify(this.state.imageBoxes));
    imageBoxes[index].displayText = event.target.value;
    this.setState({ imageBoxes });
  };

  update_clickUrl = (event) => {
    const index = parseInt(event.target.id.split("_")[1]);
    var imageBoxes = JSON.parse(JSON.stringify(this.state.imageBoxes));
    imageBoxes[index].clickUrl = event.target.value;
    this.setState({ imageBoxes });
  };

  update_clickTarget = (event) => {
    const index = parseInt(event.currentTarget.id.split("_")[1]);
    var imageBoxes = JSON.parse(JSON.stringify(this.state.imageBoxes));
    imageBoxes[index].clickTarget =
      imageBoxes[index].clickTarget === "_self" ? "_blank" : "_self";
    this.setState({ imageBoxes });
  };

  update_highlightColor = (event) => {
    console.log(event.target.value);
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

  scrollProjectMenuContainer = (index) => {
    var projectMenuContainer = document.getElementById("projectMenuContainer");
    if (!projectMenuContainer) {
      return;
    }
    projectMenuContainer.scrollTop = index * 70;
  };

  update_modalMenuView = (index) => {
    var modalMenuView = JSON.parse(JSON.stringify(this.state.modalMenuView));
    for (let i = 0; i < modalMenuView.length; ++i) {
      if (i === index) {
        modalMenuView[i] = true;
      } else {
        modalMenuView[i] = false;
      }
    }
    this.setState({ modalMenuView });
  };

  startNewProject = () => {
    var projectNameElement = document.getElementById(
      "ModalMenu_newProject_projectName"
    );
    if (!projectNameElement) {
      return;
    }
    this.setState({
      projectName: projectNameElement.value,
    });
  };

  login_test = () => {
    this.setState({ user: "TEST_USER" });
    this.update_modalMenuView(-1);
  };

  render() {
    if (!this.state.user) {
      return (
        <div>
          <MainMenu
            update_modalMenuView={this.update_modalMenuView}
            user={this.state.user}
          />
          <div>
            <div
              className={styles.noProjectContainer}
              onClick={() => this.update_modalMenuView(0)}
              data-test="MainContainer_account"
            >
              <UserOutlined className={styles.noProjectIcon} />
              <div className={styles.noProjectText} data-test="openProject">
                Login
              </div>
            </div>
          </div>
          <ModalMenu
            menuView={this.state.modalMenuView}
            update_modalMenuView={this.update_modalMenuView}
            downloadHtml={this.downloadHtml}
            startNewProject={this.startNewProject}
            login_test={this.login_test}
          />
        </div>
      );
    }

    if (!this.state.projectName) {
      return (
        <div>
          <MainMenu
            update_modalMenuView={this.update_modalMenuView}
            user={this.state.user}
          />
          <div>
            <div
              className={styles.noProjectContainer}
              onClick={() => this.update_modalMenuView(2)}
            >
              <DatabaseOutlined className={styles.noProjectIcon} />
              <div className={styles.noProjectText} data-test="openProject">
                Open A Project
              </div>
            </div>
            <div
              className={styles.noProjectContainer}
              onClick={() => this.update_modalMenuView(1)}
              data-test="MainContainer_startProject"
            >
              <PlusCircleOutlined className={styles.noProjectIcon} />
              <div className={styles.noProjectText} data-test="startNewProject">
                Start New A Project
              </div>
            </div>
          </div>
          <ModalMenu
            menuView={this.state.modalMenuView}
            update_modalMenuView={this.update_modalMenuView}
            downloadHtml={this.downloadHtml}
            startNewProject={this.startNewProject}
            login_test={this.login_test}
          />
        </div>
      );
    }

    return (
      <div>
        <MainMenu
          update_modalMenuView={this.update_modalMenuView}
          user={this.state.user}
        />
        <div
          id="projectMenuContainer"
          data-test="projectMenuContainer"
          className={styles.projectMenuContainer}
        >
          <ProjectMenu
            projectName={this.state.projectName}
            loadImage={this.loadImage}
            highlightColor={this.state.highlightColor}
            update_highlightColor={this.update_highlightColor}
            update_modalMenuView={this.update_modalMenuView}
          />
          <div id="imageBoxList">
            {this.state.imageBoxes.map((box) => (
              <ImageBoxListItem
                key={"imageBoxListItem" + box.boxNumber}
                boxNumber={box.boxNumber}
                active={box.active}
                displayText={box.displayText}
                clickUrl={box.clickUrl}
                clickTarget={box.clickTarget}
                updateActiveImageBox={this.updateActiveImageBox}
                update_displayText={this.update_displayText}
                update_clickUrl={this.update_clickUrl}
                update_clickTarget={this.update_clickTarget}
                deleteImageBox={this.deleteImageBox}
              />
            ))}
          </div>
        </div>
        <ImageContainer
          imageBoxes={this.state.imageBoxes}
          imageWidth={this.state.imageWidth}
          imageHeight={this.state.imageHeight}
          imageContainer_mousedown={this.imageContainer_mousedown}
          imageSrc={this.state.imageSrc}
          update_imageSize={this.update_imageSize}
          highlightColor={this.state.highlightColor}
          updateActiveImageBox={this.updateActiveImageBox}
          imageBoxResize={this.imageBoxResize}
          imageBoxMove={this.imageBoxMove}
        />
        <ModalMenu
          menuView={this.state.modalMenuView}
          update_modalMenuView={this.update_modalMenuView}
          downloadHtml={this.downloadHtml}
          startNewProject={this.startNewProject}
          login_test={this.login_test}
        />
      </div>
    );
  }
}