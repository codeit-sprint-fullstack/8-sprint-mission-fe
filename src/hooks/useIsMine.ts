import { useAuthStore } from '@/stores/useAuthStore';

const useIsMine = () => {
  const { user } = useAuthStore();

  const checkIsMine = (id: string) => {
    return user?.id === id;
  };

  return { checkIsMine };
};

export default useIsMine;
