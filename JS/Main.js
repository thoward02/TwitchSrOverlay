function Boot(){
  CONFIG = {
    "BTagUsername" : "Appa",
    "BTagUserId"   : "11442",
    "UpdateRate"   : 3000
  }

  //Create app
  window.App = new App(CONFIG.BTagUsername, CONFIG.BTagUserId, CONFIG.UpdateRate);

  //Start
  window.App.Start();


}


//Add startup flag
document.addEventListener("DOMContentLoaded", Boot);
