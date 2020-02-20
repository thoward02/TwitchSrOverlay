class App{
  constructor(BTagUsername, BTagUserId, UpdateRate){
    //Setup user id
    this.BTagUsername = BTagUsername;
    this.BTagUserId = BTagUserId;

    //Misc
    this.UpdateRate = UpdateRate;
    this.Interval   = null;

    //Stats
    this.SessionStart = {
      "Tank"    : null,
      "DPS"     : null,
      "Support" : null,

      "Win"     : null,
      "Losses"  : null,
    };


  }

  Start(){
    //Setup interval
    window.App.Interval = setInterval(window.App.Update(), window.App.UpdateRate);
  }

  Update(){
    let Request = new XMLHttpRequest();
    Request.addEventListener("load", window.App.HandleRequest);
    Request.open("GET", "https://ow-api.com/v1/stats/pc/us/" + window.App.BTagUsername + "-" + window.App.BTagUserId + "/profile");
    Request.send();
  }

  HandleRequest(){
    //Fetch data
    let Data = JSON.parse(this.responseText)

    let Sr     = Data.ratings;
    let Wins   = Data.competitiveStats.games.won;
    let Losses = Data.competitiveStats.games.played - Data.competitiveStats.games.won;

    //Fetch HTML
    let WinsElem   = document.getElementById("WL-Wins");
    let LossesElem = document.getElementById("WL-Losses");

    let TankStarting = document.getElementById("TankSr-Starting");
    let TankCurrent  = document.getElementById("TankSr-Current");

    let DPSStarting = document.getElementById("DPSSr-Starting");
    let DPSCurrent  = document.getElementById("DPSSr-Current");

    let SupportStarting = document.getElementById("SupportSr-Starting");
    let SupportCurrent  = document.getElementById("SupportSr-Current");

    //Update data
    WinsElem.innerHTML   = Wins;
    LossesElem.innerHTML = Losses;

    TankStarting.innerHTML = window.App.SessionStart.Tank;
    TankCurrent.innerHTML = Sr[0].level;

    DPSStarting.innerHTML = window.App.SessionStart.DPS;
    DPSCurrent.innerHTML = Sr[1].level;

    SupportStarting.innerHTML = window.App.SessionStart.Support;
    SupportCurrent.innerHTML = Sr[2].level;

  }


}
