// Stores currently selected values, as they're overridden after appending skeleton
var fullname = $('input[name=fullname]').val();
var userID = $('td.alt1').filter(function() {
    return this.textContent.match(/^\d{7}$/);
}).text();
var useremail = $('input[name=useremail]').val();
var timezone = $('select[name=timezone]').val();
var timezone_dst = $('input[name=timezone_dst]').prop('checked');
var bdaymonth = $('select[name=bdaymonth]').val();
var bdayday = $('select[name=bdayday]').val();
var bdayyear = $('select[name=bdayyear]').val();
var viewmature = $('select[name=viewmature]').val();
var account_disabled = $('select[name=account_disabled]').val(); // <select> in FA's source - turned into radios in FAStyle
var stylesheet = $('select[name=stylesheet]').val(); // <select> in FA's source - turned into radios in FAStyle

var skel = '<div class="alert" id="updateConfirmation" role="alert" style="text-align: center"></div>' +
'<div class="panel panel-default">' +
	'<div class="panel-heading">Account Settings</div>' +
	'<div class="panel-body">' +
    	'<form class="form-horizontal" method="POST" action="https://www.furaffinity.net/controls/settings/">' +
    		'<input type="hidden" name="do" value="update" />' + 
    		'<div class="form-group">' +
				'<label for="fullname" class="col-sm-2 control-label">Name</label>' +
				'<div class="col-sm-10">' +
					'<input name="fullname" type="text" class="form-control" maxlength="150" autocomplete="off" />' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="userID" class="col-sm-2 control-label">User ID</label>' +
				'<div id="userID" class="form-control-static col-sm-10"></div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="useremail" class="col-sm-2 control-label">Email address</label>' +
				'<div class="col-sm-10">' +
					'<input name="useremail" type="text" class="form-control" maxlength="150" />' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="timezone" class="col-sm-2 control-label">Timezone</label>' +
				'<div class="col-sm-10">' +
					'<select name="timezone" class="form-control col-sm-10">' +
						'<option value="-1200">[-1200] International Date Line West</option>' +
						'<option value="-1100">[-1100] Midway Island, Samoa</option>' +
						'<option value="-1000">[-1000] Hawaii</option>' +
						'<option value="-0900">[-0900] Alaska</option>' +
						'<option value="-0800">[-0800] Pacific Time (US &amp; Canada), Tijuana, Baja California</option>' +
						'<option value="-0700">[-0700] Mountain Time (US &amp; Canada), Arizona, Chihuahua, La Paz, Mazatlan</option>' +
						'<option value="-0600">[-0600] Central Time (US &amp; Canada), Central America, Mexico City, Saskatchewan, Guadalajara, Monterrey</option>' +
						'<option value="-0500">[-0500] Eastern Time (US &amp; Canada), Indiana (East), Bogota, Lima, Quito, Rio Branco</option>' +
						'<option value="-0430">[-0430] Caracas</option>' +
						'<option value="-0400">[-0400] Atlantic Time (Canada), Santiago, Manaus, La Paz</option>' +
						'<option value="-0330">[-0330] Newfoundland</option>' +
						'<option value="-0300">[-0300] Brasilia, Buenos Aires, Montevideo, Greenland, Georgetown</option>' +
						'<option value="-0200">[-0200] Mid-Atlantic</option>' +
						'<option value="-0100">[-0100] Cape Verde Is., Azores</option>' +
						'<option value="+0000">[+0000] Greenwich Mean Time, London, Casablanca, Dublin, Edinburgh, Lisbon, Monrovia, Reykjavik</option>' +
						'<option value="+0100">[+0100] Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna, Belgrade, Bratislava, Budapest, Ljubljana, Prague, Brussels, Copenhagen, Madrid, Paris, Sarajevo, Skopje, Warsaw, Zagreb, West Central Africa</option>' +
						'<option value="+0200">[+0200] Amman, Athens, Bucharest, Istanbul, Beirut, Cairo, Harare, Pretoria, Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius, Jerusalem, Minsk, Windhoek</option>' +
						'<option value="+0300">[+0300] Baghdad, Kuwait, Riyadh, Moscow, St. Petersburg, Volgograd, Nairobi, Tbilisi</option>' +
						'<option value="+0330">[+0330] Tehran</option>' +
						'<option value="+0400">[+0400] Abu Dhabi, Muscat, Baku, Caucasus Standard Time, Port Louis, Yerevan</option>' +
						'<option value="+0430">[+0430] Kabul</option>' +
						'<option value="+0500">[+0500] Ekaterinburg, Islamabad, Karachi, Tashkent</option>' +
						'<option value="+0530">[+0530] Chennai, Kolkata, Mumbai, New Delhi, Sri Jayawardenepura</option>' +
						'<option value="+0545">[+0545] Kathmandu</option>' +
						'<option value="+0600">[+0600] Almaty, Novosibirsk, Astana, Dhaka</option>' +
						'<option value="+0630">[+0630] Yangon (Rangoon)</option>' +
						'<option value="+0700">[+0700] Bangkok, Hanoi, Jakarta, Krasnoyarsk</option>' +
						'<option value="+0800">[+0800] Beijing, Chongqing, Hong Kong, Urumqi, Irkutsk, Ulaan Bataar, Kuala Lumpur, Singapore, Perth, Taipei</option>' +
						'<option value="+0900">[+0900] Osaka, Sapporo, Tokyo, Seoul, Yakutsk</option>' +
						'<option value="+0930">[+0930] Adelaide, Darwin</option>' +
						'<option value="+1000">[+1000] Brisbane, Canberra, Melbourne, Sydney, Guam, Port Moresby, Hobart, Vladivostok</option>' +
						'<option value="+1100">[+1100] Magadan, Solomon Is., New Caledonia</option>' +
						'<option value="+1200">[+1200] Auckland, Wellington, Fiji, Kamchatka, Marshall Is.</option>' +
					'</select>' +
				'</div>' +
				'<br />' +
				'<div class="col-sm-offset-2 col-sm-10">' + 
					'<label class="checkbox-inline">' +
						'<input name="timezone_dst" id="timezone_dst" value="1" type="checkbox" />' +
						'Apply <a href="http://en.wikipedia.org/wiki/Daylight_saving_time">Daylight Saving Time</a> correction' +
					'</label>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="bday" class="col-sm-2 control-label">Date of birth</label>' +
				'<div class="col-sm-4">' +
					'<select name="bdaymonth" class="form-control">' +
						'<option value="1">January</option>' +
						'<option value="2">February</option>' +
						'<option value="3">March</option>' +
						'<option value="4">April</option>' +
						'<option value="5">May</option>' +
						'<option value="6">June</option>' +
						'<option value="7">July</option>' +
						'<option value="8">August</option>' +
						'<option value="9">September</option>' +
						'<option value="10">October</option>' +
						'<option value="11">November</option>' +
						'<option value="12">December</option>' +
					'</select>' +
				'</div>' +
				'<div class="col-sm-2">' +
					'<select name="bdayday" class="form-control">' +
						'<option value="1">1</option>' +
						'<option value="2">2</option>' +
						'<option value="3">3</option>' +
						'<option value="4">4</option>' +
						'<option value="5">5</option>' +
						'<option value="6">6</option>' +
						'<option value="7">7</option>' +
						'<option value="8">8</option>' +
						'<option value="9">9</option>' +
						'<option value="10">10</option>' +
						'<option value="11">11</option>' +
						'<option value="12">12</option>' +
						'<option value="13">13</option>' +
						'<option value="14">14</option>' +
						'<option value="15">15</option>' +
						'<option value="16">16</option>' +
						'<option value="17">17</option>' +
						'<option value="18">18</option>' +
						'<option value="19">19</option>' +
						'<option value="20">20</option>' +
						'<option value="21">21</option>' +
						'<option value="22">22</option>' +
						'<option value="23">23</option>' +
						'<option value="24">24</option>' +
						'<option value="25">25</option>' +
						'<option value="26">26</option>' +
						'<option value="27">27</option>' +
						'<option value="28">28</option>' +
						'<option value="29">29</option>' +
						'<option value="30">30</option>' +
						'<option value="31">31</option>' +
					'</select>' +
				'</div>' +
				'<div class="col-sm-2">' +
					'<select name="bdayyear" id="bdayyear" class="form-control">' +
						'<!-- Populate options with JS, since the range of values is 100 years ago -> current year -->' +
					'</select>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="viewmature" class="col-sm-2 control-label">Content Maturity filter</label>' +
				'<div class="col-sm-10">' +
					'<select name="viewmature" class="form-control">' +
						'<option value="0">General content only</option>' +
						'<option value="2">General and Mature content only</option>' +
						'<option value="1">General, Mature, and Adult content</option>' +
					'</select>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="stylesheet" class="col-sm-2 control-label">Stylesheet (will not affect FAStyle)</label>' +
				'<div class="col-sm-10">' +
					'<label class="radio-inline">' +
						'<input name="stylesheet" value="default" type="radio" />' +
						'Default' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input name="stylesheet" value="dark" type="radio" />' +
						'Dark' +
					'</label>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="newpassword" class="col-sm-2 control-label">Change password</label>' +
				'<div class="col-sm-5">' +
					'<input name="newpassword" id="newpassword" type="password" class="form-control" maxlength="150" placeholder="New Password" />' +
				'</div>' +
				'<div class="col-sm-5">' +
					'<input name="newpassword2" id="newpassword2" type="password" class="form-control" maxlength="150" placeholder="Reconfirm New Password" />' +
				'</div>' +
				'<div style="display: none" id="pwdStrength" class="col-sm-offset-2 col-sm-3">' +
					'<br />' +
				'</div>' +
				'<div style="display: none" id="pwdNoMatch" class="col-sm-3">' + 
					'<br />' +
					'<span class="glyphicon glyphicon-remove" style="color: #FF0004" aria-hidden="true"></span> <em>Passwords do not match!</em>' +
				'</div>' +
				'<div style="display: none" id="pwdMatch" class="col-sm-3">' + 
					'<br />' +
					'<span class="glyphicon glyphicon-ok" style="color: #00A41E" aria-hidden="true"></span> <em>Passwords match!</em>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="account_disabled" class="col-sm-2 control-label">Disable account</label>' +
				'<div class="col-sm-10">' +
					'<label class="radio-inline">' +
						'<input name="account_disabled" value="0" type="radio" />' +
						'No - account is enabled' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input name="account_disabled" value="1" type="radio" />' +
						'Yes - account is disabled' +
					'</label>' +
				'</div>' +		
			'</div>' +
			'<div id="oldpwdDiv" class="form-group">' +
				'<label for="oldpassword" class="col-sm-2 control-label">Confirm current password to save changes</label>' +
				'<div class="col-sm-10">' +
					'<input name="oldpassword" type="password" class="form-control" maxlength="150" autocomplete="off" />' +
					'<span id="oldPwdGlyph" class="glyphicon glyphicon-warning-sign form-control-feedback" style="display: none" aria-hidden="true"></span>' +
				'</div>' +		
			'</div>' +
			'<button type="submit" class="btn btn-primary">Save Settings</button>' +
    	'</form>' +
	'</div>' +
