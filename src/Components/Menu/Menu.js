import React from "react";
import styles from "./Menu.module.css";

export default class Menu extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.menuItem}>
          Upload Image:{" "}
          <input
            id="fileUpload"
            alt="uploadedImage"
            type="file"
            multiple={false}
            accept="image/*"
            onChange={this.props.loadImage}
          ></input>
        </div>
        <div className={styles.menuItem}>
          Select Highlight Color:{" "}
          <select onChange={this.props.update_highlightColor}>
            <option value="rgb(0,0,0)">black</option>
            <option value="rgb(255,255,255)">white</option>
            <option value="rgb(255,0,0)">red</option>
            <option value="rgb(0,255,0)">green</option>
            <option value="rgb(0,0,255)">blue</option>
            <option value="rgb(255,255,0)">yellow</option>
          </select>
          <div
            style={{ backgroundColor: this.props.highlightColor }}
            className={styles.highlightColorIndicator}
          ></div>
        </div>
        <div className={styles.menuItem}>
          <input
            type="text"
            id="filenameInput"
            placeholder="Enter a filename"
            onChange={this.props.update_filename}
          ></input>
          <button
            onClick={this.props.download}
            disabled={this.props.filename === ""}
          >
            Download Files
          </button>
        </div>
      </div>
    );
  }
}
