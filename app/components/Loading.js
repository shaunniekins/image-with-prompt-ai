import { Vortex } from "react-loader-spinner";

const LoadingView = () => {
  return (
    <div className="">
      <Vortex
        visible={true}
        height="50"
        width="50"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    </div>
  );
};

export default LoadingView;
