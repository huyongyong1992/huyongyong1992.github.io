/**
 * 配置编译环境和线上环境之间的切换
 *
 * url: 接口域名地址
 * routerMode: 路由模式
 * redirectUrl： 微信授权需要的域名
 */
let url;
let signUrl ;
let routerMode;
let wxapiUrl;
if (process.env.NODE_ENV === 'production') {
	url = 'https://ddk-api.vcredit.com';	//生产环境接口url
  wxapiUrl='https://ddk-wechat.vcash.cn/wechat/ddk/api';
	routerMode = 'hash';
	signUrl = 'https://web.vcredit.com';
}else{
	url = 'http://ddk-dev.vcredit.com/o2o/platform/api';
	routerMode = 'hash';
	signUrl = 'http://o2o-dev.vcredit.com';
	wxapiUrl='http://ddk-dev.vcredit.com/wechat/ddk/api';
}

export {
	url,
	routerMode,
	signUrl,
  wxapiUrl
}
