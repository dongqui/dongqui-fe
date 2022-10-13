import { useQuery } from "react-query";

const getUser = async () => {
  // 임시 코드
  if (global?.document?.cookie?.includes('accessToken')) {
    return  {
      ID: 'sixshop_001',
      NAME: 'SixshopFE'
    };    
  }
  return {};
}

const useUserQuery = () => {  
  return useQuery('user', getUser)
}

export default useUserQuery;