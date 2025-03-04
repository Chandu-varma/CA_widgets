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

                    <!-- Corrected Drop Button -->
                    <button id="drop" 
                        style="margin-top: 20px; padding: 10px 20px; background-color: #28a745; 
                        color: #fff; border: none; border-radius: 5px; cursor: pointer;">
                        Drop Here
                    </button>

                    <div id="tableContainer" style="margin-top: 20px;"></div>
                </div>`;

            // Add event listeners
            // widget.addPreference(platformidPreference);
            page1.addpref();
            document.getElementById("loadTableBtn").addEventListener("click", tableModule.generateTable);
            document.getElementById("drop").addEventListener("click", page1.drop);


        },

        addpref: function () {
            var structure = {
                name: "name",
                type: "text",
                label: "sample",
                label: "hiii",
                options: ["a", "B", "c"],
                onchange: "onPlatformIdChange"
            };
            widget.addPreference(structure);
            widget.addPreference(structure);
            widget.addPreference(structure);
        },

        drop: function () {
            var area = document.querySelector("#drop");
            dragDrop.droppable(area, {
                drop: function (data) { // Corrected function usage
                    alert(data);
                }
            });
        },
    };

    widget.addEvent("onLoad", page1.onLoad);
});
