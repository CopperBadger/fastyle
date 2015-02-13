// -- (Hopefully) fixes nasty missing FlashObject constructor bug. Triggering source shown below:
// (Must come first to ensure it doesn't slip by)
/*// <![CDATA[
var ox_swf = new FlashObject('//rv.furaffinity.net/www/images/267cad750afe564faedb977713f07ab3.swf', 'Advertisement', '300', '200', '9');
ox_swf.addVariable('clickTARGET', '_blank');
ox_swf.addVariable('clickTAG', 'http%3A%2F%2Frv.furaffinity.net%2Fwww%2Fdelivery%2Fck.php%3Foaparams%3D2__bannerid%3D842__zoneid%3D10__cb%3Daf56afb9e5__oadest%3Dhttp%253A%252F%252Fwww.imvu.com%252Flanding_page%252Fpage%252Ffurry_01%252F%253Faffid%253Dfa%2526subid1%253D');
ox_swf.addParam('wmode','opaque');
ox_swf.addParam('allowScriptAccess','always');
ox_swf.write('ox_d854ba90c75db45447a0c76ff3a91585');
if (ox_swf.installedVer.versionIsValid(ox_swf.getAttribute('version'))) {
  document.write("<div id='beacon_af56afb9e5' style='position: absolute; left: 0px; top: 0px; visibility: hidden;'><img src='//rv.furaffinity.net/www/delivery/lg.php?bannerid=842&amp;campaignid=839&amp;zoneid=10&amp;loc=http%3A%2F%2Fwww.furaffinity.net%2Fuser%2Fcopperbadger%2F%23dev&amp;referer=http%3A%2F%2Fwww.furaffinity.net%2Fuser%2Fcopperbadger%2F&amp;cb=af56afb9e5' width='0' height='0' alt='' style='width: 0px; height: 0px;' /></div>");
} else {
  document.write("<div id='beacon_af56afb9e5' style='position: absolute; left: 0px; top: 0px; visibility: hidden;'><img src='//rv.furaffinity.net/www/delivery/lg.php?bannerid=842&amp;campaignid=839&amp;zoneid=10&amp;loc=http%3A%2F%2Fwww.furaffinity.net%2Fuser%2Fcopperbadger%2F%23dev&amp;referer=http%3A%2F%2Fwww.furaffinity.net%2Fuser%2Fcopperbadger%2F&amp;oxfb=1&amp;cb=af56afb9e5' width='0' height='0' alt='' style='width: 0px; height: 0px;' /></div>");
}
// ]]>*/
dumFunc = function(foo){console.log("X.swf - "+foo);return false}
document.write = dumFunc; // Important. CDATA script will overwrite entire page contents otherwise
window.FlashObject = function(){
  return {
    addVariable:dumFunc,
    addParam:dumFunc,
    getAttribute:dumFunc,
    write:dumFunc,
    installedVer:{
      versionIsValid:dumFunc
    }
  }
}

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
window.fastyle.defaultTheme = "darkly"
window.fastyle.banner = $('#fa_header').css('background-image')
window.fastyle.theme = window.fastyle.getCookie('theme',window.fastyle.defaultTheme)
window.fastyle.ss = "//maxcdn.bootstrapcdn.com/bootswatch/3.3.1/"+(window.fastyle.theme)+"/bootstrap.min.css"
window.fastyle.funTitles=["Give us a Moment","Just a Second","Please Wait","Doing the Thing","Hold on a Sec","Stuff is Happening"]
window.fastyle.uname = $('#my-username').text().substring(1)
window.fastyle.domain = (t=document.location.host.match(/^([^\.]+)\./))?t[1]:"www"
window.fastyle.loginSession = window.fastyle.getCookie("a")

window.fastyle.truncateName = function(src) {
	return (t=src.toLowerCase().match(/[a-z0-9-~\.]+/g))?t.join(''):"";
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

// YouTube Video ID RegEx: http://markmail.org/message/jb6nsveqs7hya5la
window.fastyle.getYouTubeIDs = function(src){
  console.warn("Calling deprecated getYouTubeIDs function. Use getYouTubeEmbeds instead.")
  videoids = {};
  videoMatches = src.match(/youtu[^\s]+/g)
  for(vm in videoMatches){
    if(id=(t=videoMatches[vm].match(/(?:v=|\.be\/)([A-Za-z0-9_-]{11})/))?t[1]:""){
      videoids[id] = 1
      console.log("Found "+id)
    }
  }
  return $.map(videoids,function(e,i){return i})
}

tlkp={s:1,m:60,h:3600}
window.fastyle.getYouTubeData = function(src){
  ids = {}
  out = []
  l = (videoMatches = src.match(/youtu[^\s]+/g)||[]).length
  i=-1
  while(++i<l&&(wm=videoMatches[i])){
    start = 0
    id=(t=wm.match(/(?:v=|\.be\/)([A-Za-z0-9_-]{11})/))?t[1]:""
    if(!id||!!ids[id]){continue;}
    ids[id] = 1
    if(timestamp = ((t=wm.match(/t=([\dhms]+)/))?t[1]:'')){
      j = -1
      e=timestamp.match(/\d+[hms]/g)
      while(++j<e.length){
        start+=parseInt(e[j])*tlkp[e[j][e[j].length-1]]
      }
    }
    out.push({id:id,start:start})
  }
  return out;
}

window.fastyle.getYouTubeEmbeds = function(src){
  return $.map(window.fastyle.getYouTubeData(src),function(e){
    return '<iframe src="//www.youtube.com/embed/'+e.id+'?start='+e.start+'" class="embed-responsive-item" frameborder="0" allowfullscreen> </iframe>'
  })
}

window.fastyle.capitalize = function(src){
  return src?(src[0].toUpperCase()+src.substring(1)):src
}

window.fastyle.addCommas = function(strnum){
  out = ""
  l = strnum.length
  i = -1
  while(++i<l){
    out+=strnum[i]
    if(((l-i)%3)==1&&(i+1)!=l){out+=","}
  }
  return out
}

window.fastyle.setNavbarPosition = function(fix){
  $('#fastyle-navbar').toggleClass('navbar-fixed-top',fix)
  $('#body-wrapper').css({'margin-top':(fix)?'72px':'8px'})
}

window.fastyle.requests = {}
window.fastyle.requestCount = 0
window.fastyle.requestDelay = 1500
window.fastyle.ajax = function(opt) {
  if(opt&&opt.url){
    if(!window.fastyle.requests[opt.url]) {
      console.log(
          "-- Request #"+(++window.fastyle.requestCount)+": "+opt.url + 
          ((opt.data)?" % "+JSON.stringify(opt.data).replace(/(.{0,64}).*/,'$1 (...)'):"")
        )
      obj = $.extend(true,{type:"POST"},opt)
      obj.complete = function(xhr) {
        setTimeout(function() {
          // Clear new request
          window.fastyle.requests[opt.url]=false
        },window.fastyle.requestDelay)
        if(opt.complete){opt.complete(xhr)}
        if(opt.always){opt.always()}
      }
      window.fastyle.requests[opt.url] = $.ajax(obj)
    } else {
      if(opt.always){opt.always()}
      if(opt.impatient){
        if(msg=opt.impatient()){
          window.fastyle.showMessage(msg)
        }
      }
      console.warn("Impatient request to "+opt.url)
    }
  }
}

// TODO: add on-screen message system, post messages to it using this function
window.fastyle.showMessage = function(msg){
  console.log("User message: "+msg)
}