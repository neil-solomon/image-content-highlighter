import React from "react";
import styles from "./ModalMenuGetCode.module.css";

export default class ModalMenuGetCode extends React.Component {
  render() {
    return (
      <div>
        <div>
          <button
            onClick={this.props.downloadHtml}
            data-test="ModalMenuGetCode_downloadHtml"
          >
            Download Html
          </button>
        </div>
      </div>
    );
  }
}
