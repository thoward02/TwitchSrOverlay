class App{
  constructor(BTagUsername, BTagUserId, UpdateRate){
    //Setup user id
    this.BTagUsername = BTagUsername;
    this.BTagUserId   = BTagUserId;

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
      "Played"  : null
    };

    this.LastUpdate = {
      "Tank"    : null,
      "DPS"     : null,
      "Support" : null,

      "Win"     : null,
      "Losses"  : null,
      "Played"  : null
    };

    this.WLStats = {
      "Wins" : 0,
      "Losses" : 0,
      "Played" : 0
    }


  }

  Start(){
    //Setup first stats
    let Request = new XMLHttpRequest();
    Request.addEventListener("load", window.App.FirstRequest);
    Request.open("GET", "https://ow-api.com/v1/stats/pc/us/" + window.App.BTagUsername + "-" + window.App.BTagUserId + "/profile");
    Request.send();

    //Setup interval
    window.App.Interval = setInterval(window.App.Update(), window.App.UpdateRate);


  }

  FirstRequest(){
    let Data = JSON.parse(this.responseText)

    let Sr     = Data.ratings;
    let Wins   = Data.competitiveStats.games.won;
    let Played = Data.competitiveStats.games.played;
    let Losses = Played - Wins;

    window.App.SessionStart.Tank    = Sr[0].level
    window.App.SessionStart.DPS     = Sr[1].level
    window.App.SessionStart.Support = Sr[2].level

    window.App.SessionStart.Win = Wins;
    window.App.SessionStart.Losses = Losses;
    window.App.SessionStart.Played = Played;

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
    let Played = Data.competitiveStats.games.played;
    let Losses = Played - Wins;

    //If a game was played
    if(Played > window.App.LastUpdate.Played){
      //If we won the game
      if(window.App.LastUpdate.Win != null && window.App.LastUpdate.Win > Wins){
        window.App.WLStats.Losses++;
        window.App.WLStats.Played++;
      }
      //If we lost the game
      else if (window.App.LastUpdate.Win != null){
          window.App.WLStats.Wins++;
          window.App.WLStats.Played++;

      }

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
      WinsElem.innerHTML   = window.App.WLStats.Wins;
      LossesElem.innerHTML =   window.App.WLStats.Losses;

      TankStarting.innerHTML = window.App.SessionStart.Tank;
      TankCurrent.innerHTML = Sr[0].level;

      DPSStarting.innerHTML = window.App.SessionStart.DPS;
      DPSCurrent.innerHTML = Sr[1].level;

      SupportStarting.innerHTML = window.App.SessionStart.Support;
      SupportCurrent.innerHTML = Sr[2].level;
    }


  }


}
