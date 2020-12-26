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
          <div className={styles.menu}>
            <select
              id={"selectAction_" + props.boxNumber}
              onChange={props.update_action}
              value={props.action}
            >
              <option value={"clickText"}>On Click: Display text.</option>
              <option value={"hoverText"}>On Hover: Display text.</option>
              <option value={"linkThisWindow"}>
                On Click: Open link in this window.
              </option>
              <option value={"linkNewWindow"}>
                On Click: Open link in new window.
              </option>
              <option value={"linkNewTab"}>
                On Click: Open link in new tab.
              </option>
            </select>
          </div>
          <div className={styles.textInput}>
            <div>
              {props.action === "clickText" && <>Text To Display:</>}
              {props.action === "hoverText" && <>Text To Display:</>}
              {props.action === "linkThisWindow" && <>URL:</>}
              {props.action === "linkNewWindow" && <>URL:</>}
              {props.action === "linkNewTab" && <>URL:</>}
            </div>
            <textarea
              id={"textArea_" + props.boxNumber}
              rows={10}
              cols={30}
              value={props.displayText}
              onChange={props.update_displayText}
              style={{ fontSize: "16px" }}
            ></textarea>
          </div>
        </>
      )}
    </div>
  );
});

export default ImageBoxListItem;
