import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { axiosCanceler, getPendingUrl } from "./helper/axiosCancel";
import { useNavigate } from "react-router";
import { checkStatus } from "./helper/checkStatus";
import { ResultData } from "@/api/interface";
import { store } from "@/redux";

const config = {
    // 默认地址
    baseURL: import.meta.env.VITE_API_URL,
    // 超时时间
    timeout: 10000,
    // 跨域时候允许携带凭证
    withCredentials: true
}

class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        // 实例化
        this.service = axios.create(config);
        /**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
		 */
        this.service.interceptors.request.use((config: AxiosRequestConfig) => {
            /* 将当前请求添加到pending中 */
            axiosCanceler.addPending(config);
            // * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
            config.headers!.noLoading || showFullScreenLoading();
            // const token: string = store.getState().global.token; // 可以直接从store获取
            // const token: string = "11111111111111qqqqqqqqqqqqqqqqqqqq";
            const token: string = store.getState().global.token;
            return { ...config, headers: { "x-access-token": token } };
        }, (error: AxiosError) => {
            return Promise.reject(error)
        })

        /**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
        this.service.interceptors.response.use((response: AxiosResponse) => {
            const {data, config} = response;
            // const navigate = useNavigate();
            /* 在请求结束后，移除本次请求(关闭loading) */
            axiosCanceler.removePending(config);
            tryHideFullScreenLoading();
            // * 登陆失效（code == 599）
            // if (data.code == ResultEnum.OVERDUE) {
            //     message.error(data.msg);
            //     navigate("/login");
            //     return Promise.reject(data);
            // }
            // // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
            // if (data.code && data.code !== ResultEnum.SUCCESS) {
            //     message.error(data.msg);
            //     return Promise.reject(data);
            // }
            // * 成功请求
            return data;
        }, (error: AxiosError) => {
            const { response } = error;
            const navigate = useNavigate();
            tryHideFullScreenLoading();
            // 根据响应的错误状态码，做不同的处理
            if (response) return checkStatus(response.status);
            // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
            if (!window.navigator.onLine) return (window.location.hash = "/500");
            return Promise.reject(error);
        })
    }
    // * 常用请求方法封装
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
    
}

export default new RequestHttp(config);