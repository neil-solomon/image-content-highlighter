import React from "react";
import styles from "./ImageBox.module.css";

const ImageBox = React.memo((props) => {
  return (
    <div
      id={"imageBox_" + props.boxNumber}
      onClick={props.updateActiveImageBox}
      onMouseDown={props.active ? props.imageBoxMove : null}
      className={styles.imageBox}
      style={{
        top: props.top,
        left: props.left,
        width: props.width,
        height: props.height,
        border: props.active
          ? "2px solid " + props.highlightColor
          : "2px dotted " + props.highlightColor,
        cursor: props.active ? "move" : "pointer",
        color: props.highlightColor,
        backgroundColor:
          props.highlightColor.slice(0, props.highlightColor.length - 1) +
          ",.1)",
      }}
    >
      {props.boxNumber + 1}
      {props.active && (
        <div
          id={"imageBoxHandle_" + props.boxNumber}
          className={styles.imageBoxHandle}
          style={{
            top: props.height - 5,
            left: props.width - 5,
            cursor: props.active ? "nw-resize" : "pointer",
            backgroundColor: props.highlightColor,
          }}
          onMouseDown={props.imageBoxResize}
        ></div>
      )}
    </div>
  );
});

export default ImageBox;
