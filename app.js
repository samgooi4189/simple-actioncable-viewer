var App = {};

App.connect_server = function() {         
  const WebSocket = require('ws');
  App.ws = new WebSocket('ws://0.0.0.0:3000/cable', ["actioncable-v1-json", "actioncable-unsupported"]);

  // EDIT THIS to fit your correct Channel defined in your Rails actioncable channel 
  App.param = {channel: "RoomChannel", uuid: guid()};

  App.ws.on('open', function open() {
    data = {
      command: "subscribe",
      identifier: JSON.stringify(App.param)
    }
    App.ws.send(JSON.stringify(data));
  });  
  App.ws.on('message', function (event) {
    console.log(event);
  });
  function guid() {
   function s4() {
     return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
   }
   return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  }
}
App.connect_server();
