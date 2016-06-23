/**
 * Created by NM on 5/22/2016.
 */

console.log("routes map controller loading");

appControllers

  .controller('RouteMapController', function($scope, StationsService, $rootScope, $location, $http) { // uiGmapGoogleMapApi
    console.log("routes map controller loaded");
    $scope.map = { control: {}, center: { latitude: 45.745139, longitude: 21.241582 }, zoom: 13 };
    $scope.myPosition = {latitude: 45.7456645, longitude: 21.2411096};
    $scope.markers = [];
    $scope.lastPath = null;

    $scope.$on('loadRouteOnMap', function(){
      var selectedRoute = $rootScope.selectedRoute;
      console.log("loading map for routes ", selectedRoute);
    });

    $scope.init = function () {
      if($rootScope.selectedRoute == undefined) {
        $location.path('/view/routes');
        return;
      }
      $scope.$on('loadRouteOnMap', function() {
        $scope.loadRoute($rootScope.selectedRoute);
      });
      $scope.loadRoute($rootScope.selectedRoute);
    };
    // instantiate google map objects for directions
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();

    $scope.getDirections = function (origin, destination, transportType) {
      var request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.DirectionsTravelMode.TRANSIT,
        transitOptions: {modes: [google.maps.TransitMode[transportType]]}
      };

      directionsService.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          //directionsDisplay.setDirections(response);
          //directionsDisplay.setMap($scope.map.control.getGMap());
          //directionsDisplay.setOptions({ suppressMarkers: true });
          //directionsDisplay.setPanel(document.getElementById('directionsList'));
        } else {
          console.log(response, status);
          console.log('Google routes unsuccesfull!');
        }
      });
    };
    var showRouteStations = function (stations) {
      $scope.markers.forEach(function(marker){
        marker.setMap(null);
      });
      $scope.markers = [];
      var coords = [];
      var bounds = new google.maps.LatLngBounds();

      stations.forEach(function (station, i) {
        console.log(station);
        if (station.lat && station.lng) {
          if (i === 0 || i === stations.length-1) {
            var iconUrl = 'img/start_2.png'
          } else {
            var iconUrl =  switchMeans();
          }
            var marker = new google.maps.Marker(
                {
                  position: {lat: station.lat, lng: station.lng},
                  title: station.friendly_name,
                  icon: iconUrl
                }
              );
              $scope.markers.push(marker);
              marker.setMap($scope.map.control.getGMap());

          bounds.extend(marker.getPosition());
          coords.push({lat: station.lat, lng: station.lng});
        }
      });
      var routePath = new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: '#777',
        strokeOpacity: 1.0,
        strokeWeight: 4
      });
      if($scope.lastPath){
        $scope.lastPath.setMap(null);
      }
      $scope.lastPath = routePath;
      routePath.setMap($scope.map.control.getGMap());
      $scope.map.control.getGMap().fitBounds(bounds);
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


    $scope.loadRoute = function(route) {
      console.log("loading routes(maps): ", route);
      var lineId = route.line_id;
      var transportType = route.line_type.toUpperCase();
      $http.get(backendApi + 'get_routes?line_id=' + lineId)
        .then(function (res) {
          var stations = res.data.routes[1].stations;
          console.log(stations);
          var start = {lat: stations[0].lat, lng: stations[0].lng};
          var end = {lat: stations[stations.length-1].lat, lng: stations[stations.length-1].lng};
          console.log(end);
          console.log(start);
          $scope.getDirections(start, end, transportType);
          showRouteStations(stations);
        });
    };

    $scope.init();
  });
