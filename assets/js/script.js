window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.height = scrolled + "%";

	//scrollTop - how many pixels from top have I already scrolled
	//scrollHeight - how many pixels on the page from top to bottom 
	//clientHeight - height of my screen in pixels
	
	//how many of my screens fit on this page
	var pageCount = document.documentElement.scrollHeight / document.documentElement.clientHeight;
	//console.log(pageCount);
	
  //document.getElementById("myBarBackground").style.height = scrolled + "%";


}

function collapse(index) {
	var postContentDiv = document.getElementById(index);
	var postContentBtn = document.getElementById('b' + index);
	var disp = postContentDiv.style.display;
	if (disp === '') 
	{
		postContentDiv.style.display = 'none';
		postContentBtn.innerText = 'REVEAL ▲';
	} 
	else if (disp === 'none') 
	{
		postContentDiv.style.display = '';
		postContentBtn.innerText = 'HIDE ▼';
	}
	


}
