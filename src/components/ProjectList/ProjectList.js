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
          />
          <button disabled={this.props.newProjectName === ""}>
            Create New Project
          </button>
        </div>
        <div>My Projects</div>
        {this.props.projects.map((project, index) => (
          <div
            key={project.name + "_" + index}
            id={project.name + "_" + index}
            onClick={this.props.loadProject}
          >
            {project.name}
          </div>
        ))}
      </div>
    );
  }
}
