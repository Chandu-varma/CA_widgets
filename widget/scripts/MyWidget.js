define("DS/MyWidget/scripts/MyWidget", ['DS/DataDragAndDrop/DataDragAndDrop', 'DS/PlatformAPI/PlatformAPI', 'DS/WAFData/WAFData'], function (DataDragAndDrop, PlatformAPI, WAFData) {
    'use strict';

    var myWidget = {
        onLoad: function () {
            // Creating HTML content with form-like structure
            widget.body.innerHTML = "<div class='main-Container' id='mainContainer' style='width: 100%; height: 100%; text-align: center; background-color:#005685; color: #ffffff; padding: 40px'>" +
                "<h1>Drag and Drop Data</h1>" +
                "<div id='responseForm' style=' margin-top: 20px; background-color:#ffffff; color:#333; padding: 70px; border-radius: 24px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); width: 80%; max-width: 1070px; margin: 0 auto; display: none;'>" +
                "<h2 style='color: #005685;'>Response Data</h2>" +
                "<div id='responseContent'></div>" +
                "<button id='returnBtn' style='margin-top: 20px; padding: 10px 20px; background-color: #005685; color: #fff; border: none; border-radius: 5px; cursor: pointer;'>Return to Drop Area</button>" +
                "</div>" +
                "</div>";

            var theInput = document.querySelector('#mainContainer');
            DataDragAndDrop.droppable(theInput, {
                drop: function (data) {
                    theInput.value = data;
                    console.log(data);
                    var dataJSON = JSON.parse(data);
                    var objectId = dataJSON.data.items[0].objectId;
                    var objectType = dataJSON.data.items[0].objectType;
                    var securityContext = dataJSON.data.items[0].contextId;
                    console.log("type", objectType + objectId + securityContext);
                    // Call the web service
                    myWidget.callWebService(objectId, securityContext);
                },
            });

            // Handle return button click
            document.getElementById('returnBtn')?.addEventListener('click', function () {
                myWidget.resetUI();
            });
        },

        callWebService: function (objectId, securityContext) {
            let spaceUrl = PlatformAPI.getApplicationConfiguration("app.urls.myapps");
            var resource = '/resources/v1/modeler/dseng/dseng:EngItem/' + objectId;

            // Using WAFData to make an authenticated request
            WAFData.authenticatedRequest(spaceUrl + resource, {
                method: "GET",
                headers: {
                    "SecurityContext": securityContext,
                    'Content-Type': 'application/json',
                },
                type: 'json',
                onComplete: function (rs) {
                    console.log("Response received", rs);
                    myWidget.displayResponseForm(rs); // Pass the response to display
                },
                onFailure: function (error) {
                    console.log("Error occurred", error);
                    // Handle error here (e.g., show an alert to the user)
                    alert('An error occurred while fetching the data.');
                }
            });
        },

        displayResponseForm: function (response) {
            var responseForm = document.querySelector('#responseForm');
            var responseContent = document.querySelector('#responseContent');

            // Clear previous content before adding new content
            responseContent.innerHTML = '';
            var inputs = responseForm.querySelectorAll('input, textarea, select');
            inputs.forEach(function (input) {
                input.value = '';  // Clear the input value
            });
            // Check if there is a valid response and the 'member' array is populated
            if (response && response.member && response.member.length > 0) {
                var item = response.member[0];

                // Define the CSS styles
                var style = `
                <style>
                    .table-container {
                        width: 103%;
                        max-height: 400px; /* Set maximum height for vertical scrolling */
                        overflow: auto;
                        border: 1px solid #ddd;
                        margin-top: 20px;
                    }
            
                    .response-table {
                        width: 100%;
                        min-width: 800px; /* Set a fixed minimum width for the table */
                        border-collapse: collapse;
                        font-family: Arial, sans-serif;
                    }
            
                    .response-table th,
                    .response-table td {
                        padding: 12px;
                        text-align: left;
                        border: 1px solid #ddd;
                    }
            
                    .response-table th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }
            
                    .response-table tr:nth-child(even) {
                        background-color:rgba(249, 249, 249, 0.66);
                    }
            
                    .response-table tr:hover {
                        background-color: #e9e9e9;
                    }
            
                    .response-table td {
                        word-wrap: break-word;
                    }
                    
                    .material-symbols-outlined {
                    font-variation-settings:
                    'FILL' 0,
                    'wght' 400,
                    'GRAD' 0,
                    'opsz' 24
                    }
                </style>
                `;

                // Create a table for displaying the data
                var tableHTML = "<table class='response-table'>";

                // Table headers
                tableHTML += "<thead><tr>";
                tableHTML += "<th> </th><th>Name</th><th>Title</th><th>Description</th><th>ID</th><th>Type</th><th>Modified</th><th>Created</th><th>Revision</th><th>State</th><th>Owner</th><th>Organization</th><th>Collaboration</th><th>Cestamp</th>";
                tableHTML += "</tr></thead>";

                // Table body with item data
                tableHTML += "<tbody><tr>";
                tableHTML += "<td><span class='material-symbols-outlined'></span></td>"; // Icon added here
                tableHTML += "<td>" + item.name + "</td>";
                tableHTML += "<td>" + item.title + "</td>";
                tableHTML += "<td>" + (item.description || 'No description available') + "</td>";
                tableHTML += "<td>" + item.id + "</td>";
                tableHTML += "<td>" + item.type + "</td>";
                tableHTML += "<td>" + item.modified + "</td>";
                tableHTML += "<td>" + item.created + "</td>";
                tableHTML += "<td>" + item.revision + "</td>";
                tableHTML += "<td>" + item.state + "</td>";
                tableHTML += "<td>" + item.owner + "</td>";
                tableHTML += "<td>" + item.organization + "</td>";
                tableHTML += "<td>" + item.collabspace + "</td>";
                tableHTML += "<td>" + item.cestamp + "</td>";
                tableHTML += "</tr></tbody>";

                // Close the table
                tableHTML += "</table>";

                // Insert the style and the table inside a container for scrolling
                responseContent.innerHTML = style + "<div class='table-container'>" + tableHTML + "</div>";
                responseForm.style.display = 'block';
                widget.body.style.backgroundColor = '#ffffff';
            } else {
                responseContent.innerHTML = "<div>No data available</div>";
            }

            // Optionally, add labels if available
            // if (response && response.nlsLabel) {
            //     responseContent.innerHTML += "<hr><h3>Field Labels:</h3>";
            //     for (var key in response.nlsLabel) {
            //         responseContent.innerHTML += "<div><strong>" + response.nlsLabel[key] + ":</strong> " + key + "</div>";
            //    }
            // }
        },

        resetUI: function () {

            var responseForm = document.querySelector('#responseForm');
            responseForm.style.display = 'none';
            widget.body.style.backgroundColor = '#005685';
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
