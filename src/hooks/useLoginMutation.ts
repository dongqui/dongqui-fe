import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import router from 'next/router'

import { LoginResult, LoginPayload } from '../types';
import { login } from '../remotes';

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<LoginResult, AxiosError, LoginPayload> ('login', login, {
    onSuccess({ user, accessToken }) {
      queryClient.setQueryData('user', user);
      
      document.cookie = `accessToken=${accessToken}`
      router.replace('/');
    },
  });
}

export default useLoginMutation;