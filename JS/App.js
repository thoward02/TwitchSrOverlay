class App{
  constructor(SRElem, WLElem, BTagUsername, BTagUserId, UpdateRate){
    //Setup HTML Elems
    this.SRElem = SRElem;
    this.WLElem = WLElem;

    //Setup user id
    this.BTagUsername = BTagUsername;
    this.BTagUserId = BTagUserId;

    //Misc
    this.UpdateRate = UpdateRate;
    this.Interval   = null;

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

    let Sr     = Data.rating;
    let Wins   = Data.competitiveStats.games.won;
    let Losses = Data.competitiveStats.games.played - Data.competitiveStats.games.won;

    //Update
    window.App.SRElem.innerHTML = Sr;
    window.App.WLElem.innerHTML = "W: " + Wins + "<br>L: " + Losses;
  }


}
