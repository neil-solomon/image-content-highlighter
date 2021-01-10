import React from "react";
import styles from "./ModalMenuAuth.module.css";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
  AmplifySignOut,
  AmplifyConfirmSignUp,
  AmplifyForgotPassword,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

const ModalMenuAuth = (props) => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  const [
    containerOuterFadeClassname,
    setContainerOuterFadeClassname,
  ] = React.useState(styles.fadeIn);
  var update_modalMenuView_timeout;

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });

    return clearTimeout(update_modalMenuView_timeout);
  }, []);

  const closeModal = (event) => {
    // console.log(event.target, event.currentTarget);
    if (event.target.slot) {
      return;
    }
    update_modalMenuView_timeout = setTimeout(() => {
      props.update_modalMenuView(-1);
    }, 250);
    setContainerOuterFadeClassname(styles.fadeOut);
  };

  if (authState === AuthState.SignedIn && user) {
    return (
      <div
        className={styles.containerOuter + " " + containerOuterFadeClassname}
        onClick={(e) => closeModal(e)}
        id="ModalMenuAuth-containerOuter"
      >
        <div>Hello, {user.username}</div>
        <AmplifySignOut />
      </div>
    );
  }

  return (
    <>
      <div
        className={styles.containerOuter + " " + containerOuterFadeClassname}
        onClick={(e) => closeModal(e)}
        id="ModalMenuAuth-containerOuter"
      >
        <AmplifyAuthenticator>
          <AmplifySignIn
            slot="sign-in"
            usernameAlias="email"
            formFields={[{ type: "email" }, { type: "password" }]}
          ></AmplifySignIn>
          <AmplifySignUp
            slot="sign-up"
            usernameAlias="email"
            formFields={[{ type: "email" }, { type: "password" }]}
          />
          <AmplifyConfirmSignUp
            headerText="My Custom Confirm Sign Up Text"
            slot="confirm-sign-up"
            usernameAlias="email"
          ></AmplifyConfirmSignUp>
          <AmplifyForgotPassword
            headerText="My Custom Forgot Password Text"
            slot="forgot-password"
            usernameAlias="email"
            formFields={[{ type: "email" }]}
          ></AmplifyForgotPassword>
        </AmplifyAuthenticator>
      </div>
    </>
  );
};

export default ModalMenuAuth;
