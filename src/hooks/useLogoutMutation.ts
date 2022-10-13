import { useMutation, useQueryClient } from 'react-query';

const logout = async () => {
  // 임시 코드
  return {
    status: 204,
  }
}

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation('logout', logout, {
    onSuccess() {

      // 임시 코드
      document.cookie = 'accessToken' + '=; Max-Age=0'
      queryClient.invalidateQueries(['user']);
    },
  });
}

export default useLogoutMutation;