import React, { useContext } from 'react';
import { b, bBG, p, pBG, t, tBG, square, squareBG } from '../../assets/backgroundAssets';
import { GlobalContext } from '../../context/GlobalContext';
import Loader from './Loader';

const Background = ({ children }) => {

  const { isLoading } = useContext(GlobalContext);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Blurred green gradient backgrounds */}
      <div className="  absolute top-36 md:-left-48 -left-36 w-52 lg:w-56 xl:w-96 h-72 bg-green-700 rounded-full opacity-45 blur-[80px]"></div>
      <div className="  absolute top-60 md:-right-48 -right-36 w-52 lg:w-56 xl:w-96 h-72 bg-green-700 rounded-full opacity-45 blur-[80px]"></div>

      {/* Top-Left Coin: Bitcoin */}
      <div
        className="hidden md:block absolute top-52 left-40 w-12 h-12 lg:w-16 lg:h-16 rounded-full animate-float"
        style={{
          backgroundImage: `url(${bBG})`,
          backgroundSize: 'cover',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <img
          src={b}
          className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8"
          alt="Bitcoin Logo"
        />
      </div>

      {/* Top-Right Coin: Custom Logo */}
      <div
        className="hidden md:block absolute top-52 right-32 w-12 h-12 lg:w-16 lg:h-16 rounded-full"
        style={{
          backgroundImage: `url(${pBG})`,
          backgroundSize: 'cover',
          animation: 'float 3.5s ease-in-out infinite',
        }}
      >
        <img
          src={p}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8"
          alt="Custom Logo"
        />
      </div>

      {/* Bottom-Left Coin: Tether */}
      <div
        className="hidden md:block absolute left-44 w-11 h-11 lg:w-12 lg:h-12 rounded-full"
        style={{
          top: 'calc(100vh - 215px - 44px)', // Positions initially near bottom, scrolls with container
          backgroundImage: `url(${tBG})`,
          backgroundSize: 'cover',
          animation: 'float 4s ease-in-out infinite',
        }}
      >
        <img
          src={t}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-6 lg:h-6"
          alt="Tether Logo"
        />
      </div>

      {/* Bottom-Right Coin: Square/Binance */}
      <div
        className="hidden md:block absolute right-48 w-11 h-11 lg:w-12 lg:h-12 rounded-full"
        style={{
          top: 'calc(100vh - 190px - 44px)', // Positions initially near bottom, scrolls with container
          backgroundImage: `url(${squareBG})`,
          backgroundSize: 'cover',
          animation: 'float 3.2s ease-in-out infinite',
        }}
      >
        <img
          src={square}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-6 lg:h-6"
          alt="Square Logo"
        />
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
          <Loader />
        </div>
      )}

      {/* Content */}
      {children}

      {/* Add a <style> tag for the animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
};



// const Background = ({ children }) => {
//   return (
//     <div className="relative min-h-screen bg-black overflow-x-hidden">
//       {/* Blurred green gradient backgrounds */}
//       <div className="hidden md:block absolute top-36 -left-40 w-52 lg:w-56 xl:w-96 h-72 bg-green-600 rounded-full opacity-45 blur-[80px]"></div>
//       <div className="hidden md:block absolute top-56 -right-40 w-52 lg:w-56 xl:w-96 h-72 bg-green-600 rounded-full opacity-45 blur-[80px]"></div>

//       {/* Top-Left Coin: Bitcoin */}
//       <div
//         className="hidden md:block absolute top-52 left-36 w-12 h-12 lg:w-16 lg:h-16 rounded-full"
//         style={{
//           backgroundImage: `url(${bBG})`,
//           backgroundSize: 'cover',
//         }}
//       >
//         <img
//           src={b}
//           className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8"
//           alt="Bitcoin Logo"
//         />
//       </div>

//       {/* Top-Right Coin: Custom Logo */}
//       <div
//         className="hidden md:block absolute top-52 right-32 w-12 h-12 lg:w-16 lg:h-16 rounded-full"
//         style={{
//           backgroundImage: `url(${pBG})`,
//           backgroundSize: 'cover',
//         }}
//       >
//         <img
//           src={p}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8"
//           alt="Custom Logo"
//         />
//       </div>

