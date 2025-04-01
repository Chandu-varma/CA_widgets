require("DS/widget/scripts/MyWidget", ['DS/DataDragAndDrop/DataDragAndDrop'],
    function (DataDragAndDrop) {
        'use strict';

        var myWidget = {

            onLoad: function () {
                var html = "<table >" + "<tr>" +
                    "<td><label class='myLblType' >Drop in the editor:</label> </td>" +
                    "<td><input class='myInputType' type='text' size='60' /></td>" +
                    "</tr>" + "<tr>" +
                    "<td><label class='myLblType' >Drop Status:</label> </td>" +
                    "<td><input class='myStatusDrop' type='text' /></td>" +
                    "</tr>" + "</table>";

                widget.body.innerHTML = html;

                var theInput = widget.body.querySelector('.myInputType');
                var theStatus = widget.body.querySelector('.myStatusDrop');

                DataDragAndDrop.droppable(theInput, {
                    drop: function (data) {
                        theInput.value = data;
                        theStatus.value = 'drop';
                    },
                    enter: function () {
                        theStatus.value = 'enter';
                    },
                    over: function () {
                        theStatus.value = 'over';
                    },
                    leave: function () {
                        theStatus.value = 'leave';
                    }
                });
            }
        };

        widget.addEvent('onLoad', myWidget.onLoad);
    });