import React from "react";
import styles from "./ProjectMenu.module.css";
import { Tooltip, Modal } from "antd";
import { FileImageOutlined, CodeOutlined } from "@ant-design/icons";

export default class ProjectMenu extends React.Component {
  render() {
    return (
      <>
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
                onClick={this.props.openGetCodeModal}
              />
            </Tooltip>
          </div>
        </div>
        <Modal
          title="Get The Code"
          visible={this.props.getCodeModalVisible}
          onCancel={this.props.closeGetCodeModal}
          onOk={this.props.closeGetCodeModal}
        >
          <div>
            <button
              onClick={this.props.downloadHtml}
              data-test="ModalMenuGetCode_downloadHtml"
            >
              Download Html
            </button>
          </div>
        </Modal>
      </>
    );
  }
}
