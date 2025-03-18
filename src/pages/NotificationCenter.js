import React, { useEffect, useState } from 'react';
import logo from "../assets/yatri-pay-logo-main.png";
import { getNotifications } from '../services/generalAPI';

const NotificationCenter = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getNotifications();
        if (res) {
          setTaskList(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <header>
        <div className="flex flex-col justify-center items-center p-8">
          <img src={logo} alt="logo" className="h-8 md:h-12" />
          <h1 className="text-2xl font-bold">Notification Center</h1>
        </div>
      </header>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="max-w-2xl mx-auto p-4">
          {taskList.length > 0 ? (
            taskList.map((notification, index) => (
              <div
                key={index}
                className="feature-box bg-[#FFFFFF1F] shadow-md rounded-lg p-4 mb-4"
              >
                <h2 className="text-xl font-bold">{notification.title}</h2>
                <p className="text-gray-100">{notification.message}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No notifications yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;