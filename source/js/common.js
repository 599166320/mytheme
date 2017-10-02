/**
 * @param type POST或者GET
 * @param url  控制器类开始路径
 * @param dataType 选择html,xml,json之一
 * @param data {key1:value1,key2:value2,.....}或者表单serialize之后的数据
 * @param callBack 回调函数，返回ajax调用的结果
 * @param beforeSend 在ajax请求返回之前
 * @param error 获取错误信息
 */
function ajaxCall(type,url,dataType,data,callBack,beforeSend,error){
	url = rmFSlash(url);
	if(beforeSend&&error){
		ajaxCall_moreInfo(type,url,dataType,data,callBack,beforeSend,error);
	}else{
	    $.ajax({
			type: type,
			url: url,
			dateType: dataType,
			data: data,
			success: function(returnedData){
				callBack(returnedData);
			}
		});
	}
}
/**
 * 
 * @param type POST或者GET
 * @param url  控制器类开始路径
 * @param dataType 选择html,xml,json之一
 * @param data {key1:value1,key2:value2,.....}或者表单serialize之后的数据
 * @param callBack 回调函数，返回ajax调用的结果
 * @param beforeSend 在ajax请求返回之前
 * @param error 获取错误信息
 */
function ajaxCall_moreInfo(type,url,dataType,data,callBack,beforeSend,error){
	url = rmFSlash(url);
    $.ajax({
			type: type,
			url: url,
			dateType: dataType,
			data: data,
			success: function(returnedData){
				callBack(returnedData);
			},
			beforeSend:function(XHR){
				beforeSend(XHR);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				$("#ajax-tips").hide(); 
				alert("has error!");
				error(XMLHttpRequest, textStatus, errorThrown);
				return false ;
			}
    
		});
}

/**
 * @TODO 去除URL字符串开头的所有斜杠
 * @param url
 */
function rmFSlash(url) {
	return url.replace(/^\/+/, '');
}

/**
 * 
 * @param cnStr 中文字符
 * @returns 编码之后的
 */
function encodeCnString(cnStr){
	return encodeURIComponent(encodeURIComponent(cnStr));
}

function jump(){
	//获取当前的url
	var url=window.location.href;
	//将字符串转换为字符
	var url_string=url.toString();
	var index1=url_string.split("/");
	var index2=index1[index1.length-1];
	var str=url.substring(0, url.indexOf(index2));
	return str;
	
	
}


function formatDate(date){
	if(date == undefined || $.trim(date) == '') return '';
	date = date.replace(/-/g, '/');
	return new Date(date).format('yyyy年MM月dd日');
}

Date.prototype.format = function(format){
	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	}

	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("("+ k +")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
}

function parseLanguage(code){
	var language = {
		'zh-cn': '简体中文',
		'zh-hk': '中文-香港',
		'zh-mo': '中文-澳门',
		'zh-tw': '中文-台湾',
		'en': '英语',
		'en-us': '英语-美国',

	}
	return language[code];
}

try {
	$.fn.serializeJson=function(){
		var serializeObj={};
		var array=this.serializeArray();
		var str=this.serialize();
		$(array).each(function(){
			if(serializeObj[this.name]){
				if($.isArray(serializeObj[this.name])){
					serializeObj[this.name].push(this.value);
				}else{
					serializeObj[this.name]=[serializeObj[this.name],this.value];
				}
			}else{
				serializeObj[this.name]=this.value;
			}
		});
		return serializeObj;
	};
} catch (e) {
	//alert(e.name + ": " + e.message);
}



/**
 * 字符串校验工具类
 */
var stringHelper = {
	//过滤敏感字符 正则表达式
	checkScript: function (text) {
		var r = new RegExp("<|>|script|alert|{|}|#|\\$|'|\"|:|;|&|\\*|@@|%|\\^|\\?", 'g');
		if(text!=undefined) {
			var arr = text.match(r);
			return this.uniqueness(arr);
		}
	},
	//去重复 方法
	uniqueness: function (a) {
		var toObject = function (a) {

			var o = {};
			for (var i = 0, j = a.length; i < j; i = i + 1) {
				o[a[i]] = true;
			}
			return o;
		};
		var keys = function (o) {
			var a = [], i;
			for (i in o) {
				if (o.hasOwnProperty(i)) {
					a.push(i);
				}
			}
			return a;
		};

		if (a == null) {
			return null;
		}
		return keys(toObject(a));
	},
	//判断汉字个数
	chineseLen: function (txt) {
		var n = 0;
		for (var i = 0, len = txt.length; i < len; i++) {
			if (/[\u4E00-\u9FA5]/.test(txt.charAt(i)))n++;
		}
		return n;
	},
	length: function (txt) {
		return txt.replace(/[^\x00-\xff]/g,"a").length;
	}
}

/*'yyyy-MM-dd HH:mm:ss'格式的字符串转日期*/
function stringToDate(str){
    var tempStrs = str.split(" ");
    var dateStrs = tempStrs[0].split("-");
    var year = parseInt(dateStrs[0], 10);
    var month = parseInt(dateStrs[1], 10) - 1;
    var day = parseInt(dateStrs[2], 10);
    var timeStrs = tempStrs[1].split(":");
    var hour = parseInt(timeStrs [0], 10);
    var minute = parseInt(timeStrs[1], 10);
    var second = parseInt(timeStrs[2], 10);
    var date = new Date(year, month, day, hour, minute, second);
    return date;
}




