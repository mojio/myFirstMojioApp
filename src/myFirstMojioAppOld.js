// Generated by CoffeeScript 1.8.0
(function() {
  var App, MojioClient, buildMojioMap, config, mojio_client;

  MojioClient = this.MojioClient;

  config = {
    application: 'f201b929-d28c-415d-9b71-8112532301cb', //Replace with your application id
    secret: 'f0927a0a-386b-4148-be8d-5ffd7468ea6b', // Replace with your secret id
    hostname: 'api.moj.io',
    version: 'v1',
    port: '443',
    scheme: 'https',
    login: 'anonymous@moj.io', // Replace with your login
    password: 'Password007' //Replace with your password
  };

  mojio_client = new MojioClient(config);

  App = mojio_client.model('App');

  $(function() {
    var div;
    if (config.application === '[YOUR APP ID GOES HERE]') {
      div = document.getElementById('result');
      div.innerHTML += 'Mojio Error:: Set your application and secret keys in myFirstMojioApp source code.  <br>';
      return;
    }
    mojio_client.login(config.login, config.password, function(error, result) {
      if (error) {
        return alert("Login Error:" + error);
      } else {
        alert("Authorization Successful.");
        div = $("#welcome");
        div.html('Authorization Result:<br />');
        div.append(JSON.stringify(result));
        mojio_client.get(mojio_client.model("User"), {
          id: result.UserId
        }, function(error, result) {
          var message;
          message = '<br/><br/>Viewing the location of <strong>';
          if (result.FirstName) {
            message += result.FirstName;
          } else if (result.UserName) {
            message += result.UserName;
          } else if (result.LastName) {
            message += result.LastName;
          } else if (result.Email) {
            message += result.Email;
          } else {
            message += "Unknown";
          }
          message += '</strong>';
          div = $("#welcome");
          return div.append(message);
        });
        return mojio_client.get(mojio_client.model("Vehicle"), {}, function(error, result) {
          var i, lat, lng;
          lat = [];
          lng = [];
          i = 0;
          $.each(result.Data, function(key, value) {
            if ((value.LastLocation != null) && (value.LastLocation.Lat != null) && (value.LastLocation.Lng != null)) {
              lat[i] = value.LastLocation.Lat;
              lng[i] = value.LastLocation.Lng;
              return i++;
            }
          });
          div = $("#result");
          if (lat.length > 0) {
            div.html('The vehicle is at: ' + lat[0] + ", " + lng[0]);
            return buildMojioMap(lat[0], lng[0]);
          } else {
            return div.html("No vehicle detected!");
          }
        });
      }
    });
    return $("#button").click(function() {
      return mojio_client.unauthorize(config.redirect_uri);
    });
  });

  buildMojioMap = function(mojioLat, mojioLng) {
    var map;
    map = new GMaps({
      el: '#map',
      lat: mojioLat,
      lng: mojioLng,
      panControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      overviewMapControl: false
    });
    return setTimeout(function() {
      return map.addMarker({
        lat: mojioLat,
        lng: mojioLng,
        animation: google.maps.Animation.DROP,
        draggable: false,
        title: 'Current Mojio Location'
      }, 1000);
    });
  };

}).call(this);

//# sourceMappingURL=myFirstMojioAppOld.js.map
