import axios from 'axios'

export function request(config){
  const instanseaxios = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  instanseaxios.interceptors.response.use(response => {
  // Do something before response is sent
  return response;
  },error => {
  // Do something with response error
  return Promise.reject(error);
  });

  return instanseaxios(config)
}