import React from "react";
import styles from "./ProjectMenu.module.css";
import { Tooltip } from "antd";
import {
  FileImageOutlined,
  CodeOutlined,
  PlusCircleOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

export default class ProjectMenu extends React.Component {
  render() {
    if (!this.props.projectName) {
      return (
        <div className={styles.container}>
          <div className={styles.noProjectContainer}>
            <DatabaseOutlined
              className={styles.icon}
              style={{ marginLeft: 0, marginTop: 5 }}
              onClick={() => this.props.update_modalMenuView(2)}
            />
            <div
              onClick={() => this.props.update_modalMenuView(2)}
              className={styles.noProjectText}
              data-test="openProject"
            >
              Open A Project
            </div>
          </div>
          <div className={styles.noProjectContainer}>
            <PlusCircleOutlined
              className={styles.icon}
              style={{ marginLeft: 0, marginTop: 5 }}
              onClick={() => this.props.update_modalMenuView(1)}
            />
            <div
              onClick={() => this.props.update_modalMenuView(1)}
              className={styles.noProjectText}
              data-test="startNewProject"
            >
              Start New A Project
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.projectName} data-test="projectName">
          {this.props.projectName}
        </div>
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
              data-test="uploadImageButton"
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
            <CodeOutlined
              className={styles.icon}
              onClick={this.props.download}
              data-test="downloadFilesButton"
              onClick={() => this.props.update_modalMenuView(3)}
            />
          </Tooltip>
        </div>
      </div>
    );
  }
}
