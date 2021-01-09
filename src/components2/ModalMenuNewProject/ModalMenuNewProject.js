import React from "react";
import styles from "./ModalMenuNewProject.module.css";

export default class ModalMenuNewProject extends React.Component {
  render() {
    return (
      <div>
        Project Name:{" "}
        <input
          type="text"
          id="ModalMenu_newProject_projectName"
          data-test="ModalMenu_newProject_projectName"
        />
      </div>
    );
  }
}
