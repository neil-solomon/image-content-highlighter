import React from "react";
import styles from "./ModalMenu.module.css";
import { Modal } from "antd";
import ModalMenuAccount from "../ModalMenuAccount";
import ModalMenuNewProject from "../ModalMenuNewProject";
import ModalMenuProjects from "../ModalMenuProjects";
import ModalMenuGetCode from "../ModalMenuGetCode";

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
    return (
      <Modal
        visible={this.is_visible()}
        onCancel={() => this.props.update_modalMenuView(-1)}
        onOk={this.handleOnOk}
        title={this.modalTitles[this.findActiveMenuView()]}
      >
        {this.props.menuView[0] && (
          <ModalMenuAccount login_test={this.props.login_test} />
        )}
        {this.props.menuView[1] && <ModalMenuNewProject />}
        {this.props.menuView[2] && <ModalMenuProjects />}
        {this.props.menuView[3] && <ModalMenuGetCode />}
      </Modal>
    );
  }
}
