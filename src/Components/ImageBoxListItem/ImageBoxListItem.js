import React from "react";
import styles from "./ImageBoxListItem.module.css";

const ImageBoxListItem = React.memo((props) => {
  return (
    <div
      id={"imageBoxListItem_" + props.boxNumber}
      className={styles.container}
      style={{
        boxShadow: props.active
          ? "0px 4px 8px rgb(0, 0, 0, 0.25)"
          : "0px 1px 2px rgb(0, 0, 0, .25)",
        height: props.active ? 300 : 25,
      }}
    >
      <div
        className={styles.title}
        onClick={props.updateActiveImageBox}
        id={"imageBoxListItem-title_" + props.boxNumber}
      >
        Highlight Box #{props.boxNumber + 1}
        <div
          className={styles.deleteIcon}
          onClick={() => props.deleteImageBox(props.boxNumber)}
        >
          x
        </div>
      </div>
      {props.active && (
        <>
          <div className={styles.textInput}>
            <div>
              Enter text to display on mouse hover:
              <br></br>
              <i>(leave blank for no effect)</i>
            </div>
            <textarea
              id={"textArea_" + props.boxNumber}
              rows={6}
              cols={35}
              value={props.displayText}
              onChange={props.update_displayText}
              style={{ fontSize: "14px", resize: "none" }}
            ></textarea>
          </div>
          <div className={styles.textInput}>
            <div>
              Enter URL (full path) to open on mouse click:
              <br></br>
              <i>(leave blank for no effect)</i>
            </div>
            <textarea
              id={"textArea_" + props.boxNumber}
              rows={2}
              cols={35}
              value={props.clickUrl}
              onChange={props.update_clickUrl}
              style={{ fontSize: "14px", resize: "none" }}
            ></textarea>
            <div
              id={"openInNewWindowCheckbox_" + props.boxNumber}
              className={styles.openInNewWindowCheckbox}
              onClick={props.clickUrl !== "" ? props.update_clickTarget : null}
            >
              <input
                type="checkbox"
                checked={props.clickTarget === "_blank"}
                disabled={props.clickUrl === ""}
              />
              <span>Open URL in a new window</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default ImageBoxListItem;
