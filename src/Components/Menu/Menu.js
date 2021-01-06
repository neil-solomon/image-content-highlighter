import React from "react";
import styles from "./Menu.module.css";
import {
  PlusCircleOutlined,
  DatabaseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Tooltip, Modal } from "antd";

export default class Menu extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Image Mapper</div>
        <div className={styles.icons}>
          <Tooltip title="New Project">
            <PlusCircleOutlined className={styles.icon} />
          </Tooltip>
          <Tooltip title="My Projects">
            <DatabaseOutlined className={styles.icon} />
          </Tooltip>
          <Tooltip title="My Account">
            <UserOutlined className={styles.icon} />
          </Tooltip>
        </div>
        <Modal visible={false}></Modal>
      </div>
    );
  }
}
