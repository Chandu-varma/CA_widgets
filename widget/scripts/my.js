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

            // Initialize Google Maps
            var defaultLocation = { lat: 17.3850, lng: 78.4867 }; // Default: Hyderabad
            var map = new google.maps.Map(document.getElementById("map"), {
                center: defaultLocation,
                zoom: 15,
            });

            // Marker
            var marker = new google.maps.Marker({
                position: defaultLocation,
                map: map,
                draggable: true,
            });

            // Circle for 500m radius
            var circle = new google.maps.Circle({
                map: map,
                radius: 500,
                fillColor: "#AA0000",
                fillOpacity: 0.2,
                strokeWeight: 2,
            });

            circle.bindTo("center", marker, "position");

            function updateCoordinates(position) {
                var lat = position.lat();
                var lng = position.lng();
                document.getElementById("coordinates").innerHTML = `Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`;
            }

            google.maps.event.addListener(marker, "dragend", function () {
                updateCoordinates(marker.getPosition());
            });

            google.maps.event.addListener(map, "click", function (event) {
                marker.setPosition(event.latLng);
                updateCoordinates(event.latLng);
            });

            updateCoordinates(marker.getPosition());
        }
    };

    widget.addEvent("onLoad", page1.onLoad);
});
