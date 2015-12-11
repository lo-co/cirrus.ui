(function () {
    'use strict'
    /**
     * @ngdoc overview
     * @name cirrus.ui.ibutton
     * @description
     * Provides a common UI element for a button.  The button may contain an indicator for
     * the current state of the variable associated with the button.
     */
    angular.module('cirrus.ui.ibutton', [])
        .directive('cuiButton', [function () {
            /**
             * @ngdoc directive
             * @name cirrus.ui.ibutton.directive:cuiButton
             * @scope
             * @restrict E
             * @param {number=} width Optional value specifying the width of the span containing the 
             * indicator in pixels. Default value is 40.
             * @param {function=} evntFunc Optional function to fire when the button is pressed.
             * @param {boolean=} info Optional boolean that determines whether indicator is for informational
             * purposes only or if the indicator is an error.  If the value is false, then the indicator
             * lit will suggest an error condition and will be red; otherwise, it will be a forest green.
             * The default is ``true`` (info only).
             * @param {boolean=} indicate Optional boolean determining whether the button is for 
             * indicating purposes only.  Default is false.
             *
             * @description
             * This directive provides the DOM definition for a button that 1) has a consistent
             * look-and-feel and 2) provides feedback regarding the current state of the variable.
             * The event function should some how tie into a current value table while a data table 
             * should be used to populate the indicator.
             * 
             */

            var ntemplate = '<div class="input-group" style="margin-top:2px; border-width:0px;width:100%">' +
                '<span class="input-group-addon" style = "width:16px;border-width:1px;padding:2px 3px 0px 3px; border:1px solid whitesmoke;"><span class="badge" style="border:1px inset grey;height:12px; width:12px;padding:0px;border-width: 1px; border-radius:0px; clear:both;display:inline-block" ></span></span>' +
                '<button class="btn btn-block btn-default btn-sm" style="margin-left:0;padding:0px 5px;background-color:#777; color:white; text-transform:uppercase;border-radius:0px 5px 5px 0px;border-style:solid; border-color: whitesmoke;border-width:1px;" ng-transclude></button>' +
                '</div>';

            /* Link function used in the DDO returned below...*/
            var link = function (scope, e, attrs) {

                if (scope.indicate === undefined) {
                    scope.indicate = false;
                }

                var b = e.find('button');

                // If the field ``info`` is undefined, default the indicator to an info state.
                if (scope.info === undefined) {
                    scope.info = true;
                }

                // The span contains the badge - this is what we will apply our background color to
                var badge = e.find('span.badge');

                // Update the indicator state when the value changes
                scope.$watch('ival', function () {
                    var color = scope.info ? 'forestgreen' : 'red';
                    if (scope.ival) {
                        badge.css('background-color', 'yellowgreen');
                    } else {
                        badge.css('background-color', color);
                    }

                });

                // Listen for clicks - if no function is attached, do nothing
                if (scope.evntFunc !== undefined) {
                    e.on('click', function () {
                        scope.evntFunc();
                    });
                }

            }
            return {
                restric: 'E',
                transclude: true,
                scope: {
                    ival: '=',
                    width: '=?',
                    info: '=?',
                    evntFunc: '&?',
                    indicate: '=?'
                },
                template: ntemplate,
                link: link
            }
    }]);

})();