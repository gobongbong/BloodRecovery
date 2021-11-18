import React, { useState } from 'react';
import propTypes from 'prop-types';
import { connect } from "react-redux";
import { addPage } from "../../Modalmove/subscribers/action"
import './Menu_left_nav.css';
import BACKIMG from "../../../Img/DirectedIMG/arrow.png"

const Menu_nav_text=(name)=>{



    return (
        <div className="Menu-left-nav-text">
            <img className="Menu-left-nav-img-class" src={name.imgname}></img>
                <div className="Menu-left-nav-h1-class">{name.name}</div>
            {/* <img className="backbtn" src={BACKIMG} onClick={() => name.addPage(sessionStorage.getItem("lastbefore"))}></img> */}
            {/* {console.log("아오",window.sessionStorage.getItem("last"))} */}
            
        </div>

    );
}
Menu_nav_text.defaultProps={
    name:'기본이름'
};

Menu_nav_text.propTypes={
    name: propTypes.string
};

const mapStateToProps = (state) => {
    return {
      page: state.page,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      addPage: (text) => dispatch(addPage(text)),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(Menu_nav_text);

