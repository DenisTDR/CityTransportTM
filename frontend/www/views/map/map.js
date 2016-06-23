/**
 * Created by NM on 5/21/2016.
 */

console.log("map controller loading");

appControllers

  .controller('MapController', function($scope, StationsService, $http, $rootScope) { // uiGmapGoogleMapApi
    console.log("map controller loaded");

    $scope.map = { control: {}, center: { latitude: 45.745139, longitude: 21.241582 }, zoom: 15 };

    $scope.myPosition = {latitude: 45.7456645, longitude: 21.2411096};
    $scope.visible = false;
    $scope.selectedTT = "bus";
    $scope.myMarker = null;
    //map = $scope.map.control.getGMap();

    // StationsService.getNearest($scope.myPosition.latitude, $scope.myPosition.longitude, 10).then(function(data) {
    //   data.data.stations.forEach(function(station){
    //     // console.log(station);
    //     var buildingMarker =
    //       new google.maps.Marker(
    //         {
    //           position: new google.maps.LatLng(station.lat, station.lng),
    //           title: station.friendly_name
    //           // icon: '../../img/tramvaie.png'
    //         }
    //       );
    //     $scope.markers.push(buildingMarker);
    //     buildingMarker.setMap($scope.map.control.getGMap());
    //     buildingMarker.addListener('click', $scope.markerClick);
    //   });
    // }).catch(function(data){
    //   console.log("err getting nearest stations");
    //   console.log(data);
    // });

    $scope.markerClick = function () {
     // console.log("clicked st: ", this, this.station);
      $rootScope.currentStation = this.station;
      $rootScope.$broadcast('loadCurrentStation');
    };
    //
    $scope.markers = [];

    // instantiate google map objects for directions
    // var directionsDisplay = new google.maps.DirectionsRenderer();
    // var directionsService = new google.maps.DirectionsService();
    // var geocoder = new google.maps.Geocoder();

    // // directions object -- with defaults
    // $scope.directions = {
    //   destination: "Strada Arieș 1, Timișoara",
    //   origin: "Strada 1 Decembrie 1918 96, Timișoara",
    //   showList: false
    // };
    //
    // // get directions using google maps api
    //
    // $scope.getDirections = function (origin, destination, transportType) {
    //   var request = {
    //     origin: origin,
    //     destination: destination,
    //     travelMode: google.maps.DirectionsTravelMode.TRANSIT,
    //     transitOptions: {modes: [google.maps.TransitMode[transportType]]}
    //   };

    //   directionsService.routes(request, function (response, status) {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       directionsDisplay.setDirections(response);
    //       directionsDisplay.setMap($scope.map.control.getGMap());
    //       directionsDisplay.setOptions({ suppressMarkers: true });
    //       directionsDisplay.setPanel(document.getElementById('directionsList'));
    //       $scope.directions.showList = true;
    //     } else {
    //       console.log(response, status);
    //       console.log('Google routes unsuccesfull!');
    //     }
    //   });
    // };

    $scope.init = function() {
      setTimeout(function(){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        document.getElementsByTagName("ion-header-bar")[1].getElementsByClassName('title')[0].innerHTML = "City Transport Timișoara";
        google.maps.event.addDomListener($scope.map.control.getGMap(),'zoom_changed', function() {
          var zoom =  $scope.map.control.getGMap().getZoom();
          console.log(zoom);
            if(zoom<=16 && $scope.oldZoom>=16){
                $scope.markers.forEach(function(marker){
                marker.setMap(null);
              });
                $scope.comasat = true;
               showAutoStations($scope.stations);
               console.log("cms changed to "+ $scope.comasat);
            }
            else if(zoom>=16 && $scope.oldZoom<=16){
                $scope.markers.forEach(function(marker){
                marker.setMap(null);
              });
                 $scope.comasat = false;
                showAutoStations($scope.stations);
                  console.log("cms changed to "+ $scope.comasat);
             }

             $scope.oldZoom = zoom;
        });
      }, 100);
    };
    $scope.init();

    $scope.oldZoom = $scope.map.zoom;

    var showAutoStations = function (stations) {
      if(stations==null)
        return;
      $scope.stations = stations;
      var viz = [];

      stations.forEach(function (station, i) {


        if (station.lat && station.lng){

          if($scope.comasat && station.junction_name && viz[station.junction_name])
            return;

          viz[station.junction_name] = true;

            var iconUrl =  switchMeans();

            var marker = new google.maps.Marker(
                {
                  position: {lat: station.lat, lng: station.lng},
                  title: station.friendly_name,
                  icon: iconUrl
                }
              );
              marker.station = station;
              $scope.markers.push(marker);
              marker.setMap($scope.map.control.getGMap());
              marker.addListener('click', $scope.markerClick);
        } else {
          // console.log(station.lat);
          // console.log(station.lng);
        }
      });
    };
    var showBikeStations = function(stations) {
      console.log("Show bike stationssss:", stations);
      stations.forEach(function (station, i) {
        if (station.lat && station.lng){

          var iconUrl =  switchMeans();

          var marker = new google.maps.Marker(
            {
              position: {lat: station.lat, lng: station.lng},
              title: station.friendly_name,
              icon: iconUrl
            }
          );
          station.isBikeStation = true;
          marker.station = station;
          $scope.markers.push(marker);
          marker.setMap($scope.map.control.getGMap());
          // marker.addListener('click', $scope.markerClick);
        } else {
          // console.log(station.lat);
          // console.log(station.lng);
        }
      });
    };

    var switchMeans = function() {
        switch ($scope.selectedTT) {
          case 'bus': iconUrl = 'img/point_bus.png';
                      break;
          case 'trolley': iconUrl = 'img/point_trolley.png';
                      break;
          case 'tram': iconUrl = 'img/point_tram.png';
                      break;
          case 'bicycle': iconUrl = 'img/point_bicycle.png';
                      break;
          case 'boat': iconUrl = 'img/point_boat.png';
                      break;
          default: iconUrl = "img/point_tram.png";
        }
        return iconUrl;
    }

    var showRoute = function () {
      $http.get(backendApi + 'get_stations')
        .then(function (res) {
          var stations = res.data.stations;
          console.log(stations);
          // var start = {lat: stations[0].lat, lng: stations[0].lng};
          // var end = {lat: stations[stations.length-1].lat, lng: stations[stations.length-1].lng};
          // console.log(end);
          // console.log(start);
          // $scope.getDirections(start, end, transportType);
          showAutoStations(stations);
        });
    };
    showRoute();


    $scope.selectedTTChanged = function () {
      $scope.selectedTT = $rootScope.selectedTT;
      console.log("changes slectedTT to: " + $scope.selectedTT);
      console.log($scope.markers.length);
      var tt = $scope.selectedTT;
      if(tt == "bus"){
        tt = "bus";
      }

      switch (tt){
        case "":
          console.log("getall");
          StationsService.getAll().then(gotStations);
          break;
        case "bicycle":
          StationsService.getBikeStations().then(gotStations);
          break;
        default:
          console.log("get");
          StationsService.get(tt).then(gotStations);
          break;
      }

    };

    var gotStations = function(data){
      console.log("got stations", data);
      $scope.markers.forEach(function(marker){
        marker.setMap(null);
      });
      $scope.markers = [];
      if(data.data.stations){
        showAutoStations(data.data.stations);
      }
      else if(data.data.bike_stations){
        showBikeStations(data.data.bike_stations);
      }
    };

    $scope.$on('$ionicView.leave', function() {
      console.log("leave map");
      $scope.visible = false;
    });
    $scope.$on('$ionicView.enter', function() {
      console.log("enter map");
      $scope.visible = true;
    });

    $scope.$on('toggleTT', function () {
      var tt = $rootScope.selectedTT;
      if(tt == $scope.selectedTT) {
        $scope.selectedTT = "";
      }
      $scope.selectedTTChanged();
      console.log("toggleTT in main map: " + tt);
      $scope.selectedTT = tt;


      $rootScope.currentStation = null;
      $rootScope.$broadcast('loadCurrentStation');
    });

    var onSuccess = function(position) {
      console.log('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
      $scope.map.center = {latitude: position.coords.latitude, longitude: position.coords.longitude};
      $scope.map.control.getGMap().setCenter({lat: position.coords.latitude, lng: position.coords.longitude });
      if($scope.myMarker){
        $scope.myMarker.setMap(null);
      }
      $scope.myMarker = new google.maps.Marker(
        {
          position: {lat: position.coords.latitude, lng: position.coords.longitude},
          title: "Tu",
          icon: "img/bus.png"
        }
      );
      $scope.myMarker.setMap($scope.map.control.getGMap());
      // console.log(document.tdr = $scope.map);
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      console.log('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    }

  });
