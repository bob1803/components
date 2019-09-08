import React from "react";
import "./blog.less";
import img from "../../images/imgUpload/img_test_1.jpg";
import ImgSquare from "../image/ImgSquare";

export default class Blog extends React.Component {
  render() {
    return (
      <div style={{height: "50vh"}}>
        BLOG
        <ImgSquare
          options={{
            src: img,
            borderRadius: "50%",
            minSize: "30px"
          }}
        ></ImgSquare>
      </div>
    );
  }
}
