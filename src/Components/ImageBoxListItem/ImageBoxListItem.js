import React from "react";
import styles from "./ImageBoxListItem.module.css";

export default class ImageBoxListItem extends React.PureComponent {
  render() {
    return (
      <div
        id={"imageBoxListItem_" + this.props.boxNumber}
        data-test={"imageBoxListItem_" + this.props.boxNumber}
        className={styles.container}
        style={{
          boxShadow: this.props.active
            ? "0px 4px 8px rgb(0, 0, 0, 0.25)"
            : "0px 1px 2px rgb(0, 0, 0, .25)",
          height: this.props.active ? 400 : 50,
        }}
      >
        <div
          className={styles.title}
          onClick={this.props.updateActiveImageBox}
          id={"imageBoxListItem-title_" + this.props.boxNumber}
          data-test={"imageBoxListItem-title_" + this.props.boxNumber}
        >
          Highlight Box #{this.props.boxNumber + 1}
          <div
            className={styles.deleteIcon}
            onClick={() => this.props.deleteImageBox(this.props.boxNumber)}
            data-test={"imageBoxListItem-delete_" + this.props.boxNumber}
          >
            x
          </div>
        </div>
        {this.props.active && (
          <>
            <div className={styles.textInput}>
              <div>
                Enter text to display on mouse hover:
                <br></br>
                <i>(leave blank for no effect)</i>
              </div>
              <textarea
                id={"imageBoxListItem-displayText_" + this.props.boxNumber}
                data-test={
                  "imageBoxListItem-displayText_" + this.props.boxNumber
                }
                rows={6}
                cols={35}
                value={this.props.displayText}
                onChange={this.props.update_displayText}
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
                id={"imageBoxListItem-clickUrl_" + this.props.boxNumber}
                data-test={"imageBoxListItem-clickUrl_" + this.props.boxNumber}
                rows={2}
                cols={35}
                value={this.props.clickUrl}
                onChange={this.props.update_clickUrl}
                style={{ fontSize: "14px", resize: "none" }}
              ></textarea>
              <div
                id={"openInNewWindowCheckbox_" + this.props.boxNumber}
                data-test={"openInNewWindowCheckbox_" + this.props.boxNumber}
                className={styles.openInNewWindowCheckbox}
                onClick={
                  this.props.clickUrl !== ""
                    ? this.props.update_clickTarget
                    : null
                }
              >
                <input
                  type="checkbox"
                  checked={this.props.clickTarget === "_blank"}
                  disabled={this.props.clickUrl === ""}
                  data-test={
                    "imageBoxListItem-clickTarget_" + this.props.boxNumber
                  }
                />
                <span>Open URL in a new window</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
