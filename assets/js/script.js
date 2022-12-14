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

//collapse posts
function collapse(index) {
  is_hidden = false;
  var postContentDiv = document.getElementById(index);
  var postContentBtn = document.getElementById("b" + index);
  var disp = postContentDiv.style.display;
  if (disp === "") {
    postContentDiv.style.display = "none";
	  postContentBtn.innerText = "show " + String.fromCodePoint(128065) + ' ';
	  console.log(String.fromCodePoint(128065) + String.fromCodePoint(128065));
    is_hidden = true;
  } else if (disp === "none") {
    postContentDiv.style.display = "";
    postContentBtn.innerText = "hide";
  }

  let hiddens = JSON.parse(localStorage.getItem("hidden_posts"));
  if (hiddens == null) {
    hiddens = {};
  }
  if (is_hidden) {
    hiddens[index] = "1";
  } else {
    delete hiddens[index];
  }

  localStorage.setItem("hidden_posts", JSON.stringify(hiddens));
}

//collapse onload
function hideHiddens(){
	const hiddens = JSON.parse(localStorage.getItem("hidden_posts"));
	if (hiddens) {
		for (const i in hiddens) {
		  var postContentDiv = document.getElementById(i);
		  var postContentBtn = document.getElementById("b" + i);
  		  var disp = postContentDiv.style.display;
		  postContentDiv.style.display = "none";
		  postContentBtn.innerText = "show " + String.fromCodePoint(128065);
		}
	}
};
window.addEventListener("load", hideHiddens); 

//eth buttons
function doEth() {
  const ethereumButton = document.getElementById("enableEthButton");
  const sendEthButton = document.getElementById("sendEthButton");

  let accounts = [];

  //Big Num in JavaScript

  //1$ worth of eth in wei
  var oneDoll = new BN("5000000000000000", 10);
  //var oneDollInHexString = oneDoll.toString(16, 16);
  var oneDollInHexString = "0x" + oneDoll.toJSON();

  //Sending Ethereum to an address
  sendEthButton.addEventListener("click", function () {
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: "0xb9595C4F184729592421681f86e4aBDBFD4cd9a2",
            value: oneDollInHexString,
            gas: "0x5208",
            //gasLimit: '0x7530',
            //gasPrice: '0x09184e72a000',
          },
        ],
      })
      .then((txHash) => {
        console.log(txHash);
        let sendEthSpan = document.getElementById("sendEthSpan");
        sendEthSpan.innerText = "2. Done!";
        sendEthSpan.style.color = "green";
        let hiddenEthSpan = document.getElementById("hiddenEthSpan");
        hiddenEthSpan.innerText = "Wow, ... thank you for caring, Stranger!";
      })
      .catch((error) => console.error);
  });

  ethereumButton.addEventListener("click", () => {
    getAccount();
  });

  async function getAccount() {
      let enableEthSpan = document.getElementById("enableEthSpan");
    try {
      accounts = await ethereum.request({ method: "eth_requestAccounts" });
      enableEthSpan.innerText = "Step 1. Done!";
      enableEthSpan.style.color = "green";
    } catch (e) {
      console.log(e);
      enableEthSpan.innerText = "Step 1. Could not Connect";
      enableEthSpan.style.color = "red";
    }
  }
};
window.addEventListener("load", doEth); 

// Select the button / DOESN'T WORK'
//const thiefBtn = document.getElementById('darkModeBtn');
// Select the theme preference from localStorage
const currentTheme = localStorage.getItem("theme");

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setCorrectTheme() {
  if (currentTheme == "dark") {
	  if (!prefersDarkScheme.matches) {
		document.body.classList.add("dark-theme");
	  } 
    document.getElementById("darkModeBtn").innerText = "Jesus Mode";
  } else if (currentTheme == "light") {
	  if (prefersDarkScheme.matches) {
		document.body.classList.add("light-theme");
	  } 
  } else if (prefersDarkScheme.matches) { //if default is dark mode
    document.getElementById("darkModeBtn").innerText = "Jesus Mode";
  }
};
//window.addEventListener("load", setCorrectTheme); 
document.addEventListener("DOMContentLoaded", setCorrectTheme);


function toggleDarkTheme() {
  console.log("toggled!!!!!!!");
  btn = document.getElementById("darkModeBtn");
  if (btn.innerText == "Jesus Mode") {
    btn.innerText = "Thief Mode";
  } else {
    btn.innerText = "Jesus Mode";
  }

  theme = 'light';

  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
	if (!document.body.classList.contains("light-theme")) {
		theme = 'dark';
	}
  } else {
    document.body.classList.toggle("dark-theme");
	if (document.body.classList.contains("dark-theme")) {
		theme = 'dark';
	}
  }
    localStorage.setItem("theme", theme);
} 
