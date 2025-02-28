define(["https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"], function () {
    'use strict';

    var page1 = {
        map: null,
        marker: null,
        selectedLat: null,
        selectedLng: null,
        radiusKm: 1, // Default radius
        apiKey: "", // API Key Placeholder
        mode: "pointer", // Default mode

        onLoad: function () {
            if (typeof L === "undefined") {
                alert("Leaflet.js failed to load.");
                return;
            }

            widget.body.innerHTML = `
                <div style="display: flex; height: 100vh;">
                    <!-- Left: Map View -->
                    <div id="mapContainer" style="flex: 2; height: 100%;">
                        <div id="map" style="height: 100%;"></div>
                    </div>
                    
                    <!-- Right: Controls & Table -->
                    <div id="controls" style="flex: 1; padding: 20px; background: #f4f4f4; overflow-y: auto;">
                        <h2>Traffic Data Viewer</h2>
                        <label>Select Mode:</label>
                        <button id="modePointer">Select by Pointer</button>
                        <button id="modeText">Select by Text</button>
                        <br><br>
                        <label>Enter Location: <input type="text" id="locationInput" placeholder="City, Address..." disabled></label>
                        <button id="searchLocation" disabled>Search</button>
                        <br><br>
                        <label>API Key: <input type="text" id="apiKeyInput" placeholder="Enter API Key"></label>
                        <br><br>
                        <label>Radius (km): <input type="number" id="radiusInput" value="1" min="0.1" step="0.1"></label>
                        <br><br>
                        <button id="getTrafficData">Get Traffic Data</button>
                        <br><br>
                        <table border="1" width="100%">
                            <thead>
                                <tr>
                                    <th>Location</th>
                                    <th>Traffic Level</th>
                                </tr>
                            </thead>
                            <tbody id="trafficTableBody">
                                <tr><td colspan="2">No Data Available</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>`;

            page1.initMap();

            document.getElementById("modePointer").addEventListener("click", function () {
                page1.mode = "pointer";
                document.getElementById("locationInput").disabled = true;
                document.getElementById("searchLocation").disabled = true;
            });
            document.getElementById("modeText").addEventListener("click", function () {
                page1.mode = "text";
                document.getElementById("locationInput").disabled = false;
                document.getElementById("searchLocation").disabled = false;
            });

            document.getElementById("searchLocation").addEventListener("click", page1.searchLocation);
            document.getElementById("getTrafficData").addEventListener("click", page1.getTrafficData);
        },

        initMap: function () {
            page1.map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(page1.map);

            page1.map.on('click', function (e) {
                if (page1.mode === "pointer") {
                    page1.selectedLat = e.latlng.lat;
                    page1.selectedLng = e.latlng.lng;
                    page1.updateMarker();
                }
            });
        },

        updateMarker: function () {
            if (page1.marker) page1.map.removeLayer(page1.marker);
            page1.marker = L.marker([page1.selectedLat, page1.selectedLng]).addTo(page1.map);
        },

        searchLocation: function () {
            if (page1.mode !== "text") return;
            var location = document.getElementById("locationInput").value;
            if (!location) {
                alert("Please enter a location.");
                return;
            }
            alert("Location search is not yet implemented. Use the map click instead.");
        },

        getTrafficData: function () {
            page1.apiKey = document.getElementById("apiKeyInput").value;
            if (!page1.apiKey) {
                alert("Please enter an API key.");
                return;
            }

            if (!page1.selectedLat || !page1.selectedLng) {
                alert("Please select a location on the map.");
                return;
            }

            var radius = document.getElementById("radiusInput").value;
            var url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/10/json?point=${page1.selectedLat},${page1.selectedLng}&unit=KMPH&openLr=false&key=${page1.apiKey}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    page1.updateTrafficTable(data);
                })
                .catch(error => {
                    alert("Failed to fetch traffic data. Please check your API key and internet connection.");
                });
        },

        updateTrafficTable: function (data) {
            var tableBody = document.getElementById("trafficTableBody");
            tableBody.innerHTML = ""; // Clear existing data

            if (!data || !data.flowSegmentData) {
                tableBody.innerHTML = "<tr><td colspan='2'>No Traffic Data Available</td></tr>";
                return;
            }

            var speedRatio = data.flowSegmentData.currentSpeed / data.flowSegmentData.freeFlowSpeed;
            var trafficLevel = speedRatio > 0.8 ? "Low" : speedRatio > 0.5 ? "Moderate" : "High";

            var row = `<tr><td>${data.flowSegmentData.frc}</td><td>${trafficLevel}</td></tr>`;
            tableBody.innerHTML = row;
        }
    };

    widget.addEvent("onLoad", page1.onLoad);
});
