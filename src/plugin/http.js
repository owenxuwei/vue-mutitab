import axios from 'axios'
import router from '../router'
/**
         * 请求拦截器
         * 
         */
axios.interceptors.request.use(config => {//在此处统一配置公共参数

    //  let appId = process.env.appId; //appid
    //  let appKey = process.env.appKey; //appkey
    //  let sessionKey = localStorage.getItem('sessionKey'); //sessionkey
    //  let _site_id_param = localStorage.getItem('_site_id_param')|| '';//站点id
    //  let params = {
    //      appId: appId,//appid
    //      nonce_str: getRand(),//随机数
    //      _site_id_param: _site_id_param
    //  };
    //  if (sessionKey && sessionKey != '') {
    //      params.sessionKey = sessionKey;
    //  }
    //  for (let key in config.data) {
    //      params[key] = config.data[key]; //添加进参数列表
    //  }
    //  params = signParams(params, appKey);//返回签名后的对象
    //  config.data = qs.stringify(params);//序列化
    return config;
}, error => {

    Promise.reject(error);// 错误提示
})


/**响应拦截器 */
axios.interceptors.response.use(response => {
    //  let res = response.data;
    //  switch (res.code) {
    //      case '200':

    //          break;
    //      case '301':

    //          break;
    //      case '304':

    //          break;
    //      case '3':
    //          showMessage(res.code + ":" + res.message);
    //          localStorage.setItem('sessionKey', '');
    //          localStorage.setItem('userName', '');
    //          router.push('/login');
    //          break;
    //      case '302':
    //          showMessage(res.code + ":" + res.message);
    //          localStorage.setItem('sessionKey', '');
    //          localStorage.setItem('userName', '');
    //          router.push('/login');
    //          break;
    //      default:
    //          showMessage(res.code + ":" + res.message);
    //          break;
    //  }
    return response;
},
    error => {
        //   showMessage('服务器响应失败');
        return Promise.reject(error.response)
    }
);

const handleResult = (res) => {
    if (res.status == 200) {
        if(res.data.hasOwnProperty('result')){
            if(res.data.result) return res.data.data;
            else throw res.data;
        }
        else {
            return res.data;
        }
    }
    if (res.status === 401) {
        router.push("/login")
    }
    throw res
}

var http = {
    header : {
        //    _token:"Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI0YTIxOGM0Mzg4NjlhNmQ2Mzg0Yzg1YzY4MDczOTgxIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NDcxNzM2NjYsImV4cCI6MTU0NzIwMjQ2NiwiaXNzIjoiaHR0cDovLzE3Mi4xNi4wLjE0ODo5MDAyIiwiYXVkIjpbImh0dHA6Ly8xNzIuMTYuMC4xNDg6OTAwMi9yZXNvdXJjZXMiLCJxa2FwaSJdLCJjbGllbnRfaWQiOiJxazM2NS5jb20uYXBpIiwic3ViIjoiY2FvaGFvIiwiYXV0aF90aW1lIjoxNTQ3MTczNjY2LCJpZHAiOiJsb2NhbCIsInVzZXJpbmZvIjoiQ0tURjRnUVNCdWFidWVhMXFSb1hNakF4T1Mwd01TMHhNU0F3T1RvME1qbzBOaTR3TURBcUFUZEE4UVJTQnpBeU1EQXhOekZhQ3pFNE5qVXhNVGd4TnpjeGFnY0tCVEF3TVRReSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJxa2FwaSJdLCJhbXIiOlsiY3VzdG9tIl19.JURUDrZSd3Hb7e2TwyTLYyLiqWVV3dDbNEz76nE5fx3VBKJ91BvWLJ1qdfeyTHleH2HwxItAlNkZrR8vZRJhS_N_-36MJ-zwIeCWUSpMdr4gdJnDGKaLzmr30BAjuVJ8dKoR1cs30B_zbSgddkEG4UfUhLsA9H8G2MdOQFcD54sxGIMNdNN3LwgQ0rcbtLBLVpvrnotlajBdONkefBil-FbE1v68MLHk24GFzmiEdswGgZRylSPQmjoRoMbSu78cw6J9MZ7soNZ3390r5pWhYgxC4_8YVY7BEbEQiJr2ClF7xN-S7lZAcLR3cGy8DzUxwPX96PvLPIz7nD-mGIG0Dg",
        get Authorization() {
            if (!this._token) {
                this._token = localStorage.getItem("_token");
            }
            return this._token;
        },
        set Authorization(value) {
            localStorage.removeItem('_token')
            if (value) {
                localStorage.setItem("_token", value);
            }
            this._token = value;
        }
    },
    setheader(token) {
        this.header.Authorization = "Bearer " + token;
    },
    async get(url) {
        const res = await axios.get(url, { headers: this.header }).catch(res => res);
        return handleResult(res);

    },
    async post(url, data, config) {
        if(!config) config = { headers: this.header };
        const res = await axios.post(url, data, config).catch(res => res);
        return handleResult(res);
    },
    async awaitTasks(tasks) {
        if (!tasks) return;
        var result = [];
        for (var i = 0; i < tasks.length; i++) {
            result.push(await tasks[i]);
        }
        return result;
    },
    async Delay(ms) {
        return new Promise((reslove,reject)=>{
            setTimeout(()=>{
                reslove()
            },ms)
        });
    }
}

export default {
    http:http,
    install(Vue, options) {
        Vue.prototype.$http = http;
    }
}