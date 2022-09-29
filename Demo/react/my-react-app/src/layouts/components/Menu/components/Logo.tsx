import React from "react";
import { connect } from "react-redux";
import logo from "@/assets/react.svg";
const Logo = (props: any) => {
  // 作为menu的子组件，这边直接从menu的redux里面拿就行
  console.log(props, 6);
  const { isCollapse } = props;
  return (
    <div className="logo-box">
      <img src={logo} alt="logo" className="logo-img" />
      {!isCollapse ? <h2 className="logo-text">Admin Game</h2> : null}
    </div>
  );
};

const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps)(Logo);
