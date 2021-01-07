import React from "react";
import styles from "./ModalMenu.module.css";
import { Modal } from "antd";

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

  render() {
    return (
      <Modal
        visible={this.is_visible()}
        onCancel={() => this.props.update_modalMenuView(-1)}
        title={this.modalTitles[this.findActiveMenuView()]}
      >
        <div>Modal Menu</div>
      </Modal>
    );
  }
}
