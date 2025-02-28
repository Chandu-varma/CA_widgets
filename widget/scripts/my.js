define([
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
], function () {
    'use strict';

    var page1 = {
        selectedLat: null,
        selectedLng: null,
        radiusKm: 1, // Default radius (1 km)

        onLoad: function () {
            if (typeof L === "undefined") {
                alert("Leaflet.js failed to load.");
                return;
            }

            widget.body.innerHTML = `
                <div class="main-Container" id="mainContainer" 
                    style="width: 100%; height: 100%; text-align: center; background-color:#005685; color: #ffffff; padding: 20px; overflow: auto; max-height: 100vh;">
                    
                    <h1>Radius Coordinates Viewer</h1>

                    <button id="loadMapBtn">Load Map</button>

                    <div id="mapContainer" style="margin-top: 20px; display: none; overflow: hidden;">
                        <h2>Select a Location</h2>
                        <div id="map" style="height: 400px; width: 100%; max-width: 800px; margin: auto;"></div>
                        <p id="coordinates">Click on the map to select a location.</p>

                        <label for="radiusInput">Set Radius (km): </label>
                        <input type="number" id="radiusInput" value="1" min="0.1" step="0.1">
                        <button id="updateRadiusBtn">Update Radius</button>
                    </div>

                    <div id="coordsTableContainer" style="margin-top: 20px; display: none; max-height: 300px; overflow-y: auto;">
                        <h2>Radius Coordinates</h2>
                        <div style="max-width: 800px; margin: auto;">
                            <table border="1" style="width: 100%; text-align: left;">
                                <thead>
                                    <tr>
                                        <th>Point</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                    </tr>
                                </thead>
                                <tbody id="coordsData"></tbody>
                            </table>
                        </div>
                    </div>
                </div>`;

            document.getElementById("loadMapBtn").addEventListener("click", page1.loadMap);
            document.getElementById("updateRadiusBtn").addEventListener("click", page1.updateRadius);
        },

        loadMap: function () {
            document.getElementById("mapContainer").style.display = "block";

            var defaultLocation = [17.3850, 78.4867]; // Default Hyderabad
            var map = L.map('map').setView(defaultLocation, 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            var marker = L.marker(defaultLocation, { draggable: true }).addTo(map);
            var circle = L.circle(defaultLocation, { radius: page1.radiusKm * 1000 }).addTo(map);
            page1.selectedLat = defaultLocation[0];
            page1.selectedLng = defaultLocation[1];

            document.getElementById("coordinates").innerText = `Latitude: ${page1.selectedLat}, Longitude: ${page1.selectedLng}`;
            document.getElementById("coordsTableContainer").style.display = "block";
            page1.updateTable();

            map.on('click', function (event) {
                marker.setLatLng(event.latlng);
                circle.setLatLng(event.latlng);
                page1.selectedLat = event.latlng.lat;
                page1.selectedLng = event.latlng.lng;
                document.getElementById("coordinates").innerText = `Latitude: ${page1.selectedLat}, Longitude: ${page1.selectedLng}`;
                page1.updateTable();
            });
        },

        updateRadius: function () {
            var newRadius = parseFloat(document.getElementById("radiusInput").value);
            if (newRadius > 0) {
                page1.radiusKm = newRadius;
                page1.updateTable();
            } else {
                alert("Please enter a valid radius greater than 0.");
            }
        },

        updateTable: function () {
            var numPoints = 8; // Number of points around the circle
            var radiusMeters = page1.radiusKm * 1000;
            var coordsTable = document.getElementById("coordsData");
            coordsTable.innerHTML = "";

            for (var i = 0; i < numPoints; i++) {
                var angle = (i * 360) / numPoints; // Evenly distribute around circle
                var newCoords = page1.computeOffset(page1.selectedLat, page1.selectedLng, radiusMeters, angle);
                coordsTable.innerHTML += `<tr><td>Point ${i + 1}</td><td>${newCoords.lat}</td><td>${newCoords.lng}</td></tr>`;
            }
        },

        computeOffset: function (lat, lng, distance, angle) {
            var R = 6378137; // Earth's radius in meters
            var dRad = distance / R;
            var latRad = (lat * Math.PI) / 180;
            var lngRad = (lng * Math.PI) / 180;
            var angleRad = (angle * Math.PI) / 180;

            var newLat = Math.asin(
                Math.sin(latRad) * Math.cos(dRad) +
                Math.cos(latRad) * Math.sin(dRad) * Math.cos(angleRad)
            );
            var newLng = lngRad + Math.atan2(
                Math.sin(angleRad) * Math.sin(dRad) * Math.cos(latRad),
                Math.cos(dRad) - Math.sin(latRad) * Math.sin(newLat)
            );

            return {
                lat: (newLat * 180) / Math.PI,
                lng: (newLng * 180) / Math.PI
            };
        }
    };

    widget.addEvent("onLoad", page1.onLoad);
});
