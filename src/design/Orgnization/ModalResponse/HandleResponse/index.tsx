import ResponseModal from "../ResponseModal";
import ResponsePopup from "../ResponsePopup";
import NotificationPopup from "../../NotificationPopup";
import { useState } from "react";

export const useHandleResponse = () => {
  //控制左下角弹窗，分别为networkError / failure
  const [networkError, setNetworkError] = useState(false);
  const [serverError, setServerError] = useState(false);
  //控制中间弹窗，状态为发送请求，请求失败，请求成功
  const [loading, setLoading] = useState(false); //有弹窗即为true
  const [failure, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [requestError, setRequestError] = useState(false);

  const handleTimeout = () => {
    setNetworkError(true);
    setFailed(true);
  };
  const handleServerError = () => {
    setFailed(true);
    setServerError(true);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setLoading(false);
    }, 1200);
  };

  const handleRequestError = (msg: string) => {
    setRequestError(true);
    setErrorMsg(msg[0].toUpperCase() + msg.substring(1));

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleNetworkError = () => {
    setFailed(true);
    setNetworkError(true);
  };
  const status = {
    networkError,
    serverError,
    loading,
    failure,
    success,
    requestError,
    errorMsg,
    setNetworkError,
    setServerError,
    setLoading,
    setFailed,
    setRequestError,
    setErrorMsg,
  };

  return {
    status,
    handleNetworkError,
    handleTimeout,
    handleServerError,
    handleSuccess,
    handleRequestError,
    showModal: setLoading,
  };
};

export function HandleResponseComponent({
  status,
  successMsg = "Created Successfully",
  failureMsg = "Created Failed",
  loadingMsg = "Loading",
}: {
  status: any;
  successMsg?: string;
  failureMsg?: string;
  loadingMsg?: string;
}) {
  const {
    networkError,
    serverError,
    loading,
    failure,
    success,
    requestError,
    errorMsg,
    setNetworkError,
    setServerError,
    setLoading,
    setFailed,
    setRequestError,
    setErrorMsg,
  } = status;
  return (
    <>
      <ResponseModal
        open={loading}
        status={
          (success && "success") ||
          (failure && "failure") ||
          (loading && "loading")
        }
        msg={
          (success && successMsg) ||
          (failure && failureMsg) ||
          (loading && loadingMsg)
        }
      />
      {networkError && (
        <ResponsePopup
          open={networkError}
          handleClose={() => {
            setNetworkError(false);
            setLoading(false);
            setTimeout(() => {
              setFailed(false);
            }, 500);
          }}
          status="networkError"
        />
      )}
      {serverError && (
        <ResponsePopup
          open={serverError}
          handleClose={() => {
            setServerError(false);
            setLoading(false);
            setTimeout(() => {
              setFailed(false);
            }, 500);
          }}
          status="serverError"
        />
      )}

      <NotificationPopup
        title="Error"
        showModal={requestError}
        content={errorMsg}
        handleDone={() => {
          setErrorMsg("");
          setRequestError(false);
        }}
      />
    </>
  );
}
