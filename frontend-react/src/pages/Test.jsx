import React from "react";
import { ToastContainer, toast } from "react-toastify";

const TestToast = () => {
  React.useEffect(() => {
    toast.success("Toast is working!");
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1>Test Toast</h1>
    </div>
  );
};

export default TestToast;
