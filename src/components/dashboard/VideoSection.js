import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Banner Component with Carousel Functionality
const Banner = ({ banners }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <>
      <div className="w-full max-w-xl bg-white rounded-3xl mb-5 overflow-hidden">
        <div className="h-48 flex items-center justify-center">
          <h2 className="text-black text-2xl font-bold">{banners[activeIndex].title}</h2>
        </div>
      </div>
      
      {/* Dots Indicator */}
      <div className="flex space-x-2 mb-6">
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-6 h-2 bg-green-500 rounded-full ${index === activeIndex ? '' : 'opacity-60'} cursor-pointer`}
          ></div>
        ))}
      </div>
    </>
  );
};

// Invite Section Component
const   InviteSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="mb-8 text-center">
      <p className="mb-4 text-white/90">Invite a friend and get $100 worth YTP</p>
      <span
        onClick={() => navigate('/referral')}
        className={`add-fund-home px-7 py-2 bg-[#00FFA01A] text-white w-fit  rounded-full transition duration-300 cursor-pointer ${
          isHovered ? 'bg-green-800/50' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Invite Now
      </span>
    </div>
  );
};

// Video Card Component
const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`feature-box bg-[#FFFFFF14] rounded-xl aspect-[3/4] flex items-center justify-center overflow-hidden transition duration-300 ${
        isHovered ? 'transform scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-xl font-bold">Vid</span>
    </div>
  );
};

// Video Grid Component
const VideoGrid = ({ videos }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-xl mb-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

// Chart Component
const Chart = ({ data }) => {
  return (
    <div className="w-full max-w-xl bg-white rounded-3xl mb-5">
      <div className="h-48 flex items-center justify-center">
        <h2 className="text-black text-2xl font-bold">{data.title}</h2>
        {/* Placeholder for actual chart - would be replaced with a charting library */}
      </div>
    </div>
  );
};

const VideoSection = () => {
  const [banners] = useState([
    { id: 1, title: 'Banner 1', image: '/api/placeholder/500/200' },
    { id: 2, title: 'Banner 2', image: '/api/placeholder/500/200' },
    { id: 3, title: 'Banner 3', image: '/api/placeholder/500/200' },
    { id: 4, title: 'Banner 4', image: '/api/placeholder/500/200' },
  ]);
  
  const [videos] = useState([
    { id: 1, title: 'Video 1', thumbnail: '/api/placeholder/150/200' },
    { id: 2, title: 'Video 2', thumbnail: '/api/placeholder/150/200' },
    { id: 3, title: 'Video 3', thumbnail: '/api/placeholder/150/200' },
    { id: 4, title: 'Video 4', thumbnail: '/api/placeholder/150/200' },
  ]);
  
  const [chartData] = useState({
    title: 'Chart',
    data: [10, 20, 30, 40, 50],
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8">
      <Banner banners={banners} />
      <InviteSection />
      <VideoGrid videos={videos} />
      <Chart data={chartData} />
    </div>
  );
};

export default VideoSection;