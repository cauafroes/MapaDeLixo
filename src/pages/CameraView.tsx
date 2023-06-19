import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BsCamera } from "react-icons/bs";
// import { AxiosError, AxiosResponse } from "axios";
// import api from "../services/api";

const CameraView = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const navigate = useNavigate();

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 720, height: 1280, facingMode: "environment" },
      })
      .then((stream) => {
        const video = videoRef.current!;
        video.srcObject = stream;
        video.play();
        setHasPhoto(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);
    const video = videoRef.current!;
    const photo = photoRef.current!;
    photo.width = width;
    photo.height = height;
    const ctx = photo.getContext("2d")!;
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
    const imageFile = dataURLtoFile(photo.toDataURL("image/jpeg"), "photo.jpg");
    navigate("/report", { state: { imageFile } });
    // const formData = new FormData();
    // formData.append("photo", imageFile);
    // api
    //   .post("your-api-endpoint", formData)
    //   .then((response: AxiosResponse) => {
    //     // Handle success
    //     console.log(response);
    //   })
    //   .catch((error: AxiosError) => {
    //     // Handle error
    //     console.log(error);
    //   });
  };

  const dataURLtoFile = (dataURL: string, filename: string): File => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
      <video ref={videoRef}></video>

      {videoRef.current == null && !hasPhoto && (
        <div className="mb-10 w-64">
          <p>
            Solicitando permissão para acessar sua câmera, se a aplicação
            permanecer nessa tela, recarregue a página.
          </p>
        </div>
      )}
      <button
        className="mt-4 text-2xl text-black bg-white rounded-full p-4"
        onClick={takePhoto}
      >
        <BsCamera />
      </button>
      <canvas className="hidden" ref={photoRef}></canvas>
      <Navbar />
    </div>
  );
};

export default CameraView;
