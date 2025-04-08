define(["DS/widget/scripts/MyWidget1", "DS/DataDragAndDrop/DataDragAndDrop"], function (dragDrop) {
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

            var addBtn = document.getElementById("addBtn");
            if (addBtn) {
                addBtn.addEventListener("click", page1.fetchWebServiceData);
            }
        },

        fetchWebServiceData: async function () {
            try {
                const response = await fetch("https://skyronerp.onrender.com/api/bom/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UzYTdmMGY0MjkyYjA4N2YwYTQ4YzgiLCJlbWFpbCI6InZhbXNpbWFuaWtvbmRhNjg4NUBnbWFpbC5jb20iLCJpYXQiOjE3NDQxMTUxMzksImV4cCI6MTc0NDExODczOX0.la4_PBe9zjFO4aQ5ZOrIQkBp2bpHLhYDr5CTP8UzG7c"
                    }
                });

                const data = await response.json();

                if (data && Array.isArray(data.bomData)) {
                    data.bomData.forEach(page1.addRowToTable);
                } else {
                    console.error("Invalid data format", data);
                }
            } catch (error) {
                console.error("Error fetching BOM data:", error);
            }
        },

        addRowToTable: function (parentData) {
            const tbody = document.querySelector("#dataTable tbody");

            const parentId = parentData._id;
            const parentRow = document.createElement("tr");
            parentRow.setAttribute("style", "cursor: pointer; background-color: #e6f7ff;");
            parentRow.innerHTML = `
                <td>${parentData.parent_part}</td>
                <td>${parentData.name}</td>
            `;
            parentRow.addEventListener("click", function () {
                const childRows = document.querySelectorAll(`.child-of-${parentId}`);
                childRows.forEach(row => {
                    row.style.display = row.style.display === "none" ? "table-row" : "none";
                });
            });

            tbody.appendChild(parentRow);

            parentData.children.forEach(child => {
                const childRow = document.createElement("tr");
                childRow.classList.add(`child-of-${parentId}`);
                childRow.style.display = "none";
                childRow.style.backgroundColor = "#f9f9f9";
                childRow.innerHTML = `
                    <td>${child.part}</td>
                    <td>${child.name}</td>
                `;
                tbody.appendChild(childRow);
            });
        }
    };

    widget.addEvent("onLoad", page1.onLoad);
});
