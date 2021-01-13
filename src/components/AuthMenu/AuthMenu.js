import React from "react";
import styles from "./AuthMenu.module.css";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
  AmplifySignOut,
  AmplifyConfirmSignUp,
  AmplifyForgotPassword,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

const AuthMenu = (props) => {
  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      props.updateUser(authData);
      props.updateAuthState(nextAuthState);
    });
  }, []);

  if (props.authState === AuthState.SignedIn && props.user) {
    return (
      <div className={styles.container} key={"AuthMenu" + props.authState}>
        <div className={styles.greeting} data-test="AuthMenu_greeting">
          Hello, {props.user.attributes.email}
        </div>
        <div className={styles.signOutContainer}>
          <AmplifySignOut />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} key={"AuthMenu" + props.authState}>
      <AmplifyAuthenticator>
        <AmplifySignOut />
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
          // formFields={[{ type: "email" }]}
        ></AmplifyForgotPassword>
      </AmplifyAuthenticator>
    </div>
  );
};

export default AuthMenu;
