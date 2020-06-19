import React from "react";
import styles from "./ImageBoxListItem.module.css";

export default class ImageBoxListItem extends React.Component {
  render() {
    return (
      <div
        id={"imageBoxListItem_" + this.props.boxNumber}
        className={styles.container}
        onClick={this.props.updateActiveImageBox}
        style={{
          boxShadow: this.props.active
            ? "0px 4px 8px rgb(0, 0, 0, 0.25)"
            : "0px 1px 2px rgb(0, 0, 0, .25)",
          height: this.props.active ? 300 : 25,
        }}
      >
        <div
          className={styles.title}
          id={"imageBoxListItem-title_" + this.props.boxNumber}
        >
          Highlight Box #{this.props.boxNumber}
        </div>
        {this.props.active && (
          <div className={styles.message}>
            Text to display when this box is clicked:{" "}
            <textarea
              id={"textArea_" + this.props.boxNumber}
              rows={10}
              cols={30}
              value={this.props.displayText}
              onChange={this.props.update_displayText}
              style={{ fontSize: "16px" }}
            ></textarea>
          </div>
        )}
      </div>
    );
  }
}
