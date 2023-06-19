import { useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";

const CameraView = () => {
  const [dataUri, setDataUri] = useState("");

  function handleTakePhoto(dataUri: string) {
    console.log(dataUri);
    setDataUri(dataUri);
  }

  console.log(dataUri);

  return (
    <Camera
      isFullscreen={false}
      idealFacingMode={FACING_MODES.ENVIRONMENT}
      onTakePhoto={(dataUri) => {
        handleTakePhoto(dataUri);
      }}
    />
  );
};

export default CameraView;
