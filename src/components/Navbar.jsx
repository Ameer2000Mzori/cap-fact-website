// import React, { useState } from "react";
// import "./Navbar.css";
// import logo from "./assets/logo.png";
// import openm from "./assets/openm.png";
// import closem from "./assets/closem.png";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <>
//       <header>
//         <nav className={`navbar ${menuOpen ? "active" : ""}`}>
//           <div className="navbrand">
//             <img className="navbrandlogo" src={logo} alt="" />
//           </div>
//           <button onClick={toggleMenu} className="togglebtn">
//             <img
//               className="menu-btn-img"
//               src={menuOpen ? closem : openm}
//               alt=""
//             />
//           </button>
//           <div className={`navlinks ${menuOpen ? "active" : ""}`}>
//             <ul>
//               <li>
//                 <h6>home</h6>
//               </li>
//               <li>
//                 <h6>about</h6>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;
