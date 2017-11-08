import axios from 'axios';
import {getQuery} from './mUtils';


function json2url(json) {
  var arr = [];
  var str = '';
  for (var i in json) {
    str = i + '=' + json[i];
    arr.push(str);
  }
  return arr.join('&');
}
var appGetInfo = (url='',data={},type='get') =>{
  const accessToken = getQuery('accessToken')||getQuery('token')||window.localStorage.getItem('appToken');
  const clientType = getQuery('clientType');
  var fetch = axios.create({
    // baseUrl:baseUrl,
    headers:{
      'Content-Type': 'application/json',
      'clientType': clientType,
      'accessToken': accessToken
    }

  })
  if(type === 'get'){	//对象拼接成字符串
    var params = json2url(data);
    var getUrl = params ? (url + '?' + params) : url ;	//若传参data为空的话，就不拼接，不为空，则拼接url
    return fetch.get(getUrl).then(function (resp) {
      if(resp.data.error) {		//弹出错误信息
        // customToast(resp.data);
        alert(resp.data.message);
      }
      return resp.data ;
    }).catch(e =>{
      if(e.toString().indexOf('Network') > -1) {
        alert('网络异常，请检查网络连接');
        return ;
      }
      if(e.toString().indexOf('time') > -1) {
        alert('请求超时，请稍后再试');
        return ;
      }
      alert(e)
    })
  }

  if (type === 'post') { //对象拼接成字符串
    return fetch({
      method: type,
      url: url,
      data: data,
    }).then(function(resp) {
      if(resp.data.error) {		//弹出错误信息
        alert(resp.data.message);
        // customToast(resp.data);
      }
      return resp.data;
    }).catch(e =>{
      if(e.toString().indexOf('Network') > -1) {
        alert('网络异常，请检查网络连接');
        return ;
      }
      if(e.toString().indexOf('time') > -1) {
        alert('请求超时，请稍后再试');
        return ;
      }
      alert(e)
    })
  }
};


export { appGetInfo }
