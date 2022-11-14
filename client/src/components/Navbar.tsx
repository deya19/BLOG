import React, { useContext } from "react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import admin from "../img/admin_user_icon_188317 (2).png"



const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <header className="container">
        <div className="logo">
          <Link to={"/"}>
          <img src={Logo} alt="" />
          </Link>
        </div>
        <nav className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHONOLGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CIENEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <Link to={`/profile/${currentUser?.id}`} className="link" state={currentUser} >
          <b>
            <span>{currentUser?.username}{currentUser?.myAdmin && <img src={admin} alt="" />}</span>
          </b>
          </Link>
          {currentUser ? (
            <Link style={{textDecoration:"none"}} to={"/"} >
              <span onClick={logout}>Logout</span>
            </Link>
          ) : (
            <Link className="link" to={"/login"}>
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
