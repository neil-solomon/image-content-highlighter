import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import AuthMenu from "./AuthMenu.js";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AuthState } from "@aws-amplify/ui-components";

Enzyme.configure({ adapter: new Adapter() });

describe("AuthMenu", function () {
  it("should render Amplify Authenticator if user is null or AuthState is SignedOut", () => {
    var test_user = null;
    var test_authState = AuthState.SignedOut;
    var wrapper = shallow(
      <AuthMenu user={test_user} authState={test_authState} />
    );
    expect(wrapper.find(AmplifyAuthenticator)).toHaveLength(1);

    test_user = null;
    test_authState = AuthState.SignedIn;
    wrapper = shallow(<AuthMenu user={test_user} authState={test_authState} />);
    expect(wrapper.find(AmplifyAuthenticator)).toHaveLength(1);

    test_user = { attributes: { email: "user@test.com" } };
    test_authState = AuthState.SignedOut;
    wrapper = shallow(<AuthMenu user={test_user} authState={test_authState} />);
    expect(wrapper.find(AmplifyAuthenticator)).toHaveLength(1);
  });

  it("should render greeting using user email if user is not null and AuthState is SignedIn", () => {
    const test_user = { attributes: { email: "user@test.com" } };
    const test_authState = AuthState.SignedIn;
    const wrapper = shallow(
      <AuthMenu user={test_user} authState={test_authState} />
    );
    expect(wrapper.find('[data-test="AuthMenu_greeting"]').text()).toEqual(
      "Hello, user@test.com"
    );
  });
});
