"use client";

import React, { useState, useEffect } from "react";

interface Camera {
  deviceId: string;
  label: string;
}

interface CameraListProps {
  onSelectCamera: (camera: Camera) => void;
}

const CameraList: React.FC<CameraListProps> = ({ onSelectCamera }) => {
  const [cameras, setCameras] = useState<Camera[]>([]);

  useEffect(() => {
    async function fetchCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices: Camera[] = devices
          .filter((device) => device.kind === "videoinput")
          .map((device) => ({
            deviceId: device.deviceId,
            label: device.label || `Camera ${device.deviceId}`,
          }));
        setCameras(videoDevices);
      } catch (error) {
        console.error(error);
      }
    }

    const requestCameraAccess = async () => {
      try {
        // Trigger the camera access prompt
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Camera access granted");
        // Re-fetch the cameras after access is granted
        fetchCameras();
      } catch (error) {
        console.error("Camera access denied", error);
      }
    };

    // fetchCameras();
    requestCameraAccess();
  }, []);

  console.log(cameras);
  return (
    <div>
      {cameras.map((camera) => (
        <button key={camera.deviceId} onClick={() => onSelectCamera(camera)}>
          {camera.label}
        </button>
      ))}
    </div>
  );
};

export default CameraList;
