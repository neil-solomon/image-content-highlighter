import React from "react";
import styles from "./MainMenu.module.css";
import {
  PlusCircleOutlined,
  DatabaseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

export default class MainMenu extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Image Mapper</div>
        <div className={styles.icons}>
          <Tooltip title="New Project">
            <PlusCircleOutlined
              className={styles.icon}
              onClick={() => this.props.update_modalMenuView(1)}
            />
          </Tooltip>
          <Tooltip title="My Projects">
            <DatabaseOutlined
              className={styles.icon}
              onClick={() => this.props.update_modalMenuView(2)}
            />
          </Tooltip>
          <Tooltip title="My Account">
            <UserOutlined
              className={styles.icon}
              onClick={() => this.props.update_modalMenuView(0)}
            />
          </Tooltip>
        </div>
      </div>
    );
  }
}
