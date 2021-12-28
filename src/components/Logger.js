import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { selectLog } from "store/reducers/log";

const Logger = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { logQueue } = useSelector(selectLog());

  useEffect(() => {
    if (logQueue.length) {
      const lastLog = logQueue[logQueue.length - 1];
      const { type, message } = lastLog;

      if (!message) console.error("No have error message", lastLog);

      enqueueSnackbar(message || "Server Error", {
        variant: type || "error",
      });
    }
  }, [logQueue, enqueueSnackbar]);

  return null;
};

export default Logger;
