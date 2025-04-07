import React from "react";
import {
  aboutSVG,
  connectSVG,
  exploreSVG,
  profileSVG,
  promotionSVG,
  tNcSVG,
  whitePaperSVG,
  supportSVG,
  teamSVG
} from "../assets/category_assets";
import logo from "../assets/yatri-pay-logo-main.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import BackToHomeButton from "../components/common/BackToHomeButton";

const Category = () => {

  const navigate = useNavigate()
  
  const navItems = [
    { icon: profileSVG, label: "My\nProfile", url: '/profile' },
    { icon: aboutSVG, label: "About", url: 'https://yatripay.com/#about', target: 'blank' },
    { icon: teamSVG, label: "Team", url: 'https://yatripay.com/#team', target: 'blank' },
    { icon: promotionSVG, label: "Promotions", url: '/reward' },
    { icon: supportSVG, label: "Support", url: '/support' },
    { icon: whitePaperSVG, label: "White\nPaper", url: 'https://yatripay.com/asset/docs/paper.pdf', target: 'blank' },
    { icon: connectSVG, label: "Connect\nwith us", url: '/category' },
    { icon: tNcSVG, label: "T&C", url: 'https://yatripay.com/static/media/terms_conditions.pdf', target: 'blank' },
    { icon: exploreSVG, label: "Explorer", url: 'https://yvmexplorer.yatripay.com', target: 'blank' }
  ];

  const handleLogout = () => {
    logout();
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full">
       <header>
          <div className="flex flex-col justify-center items-center py-6 mb-10">
            <img src={logo} alt="logo" className="h-8 md:h-12" />
            <h1 className=''>Category</h1>
          </div>
        </header>

        <div
          className="absolute top-8 left-10 text-lg cursor-pointer"
        >
          {/* <BackToHomeButton /> */}
        </div>

        <div
          onClick={handleLogout}
          className="absolute top-8 right-10 text-lg cursor-pointer"
        >
          Logout
        </div>
      
      {/* Navigation menu */}
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-3 max-w-5xl mb-24">
        {navItems.map((item, index) => (
          <Link
          to={item.url}
          target={item.target}
          key={index} 
           className="flex flex-col items-center mb-4 w-20 cursor-pointer no-underline hover:no-underline">
            <div className="w-12 h-12 rounded-xl bg-[rgba(250,124,183,0.15)] flex items-center justify-center mb-2">
              <img src={item.icon} alt={item.label} className="w-6 h-6" />
            </div>
            <p className="text-white text-center text-xs whitespace-pre-line">
              {item.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;