import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBannerList,
  getVideoList,
} from "../../services/promotion/promotionAPI";
import Loader from "../common/Loader";

//Helper functions
const convertVideoURLtoEmbedLink = (url) => {
  const urlInPartsArr = url.split("/");
  urlInPartsArr[urlInPartsArr.length - 2] = "embed";
  return urlInPartsArr.join("/");
};

const DisplayVideoOnMobileScreen = ({ video, setShowVideoOnMobile }) => {
  window.addEventListener(
    "scroll",
    (e) => {
      e.preventDefault();
    },
    { passive: true }
  );

  return (
    <div className="bg-black/60 flex flex-col absolute z-40 h-[100vh] w-[100vw]">
      <div
        onClick={() => setShowVideoOnMobile(false)}
        className="feature-box  bg-[#4BAF2A] rounded-xl px-3 py-2 w-fit m-3"
      >
        X
      </div>
      <iframe
        src={`${video.url}?autoplay=1`} // Add autoplay on hover
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`flex-1 transition-transform duration-300 `} // Scale up on hover
      ></iframe>
    </div>
  );
};

// Banner Component with Carousel Functionality
const Banner = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [applyTransition, setApplyTransition] = useState(true);
  const trackRef = useRef(null);

  // Duplicate banners for seamless looping
  const extendedBanners = [...banners, banners[0]];

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // Automatic sliding every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Handle seamless looping
  useEffect(() => {
    const track = trackRef.current;
    const handleTransitionEnd = () => {
      if (currentIndex === extendedBanners.length - 1) {
        setApplyTransition(false);
        setCurrentIndex(0);
      }
    };
    track.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      track.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex]);

  // // Re-enable transition after instant reset
  useEffect(() => {
    if (currentIndex === 0 && !applyTransition) {
      requestAnimationFrame(() => {
        // setApplyTransition(true);
      });
    }
  }, [currentIndex, applyTransition]);

  return (
    <>
      <div className="w-full max-w-xl overflow-hidden rounded-3xl mb-5">
        <div
          ref={trackRef}
          className={`flex ${
            applyTransition ? "transition-transform duration-500" : ""
          }`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {extendedBanners.map((banner, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className=" flex items-center justify-center ">
                {/* Display banner image or title */}
                <img
                  src={banner.link}
                  alt={banner.slider}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex space-x-2 mb-6 justify-center">
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-6 h-2 bg-green-500 rounded-full ${
              index === currentIndex ? "" : "opacity-60"
            } cursor-pointer`}
          ></div>
        ))}
      </div>
    </>
  );
};

// Invite Section Component
const InviteSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mb-8 text-center">
      <p className="mb-4 text-white/90">
        Invite a friend and get &#8377;100 worth YTP
      </p>
      <span
        onClick={() => navigate("/referral")}
        className={`add-fund-home px-7 py-2 bg-[#00FFA01A] text-white w-fit  rounded-full transition duration-300 cursor-pointer ${
          isHovered ? "bg-green-800/50" : ""
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
const VideoCard = ({
  video,
  onHover,
  onLeave,
  setShowVideoOnMobile,
  setCurrVideo,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`feature-box relative bg-[#FFFFFF14] rounded-xl aspect-square flex items-center justify-center overflow-hidden transition duration-300${
        isHovered ? "scale-150" : ""
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(); // Notify parent to pause transitions
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onLeave(); // Notify parent to resume transitions
      }}
    >
      {!isHovered ? (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              console.log("clicked");
              setShowVideoOnMobile(true);
              setCurrVideo(video);
            }}
            className="absolute sm:hidden h-full w-full bg-transparent"
          ></div>
          <span>{video.title}</span>
        </>
      ) : (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              console.log("clicked");
              setShowVideoOnMobile(true);
              setCurrVideo(video);
            }}
            className="absolute sm:hidden h-full w-full bg-transparent"
          ></div>
          <iframe
            width="100%"
            height="100%"
            src={isHovered ? `${video.url}?autoplay=1` : video.url} // Add autoplay on hover
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={`hidden sm:block absolute top-0 left-0 w-full h-full transition-transform duration-300 `} // Scale up on hover
          ></iframe>
        </>
      )}
    </div>
  );
};

// Video Grid Component
const VideoGrid = ({ videos, setShowVideoOnMobile, setCurrVideo }) => {
  const [page, setPage] = useState(0);
  const [applyTransition, setApplyTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false); // New state to pause/resume transitions
  const trackRef = useRef(null);

  const M = 2; // Number of videos per page
  const N = videos.length;
  const totalPages = Math.ceil(N / M); // Number of pages in original video set

  // Duplicate videos for seamless looping
  const extendedVideos = [...videos, ...videos];

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  // Auto-advance every 3 seconds, unless paused
  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [isPaused]); // Depend on isPaused to pause/resume

  // Handle seamless loop reset
  useEffect(() => {
    const track = trackRef.current;
    const handleTransitionEnd = () => {
      if (page === totalPages) {
        setApplyTransition(false);
        setPage(0);
      }
    };
    track.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      track.removeEventListener("transitionend", handleTransitionEnd);
  }, [page]);

  // Re-enable transition after instant reset
  useEffect(() => {
    if (page === 0 && !applyTransition) {
      requestAnimationFrame(() => {
        setApplyTransition(true);
      });
    }
  }, [page, applyTransition]);

  // Pause transitions on hover
  const handleHover = () => {
    setIsPaused(true);
  };

  // Resume transitions on leave
  const handleLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className="relative w-full max-w-xl overflow-hidden">
      <div
        ref={trackRef}
        className={`flex p-4 gap-4 ${
          applyTransition ? "transition-transform duration-300" : ""
        }`}
        style={{ transform: `translateX(-${page * 100}%)` }}
      >
        {extendedVideos.map((video, index) => (
          <div key={index} className="w-1/2 flex-shrink-0">
            <VideoCard
              video={video}
              onHover={handleHover}
              onLeave={handleLeave}
              setShowVideoOnMobile={setShowVideoOnMobile}
              setCurrVideo={setCurrVideo}
            />
          </div>
        ))}
      </div>
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
  const [banners, setBanners] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showVideoOnMobile, setShowVideoOnMobile] = useState(false);
  const [currVideo, setCurrVideo] = useState(null);

  console.log(showVideoOnMobile);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const [bannerRes, videoRes] = await Promise.all([
          getBannerList(),
          getVideoList(),
        ]);

        if (bannerRes && bannerRes.data) {
          setBanners(bannerRes.data);
        }

        if (videoRes && videoRes.data) {
          console.log(videoRes.data);
          videoRes.data.forEach((vdo) => {
            vdo.url = convertVideoURLtoEmbedLink(vdo.url);
          });

          setVideos(videoRes.data.reverse());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // const [chartData] = useState({
  //   title: "Chart",
  //   data: [10, 20, 30, 40, 50],
  // });

  if (isLoading) return <Loader />;

  return (
    <div className=" bg-black text-white flex flex-col items-center px-4">
      {banners && banners.length > 0 && <Banner banners={banners} />}
      <InviteSection />
      {videos && videos.length > 0 && (
        <VideoGrid
          videos={videos}
          setShowVideoOnMobile={setShowVideoOnMobile}
          setCurrVideo={setCurrVideo}
        />
      )}
      {showVideoOnMobile && (
        <DisplayVideoOnMobileScreen
          video={currVideo}
          setShowVideoOnMobile={setShowVideoOnMobile}
        />
      )}
      {/* <Chart data={chartData} /> */}
    </div>
  );
};

export default VideoSection;
