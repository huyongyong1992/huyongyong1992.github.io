import axios from 'axios';
import { customToast } from './mUtils';
// import { baseUrl } from './env';

function json2url(json,isQueryToken) {
  if(!isQueryToken) {
    let accessToken = window.localStorage.getItem('accessToken');
    json.accessToken = accessToken;	//每次请求都带上accessToken
  }
  let arr = [];
  let str = '';
  for (let i in json) {
    str = i + '=' + json[i];
    arr.push(str);
  }
  return arr.join('&');
}
var getInfo = (url='',data={},type='get',from='',isQueryToken=false) =>{
  let accessToken =window.localStorage.getItem('accessToken');
  let fetch = axios.create({
    headers:{
      'Content-Type': 'application/json',
      'clientType': 'ddk_wechat',
      'apiClientVersion': 2,
      'accessToken':accessToken
    },
    timeout: 150000

  })
  if(type === 'get'){	//对象拼接成字符串
    let params = json2url(data,isQueryToken);
    let getUrl = params ? (url + '?' + params) : url ;	//若传参data为空的话，就不拼接，不为空，则拼接url
    return fetch.get(getUrl).then(function (resp) {
      if (resp.data.data && resp.data.data.accessToken) {	//更新accessToken
        window.localStorage.setItem('accessToken', resp.data.data.accessToken);
      }
      if(resp.data.data && resp.data.data.orderId) {		//更新orderId
        window.localStorage.setItem('orderId', resp.data.data.orderId);
      }
      if(resp.data.error) {		//弹出错误信息
        customToast(resp.data);
      }
      return resp.data ;
    }).catch((e) =>{
      alert(e)
    });
  }

  if (type === 'post') { //对象拼接成字符串
    let postUrl ;
    if (!isQueryToken) {
      const accessToken = window.localStorage.getItem('accessToken');
      postUrl = url.split("?")[1] ? url.split("?")[0] + "?" + url.split("?")[1] + "&accessToken=" + accessToken : url + "?accessToken=" + accessToken;
    } else {
      postUrl = url
    }

    return fetch({
      method: type,
      url: postUrl,
      data: data,
    }).then(function(resp) {
      if (resp.data.data && resp.data.data.accessToken) { //更新accessToken
        window.localStorage.setItem('accessToken', resp.data.data.accessToken);
      }
      if(resp.data.data && resp.data.data.orderId) {    //更新orderId
        window.localStorage.setItem('orderId', resp.data.data.orderId);
      }
      if(resp.data.error) {		//弹出错误信息

        customToast(resp.data);
      }
      return resp.data;
    }).catch((e) => {
      alert(e)
    })
  }
};


export { getInfo }
