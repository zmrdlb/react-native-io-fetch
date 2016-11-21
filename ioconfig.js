/**
 * @fileoverview io请求的一些公共配置
 */
 const that = {
    /**
     * 对于接口返回的业务错误进行统一处理
     * @type {Object}
     */
    fail: {
        funname: 'fail', //当发生业务错误的时候，调用的方法名
        filter: function(result) {
            // if(result.code != 'A0001'){
            //     return true; //说明发生了业务错误
            // }else{
            //     return false;
            // }
            return false;
        }
    },

    /**
     * 请求头部配置
     * @type {Object}
     */
    headers: {
    },
    /**
     * 请求对象参数配置
     * @type {Object}
     */
    request: {
        method: 'GET', //GET|POST
        mode: 'cors' //cors|no-cors|same-origin|navigate
        //其他参数
        //body: credentials: cache: redirect: referrer: integrity
    }
};

/**
 * 调用io组件，传入的参数格式
 * @type {Object}
 */
that.ioparams = {
    headers: that.headers, //同headers
    request: that.request, //同request
    /**
     * 请求参数。可以是以下几种类型：
     * Bolb
     * BufferSource
     * FormData
     * URLSearchParams
     * USVString
     * JSON: 如果是json, (则转化成URLSearchParams,暂时不支持URLSearchParams) 则转化成querystring
     */
    // data: {},
    url: '', //请求url地址
    /**
     * 请求的数据类型，默认为json. 数据类型和reponse对象返回获取结果的方法对应关系如下
     * arrayBuffer: response.arrayBuffer
     * blob: response.blob
     * formData: response.formData,
     * json: response.json,
     * text: response.text
     * @type {String}
     */
    type: 'json',
    timeout: 6000,
    /**
     * 对于接口返回错误，一般因为网络原因，进行的统一处理
     */
    error: function(error){
        //error或有或无 error.message
        //Alert.alert('系统消息',error.message || '亲，忙不过来了');
    },
    /**
     * 如果fail配置了funname为fail,则调用此方法
     * @return {[type]} [description]
     */
    fail: function(result,response){
        //Alert.alert('系统消息',result.errmsg || '亲，忙不过来了');
    },
    success: function(result,response){},
    complete: function(){},

    dealdatafun: function(result){return result.data},

    dealfail: true, //是否统一处理业务错误
    dealdata: true //如果dealfail为true,并且fail.filter返回为false时，如果此项设置为true,则调用dealdatafun方法，返回处理后的数据
};

export default that;
