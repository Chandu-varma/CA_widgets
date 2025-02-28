define("DS/widget/scripts/my", [
    "DS/widget/scripts/TableWidget",
    "DS/DataDragAndDrop/DataDragAndDrop"
], function (tableModule, dragDrop) {
    'use strict';

    var page1 = {
        onLoad: function () {
            widget.body.innerHTML = `
                <div class="main-Container" id="mainContainer" 
                    style="width: 100%; height: 100%; text-align: center; background-color:#005685; color: #ffffff; padding: 40px">
                    
                    <h1>Drag and Drop Data</h1>
                    
                    <!-- Load Table Button -->
                    <button id="loadTableBtn" 
                        style="margin-top: 20px; padding: 10px 20px; background-color: #28a745; 
                        color: #fff; border: none; border-radius: 5px; cursor: pointer;">
                        Load Table
                    </button><br><br>

                    <!-- Drop Button -->
                    <button id="drop" 
                        style="margin-top: 20px; padding: 10px 20px; background-color: #28a745; 
                        color: #fff; border: none; border-radius: 5px; cursor: pointer;">
                        Drop Here
                    </button><br><br>

                    <!-- Load Map Button -->
                    <button id="loadMapBtn" 
                        style="margin-top: 20px; padding: 10px 20px; background-color: #007bff; 
                        color: #fff; border: none; border-radius: 5px; cursor: pointer;">
                        Load Map
                    </button>

                    <!-- Map Container (Initially Hidden) -->
                    <div id="mapContainer" style="margin-top: 20px; display: none;">
                        <h2>Select Location & Get 500m Radius</h2>
                        <div id="map" style="height: 400px; width: 100%;"></div>
                        <p id="coordinates">Click on the map to select a location.</p>
                    </div>
                </div>`;

            // Add event listeners
            document.getElementById("loadTableBtn").addEventListener("click", tableModule.generateTable);
            document.getElementById("drop").addEventListener("click", page1.drop);
            document.getElementById("loadMapBtn").addEventListener("click", page1.loadMap);
        },

        drop: function () {
            var area = document.querySelector("#drop");
            dragDrop.droppable(area, {
                drop: function (data) {
                    alert("Dropped Data: " + JSON.stringify(data));
                }
            });
        },

        loadMap: function () {
            var mapContainer = document.getElementById("mapContainer");
            mapContainer.style.display = "block"; // Show the map container

            // Check if Leaflet is loaded
            if (typeof L === "undefined") {
                alert("Leaflet.js is not loaded. Please check your internet connection.");
                return;
            }

            // Initialize Leaflet map
            var defaultLocation = [17.3850, 78.4867]; // Default: Hyderabad
            var map = L.map('map').setView(defaultLocation, 15);

            // Load OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Marker
            var marker = L.marker(defaultLocation, { draggable: true }).addTo(map);

            // Circle for 500m radius
            var circle = L.circle(defaultLocation, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.2,
                radius: 500
            }).addTo(map);

            function updateCoordinates(latlng) {
                var lat = latlng.lat.toFixed(6);
                var lng = latlng.lng.toFixed(6);
                document.getElementById("coordinates").innerHTML = `Latitude: ${lat}, Longitude: ${lng}`;

                marker.setLatLng(latlng);
                circle.setLatLng(latlng);
            }

            marker.on('dragend', function (event) {
                updateCoordinates(event.target.getLatLng());
            });

            map.on('click', function (event) {
                updateCoordinates(event.latlng);
            });

            updateCoordinates(marker.getLatLng());
        }
    };

    widget.addEvent("onLoad", page1.onLoad);
});
