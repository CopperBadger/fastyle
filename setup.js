window.fastyle = {}
developerMode = window.fastyle.developerMode = document.location.hash == "#dev"
disabled = window.fastyle.disabled = document.location.hash == "#nofastyle"
isHttps = window.fastyle.isHttps = document.location.protocol == "https:"
ss = "//maxcdn.bootstrapcdn.com/bootswatch/3.3.1/"+(sessionStorage.getItem('theme')||'simplex')+"/bootstrap.min.css"
window.fastyle.funTitles=["Give us a Moment","Just a Second","Please Wait","Doing the Thing","Hold on a Sec","Stuff is Happening"]
window.fastyle.uname = $('#my-username').text().substring(1)

window.fastyle.truncateName = function(src) {
	return (t=src.toLowerCase().match(/[a-z0-9\-\~\.]+/g))?t.join(''):"";
}