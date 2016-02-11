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

            var ntemplate = '<div class="input-group button-div">' +
                '<span class="input-group-addon"><span class="badge" ></span></span>' +
                '<button class="btn btn-block btn-default btn-sm ibutton" ng-transclude></button>' +
                '</div>';

            /* Link function used in the DDO returned below...*/
            var link = function (scope, e) {

                
                /* This is an addon functionality so let's just make sure
                 * that the intended functionality is intact.
                 */
                if (scope.indicate === undefined) {
                    scope.indicate = true;
                }

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

            };
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