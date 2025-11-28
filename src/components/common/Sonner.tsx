import { Toaster, toast } from 'sonner';

const METHOD_MAP = {
  success: toast.success,
  error: toast.error,
  warning: toast.warning,
  info: toast.info,
  loading: toast.loading,
};

export const AppToaster = () => {
  return <Toaster position="top-center" expand={false} richColors={true} />;
};

export const showToast = ({
  kind,
  message,
}: {
  kind: keyof typeof METHOD_MAP;
  message: string;
}) => {
  const method = METHOD_MAP[kind];
  return method(message);
};
