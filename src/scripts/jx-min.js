jx={getHTTPObject:function(){var t=!1;if("undefined"!=typeof ActiveXObject)try{t=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{t=new ActiveXObject("Microsoft.XMLHTTP")}catch(o){t=!1}}else if(window.XMLHttpRequest)try{t=new XMLHttpRequest}catch(e){t=!1}return t},load:function(url,callback,format,method,opt){var http=this.init();if(http&&url){http.overrideMimeType&&http.overrideMimeType("text/xml"),method||(method="GET"),format||(format="text"),opt||(opt={}),format=format.toLowerCase(),method=method.toUpperCase();var now="uid="+(new Date).getTime();url+=url.indexOf("?")+1?"&":"?",url+=now;var parameters=null;if("POST"==method){var parts=url.split("?");url=parts[0],parameters=parts[1]}http.open(method,url,!0),"POST"==method&&(http.setRequestHeader("Content-type","application/x-www-form-urlencoded"),http.setRequestHeader("Content-length",parameters.length),http.setRequestHeader("Connection","close"));var ths=this;http.onreadystatechange=opt.handler?function(){opt.handler(http)}:function(){if(4==http.readyState)if(200==http.status){var result="";http.responseText&&(result=http.responseText),"j"==format.charAt(0)?(result=result.replace(/[\n\r]/g,""),result=eval("("+result+")")):"x"==format.charAt(0)&&(result=http.responseXML),callback&&callback(result)}else opt.loadingIndicator&&document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator),opt.loading&&(document.getElementById(opt.loading).style.display="none"),error&&error(http.status)},http.send(parameters)}},bind:function(t){var e={url:"",onSuccess:!1,onError:!1,format:"text",method:"GET",update:"",loading:"",loadingIndicator:""};for(var o in e)t[o]&&(e[o]=t[o]);if(e.url){var n=!1;e.loadingIndicator&&(n=document.createElement("div"),n.setAttribute("style","position:absolute;top:0px;left:0px;"),n.setAttribute("class","loading-indicator"),n.innerHTML=e.loadingIndicator,document.getElementsByTagName("body")[0].appendChild(n),this.opt.loadingIndicator=n),e.loading&&(document.getElementById(e.loading).style.display="block"),this.load(e.url,function(t){e.onSuccess&&e.onSuccess(t),e.update&&(document.getElementById(e.update).innerHTML=t),n&&document.getElementsByTagName("body")[0].removeChild(n),e.loading&&(document.getElementById(e.loading).style.display="none")},e.format,e.method,e)}},init:function(){return this.getHTTPObject()}};