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
		postContentBtn.innerText = 'show ' + String.fromCodePoint(128065);
	} 
	else if (disp === 'none') 
	{
		postContentDiv.style.display = '';
		postContentBtn.innerText = 'hide';
	}
}

//eth buttons
window.onload = function doEth() {
	const ethereumButton = document.querySelector('.enableEthereumButton');
	const sendEthButton = document.querySelector('.sendEthButton');

	let accounts = [];

	//Big Num in JavaScript

	//1$ worth of eth in wei
	var oneDoll = new BN('5000000000000000', 10);
	//var oneDollInHexString = oneDoll.toString(16, 16);
	var oneDollInHexString = '0x' + oneDoll.toJSON();

	//Sending Ethereum to an address
	sendEthButton.addEventListener('click', function(){
	  ethereum
		.request({
		  method: 'eth_sendTransaction',
		  params: [
			{
			  from: accounts[0],
			  to: '0xb9595C4F184729592421681f86e4aBDBFD4cd9a2',
			  value: oneDollInHexString,
			  gas: '0x5208',
			  //gasLimit: '0x7530',
			  //gasPrice: '0x09184e72a000',
			},
		  ],
		})
		.then((txHash) => {
			console.log(txHash);
			let eth2 = document.getElementById('eth2');		  
			eth2.innerText='2. Done!';
			eth2.style.color='green';
			let eth3 = document.getElementById('eth3');
			eth3.innerText='Wow, ... thank you for caring, Stranger!';
						  
						  })
		.catch((error) => console.error);
	});

	ethereumButton.addEventListener('click', () => {
	  getAccount();
	});

	async function getAccount() {
		try {
	  		accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			let eth1 = document.getElementById("eth1")
			eth1.innerText='1. Done!';
			eth1.style.color="green";
		} catch (e) {
			console.log(e);
			let eth1 = document.getElementById("eth1")
			eth1.innerText='1. Could not Connect';
			eth1.style.color="red";
		} 



	}
}

