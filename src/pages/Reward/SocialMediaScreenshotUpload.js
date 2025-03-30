import React, { useContext, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { GlobalContext } from "../../context/GlobalContext";
import { createSubTask, createTask } from "../../services/reward/rewardAPI";
import { toast } from "react-toastify";

const SocialMediaScreenshotUpload = ({ taskId, setShowSocialMediaProof }) => {
  // We'll store each screenshot as an object with { file, preview }
  const [screenshots, setScreenshots] = useState([null, null]);
  const { setIsLoading } = useContext(GlobalContext);

  const handleScreenshotUpload = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const newScreenshots = [...screenshots];
        newScreenshots[index] = { file, preview: URL.createObjectURL(file) };
        setScreenshots(newScreenshots);
      }
    };
    fileInput.click();
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("task_id", taskId);
    formData.append("activity_link", "https://www.yatripay.com");

    screenshots.forEach((item, index) => {
      if (item && item.file) {
        formData.append(
          "activity_images",
          item.file,
          `activity_image_${index + 1}.jpg`
        );
      }
    });

    try {
      setIsLoading(true);
      if (taskId === 14) {
        await createTask(formData);
      } else {
        await createSubTask(formData);
      }
      toast.success("Data Submitted successfully");
      setShowSocialMediaProof(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again"
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 my-4">
      <div
        onClick={() => setShowSocialMediaProof(false)}
        className="absolute -top-12 left-[48%] w-fit p-[10px] rounded-full text-black bg-white text-lg leading-none cursor-pointer"
      >
        <RxCross2 />
      </div>
      {/* Step 1 */}
      <div className="mb-6">
        <h2 className="text-gray-700 text-xl font-medium mb-6">
          Step 1: Give a 5 Star rating along with a good review on Google
          PlayStore
        </h2>

        <div className="flex justify-center space-x-8 mt-6">
          <a
            href="https://www.facebook.com/theyatripay"
            target="_blank"
            rel="noreferrer noopener"
            className="focus:outline-none cursor-pointer"
          >
            <FaFacebook className="text-4xl text-amber-500" />
          </a>
          <a
            href="https://www.instagram.com/yatripay/"
            target="_blank"
            rel="noreferrer noopener"
            className="focus:outline-none cursor-pointer"
          >
            <FaInstagram className="text-4xl text-amber-500" />
          </a>
          <a
            href="https://x.com/yatripay"
            target="_blank"
            rel="noreferrer noopener"
            className="focus:outline-none cursor-pointer"
          >
            <FaXTwitter className="text-4xl text-amber-500" />
          </a>
          <a
            href="https://www.linkedin.com/company/theyatripay"
            target="_blank"
            rel="noreferrer noopener"
            className="focus:outline-none cursor-pointer"
          >
            <FaLinkedin className="text-4xl text-amber-500" />
          </a>
        </div>
      </div>

      {/* Step 2 */}
      <div className="mb-6">
        <h2 className="text-gray-700 text-xl font-medium mb-4">
          Step 2: Please upload a screenshot of Rating & Review
        </h2>

        {screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="mb-4 cursor-pointer"
            onClick={() => handleScreenshotUpload(index)}
          >
            <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-center h-16 shadow-sm">
              {screenshot ? (
                <div className="w-full h-full flex items-center justify-between">
                  <span className="text-green-600 font-medium">
                    Screenshot uploaded
                  </span>
                  <img
                    src={screenshot.preview}
                    alt="Preview"
                    className="h-10 w-10 object-cover rounded"
                  />
                </div>
              ) : (
                <span className="text-gray-400 text-lg">Upload Screenshot</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-medium transition duration-200 cursor-pointer"
      >
        Submit
      </div>
    </div>
  );
};

export default SocialMediaScreenshotUpload;
