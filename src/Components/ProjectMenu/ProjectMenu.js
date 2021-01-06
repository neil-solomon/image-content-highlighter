import React from "react";
import styles from "./ProjectMenu.module.css";
import { Tooltip } from "antd";
import { FileImageOutlined, CodeOutlined } from "@ant-design/icons";

export default class ProjectMenu extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div>Project Name</div>
        <div>
          <div className={styles.colorPicker}>
            <Tooltip title="Change Highlight Color">
              <input
                type="color"
                onChange={this.props.update_highlightColor}
                value={this.props.highlightColor}
                data-test="highlightColorInput"
              />
            </Tooltip>
          </div>
          <Tooltip title="Upload An Image">
            <FileImageOutlined
              className={styles.icon}
              onClick={() => {
                document.getElementById("fileUpload").click();
              }}
            />
          </Tooltip>
          <input
            id="fileUpload"
            alt="uploadedImage"
            type="file"
            multiple={false}
            accept="image/*"
            onChange={this.props.loadImage}
            data-test="uploadImageInput"
            style={{ display: "none" }}
          ></input>
          <Tooltip title="Download The Code">
            <CodeOutlined className={styles.icon} />
          </Tooltip>
          {/* <div className={styles.menuItem}>
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
        </div> */}
        </div>
      </div>
    );
  }
}
