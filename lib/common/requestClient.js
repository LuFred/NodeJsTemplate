/**
 * Created by lujiangbo on 11/10/16.
 */

var request=require('request-promise');
var extend=require('extend');
var configLite=require('config-lite');
var isBoolean = require('lodash/isBoolean');

const BASE_API_URI=configLite.communityAPIUrl;
var base_header={
    headers:{
        Authorization:""
    }
}

var client={
    get:function (url,data,isJSON) {
      if(!isBoolean(isJSON)){
          isJSON=true;
      }
        var opt={
            uri:BASE_API_URI+url,
             qs:data,
            json:isJSON
        };
       return request(opt);
    },
    post:function (url,data,isJSON) {
        if(!isBoolean(isJSON)){
            isJSON=true;
        }
        var opt={
            method:"POST",
            uri:BASE_API_URI+url,
            body:data,
            json:isJSON
        };
        return request(opt);
    },
    delete:function (url) {
        var opt={
            method:"DELETE",
            uri:BASE_API_URI+url
        };
        return request(opt);
    },
    put:function (url,data,isJSON) {
        if(!isBoolean(isJSON)){
            isJSON=true;
        }
        var opt={
            method:"PUT",
            uri:BASE_API_URI+url,
            body:data,
            json:isJSON
        };
        return request(opt);
    }
};

module.exports=client;
