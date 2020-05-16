import axios,{ AxiosRequestConfig, AxiosResponse } from "axios";
import { Message } from "element-ui";
import router from '@/router';

/**
 * http 请求工具类
 * 
 * 请求拦截器 负责将客户端标示token值存储并放置在头部提交给服务器
 * 
 * 响应拦截器 负责全局处理业务请求的网络或者业务错误
 */

 // 1、创建axios的实例
 const service = axios.create({
     timeout: 10000, // 超时时间
 })

//  2、请求拦截
service.interceptors.request.use((config: AxiosRequestConfig) => {
    // 判断是否存在token
    if (localStorage.tsToken) {
        config.headers.Authorization = localStorage.tsToken;
    }
    return config;
}, (err: any) => {
    Promise.reject(err);
})

// 3、响应拦截
service.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (err: any) => {
    let errMessage = '';
    if (err && err.response.status) {
        switch(err.response.status) {
            case 401: 
                errMessage = '登录状态失效，请重新登录';
                // 移除token并跳转登录页面
                localStorage.removeItem('tsToken');
                router.push('/login');
                break;
            case 403:
                errMessage = '拒绝访问';
                break;
            case 408:
                errMessage = '请求超时';
                break;
            case 500:
                errMessage = '服务器内部错误';
                break;
            case 501:
                errMessage = '服务未实现';
                break;
            case 502:
                errMessage = '网关错误';
                break;
            case 503:
                errMessage = '服务不可用';
                break;
            case 504:
                errMessage = '网关超时';
                break;
            case 505:
                errMessage = 'HTTP版本不受支持';
                break;
            default:
                errMessage = err.response.data.msg;
                break;
        }

    } else {
        errMessage = err;
    }
    Message.error(errMessage);
    return Promise.reject(errMessage);
})

export default service;