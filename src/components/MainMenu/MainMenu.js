import React from "react";
import styles from "./MainMenu.module.css";
import { UserOutlined } from "@ant-design/icons";

export default class MainMenu extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title} data-test="MainMenu_title">
          Image Mapper
        </div>
        <div className={styles.icons}>
          <UserOutlined
            className={styles.icon}
            onClick={this.props.closeCurrentProject}
          />
        </div>
      </div>
    );
  }
}
