function Boot(){
  CONFIG = {
    "SrElement"    : document.getElementById("Sr"),
    "WlElement"    : document.getElementById("WL"),
    "BTagUsername" : "Slashrrr",
    "BTagUserId"   : "1360",
    "UpdateRate"   : 1000
  }

  //Create app
  window.App = new App(CONFIG.SrElement, CONFIG.WlElement, CONFIG.BTagUsername, CONFIG.BTagUserId, CONFIG.UpdateRate);

  //Start
  window.App.Start();


}


//Add startup flag
document.addEventListener("DOMContentLoaded", Boot);
