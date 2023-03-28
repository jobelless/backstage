import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';


const client = axios.create({
  // timeout: 30000,
  baseURL: process.env.MICROSOFT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



client.interceptors.request.use(
  config => {
    config.url = `${config.url}?api-version=${process.env.MICROSOFT_API_VERSION}`

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);


const request = async (options: AxiosRequestConfig): Promise<void> => {
  const onSuccess = (response: AxiosResponse) => response.data;

  const onError = (error: AxiosError) => {
    const { response, message } = error;

    if (response) {
      let statusMessage = 'Unexpected error occurred. Please try again later.';
      if (response.status === 401) {
        statusMessage = 'Unauthorized';
      }

      return Promise.reject(new Error(statusMessage));
    }

    let err = new Error(message);
    if (message.includes('timeout')) {
      err = new Error('The request timed out.');
    }

    return Promise.reject(err);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error as AxiosError);
  }
};

const callAPI = async (req: any, response: any, config: any) => {
  const apiResponse = await request({
    url: config.url,
    method: config.method,
    headers: {
      'Authorization': `Bearer ${req.body.accessToken}`
    },
    data: config.data
  })
  response.send(apiResponse)
}

export default callAPI;