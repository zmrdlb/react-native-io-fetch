# react-native-io-fetch
学习react-native的时候，知道了[fetch api](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)，新的资源获取语法，比XmlHttpRequest具有更强大的功能：易读性、抽象性、简洁性、支持各种类型资源请求等。
现在对于fetch的使用，封装了一层，提取了便于开发者配置和使用的api.

[using fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

＃ 注意
此包是针对react-native开发的，而且node现在还不支持某些新的web api, 如Request对象，所以请下载到react native项目中使用测试。

＃ 安装
npm install react-native-io-fetch --save

# 使用

- 将react-native-io-fetch中的model.js拷贝在react-native项目里，此处举例存放路径为：common/model.js

- 将model.js里面的const {IoConfig,Io} = require('./index');改成const {IoConfig,Io} = require('react-native-io-fetch');

- 将test.js里面的代码，放在react-native中的某处引用，注意修改里面model.js的引用路径

- 切换到目录react-native-io-fetch下，运行npm run interstart, 开启node接口模拟

- 运行react-native项目，执行里test.js中拷贝的代码，查看结果。

＃ API说明

## IoConfig

io接口请求配置：此处封装了io请求默认配置

- Ioconfig.ioparams: 'io请求参数'. 默认：

```
{
    headers: Ioconfig.headers
    request: Ioconfig.request
    /**
     * 请求参数。可以是以下几种类型：
     * Bolb
     * BufferSource
     * FormData
     * URLSearchParams
     * USVString
     * JSON: 如果是json, (则转化成URLSearchParams,暂时不支持URLSearchParams) 则转化成querystring
     */
    data: {},
    url: '', //请求url地址
    /**
     * 请求的数据类型，默认为json. 支持的数据类型有如下几种
     * arrayBuffer
     * blob
     * formData
     * json
     * text
     */
    type: 'json',
    timeout: 6000, //接口超时时间
    /**
     * 对于接口返回错误，一般因为网络原因，进行的统一处理
     */
    error: function(error){
        //error或有或无 error.message
        //Alert.alert('系统消息',error.message || '亲，忙不过来了');
    },
    /**
     * 如果fail配置了funname为fail,则调用此方法. 此时fail.filter返回true
     * @param {Object|Other} result 接口返回数据
     * @param {Response} response 返回的response对象
     * @return {[type]} [description]
     */
    fail: function(result,response){
        //Alert.alert('系统消息',result.errmsg || '亲，忙不过来了');
    },
    /**
     * 成功调用方法。调用的情况有如下几种：
     * 1. dealfail为true, 则fail.filter返回false时，调用success
     *          此时如果dealdata为true, 则result为dealdatafun返回的数据
     * 2. dealfail为false时，则接口返回后直接调用此方法（不发生error的情况下）
     *
     * @param {Object|Other} result 接口返回数据
     * @param {Response} response 返回的response对象
     */
    success: function(result,response){},
    /**
     * 接口请求完毕调用。无论success,fail,error
     * @return {[type]} [description]
     */
    complete: function(){},
    /**
     * 如果dealdata为true, 则success的result为此方法返回的数据
     * @param {Object|Other} result 接口返回数据
     * @return {[type]}        [description]
     */
    dealdatafun: function(result){return result.data},
    /**
     * 是否统一处理业务错误
     * @type {Boolean}
     */
    dealfail: true, //是否统一处理业务错误
    /**
     * 当业务成功时，调用success前，是否统一格式化数据
     * 如果dealfail为true,并且fail.filter返回为false时，如果此项设置为true,则调用dealdatafun方法，返回处理后的数据
     * @type {Boolean}
     */
    dealdata: true
}
```

- IoConfig.fail: 统一处理接口返回的业务错误。如接口返回格式为：
    
````
{
  code: 'A0001', //A0001: 业务处理成功，A0002: 未登录，A0003: 其他业务处理错误
}
````
````
IoConfig.fail = {
        funname: 'fail', //当发生业务错误的时候，调用的IoConfig.ioparams里配置的方法名
        filter: function(result) {
            if(result.code != 'A0001'){
                return true; //说明发生了业务错误
            }else{
                return false;
            }
        }
    }
````

- IoConfig.headers: 请求头部配置[Headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers)
如果'io请求参数'的data是JSON格式，则headers默认是：
```
{
      'Content-Type': 'application/x-www-form-urlencoded',
      'charset': 'UTF-8'
}
```

- IoConfig.request: 请求配置[Request](https://developer.mozilla.org/zh-CN/docs/Web/API/Request).默认：
```
{
        method: 'GET', //GET|POST
        mode: 'cors' //cors|no-cors|same-origin|navigate
        //其他参数
        //body: credentials: cache: redirect: referrer: integrity
}
```

## Io 

底层io请求方法

Io.request({...}) 参数格式同 IoConfig.ioparams

## 引用到自己项目中来

- 参考model.js添加项目io接口配置

- 参考test.js，如何使用model.js里面的接口
