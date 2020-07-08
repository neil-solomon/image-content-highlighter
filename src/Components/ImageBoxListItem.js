import React from "react";
import styles from "./ImageBoxListItem.module.css";

export default class ImageBoxListItem extends React.Component {
  render() {
    return (
      <div
        id={"imageBoxListItem_" + this.props.boxNumber}
        className={styles.container}
        style={{
          boxShadow: this.props.active
            ? "0px 4px 8px rgb(0, 0, 0, 0.25)"
            : "0px 1px 2px rgb(0, 0, 0, .25)",
          height: this.props.active ? 300 : 25,
        }}
      >
        <div
          className={styles.title}
          onClick={this.props.updateActiveImageBox}
          id={"imageBoxListItem-title_" + this.props.boxNumber}
        >
          Highlight Box #{this.props.boxNumber + 1}
          <div
            className={styles.deleteIcon}
            onClick={() => this.props.deleteImageBox(this.props.boxNumber)}
          >
            x
          </div>
        </div>
        {this.props.active && (
          <>
            <div className={styles.menu}>
              <select
                id={"selectAction_" + this.props.boxNumber}
                onChange={this.props.update_action}
                value={this.props.action}
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
                {this.props.action === "clickText" && <>Text To Display:</>}
                {this.props.action === "hoverText" && <>Text To Display:</>}
                {this.props.action === "linkThisWindow" && <>URL:</>}
                {this.props.action === "linkNewWindow" && <>URL:</>}
                {this.props.action === "linkNewTab" && <>URL:</>}
              </div>
              <textarea
                id={"textArea_" + this.props.boxNumber}
                rows={10}
                cols={30}
                value={this.props.displayText}
                onChange={this.props.update_displayText}
                style={{ fontSize: "16px" }}
              ></textarea>
            </div>
          </>
        )}
      </div>
    );
  }
}
