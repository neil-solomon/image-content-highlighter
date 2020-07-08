import React from "react";
import styles from "./ImageBox.module.css";

export default class ImageBox extends React.Component {
  render() {
    return (
      <div
        id={"imageBox_" + this.props.boxNumber}
        onClick={this.props.updateActiveImageBox}
        onMouseDown={this.props.active ? this.props.imageBoxMove : null}
        className={styles.imageBox}
        style={{
          top: this.props.top,
          left: this.props.left,
          width: this.props.width,
          height: this.props.height,
          border: this.props.active
            ? "2px solid " + this.props.highlightColor
            : "2px dotted " + this.props.highlightColor,
          cursor: this.props.active ? "move" : "pointer",
          color: this.props.highlightColor,
          backgroundColor:
            this.props.highlightColor.slice(
              0,
              this.props.highlightColor.length - 1
            ) + ",.1)",
        }}
      >
        {this.props.boxNumber + 1}
        {this.props.active && (
          <div
            id={"imageBoxHandle_" + this.props.boxNumber}
            className={styles.imageBoxHandle}
            style={{
              top: this.props.height - 5,
              left: this.props.width - 5,
              cursor: this.props.active ? "nw-resize" : "pointer",
              backgroundColor: this.props.highlightColor,
            }}
            onMouseDown={this.props.imageBoxResize}
          ></div>
        )}
      </div>
    );
  }
}
