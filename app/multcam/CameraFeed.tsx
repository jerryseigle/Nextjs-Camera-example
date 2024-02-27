// components/CameraFeed.tsx
"use client";
import React, { useRef, useEffect } from "react";

interface CameraFeedProps {
  selectedCameraId: string;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ selectedCameraId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (selectedCameraId) {
      const enableStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: selectedCameraId } },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera feed:", error);
        }
      };

      enableStream();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          (videoRef.current.srcObject as MediaStream)
            .getTracks()
            .forEach((track) => track.stop());
        }
      };
    }
  }, [selectedCameraId]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{ width: "100%", aspectRatio: "16 / 9", marginBottom: "10px" }}
    />
  );
};

export default CameraFeed;
