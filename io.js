/**
 * @fileoverview io请求总a
 */
import IoConfig from './ioconfig';
const extend = require('extend');
const querystring = require('querystring');

export default {
    /**
     * 发起io请求
     * @param  {JSON} ioparams 同ioconfig.ioparams
     * @return {[type]}          [description]
     */
    request: function(ioparams) {
        if(ioparams.url == ''){
            throw new Error('io参数url不能为空');
            return;
        }
        var conf = {};
        if(ioparams.data == undefined || ioparams.data.constructor === Object){
            conf.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'charset': 'UTF-8'
            };
        }

        extend(true,conf,IoConfig.ioparams,ioparams);

        //检测ioparams里的data
        var iodata = body = conf.data;
        if(iodata && iodata.constructor === Object){
             body = querystring.stringify(iodata);
        }

        //赋值request.body
        conf.request.method = conf.request.method.toUpperCase();
        if(body){
            switch(conf.request.method){
                case 'GET':
                    if(typeof body == 'string'){
                        conf.url += '?'+body.toString();
                    }
                    break;
                case 'HEAD':
                    break;
                default:
                    conf.request.body = body;
                    break;
            }
        }

        //发起请求
        conf.request.headers = conf.headers;
        var myrequest = new Request(conf.url,conf.request);

        var race = Promise.race([
            fetch(myrequest),
            new Promise(function(resolve,reject){
                setTimeout(reject,conf.timeout,new Error('请求超时'));
            })
        ]);
        race.then(function(response){
            if(response.ok) { //response.status [200,299]
                response[conf.type]().then(function(result){
                    if(conf.dealfail){ //处理业务错误
                        if(IoConfig.fail.filter(result)){ //有业务错误发生
                            conf[IoConfig.fail.funname](result,response);
                        }else{ //无业务错误发生
                            if(conf.dealdata){
                                conf.success(conf.dealdatafun(result),response);
                            }else{
                                conf.success(result,response);
                            }
                        }
                    }else{
                        conf.success(result,response);
                    }
                },function(error){
                    conf.error(error);
                });
            }else{
                conf.error({message: response.statusText || '网络错误'});
            }
            conf.complete();
        }).catch(function(error){
            conf.error(error);
            conf.complete();
        });
    }
};
