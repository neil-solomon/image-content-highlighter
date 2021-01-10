import React from "react";
import styles from "./ModalMenu.module.css";
import { Modal, Button } from "antd";
import ModalMenuNewProject from "../ModalMenuNewProject";
import ModalMenuProjects from "../ModalMenuProjects";
import ModalMenuGetCode from "../ModalMenuGetCode";
import AuthStateApp from "../ModalMenuAuth";

export default class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.modalTitles = {
      0: "My Account",
      1: "New Project",
      2: "My Projects",
      3: "Get The Code",
    };
  }

  is_visible = () => {
    if (this.props.menuView) {
      for (let i = 0; i < this.props.menuView.length; i++) {
        if (this.props.menuView[i]) {
          return true;
        }
      }
    }
    return false;
  };

  findActiveMenuView = () => {
    if (this.props.menuView) {
      for (let i = 0; i < this.props.menuView.length; i++) {
        if (this.props.menuView[i]) {
          return i;
        }
      }
    }
    return 0;
  };

  handleOnOk = () => {
    if (this.props.menuView[0]) {
    } else if (this.props.menuView[1]) {
      this.props.startNewProject();
    } else if (this.props.menuView[2]) {
    } else if (this.props.menuView[3]) {
    }
    this.props.update_modalMenuView(-1);
  };

  render() {
    if (this.props.menuView[0]) {
      return (
        <AuthStateApp update_modalMenuView={this.props.update_modalMenuView} />
      );
    }

    return (
      <Modal
        visible={this.is_visible()}
        onCancel={() => this.props.update_modalMenuView(-1)}
        onOk={this.handleOnOk}
        title={this.modalTitles[this.findActiveMenuView()]}
        footer={[
          <Button
            key="Cancel"
            onClick={() => this.props.update_modalMenuView(-1)}
            data-test="ModalMenu_cancelButton"
          >
            Cancel
          </Button>,
          <Button
            key="Ok"
            type="primary"
            onClick={this.handleOnOk}
            data-test="ModalMenu_okButton"
          >
            Ok
          </Button>,
        ]}
      >
        {this.props.menuView[1] && <ModalMenuNewProject />}
        {this.props.menuView[2] && <ModalMenuProjects />}
        {this.props.menuView[3] && (
          <ModalMenuGetCode downloadHtml={this.props.downloadHtml} />
        )}
      </Modal>
    );
  }
}
