const server = 'https://geotrack.yonathan.dev';
let url = 'https://www.geoguessr.com/';

async function getDailyChallenge() {
   const response = await fetch(`${server}/api/daily`, {
      headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
     },
   });

   return await response.json();
}

getDailyChallenge().then(data => {
   url = 'https://www.geoguessr.com/results/' + data.token;
});

function openIndex() {
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      chrome.tabs.update(tab.id, {url: url});
  });
}

document.addEventListener('DOMContentLoaded', () => {
   var y = document.getElementById("save");
   y.addEventListener("click", openIndex);
});
