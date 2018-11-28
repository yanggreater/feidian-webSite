import axios from 'axios';
const Util = {
    apiPath:'http://123.207.19.172:8080/api',
    //读取cookie
    }
Util.ajax = axios.create({
    baseURL: Util.apiPath,
    //xhrFields:{'Access-Control-Allow-Origin':'*'},
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
});
Util.getLastDate = function(time) {
    var date = new Date(time);
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return date.getFullYear() + '-' + month + "-" + day;
}
export default Util;