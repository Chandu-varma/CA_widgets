define([
    "DS/widget/scripts/TableWidget",
    "DS/DataDragAndDrop/DataDragAndDrop",
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
], function (tableModule, dragDrop) {
    'use strict';

    var page1 = {
        selectedLat: null,
        selectedLng: null,

        onLoad: function () {
            if (typeof L === "undefined") {
                alert("Leaflet.js failed to load.");
                return;
            }

            widget.body.innerHTML = `
                <div class="main-Container" id="mainContainer" 
                    style="width: 100%; height: 100%; text-align: center; background-color:#005685; color: #ffffff; padding: 40px">
                    
                    <h1>Traffic Data Viewer</h1>
                    
                    <button id="loadMapBtn">Load Map</button>
                    <button id="getTrafficDataBtn" disabled>Get Traffic Data</button>

                    <div id="mapContainer" style="margin-top: 20px; display: none;">
                        <h2>Select a Location</h2>
                        <div id="map" style="height: 400px; width: 100%;"></div>
                        <p id="coordinates">Click on the map to select a location.</p>
                    </div>

                    <div id="trafficTableContainer" style="margin-top: 20px; display: none;">
                        <h2>Traffic Data</h2>
                        <table border="1" style="width: 100%; text-align: left;">
                            <thead>
                                <tr>
                                    <th>Speed (KMPH)</th>
                                    <th>Free Flow Speed (KMPH)</th>
                                    <th>Current Travel Time (Sec)</th>
                                    <th>Free Flow Travel Time (Sec)</th>
                                </tr>
                            </thead>
                            <tbody id="trafficData"></tbody>
                        </table>
                    </div>
                </div>`;

            document.getElementById("loadMapBtn").addEventListener("click", page1.loadMap);
            document.getElementById("getTrafficDataBtn").addEventListener("click", page1.getTrafficData);
        },

        loadMap: function () {
            document.getElementById("mapContainer").style.display = "block";

            var defaultLocation = [17.3850, 78.4867]; // Default Hyderabad
            var map = L.map('map').setView(defaultLocation, 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            var marker = L.marker(defaultLocation, { draggable: true }).addTo(map);
            page1.selectedLat = defaultLocation[0];
            page1.selectedLng = defaultLocation[1];
            document.getElementById("getTrafficDataBtn").disabled = false;

            map.on('click', function (event) {
                marker.setLatLng(event.latlng);
                page1.selectedLat = event.latlng.lat;
                page1.selectedLng = event.latlng.lng;
                document.getElementById("coordinates").innerText = `Latitude: ${page1.selectedLat}, Longitude: ${page1.selectedLng}`;
            });
        },

        getTrafficData: function () {
            var apiKey = "e7TPeERXJGg5odC4yjsQ9CflXKbcn";
            var url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/10/json?point=${page1.selectedLat},${page1.selectedLng}&unit=KMPH&openLr=false&key=${apiKey}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.flowSegmentData) {
                        var trafficInfo = data.flowSegmentData;
                        var tableRow = `
                            <tr>
                                <td>${trafficInfo.currentSpeed}</td>
                                <td>${trafficInfo.freeFlowSpeed}</td>
                                <td>${trafficInfo.currentTravelTime}</td>
                                <td>${trafficInfo.freeFlowTravelTime}</td>
                            </tr>`;

                        document.getElementById("trafficData").innerHTML = tableRow;
                        document.getElementById("trafficTableContainer").style.display = "block";
                    } else {
                        alert("No traffic data available for this location.");
                    }
                })
                .catch(error => console.error("Error fetching traffic data:", error));
        }
    };

    widget.addEvent("onLoad", page1.onLoad);
});
