window.fastyle = {}

window.fastyle.getCookie = function(key,def){
  return (t=document.cookie.match(new RegExp(key+"=([^\;]+)")))?t[1]:(def||undefined)
}

window.fastyle.setCookie = function(key,value) {
  exp = new Date((new Date).getTime()+3.1536e10).toGMTString() // One year from now
  return document.cookie = (key+"="+value+";expires="+exp+";path=/;domain=furaffinity.net;")
}

developerMode = window.fastyle.developerMode = document.location.hash == "#dev"
disabled = window.fastyle.disabled = document.location.hash == "#nofastyle"
isHttps = window.fastyle.isHttps = document.location.protocol == "https:"
window.fastyle.theme = window.fastyle.getCookie('theme','simplex')
window.fastyle.ss = "//maxcdn.bootstrapcdn.com/bootswatch/3.3.1/"+(window.fastyle.theme)+"/bootstrap.min.css"
window.fastyle.funTitles=["Give us a Moment","Just a Second","Please Wait","Doing the Thing","Hold on a Sec","Stuff is Happening"]
window.fastyle.uname = $('#my-username').text().substring(1)
window.fastyle.domain = (t=document.location.host.match(/^([^\.]+)\./))?t[1]:"www"

window.fastyle.truncateName = function(src) {
	return (t=src.toLowerCase().match(/[a-z0-9-_~\.]+/g))?t.join(''):"";
}

window.fastyle.truncatedName = window.fastyle.truncateName(window.fastyle.uname)

window.fastyle.serialize = function(el) {
  var MD5 = function(src){return "";} //Dummy encryption function
  var o={};
  $.map($(el).find('input:not([type=radio]:not(:checked)), select, textarea'),function(e) {
    if(n=(e=$(e)).prop('name')) {
      o[n]=((e.is('[type=password]'))
	        ?MD5(e.val())
        :((e.is('[type=checkbox]'))
          ?e.is(':checked')
          :e.val()));
    }
  });
  return o;
}

window.fastyle.getYouTubeIDs = function(src){
  videoids = {};
  videoMatches = src.match(/youtu[^\s]+/g)
  for(vm in videoMatches){
    if(id=(t=videoMatches[vm].match(/(?:v=|\.be\/)([^\s]{11})/))?t[1]:""){
      videoids[id] = 1
      console.log("Found "+id)
    }
  }
  return $.map(videoids,function(e,i){return i})
}

window.fastyle.capitalize = function(src){
  return src?(src[0].toUpperCase()+src.substring(1)):src
}

window.fastyle.addCommas = function(strnum){
  n = (l=strnum.length)%3
  return ((p=strnum.substring(0,n))&&(p+(l>3?',':''))) + strnum.substring(n).replace(/(\d{3})(\d{3})/g,'$1,$2')
}