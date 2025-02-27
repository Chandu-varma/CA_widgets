define("DS/CA_widgets/widget/scripts/MyWidget", [], function (
) {
    'use strict';

    var myWidget = {

        onLoadWidget: function () {
            // Creating HTML content with form-like structure
            widget.body.innerHTML = "hiii this is js";
        },
    };
    //return myWidget;
    myWidget.addEvent("onLoad", myWidget.onLoadWidget);
});
