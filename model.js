const {IoConfig,Io} = require('./index');
const extend = require('extend');

/**
 * 设置自己的配置
 */
IoConfig.fail.filter = function(result){
    if(result.code != 'A0001'){
        return true; //说明发生了业务错误
    }else{
        return false;
    }
}

IoConfig.ioparams.error = function(error){
    //error或有或无 error.message
    console.log(error.message || '亲，忙不过来了');
}

IoConfig.ioparams.fail = function(result,response){
    if(result.code == 'A0002'){
        console.log('未登录');
    }else{
        console.log(result.errmsg || '亲，忙不过来了');
    }
}

/**
 * 调用以下方法的时候，opt如ioparams。但是一般只传以下参数就可以了：
 *   data success complete
 *   以下方法已经统一处理了，如果想覆盖自行传入
 *   error fail
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
