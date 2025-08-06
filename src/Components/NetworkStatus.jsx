import { BsWifiOff } from "react-icons/bs";
import { FaWifi } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    isOnline
      ? toast.success("Wifi Is Connected", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          icon: <FaWifi size={30} className="text-green-500" />,
        })
      : toast.error("Wifi Is Not Connected", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          icon: <BsWifiOff size={50} className="text-red-500" />,
        });
  }, [isOnline]);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default NetworkStatus;
