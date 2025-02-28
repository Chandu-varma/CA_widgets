define([
    "DS/widget/scripts/TableWidget",
    "DS/DataDragAndDrop/DataDragAndDrop",
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" // Load Leaflet with RequireJS
], function (tableModule, dragDrop) {
    'use strict';

    var page1 = {
        onLoad: function () {
            if (typeof L === "undefined") {
                alert("Leaflet.js failed to load.");
                return;
            }

            widget.body.innerHTML = `
                <div class="main-Container" id="mainContainer" 
                    style="width: 100%; height: 100%; text-align: center; background-color:#005685; color: #ffffff; padding: 40px">
                    
                    <h1>Drag and Drop Data</h1>
                    
                    <button id="loadTableBtn">Load Table</button>
                    <button id="drop">Drop Here</button>
                    <button id="loadMapBtn">Load Map</button>

                    <div id="mapContainer" style="margin-top: 20px; display: none;">
                        <h2>Select Location & Get 500m Radius</h2>
                        <div id="map" style="height: 400px; width: 100%;"></div>
                        <p id="coordinates">Click on the map to select a location.</p>
                    </div>
                </div>`;

            document.getElementById("loadTableBtn").addEventListener("click", tableModule.generateTable);
            document.getElementById("drop").addEventListener("click", page1.drop);
            document.getElementById("loadMapBtn").addEventListener("click", page1.loadMap);
        },

        loadMap: function () {
            document.getElementById("mapContainer").style.display = "block";

            var defaultLocation = [17.3850, 78.4867];
            var map = L.map('map').setView(defaultLocation, 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            var marker = L.marker(defaultLocation, { draggable: true }).addTo(map);
            var circle = L.circle(defaultLocation, { color: 'red', fillOpacity: 0.2, radius: 500 }).addTo(map);

            map.on('click', function (event) {
                marker.setLatLng(event.latlng);
                circle.setLatLng(event.latlng);
                document.getElementById("coordinates").innerText = `Latitude: ${event.latlng.lat}, Longitude: ${event.latlng.lng}`;
            });
        }
    };

    widget.addEvent("onLoad", page1.onLoad);
});
