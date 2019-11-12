import axios from 'axios';
const udbBaseApi = 'https://udb.video.somo.tech/api/v1/udb/'
const vmtBaseApi = 'https://vmt.video.somo.tech/api/v1/vmt/'
const vmtBaseApi_1 = 'http://39.107.43.237:8090/api/v1/vmt/'
// const billBaseApi = "https://billing.video.somo.tech/api/v1/";




axios.defaults.timeout = 5000;
axios.defaults.baseURL ='http://www.baidu.com'; //填写域名

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/json'
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
}, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
            console.log('错误请求')
          break;
        case 401:
            console.log('未授权，请重新登录')
          break;
        case 403:
          console.log('拒绝访问')
          break;
        case 404:
          console.log('请求错误,未找到该资源')
          break;
        case 405:
          console.log('请求方法未允许')
          break;
        case 408:
          console.log('请求超时')
          break;
        case 500:
          console.log('服务器端出错')
          break;
        case 501:
          console.log('网络未实现')
          break;
        case 502:
          console.log('网络错误')
          break;
        case 503:
          console.log('服务不可用')
          break;
        case 504:
          console.log('网络超时')
          break;
        case 505:
          console.log('http版本不支持该请求')
          break;
        default:
          console.log(`连接错误${err.response.status}`)
      }
    } else {
      console.log('连接到服务器失败')
    }
    return Promise.resolve(err.response)
})


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
// 生成随机数




export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{ 
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

/**
* 下面是获取数据的接口
*/
/** 
* 测试接口
* 名称：exam
* 参数：paramObj/null
* 方式：fetch/post/patch/put
*/

export const server = {
	// 实时获取会议的参会人员
	users: function(paramObj){
	    return get(paramObj);
	},
	// 获取会议室人名的接口
	meetingName: function(paramObj){
	    return post(udbBaseApi + 'uinfo/query',paramObj);
	},
	// 发送消息的接口
	sendAmessage: function(paramObj){
	    return post(vmtBaseApi + 'im/broadcast',paramObj);
	},
	// 走接口的3秒轮询ping
	ping: function(paramObj){
	    return post(vmtBaseApi + 'ping',paramObj);
	},
	// mid转成code的函数
	code: function(paramObj){
	    return post(vmtBaseApi + 'code/query',paramObj);
	},
	// 加入会议的接口
	join: function(paramObj){
	    return post(vmtBaseApi + 'join',paramObj);
	},
	// 创建会议的接口
	found: function(paramObj){
	    return post(vmtBaseApi + 'create',paramObj);
	},
	// 登陆接口
    login: function(paramObj){
        return post(udbBaseApi + 'login',paramObj);
    },
}