import axios, { AxiosPromise } from 'axios';

export async function reqWrapper(axiosPromise: AxiosPromise) {
  let resultData = {};
  let resultError = 'Something went wrong...';
  let status = 'not-asked';

  try {
    const response = await axiosPromise;
    resultData = response.data;
    status = 'success';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      resultError = error.message;
    } else {
      console.error(error);
    }
    status = 'error';
  }

  return { data: resultData, error: resultError, status };
}
