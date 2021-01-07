import React from "react";
import styles from "./ImageContainer.module.css";
import ImageBox from "../ImageBox";

export default class ImageContainer extends React.Component {
  render() {
    return (
      <div
        id="imageContainer"
        className={styles.imageContainer}
        style={{
          width: this.props.imageWidth,
          height: this.props.imageHeight,
          marginLeft: (window.innerWidth - this.props.imageWidth - 500) / 2,
        }}
      >
        <div
          className={styles.imageOverlay}
          onMouseDown={this.props.imageContainer_mousedown}
          data-test="imageOverlay"
        ></div>
        {this.props.imageSrc !== "" && (
          <img
            id="uploadedImage"
            alt="uploadedImage"
            src={this.props.imageSrc}
            className={styles.image}
            style={{
              width: this.props.imageWidth,
              height: this.props.imageHeight,
            }}
            onLoad={this.props.update_imageSize}
            data-test="uploadedImage"
          ></img>
        )}
        {this.props.imageBoxes.map((box) => (
          <ImageBox
            key={"imageBox" + box.boxNumber}
            boxNumber={box.boxNumber}
            left={box.topLeft[0]}
            top={box.topLeft[1]}
            width={box.bottomRight[0] - box.topLeft[0]}
            height={box.bottomRight[1] - box.topLeft[1]}
            active={box.active}
            highlightColor={this.props.highlightColor}
            updateActiveImageBox={this.props.updateActiveImageBox}
            imageBoxResize={this.props.imageBoxResize}
            imageBoxMove={this.props.imageBoxMove}
          />
        ))}
      </div>
    );
  }
}
