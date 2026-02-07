import { useLottie } from "lottie-react";
import loadingAnimation from "../assets/Loading Dots.json";

const LoadingPage = () => {
  const options = {
    animationData: loadingAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="flex justify-center items-center text-slate-800">
      {View}
    </div>
  );
};

export default LoadingPage;