//       {/* Bottom-Left Coin: Tether */}
//       <div
//         className="hidden md:block absolute left-44 w-11 h-11 lg:w-12 lg:h-12 rounded-full"
//         style={{
//           top: 'calc(100vh - 215px - 44px)', // Positions initially near bottom, scrolls with container
//           backgroundImage: `url(${tBG})`,
//           backgroundSize: 'cover',
//         }}
//       >
//         <img
//           src={t}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-6 lg:h-6"
//           alt="Tether Logo"
//         />
//       </div>

//       {/* Bottom-Right Coin: Square/Binance */}
//       <div
//         className="hidden md:block absolute right-48 w-11 h-11 lg:w-12 lg:h-12 rounded-full"
//         style={{
//           top: 'calc(100vh - 190px - 44px)', // Positions initially near bottom, scrolls with container
//           backgroundImage: `url(${squareBG})`,
//           backgroundSize: 'cover',
//         }}
//       >
//         <img
//           src={square}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-6 lg:h-6"
//           alt="Square Logo"
//         />
//       </div>

//       {/* Content */}
//       {children}
//     </div>
//   );
// };

export default Background;


// import React from 'react';
// import { b, bBG, p, pBG, t, tBG, square, squareBG } from '../assets/backgroundAssets';

// const Background = ({ children }) => {
//   return (
//     <>
//       {/* Fixed Background Layer */}
//       <div className="fixed inset-0 overflow-hidden z-0 bg-black">
//         {/* Blurred green gradient background */}
//         <div className="absolute top-36 -left-44 w-52 lg:w-56 xl:w-96 h-72 bg-green-600 rounded-full opacity-45 blur-[80px]"></div>
//         <div className="absolute top-56 -right-44 w-52 lg:w-56 xl:w-96 h-72 bg-green-600 rounded-full opacity-45 blur-[80px]"></div>

//         {/* Top-Left Coin: Bitcoin */}
//         <div
//           className="absolute top-48 left-36 w-12 h-12 lg:w-14 lg:h-14 rounded-full"
//           style={{
//             backgroundImage: `url(${bBG})`,
//             backgroundSize: 'cover',
//             // boxShadow: '0 0 20px 10px rgba(255, 255, 0, 0.3)' // Yellow glow
//           }}
//         >
//           <img
//             src={b}
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8"
//             alt="Bitcoin Logo"
//           />
//         </div>

//         {/* Top-Right Coin: Custom Logo */}
//         <div
//           className="absolute top-52 right-32 w-12 h-12 lg:w-14 lg:h-14 rounded-full"
//           style={{
//             backgroundImage: `url(${pBG})`,
//             backgroundSize: 'cover',
//             // boxShadow: '0 0 20px 10px rgba(255, 0, 0, 0.3)' // Red glow
//           }}
//         >
//           <img
//             src={p}
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8"
//             alt="Custom Logo"
//           />
//         </div>

//         {/* Bottom-Left Coin: Tether */}
//         <div
//           className="absolute bottom-56 left-48 w-11 h-11 lg:w-12 lg:h-12 rounded-full"
//           style={{
//             backgroundImage: `url(${tBG})`,
//             backgroundSize: 'cover',
//             // boxShadow: '0 0 20px 10px rgba(128, 0, 128, 0.3)' // Purple glow
//           }}
//         >
//           <img
//             src={t}
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-6 lg:h-6"
//             alt="Tether Logo"
//           />
//         </div>

//         {/* Bottom-Right Coin: Square/Binance */}
//         <div
//           className="absolute bottom-56 right-48 w-11 h-11 lg:w-12 lg:h-12 rounded-full"
//           style={{
//             backgroundImage: `url(${squareBG})`,
//             backgroundSize: 'cover',
//             // boxShadow: '0 0 20px 10px rgba(0, 128, 0, 0.3)' // Green glow
//           }}
//         >
//           <img
//             src={square}
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 lg:w-6 lg:h-6"
//             alt="Square Logo"
//           />
//         </div>
//       </div>

//       {/* Content Layer */}
//       <div className="relative z-10 min-h-screen">
//         {children}
//       </div>
//     </>
//   );
// };

// export default Background;