function Boot(){
  CONFIG = {
    "BTagUsername" : "Slashrrr",
    "BTagUserId"   : "1360",
    "UpdateRate"   : 1000
  }

  //Create app
  window.App = new App(CONFIG.BTagUsername, CONFIG.BTagUserId, CONFIG.UpdateRate);

  //Start
  window.App.Start();


}


//Add startup flag
document.addEventListener("DOMContentLoaded", Boot);
