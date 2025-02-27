define("DS/widget/scripts/MyWidget", [], function () {
    'use strict';

    var page1 = {
        onLoad: function () {
            // Creating HTML content
            widget.body.innerHTML = `
            <div class="main-Container" id="mainContainer" 
                style="width: 100%; height: 100%; text-align: center; background-color:#005685; color: #ffffff; padding: 40px">
                
                <h1>Drag and Drop Data</h1>
                
                 
                
                <!-- Button to Load Table -->
                <button id="loadTableBtn" 
                    style="margin-top: 20px; padding: 10px 20px; background-color: #28a745; 
                    color: #fff; border: none; border-radius: 5px; cursor: pointer;">
                    Load Table
                </button>

                <div id="tableContainer" style="margin-top: 20px;"></div>
            </div>`;

            // Add event listener to button
            document.getElementById("loadTableBtn").addEventListener("click", page1.loadTable);
        },

        loadTable: function () {
            fetch('html/table.html')
                .then(response => response.text())
                .then((html) => {
                    document.getElementById('tableContainer').innerHTML = html;
                })
                .catch(error => console.error("Error loading table:", error));
        }
    };
    widget.addEvent("onLoad", page1.onLoad);
});
