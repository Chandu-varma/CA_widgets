define(["DS/widget/scripts/MyWidget1","DS/DataDragAndDrop/DataDragAndDrop"], function (dragDrop) {
    'use strict';

    var page1 = {
        onLoad: function () {
            widget.body.innerHTML = `
                <div id="mainContainer" style="padding: 20px; background-color: #f4f4f4; color: #333;">
                    <h2>Data Table</h2>
                    
                    <button id="addBtn" 
                        style="margin-bottom: 10px; padding: 8px 16px; background-color: #007bff; 
                        color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Add
                    </button>

                    <table id="dataTable" border="1" width="100%" style="border-collapse: collapse; background: white;">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Rows will be inserted here -->
                        </tbody>
                    </table>
                </div>
            `;

            // Set up the Add button
            var addBtn = document.getElementById("addBtn");
            if (addBtn) {
                addBtn.addEventListener("click", page1.fetchWebServiceData);
            }
        },

        fetchWebServiceData: function () {
            // Dummy web service call simulation
            // Replace this with actual fetch or XMLHttpRequest to your service
            console.log("Calling web service...");

            // Simulated response data
            const responseData = {
                id: Math.floor(Math.random() * 1000),
                name: "Item " + String.fromCharCode(65 + Math.floor(Math.random() * 26))
            };

            page1.addRowToTable(responseData);
        },

        addRowToTable: function (data) {
            const tbody = document.querySelector("#dataTable tbody");

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${data.id}</td>
                <td>${data.name}</td>
            `;

            tbody.appendChild(row);
        }
    };

    widget.addEvent("onLoad", page1.onLoad);
});
