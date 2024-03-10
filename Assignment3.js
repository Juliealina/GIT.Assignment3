// Initialize the map
var map = L.map("map").setView([55.7, 12.6], 10);

// Add a base map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Load shipwrecks GeoJSON data from GitHub Gist
fetch("https://raw.githubusercontent.com/Juliealina/GIT.Assignment3/main/shipwrecks.geojson")
  .then((response) => response.json())
  .then((shipwrecksData) => {
    console.log("GeoJSON Data:", shipwrecksData);

    // Create shipwrecks layer with custom popup and marker style
    var shipwrecksLayer = L.geoJSON(shipwrecksData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Era: " + feature.properties.datering);
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: "blue",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
      },
    });

    // Create a marker cluster group for shipwrecks
    var shipwrecksCluster = L.markerClusterGroup();
    shipwrecksCluster.addLayer(shipwrecksLayer);

    // Add shipwrecks layer to the map
    map.addLayer(shipwrecksCluster);

    // Fit the map bounds to the shipwrecks layer
    map.fitBounds(shipwrecksLayer.getBounds());
  })
  .catch((error) => {
  console.error("Error loading GeoJSON data:", error.message);
  });