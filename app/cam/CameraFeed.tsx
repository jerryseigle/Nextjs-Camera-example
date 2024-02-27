"use client";

import React, { useRef, useEffect } from "react";

interface CameraFeedProps {
  selectedCameraId: string;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ selectedCameraId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Using an IIFE (Immediately Invoked Function Expression)
    (async () => {
      if (selectedCameraId) {
        const constraints = {
          video: {
            deviceId: selectedCameraId
              ? { exact: selectedCameraId }
              : undefined,
          },
        };

        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [selectedCameraId]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default CameraFeed;
