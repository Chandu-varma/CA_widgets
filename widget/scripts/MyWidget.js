define("DS/CA_widgets/scripts/MyWidget", [], function (
) {
    'use strict';

    var myWidget = {

        onLoadWidget: function () {
            // Creating HTML content with form-like structure
            widget.body.innerHTML = "hiii this is js "

            // "<div class='main-Container' id='mainContainer' style='width: 100%; height: 100%; text-align: center; background-color:#005685; color: #ffffff; padding: 40px'>" +
            // "<h1>Drag and Drop Data</h1>" +
            // "<div id='responseForm' style=' margin-top: 20px; background-color:#ffffff; color:#333; padding: 70px; border-radius: 24px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); width: 80%; max-width: 1070px; margin: 0 auto; display: none;'>" +
            // "<h2 style='color:rgb(124, 133, 0);'>Response Data</h2>" +
            // "<div id='responseContent'></div>" +
            // "<button id='returnBtn' style='margin-top: 20px; padding: 10px 20px; background-color: #005685; color: #fff; border: none; border-radius: 5px; cursor: pointer;'>Return to Drop Area</button>" +
            // "</div>" +
            // "</div>";

            var aa = widget.getValue("AA");
            var ab = widget.getValue("BB");
            var ac = widget.getValue("CC");


            console.log(aa, ab, ac);



        },
    };
    return myWidget;
    // myWidget.addEvent("onLoad", myWidget.onLoadWidget);
});