'</div>';

// Minimimal password validator (thanks to ablanco on Github!)
!function(a){var b={};try{if(!a&&module&&module.exports){var a=require("jquery"),c=require("jsdom").jsdom;a=a(c().parentWindow)}}catch(d){}!function(a,b){"use strict";var c={};b.forbiddenSequences=["0123456789","abcdefghijklmnopqrstuvwxyz","qwertyuiop","asdfghjkl","zxcvbnm","!@#$%^&*()_+"],c.wordNotEmail=function(a,b,c){return b.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i)?c:0},c.wordLength=function(a,b,c){var d=b.length,e=Math.pow(d,a.rules.raisePower);return d<a.common.minChar&&(e+=c),e},c.wordSimilarToUsername=function(b,c,d){var e=a(b.common.usernameField).val();return e&&c.toLowerCase().match(e.toLowerCase())?d:0},c.wordTwoCharacterClasses=function(a,b,c){return b.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)||b.match(/([a-zA-Z])/)&&b.match(/([0-9])/)||b.match(/(.[!,@,#,$,%,\^,&,*,?,_,~])/)&&b.match(/[a-zA-Z0-9_]/)?c:0},c.wordRepetitions=function(a,b,c){return b.match(/(.)\1\1/)?c:0},c.wordSequences=function(c,d,e){var f,g=!1;return d.length>2&&(a.each(b.forbiddenSequences,function(b,c){var e=[c,c.split("").reverse().join("")];a.each(e,function(a,b){for(f=0;f<d.length-2;f+=1)b.indexOf(d.toLowerCase().substring(f,f+3))>-1&&(g=!0)})}),g)?e:0},c.wordLowercase=function(a,b,c){return b.match(/[a-z]/)&&c},c.wordUppercase=function(a,b,c){return b.match(/[A-Z]/)&&c},c.wordOneNumber=function(a,b,c){return b.match(/\d+/)&&c},c.wordThreeNumbers=function(a,b,c){return b.match(/(.*[0-9].*[0-9].*[0-9])/)&&c},c.wordOneSpecialChar=function(a,b,c){return b.match(/[!,@,#,$,%,\^,&,*,?,_,~]/)&&c},c.wordTwoSpecialChar=function(a,b,c){return b.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/)&&c},c.wordUpperLowerCombo=function(a,b,c){return b.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)&&c},c.wordLetterNumberCombo=function(a,b,c){return b.match(/([a-zA-Z])/)&&b.match(/([0-9])/)&&c},c.wordLetterNumberCharCombo=function(a,b,c){return b.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/)&&c},b.validation=c,b.executeRules=function(c,d){var e=0;return a.each(c.rules.activated,function(f,g){if(g){var h,i,j=c.rules.scores[f],k=b.validation[f];a.isFunction(k)||(k=c.rules.extra[f]),a.isFunction(k)&&(h=k(c,d,j),h&&(e+=h),(0>h||!a.isNumeric(h)&&!h)&&(i=c.ui.spanError(c,f),i.length>0&&c.instances.errors.push(i)))}}),e}}(a,b);try{module&&module.exports&&(module.exports=b)}catch(d){}var e={};e.common={},e.common.minChar=6,e.common.usernameField="#username",e.common.userInputs=[],e.common.onLoad=void 0,e.common.onKeyUp=void 0,e.common.zxcvbn=!1,e.common.zxcvbnTerms=[],e.common.debug=!1,e.rules={},e.rules.extra={},e.rules.scores={wordNotEmail:-100,wordLength:-50,wordSimilarToUsername:-100,wordSequences:-50,wordTwoCharacterClasses:2,wordRepetitions:-25,wordLowercase:1,wordUppercase:3,wordOneNumber:3,wordThreeNumbers:5,wordOneSpecialChar:3,wordTwoSpecialChar:5,wordUpperLowerCombo:2,wordLetterNumberCombo:2,wordLetterNumberCharCombo:2},e.rules.activated={wordNotEmail:!0,wordLength:!0,wordSimilarToUsername:!0,wordSequences:!0,wordTwoCharacterClasses:!1,wordRepetitions:!1,wordLowercase:!0,wordUppercase:!0,wordOneNumber:!0,wordThreeNumbers:!0,wordOneSpecialChar:!0,wordTwoSpecialChar:!0,wordUpperLowerCombo:!0,wordLetterNumberCombo:!0,wordLetterNumberCharCombo:!0},e.rules.raisePower=1.4,e.ui={},e.ui.bootstrap2=!1,e.ui.showProgressBar=!0,e.ui.showPopover=!1,e.ui.showStatus=!1,e.ui.spanError=function(a,b){"use strict";var c=a.ui.errorMessages[b];return c?'<span style="color: #d52929">'+c+"</span>":""},e.ui.popoverError=function(b){"use strict";var c="<div>Errors:<ul class='error-list' style='margin-bottom: 0;'>";return a.each(b,function(a,b){c+="<li>"+b+"</li>"}),c+="</ul></div>"},e.ui.errorMessages={wordLength:"Your password is too short",wordNotEmail:"Do not use your email as your password",wordSimilarToUsername:"Your password cannot contain your username",wordTwoCharacterClasses:"Use different character classes",wordRepetitions:"Too many repetitions",wordSequences:"Your password contains sequences"},e.ui.verdicts=["Weak","Normal","Medium","Strong","Very Strong"],e.ui.showVerdicts=!0,e.ui.showVerdictsInsideProgressBar=!1,e.ui.useVerdictCssClass=!1,e.ui.showErrors=!1,e.ui.container=void 0,e.ui.viewports={progress:void 0,verdict:void 0,errors:void 0},e.ui.scores=[14,26,38,50];var f={};!function(a,b){"use strict";var c=["danger","warning","success"],d=["error","warning","success"];b.getContainer=function(b,c){var d;return d=a(b.ui.container),d&&1===d.length||(d=c.parent()),d},b.findElement=function(a,b,c){return b?a.find(b).find(c):a.find(c)},b.getUIElements=function(a,c){var d,e;return a.instances.viewports?a.instances.viewports:(d=b.getContainer(a,c),e={},e.$progressbar=$("div.progress"),a.ui.showVerdictsInsideProgressBar&&(e.$verdict=e.$progressbar.find("span.password-verdict")),a.ui.showPopover||(a.ui.showVerdictsInsideProgressBar||(e.$verdict=b.findElement(d,a.ui.viewports.verdict,"span.password-verdict")),e.$errors=b.findElement(d,a.ui.viewports.errors,"ul.error-list")),a.instances.viewports=e,e)},b.initProgressBar=function(c,d){var e=b.getContainer(c,d),f="<div class='progress'><div class='";c.ui.bootstrap2||(f+="progress-"),f+="bar'>",c.ui.showVerdictsInsideProgressBar&&(f+="<span class='password-verdict'></span>"),f+="</div></div>",c.ui.viewports.progress?e.find(c.ui.viewports.progress).append(f):a(f).insertAfter(d)},b.initHelper=function(c,d,e,f){var g=b.getContainer(c,d);f?g.find(f).append(e):a(e).insertAfter(d)},b.initVerdict=function(a,c){b.initHelper(a,c,"<span class='password-verdict'></span>",a.ui.viewports.verdict)},b.initErrorList=function(a,c){b.initHelper(a,c,"<ul class='error-list'></ul>",a.ui.viewports.errors)},b.initPopover=function(a,b){b.popover("destroy"),b.popover({html:!0,placement:"bottom",trigger:"manual",content:" "})},b.initUI=function(a,c){a.ui.showPopover?b.initPopover(a,c):(a.ui.showErrors&&b.initErrorList(a,c),a.ui.showVerdicts&&!a.ui.showVerdictsInsideProgressBar&&b.initVerdict(a,c)),a.ui.showProgressBar&&b.initProgressBar(a,c)},b.possibleProgressBarClasses=["danger","warning","success"],b.updateProgressBar=function(d,e,f,g){var h=b.getUIElements(d,e).$progressbar,i=h.find(".progress-bar"),j="progress-";d.ui.bootstrap2&&(i=h.find(".bar"),j=""),a.each(b.possibleProgressBarClasses,function(a,b){i.removeClass(j+"bar-"+b)}),i.addClass(j+"bar-"+c[f]),i.css("width",g+"%")},b.updateVerdict=function(a,d,e,f){var g=b.getUIElements(a,d).$verdict;g.removeClass(c.join(" ")),e>-1&&g.addClass(c[e]),g.html(f)},b.updateErrors=function(c,d){var e=b.getUIElements(c,d).$errors,f="";a.each(c.instances.errors,function(a,b){f+="<li>"+b+"</li>"}),e.html(f)},b.updatePopover=function(a,b,c){var d=b.data("bs.popover"),e="",f=!0;return a.ui.showVerdicts&&!a.ui.showVerdictsInsideProgressBar&&c.length>0&&(e="<h5><span class='password-verdict'>"+c+"</span></h5>",f=!1),a.ui.showErrors&&(a.instances.errors.length>0&&(f=!1),e+=a.ui.popoverError(a.instances.errors)),f?void b.popover("hide"):(a.ui.bootstrap2&&(d=b.data("popover")),void(d.$arrow&&d.$arrow.parents("body").length>0?b.find("+ .popover .popover-content").html(e):(d.options.content=e,b.popover("show"))))},b.updateFieldStatus=function(b,c,e){var f=b.ui.bootstrap2?".control-group":".form-group",g=c.parents(f).first();a.each(d,function(a,c){b.ui.bootstrap2||(c="has-"+c),g.removeClass(c)}),e=d[e],b.ui.bootstrap2||(e="has-"+e),g.addClass(e)},b.percentage=function(a,b){var c=Math.floor(100*a/b);return c=0>c?1:c,c=c>100?100:c},b.getVerdictAndCssClass=function(a,b){var c,d,e;return 0>=b?(c=0,e=-1,d=a.ui.verdicts[0]):b<a.ui.scores[0]?(c=0,e=0,d=a.ui.verdicts[0]):b<a.ui.scores[1]?(c=0,e=1,d=a.ui.verdicts[1]):b<a.ui.scores[2]?(c=1,e=2,d=a.ui.verdicts[2]):b<a.ui.scores[3]?(c=1,e=3,d=a.ui.verdicts[3]):(c=2,e=4,d=a.ui.verdicts[4]),[d,c,e]},b.updateUI=function(a,c,d){var e,f,g,h;e=b.getVerdictAndCssClass(a,d),g=0===d?"":e[0],e=e[1],h=a.ui.useVerdictCssClass?e:-1,a.ui.showProgressBar&&(f=b.percentage(d,a.ui.scores[3]),b.updateProgressBar(a,c,e,f),a.ui.showVerdictsInsideProgressBar&&b.updateVerdict(a,c,h,g)),a.ui.showStatus&&b.updateFieldStatus(a,c,e),a.ui.showPopover?b.updatePopover(a,c,g):(a.ui.showVerdicts&&!a.ui.showVerdictsInsideProgressBar&&b.updateVerdict(a,c,h,g),a.ui.showErrors&&b.updateErrors(a,c))}}(a,f);var g={};!function(a,c){"use strict";var d,g;d=function(c){var d,e,g,h,i=a(c.target),j=i.data("pwstrength-bootstrap"),k=i.val();void 0!==j&&(j.instances.errors=[],0===k.length?h=0:j.common.zxcvbn?(d=[],a.each(j.common.userInputs.concat([j.common.usernameField]),function(b,c){var e=a(c).val();e&&d.push(e)}),d=d.concat(j.common.zxcvbnTerms),h=zxcvbn(k,d).entropy):h=b.executeRules(j,k),f.updateUI(j,i,h),e=f.getVerdictAndCssClass(j,h),g=e[2],e=e[0],j.common.debug&&console.log(h+" - "+e),a.isFunction(j.common.onKeyUp)&&j.common.onKeyUp(c,{score:h,verdictText:e,verdictLevel:g}))},c.init=function(b){return this.each(function(c,g){var h=a.extend(!0,{},e),i=a.extend(!0,h,b),j=a(g);i.instances={},j.data("pwstrength-bootstrap",i),j.on("keyup",d),j.on("change",d),j.on("onpaste",d),f.initUI(i,j),a.trim(j.val())&&j.trigger("keyup"),a.isFunction(i.common.onLoad)&&i.common.onLoad()}),this},c.destroy=function(){this.each(function(b,c){var d=a(c),e=d.data("pwstrength-bootstrap"),g=f.getUIElements(e,d);g.$progressbar.remove(),g.$verdict.remove(),g.$errors.remove(),d.removeData("pwstrength-bootstrap")})},c.forceUpdate=function(){this.each(function(a,b){var c={target:b};d(c)})},c.addRule=function(b,c,d,e){this.each(function(f,g){var h=a(g).data("pwstrength-bootstrap");h.rules.activated[b]=e,h.rules.scores[b]=d,h.rules.extra[b]=c})},g=function(b,c,d){this.each(function(e,f){a(f).data("pwstrength-bootstrap").rules[c][b]=d})},c.changeScore=function(a,b){g.call(this,a,"scores",b)},c.ruleActive=function(a,b){g.call(this,a,"activated",b)},a.fn.pwstrength=function(b){var d;return c[b]?d=c[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?a.error("Method "+b+" does not exist on jQuery.pwstrength-bootstrap"):d=c.init.apply(this,arguments),d}}(a,g)}(jQuery);


$(document).ready(function() {
	if ($("td:contains('System Message')").length === 0) { // If not on a confirmation page...
		$(skel).insertBefore('.content.maintable');

		var updateSuccess = sessionStorage.getItem('updateSuccess'); // Boolean to add update confirmation dialog

		// Populates the "Birth Year" select area
		var currYear = (new Date).getFullYear();
		for (var i = 0; i < 100; i++) {
			var year = currYear - i;
			var yearOption = "<option value=" + year + ">" + year + "</option>";
			$('#bdayyear').append(yearOption);
		};

		// Inserts stored values
		$('input[name=fullname]').val(fullname);
		$('#userID').text(userID);
		$('input[name=useremail]').val(useremail);
		$('select[name=timezone').val(timezone);
		$('#timezone_dst').prop("checked", timezone_dst);
		$('select[name=bdaymonth]').val(bdaymonth);
		$('select[name=bdayday]').val(bdayday);
		$('select[name=bdayyear]').val(bdayyear);
		$('select[name=viewmature]').val(viewmature);
		$('input[name=account_disabled]').val([account_disabled]);
		$('input[name=stylesheet]').val([stylesheet]);

		// Confirmation dialog
		if (updateSuccess !== null) {
			if (updateSuccess == -1) {
				$('#updateConfirmation').addClass('alert-success');
				$('#updateConfirmation').text('Profile successfully updated!');
			} else {
				$('#updateConfirmation').addClass('alert-danger');
				$('#updateConfirmation').text('Profile could not be updated! Please input your current account password and try again.');
			}
			sessionStorage.removeItem('updateSuccess');
		} else {
			$('#updateConfirmation').hide();
		}

		// Password strength meter
		$('#newpassword').pwstrength({
		    ui: { showVerdictsInsideProgressBar: true }
		});
		$('div.progress').appendTo('#pwdStrength');

		// Provides confirmation if the password and confirmed passwords match
		$('#newpassword, #newpassword2').on('change keyup paste', function() {
			if ($('#newpassword').val().length > 0 || $('#newpassword2').val().length > 0) {
				$('#pwdStrength').show();
				if ($('#newpassword').val() !== $('#newpassword2').val()) {
					$('#pwdMatch').hide();
					$('#pwdNoMatch').fadeIn('swing');
				} else {
					$('#pwdNoMatch').hide();
					$('#pwdMatch').fadeIn('swing');
				}
			} else {
				$('#pwdStrength').hide();
				$('#pwdMatch').hide();
				$('#pwdNoMatch').hide();
			}
		});

		// Reminds user to input their old password if any changes are made
		$('input:not([name=oldpassword]), select').on('change keyup paste', function() {
			$('#oldpwdDiv').addClass("has-feedback has-warning");
			$('input[name=oldpassword]').attr("aria-describedby", "inputWarning2Status");
			$('#oldPwdGlyph').fadeIn('swing');
		});

		// Removes warning if user starts typing in their old password
		$('input[name=oldpassword]').on('change keyup paste', function() {
			if ($(this).val() != "") {
				$('#oldpwdDiv').removeClass("has-feedback has-warning");
				$('input[name=oldpassword]').attr("aria-describedby", "");
				$('#oldPwdGlyph').hide();
			} else {
				$('#oldpwdDiv').addClass("has-feedback has-warning");
				$('input[name=oldpassword]').attr("aria-describedby", "inputWarning2Status");
				$('#oldPwdGlyph').fadeIn('swing');
			}
		});
	} else {
		sessionStorage.setItem('updateSuccess', $('td.alt1')[0].textContent.indexOf("Profile could not"));
		window.location = window.location; // Refreshes the page
	}
});