import React from "react";
import styles from "./ProjectList.module.css";

export default class ProjectList extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div>
          <input
            type="text"
            value={this.props.newProjectName}
            onChange={this.props.update_newProjectName}
            data-test="ProjectList_newProjectNameInput"
          />
          <button
            onClick={this.props.createNewProject}
            disabled={this.props.newProjectName === ""}
            data-test="ProjectList_newProjectButton"
          >
            Create New Project
          </button>
        </div>
        <div>My Projects</div>
        {this.props.projects.map((project, index) => (
          <div
            key={project.name + "_" + index}
            id={project.name + "_" + index}
            data-test={"ProjectList_project" + index}
            onClick={this.props.loadProject}
          >
            {project.name}
          </div>
        ))}
      </div>
    );
  }
}
