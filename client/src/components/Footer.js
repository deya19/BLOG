import React from 'react'
import Logo from "../img/logo.png"



const Footer = () => {
  return (
    <div className='conFooter' >
      <footer>
      <img src={Logo} alt="" />
      <span>Made with &#129488; and <b>React.js</b>.</span>
      </footer>
    </div>
  )
}

export default Footer;