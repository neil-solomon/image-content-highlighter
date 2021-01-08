import React from "react";
import styles from "./ModalMenuAccount.module.css";

export default class ModalMenuAccount extends React.Component {
  render() {
    return (
      <div>
        ModalMenuAccount
        <button onClick={this.props.login_test} data-test="login_test">
          Login
        </button>
      </div>
    );
  }
}
