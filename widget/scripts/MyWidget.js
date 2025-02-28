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
<buttonid="drop" style="margin-top: 20px; padding: 10px 20px; background-color: #28a745>drop here</button>
                    <div id="tableContainer" style="margin-top: 20px;"></div>
                </div>`;

            // Add event listener to button to call TableWidget.js
            document.getElementById("loadTableBtn").addEventListener("click", tableModule.generateTable);
            document.getElementById("drop").addEventListener("click", page1.drop);
        },


        drop: function () {
            var area = document.querySelector("#drop");
            dragDrop.droppable(area, {
                function(data) {
                    alert(data);
                },
            },);

        },

    };

    widget.addEvent("onLoad", page1.onLoad);



});
