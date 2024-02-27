"use client";
import React, { useState } from "react";
import CameraFeed from "./CameraFeed";
import CameraList from "./CameraList";

function CameraSlot() {
  const [selectedCameras, setSelectedCameras] = useState<Array<string | null>>([
    null,
    null,
    null,
    null,
  ]);

  const handleSelectCamera = (cameraId: string, index: number) => {
    const newSelectedCameras = [...selectedCameras];
    newSelectedCameras[index] = cameraId;
    setSelectedCameras(newSelectedCameras);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "nowrap",
        gap: "20px",
        overflowX: "auto",
      }}
    >
      {selectedCameras.map((cameraId, index) => (
        <div
          key={index}
          style={{ minWidth: "calc(25% - 20px)", maxWidth: "calc(25% - 20px)" }}
        >
          <CameraFeed selectedCameraId={cameraId || ""} />
          <CameraList
            onSelectCamera={(camera) =>
              handleSelectCamera(camera.deviceId, index)
            }
          />
        </div>
      ))}
    </div>
  );
}

export default CameraSlot;
