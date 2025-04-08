define(["DS/widget/scripts/MyWidget", "DS/widget/scripts/data"], function (myWidget, dataModule) {
    'use strict';

    var page1 = {
        onLoad: function () {
            widget.body.innerHTML = `
                <div class="main-Container" id="mainContainer" 
                    style="width: 100%; height: 100%; text-align: center; background-color:#005685; color: #ffffff; padding: 40px">
                    
                    <h1>Load BOM Table</h1>
                    
                    <!-- Button to Load Table -->
                    <button id="loadTableBtn" 
                        style="margin-top: 20px; padding: 10px 20px; background-color: #28a745; 
                        color: #fff; border: none; border-radius: 5px; cursor: pointer;">
                        Load Table
                    </button><br><br>

                    <div id="tableContainer" style="margin-top: 20px; background: #ffffff; color: black; padding: 10px;"></div>
                </div>`;

            var loadTableBtn = document.getElementById("loadTableBtn");

            if (loadTableBtn) {
                loadTableBtn.addEventListener("click", page1.loadTable);
            } else {
                console.error("Load Table button not found!");
            }
        },

        loadTable: function () {
            var tableContainer = document.getElementById("tableContainer");

            if (!tableContainer) {
                console.error("Table container not found!");
                return;
            }

            const bomData = dataModule.fetchBOMData(); // Fetch BOM data from the module

            let html = `
                <table border="1" width="100%" style="border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #ddd;">
                            <th>Parent Part</th>
                            <th>Title</th>
                            <th>Revision</th>
                            <th>Type</th>
                            <th>Owner</th>
                            <th>Description</th>
                            <th>Children Count</th>
                        </tr>
                    </thead>
                    <tbody>`;

            bomData.forEach(item => {
                html += `
                    <tr>
                        <td>${item.parent_part}</td>
                        <td>${item.title}</td>
                        <td>${item.revision}</td>
                        <td>${item.type}</td>
                        <td>${item.owner}</td>
                        <td>${item.description}</td>
                        <td>${item.children.length}</td>
                    </tr>`;
            });

            html += `</tbody></table>`;
            tableContainer.innerHTML = html;

            console.log("BOM Table Loaded Successfully!");
        }
    };

    widget.addEvent("onLoad", page1.onLoad);
});
