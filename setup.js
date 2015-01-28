window.fastyle = {}
developerMode = window.fastyle.developerMode = document.location.hash == "#dev"
disabled = window.fastyle.disabled = document.location.hash == "#nofastyle"
isHttps = window.fastyle.isHttps = document.location.protocol == "https:"
ss = "//maxcdn.bootstrapcdn.com/bootswatch/3.3.1/"+(sessionStorage.getItem('theme')||'simplex')+"/bootstrap.min.css"
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