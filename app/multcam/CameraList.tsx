// components/CameraList.tsx
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
    const requestCameraAccess = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Camera access granted");
        fetchCameras();
      } catch (error) {
        console.error("Camera access denied", error);
      }
    };

    const fetchCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices
          .filter((device) => device.kind === "videoinput")
          .map((device) => ({
            deviceId: device.deviceId,
            label: device.label || `Camera ${device.deviceId}`,
          }));
        setCameras(videoDevices);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    requestCameraAccess();
  }, []);

  return (
    <select
      onChange={(e) =>
        onSelectCamera(
          cameras.find((camera) => camera.deviceId === e.target.value) || {
            deviceId: "",
            label: "",
          }
        )
      }
      style={{ marginBottom: "20px" }}
    >
      <option value="">Select a Camera</option>
      {cameras.map((camera) => (
        <option key={camera.deviceId} value={camera.deviceId}>
          {camera.label}
        </option>
      ))}
    </select>
  );
};

export default CameraList;
