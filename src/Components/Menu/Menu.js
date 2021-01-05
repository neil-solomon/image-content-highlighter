import React from "react";
import styles from "./Menu.module.css";
import {
  UploadOutlined,
  DownloadOutlined,
  SaveOutlined,
  UserOutlined,
  CodeOutlined,
} from "@ant-design/icons";

export default class Menu extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <UploadOutlined />
        <DownloadOutlined />
        <SaveOutlined />
        <UserOutlined />
        <CodeOutlined />
        <div className={styles.menuItem}>
          Upload Image:{" "}
          <input
            id="fileUpload"
            alt="uploadedImage"
            type="file"
            multiple={false}
            accept="image/*"
            onChange={this.props.loadImage}
            data-test="uploadImageInput"
          ></input>
        </div>
        <div className={styles.menuItem}>
          Select Highlight Color:{" "}
          <select
            onChange={this.props.update_highlightColor}
            data-test="highlightColorSelect"
          >
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
            data-test="highlightColorDiv"
          ></div>
        </div>
        <div className={styles.menuItem}>
          <input
            type="text"
            id="filenameInput"
            placeholder="Enter a filename"
            onChange={this.props.update_filename}
            data-test="filenameInput"
          ></input>
          <button
            onClick={this.props.download}
            disabled={this.props.filename === ""}
            data-test="downloadFilesButton"
          >
            Download Files
          </button>
        </div>
      </div>
    );
  }
}
