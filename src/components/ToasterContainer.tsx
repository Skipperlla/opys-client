import { ToastContainer } from "react-toastify";

const ToasterContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={10000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      limit={10}
      theme={"colored"}
    />
  );
};

export default ToasterContainer;
