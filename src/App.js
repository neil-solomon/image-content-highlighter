import React from "react";
import MainContainer from "./components/MainContainer";
import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

function App() {
  return (
    <>
      <MainContainer />
    </>
  );
}

export default App;
