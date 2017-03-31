const {IoConfig,Io} = require('react-native-io-fetch');
const extend = require('extend');

/**
 * 设置自己的配置
 */

 /**
  * 业务错误条件配置
  * @param  {[type]} result [description]
  * @return {[type]}        [description]
  */
IoConfig.fail.filter = function(result){
    if(result.code != 'A0001'){
        return true; //说明发生了业务错误
    }else{
        return false;
    }
}

/**
 * io请求发送前执行
 * @return {[type]} [description]
 */
IoConfig.ioparams.beforeSend = function(){
    console.log('请求开始');
}

/**
 * io请求结束后
 */
IoConfig.ioparams.complete = function(){
    console.log('请求结束')
}

/**
 * 网络错误或者系统错误
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
IoConfig.ioparams.error = function(error){
    //error或有或无 error.message
    console.log(error.message || '亲，忙不过来了');
}

/**
 * 业务错误处理
 * @param  {[type]} result   [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
IoConfig.ioparams.fail = function(result,response){
    if(result.code == 'A0002'){
        console.log('未登录');
    }else{
        console.log(result.errmsg || '亲，忙不过来了');
    }
}

/**
 * 调用以下方法的时候，opt如ioparams。但是一般只传以下参数就可以了：
 *   data success
 *   以下方法已经统一处理了，如果想覆盖自行传入
 *   beforeSend error fail complete
 */
module.exports = {
    //listdata接口
    listdata(opt){
        Io.request(extend(true,{
            request: {
                method: 'POST'
            },
            url: 'http://127.0.0.1:8000/listdata'
        },opt));
    }
};
