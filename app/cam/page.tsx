"use client";
import React, { useState } from "react";
import CameraList from "./CameraList";
import CameraFeed from "./CameraFeed";

const CamerasPage: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

  const handleSelectCamera = (camera: { deviceId: string }) => {
    setSelectedCamera(camera.deviceId);
  };

  return (
    <div>
      <h1>Select a Camera</h1>
      <CameraList onSelectCamera={handleSelectCamera} />
      {selectedCamera && <CameraFeed selectedCameraId={selectedCamera} />}
    </div>
  );
};

export default CamerasPage;
