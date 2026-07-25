import axios, { AxiosPromise } from "axios";

export async function reqWrapper(axiosPromise: AxiosPromise) {
    let resultData = {}
    let resultError = 'Something went wrong...'
    let status = 'not-asked'
    let statusCode: number | undefined = undefined;

    try {
        const response = await axiosPromise;
        resultData = response.data;
        statusCode = response.status;
        status = 'success'
    } catch (error) {
        if (axios.isAxiosError(error)) {
            resultError = error.message;
            statusCode = error.response?.status;
        } else {
            console.error(error);
        }
        status = 'error'
    }

    return { data: resultData, error: resultError, status, statusCode }
}
