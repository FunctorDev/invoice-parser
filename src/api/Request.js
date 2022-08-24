import axios from "axios";
import { always, cond, has, mergeLeft, pathOr, pipe } from "ramda";
import Cookies from "universal-cookie";
import { API_URL } from "../constants/common";

const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const customConfig = pathOr({}, ["customConfig"], config);
    const token = cookies.get("userToken");
    const headers =
      token && !customConfig.noToken
        ? {
            "X-USER-TOKEN": token,
            "X-API-KEY": token,
          }
        : {};

    return {
      ...config,
      headers: {
        ...config.headers,
        ...headers,
      },
    };
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const statusCode = pathOr("XXX", ["response", "status"], error);

    if (statusCode === 408 || error.code === "ECONNABORTED") {
      return Promise.reject(error);
    }

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const data = pipe(
      cond([
        [has("response"), pathOr({}, ["response", "data"])],
        [has("request"), pathOr({}, ["request"])],
        [always(true), always(error)],
      ]),
      mergeLeft({
        statusCode,
        fromAxiosInterceptors: true,
      })
    )(error);
    const customConfig = pathOr({}, ["config", "customConfig"], error);

    if (statusCode === 401 && !customConfig.noRedirect401) {
    }

    if (statusCode === 403) {
    }

    if (statusCode === 404 && !customConfig.noRedirect404) {
    }

    if (statusCode === 500) {
    }

    return Promise.reject(data);
  }
);

export const Request = (
  config = {
    noToken: false,
    noRedirect404: false,
  }
) => {
  const normalizeConfig = {
    ...config,
    noToken: config.noToken || false,
    noRedirect404: config.noRedirect404 || false,
  };

  return {
    get(url, params = {}, options = {}) {
      return axiosInstance.get(url, {
        ...options,
        // @ts-ignore
        customConfig: normalizeConfig,
        params,
      });
    },

    post(url, data, options = {}) {
      return axiosInstance.post(url, data, {
        ...options,
        // @ts-ignore
        customConfig: normalizeConfig,
      });
    },

    put(url, data, options = {}) {
      return axiosInstance.put(url, data, {
        ...options,
        // @ts-ignore
        customConfig: normalizeConfig,
      });
    },

    delete(url, params, options = {}) {
      // return axiosInstance.request({
      //   ...options,
      //   customConfig: normalizeConfig,
      //   method: 'delete',
      //   url,
      //   params,
      // });

      return axiosInstance.delete(url, {
        ...options,
        // @ts-ignore
        customConfig: normalizeConfig,
        params,
      });
    },

    custom(config) {
      return axiosInstance(config);
    },

    getInstance() {
      return axiosInstance;
    },
  };
};

export default Request;
