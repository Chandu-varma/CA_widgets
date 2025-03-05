define("DS/widget/scripts/MyWidget", ["DS/widget/scripts/TableWidget", "DS/DataDragAndDrop/DataDragAndDrop"], function (tableModule, dragDrop) {
    'use strict';

    var page1 = {
        onLoad: function () {
            widget.body.innerHTML = `
                <div class="main-Container" id="mainContainer" 
                    style="width: 100%; height: 100%; text-align: center; background-color:#005685; color: #ffffff; padding: 40px">
                    
                    <h1>Drag and Drop Data</h1>
                    
                    <!-- Button to Load Table -->
                    <button id="loadTableBtn" 
                        style="margin-top: 20px; padding: 10px 20px; background-color: #28a745; 
                        color: #fff; border: none; border-radius: 5px; cursor: pointer;">
                        Load Table
                    </button><br><br>

                    <!-- Drop Area -->
                    <div id="dropArea" 
                        style="margin-top: 20px; padding: 20px; width: 200px; height: 100px; 
                        background-color: #dc3545; color: white; border-radius: 5px; 
                        display: flex; align-items: center; justify-content: center; cursor: pointer;">
                        Drop Here
                    </div>

                    <div id="tableContainer" style="margin-top: 20px; background: #ffffff; color: black; padding: 10px;"></div>
                </div>`;

            // Add user preferences
            page1.addPreferences();

            // Attach event listeners after the DOM is loaded
            var loadTableBtn = document.getElementById("loadTableBtn");
            var dropArea = document.getElementById("dropArea");

            if (loadTableBtn) {
                loadTableBtn.addEventListener("click", page1.loadTable);
            } else {
                console.error("Load Table button not found!");
            }

            if (dropArea) {
                page1.setupDrop(dropArea);
            } else {
                console.error("Drop area not found!");
            }
        },

        addPreferences: function () {
            var textPreference = {
                name: "username",
                type: "text",
                label: "User Name",
                defaultValue: ""
            };

            var listPreference = {
                name: "category",
                type: "list",
                label: "Category",
                options: ["a", "B", "c"],
                defaultValue: "a"
            };

            // Add preferences to the widget
            widget.addPreference(textPreference);
            widget.addPreference(listPreference);
        },

        loadTable: function () {
            var tableContainer = document.getElementById("tableContainer");

            if (!tableContainer) {
                console.error("Table container not found!");
                return;
            }

            // Generate a sample table with draggable rows
            tableContainer.innerHTML = `
                <table border="1" width="100%" style="border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr draggable="true" ondragstart="page1.drag(event)" data-id="1">
                            <td>1</td>
                            <td>Item A</td>
                        </tr>
                        <tr draggable="true" ondragstart="page1.drag(event)" data-id="2">
                            <td>2</td>
                            <td>Item B</td>
                        </tr>
                        <tr draggable="true" ondragstart="page1.drag(event)" data-id="3">
                            <td>3</td>
                            <td>Item C</td>
                        </tr>
                    </tbody>
                </table>`;

            console.log("Table Loaded Successfully!");
        },

        drag: function (event) {
            var data = event.target.getAttribute("data-id");  // Capture row data
            event.dataTransfer.setData("text/plain", data);   // Store data in drag event
            console.log("Dragging item:", data);
        },

        setupDrop: function (dropArea) {
            dropArea.addEventListener("dragover", function (event) {
                event.preventDefault();  // Allow drop
            });

            dropArea.addEventListener("drop", function (event) {
                event.preventDefault();
                var data = event.dataTransfer.getData("text/plain");
                alert("Dropped Data: " + data);
                console.log("Dropped Data:", data);
            });
        }
    };

    widget.addEvent("onLoad", page1.onLoad);
});
