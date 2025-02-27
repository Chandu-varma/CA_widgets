define("DS/widget/scripts/TableWidget", [], function () {
    'use strict';

    var tableModule = {
        generateTable: function () {
            let tableContainer = document.getElementById('tableContainer');
            if (!tableContainer) {
                console.error("Table container not found.");
                return;
            }

            // Creating table element
            let table = document.createElement('table');
            table.style.width = '80%';
            table.style.margin = '20px auto';
            table.style.borderCollapse = 'collapse';
            table.style.border = '1px solid #ddd';

            // Table Header
            let thead = document.createElement('thead');
            thead.innerHTML = `
                <tr style="background-color: #005685; color: white; text-align: left;">
                    <th style="padding: 10px; border: 1px solid white;">ID</th>
                    <th style="padding: 10px; border: 1px solid white;">Name</th>
                    <th style="padding: 10px; border: 1px solid white;">Position</th>
                    <th style="padding: 10px; border: 1px solid white;">Salary</th>
                </tr>`;
            table.appendChild(thead);

            // Table Body
            let tbody = document.createElement('tbody');
            let employees = [
                { id: 101, name: "Alice Johnson", position: "Software Engineer", salary: "$80,000" },
                { id: 102, name: "Bob Smith", position: "Project Manager", salary: "$95,000" },
                { id: 103, name: "Charlie Brown", position: "UI/UX Designer", salary: "$70,000" },
                { id: 104, name: "David Lee", position: "Data Analyst", salary: "$75,000" }
            ];

            employees.forEach(emp => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding: 10px; border: 1px solid #ddd;">${emp.id}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${emp.name}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${emp.position}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${emp.salary}</td>
                `;
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            tableContainer.innerHTML = ""; // Clear previous content
            tableContainer.appendChild(table);
        }
    };

    return tableModule;
});
