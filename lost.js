var timeString = new Array("1","0","8","0","0");
var cursor_state;
var stopspin = 0;
var numbersin = '';
var iDoMsg;

	/* Create a new XMLHttpRequest object to talk to the Web server */
	var xmlHttp = false;
	/*@cc_on @*/
	/*@if (@_jscript_version >= 5)
	try {
	  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
	  try {
	    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	  } catch (e2) {
	    xmlHttp = false;
	  }
	}
	@end @*/

	if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
	  xmlHttp = new XMLHttpRequest();
	}
	
	var xmlDoc;
 		
function loads()
{ 	
   	writeClock();
   	iTick = window.setInterval("tick()", 1000);
	iBlink = window.setInterval("blink()", 500);
}

function tick() {
	var seconds = timeString[3]+timeString[4];
	var minutes = timeString[0]+timeString[1]+timeString[2];
	seconds--;
  	if (seconds < 0)
  	{
  		seconds = 59;
  		minutes--;
  	}
  	seconds = seconds+'';
  	if (seconds.length == 1)
  	{
		seconds = '0'+seconds;
  	}
  	minutes = minutes+'';
  	if (minutes.length == 1)
  	{
		minutes = '00'+minutes;
  	}
  	else if (minutes.length == 2)
  	{
  		minutes = '0'+minutes;
  	}	
	secarr = seconds.split('');
	minarr = minutes.split('');
	timeString[0] = minarr[0];
	timeString[1] = minarr[1];
	timeString[2] = minarr[2];
	timeString[3] = secarr[0];
	timeString[4] = secarr[1];
	writeClock();	
	if((minutes == '000') && (seconds == '00'))
	{
		window.clearInterval(iTick);
		themsg = "&nbsp;PRIMARY IGNITION SEQUENCE INITIATED...<br /><br />&gt;: INCIDENT COMPLETE";
		msgArr = themsg.split('');
		numbersin = '';	
		i = '0';
		iDoMsg = window.setInterval("doMsg()", 100);	
		alert ('DHARMA INDUSTRIES ALERT:\nThe hatch has you now!');
		window.location="http://abc.go.com/primetime/lost/";
	}
	
}

function blink() {
	if (cursor_state == 1)
	{
		blinky = '<span class="on">_</span>';	cursor_state = 0;
	}
	else
	{
		blinky = '<span class="off">_</span>';	cursor_state = 1;
	}
	var cursor = (document.all) ? document.all("cursor") : document.getElementById("cursor");
	cursor.innerHTML = blinky;
}

function keypad(field) {
 	if(field.value == 'SPACE')
 	{
 		numbersin = numbersin+' ';
 	}
 	else
 	{
     		numbersin = numbersin+field.value;
     	}
 	var thenumbers = (document.all) ? document.all("thenumbers") : document.getElementById("thenumbers");
 	thenumbers.innerHTML = numbersin;
}
 
function textpad(field) {
      	numbersin = numbersin+field.value;	
  	var thenumbers = (document.all) ? document.all("thenumbers") : document.getElementById("thenumbers");
  	thenumbers.innerHTML = numbersin;	
 	field.value = '';
}
 
function keyback() {
	numsLen = numbersin.length;
	if(numsLen > 0)
	{
		numsLen--;
		numsArr = numbersin.split('');
		numbersin = '';
		for(i=0;i<numsLen;i++){
			numbersin = numbersin+numsArr[i];
		}
		var thenumbers = (document.all) ? document.all("thenumbers") : document.getElementById("thenumbers");
 		thenumbers.innerHTML = numbersin;
 	}
}

function keypadReset() {
	numbersin = '';
	var thenumbers = (document.all) ? document.all("thenumbers") : document.getElementById("thenumbers");
 	thenumbers.innerHTML = numbersin;
}

function exec_num() {
 	if(numbersin == '4 8 15 16 23 42')
 	{
 	 	numbersin ='';
 	 	var thenumbers = (document.all) ? document.all("thenumbers") : document.getElementById("thenumbers");
 		thenumbers.innerHTML = numbersin;
 		window.clearInterval(iTick);
 		iSpin = window.setInterval("spin()", 80);
 		stopspin = 0;
 	}
 	else if (numbersin == ''){
 		
 	}
 	else
 	{
 		window.clearInterval(iDoMsg);
 		// ajax here
 		  // Open a connection to the server
		  xmlHttp.open("GET", "lost.php", true);
		
		  // Setup a function for the server to run when it's done
		  xmlHttp.onreadystatechange = updatePage;
		
		  // Send the request
  		  xmlHttp.send(null);
  		  
 	}
 	return false;
}

function updatePage() {
		if (xmlHttp.readyState == 4) {
			if ((xmlHttp.status == 200) || (xmlHttp.status == 304)) {
	  			var response = xmlHttp.responseText;
	    		}
	    		else if (xmlHttp.status == 404) {
	    			var response = "404: Dharmatel Intranet Not Found";
	    		}
			else{
				var response = "Rachael Blake was here...";
	 		}
				themsg = response;
				msgArr = themsg.split('');
				numbersin = '';	
				i = '0';
				iDoMsg = window.setInterval("doMsg()", 100);			
		}
}

function spin(){
 		if (stopspin >= 30)
 		{
 			timeString[0] = "1";
 			timeString[1] = "0";
 			timeString[2] = "8";
 			timeString[3] = "0";
 			timeString[4] = "0";
 			writeClock();
   			window.clearInterval(iSpin);
   			iTick = window.setInterval("tick()", 1000);
 		}
 		else
 		{
 	    		random_num = (Math.round(Math.random()*9));
 	    		timeString[0] = random_num;
 	    		random_num = (Math.round(Math.random()*9));
 	    		timeString[1] = random_num;
 	    		random_num = (Math.round(Math.random()*9));
 	    		timeString[2] = random_num;
 	    		random_num = (Math.round(Math.random()*9));
 	    		timeString[3] = random_num;
 	    		random_num = (Math.round(Math.random()*9));
 	    		timeString[0] = random_num;
 			writeClock();
 			stopspin++;
 		}
}

function doMsg() {
	if(i < themsg.length)
	{
		numbersin = numbersin+msgArr[i];
  		var thenumbers = (document.all) ? document.all("thenumbers") : document.getElementById("thenumbers");
  		thenumbers.innerHTML = numbersin;
  		i++
  	}
  	else
  	{
  		window.clearTimeout(iDoMsg);
  	}

}

function writeClock() {
	document.title = "\>:  ..."+timeString[0]+timeString[1]+timeString[2]+":"+timeString[3]+timeString[4]+"...   ";
 	var m1 = (document.all) ? document.all("m1") : document.getElementById("m1");
 	var m2 = (document.all) ? document.all("m2") : document.getElementById("m2");
 	var m3 = (document.all) ? document.all("m3") : document.getElementById("m3");
 	var s1 = (document.all) ? document.all("s1") : document.getElementById("s1");
 	var s2 = (document.all) ? document.all("s2") : document.getElementById("s2");
   	m1.innerHTML = timeString[0];
   	m2.innerHTML = timeString[1];
   	m3.innerHTML = timeString[2];
   	s1.innerHTML = timeString[3];
   	s2.innerHTML = timeString[4];
}