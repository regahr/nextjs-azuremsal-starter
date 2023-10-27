import { AxiosResponse } from 'axios';

import useAxios from './useAxios';

const useDocumentService = () => {
  const axiosInstance = useAxios();
  const getAdditionalFiles = async () => {
    try {
      const result: AxiosResponse<any> = await axiosInstance(
        `${process.env.NEXT_PUBLIC_API_URL}/document/?filter[fileType][_eq]=Additional Files`
      );
      return {
        additionalFiles: result.data,
        isError: false
      };
    } catch (e) {
      return {
        isError: true,
        additionalFiles: []
      };
    }
  };

  return {
    getAdditionalFiles
  };
};

export default useDocumentService;
