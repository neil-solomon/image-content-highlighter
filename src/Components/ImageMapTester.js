import React from "react";
import happyface from "./../happy.jpg";

export default class ImageMapTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  hoverIn = () => {
    this.setState({ hover: true });
  };

  hoverOut = () => {
    this.setState({ hover: false });
  };

  render() {
    return (
      <div>
        {/* <script>
            function f(){console.log("function");}
        </script> */}
        <img src={happyface} usemap="#imageMap" />
        <map name="imageMap">
          <area
            shape="rect"
            coords="30,30,200,200"
            onMouseEnter={this.hoverIn}
            onMouseLeave={this.hoverOut}
          />
        </map>
        {this.state.hover && <>HOVER</>}
      </div>
    );
  }
}
