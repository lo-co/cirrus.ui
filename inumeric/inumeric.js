(function () {
    angular.module('cirrus.ui.inumeric', [])
        .directive('cuiNumeric', [function () {

            return {
                restric: 'E',
                require: "ngModel",
                transclude: true,
                scope: {
                    width: '=?',
                    type: '=?',
                    evntFunc: '&?'
                },
                transclude: true,
                template: '<div class="input-group" style="margin-top:2px; border-width:0px;">' +
                    '<span class="input-group-addon" style = "border-width:1px;width:40px"><ng-transclude></ng-transclude></span>' +
                    '<input class="form-control"  style="padding-left:5px;"  ng-model="data">' +
                    '</div>',
                link: function (scope, e, attrs, ngm) {

                    // Reference to the input element...
                    var iVal = e.find('input');

                    /* Type can be float or an integer. The default is float. */
                    if (scope.type === undefined) {
                        scope.type = "float";
                    }

                    /* Set the look based on whether the user specifies if the 
                     * element is readonly.
                     */
                    if (attrs.readonly !== undefined) {
                        // Set the attribute on the input element.
                        iVal[0].setAttribute("readonly", "");
                        iVal.find('input').css("background-color", "#777");
                        iVal.find('input').css("color", "white");
                    } else {
                        iVal.find('input').css("background-color", "whitesmoke");
                        iVal.find('input').css("color", "#777");
                    }

                    // Handle how the model value is displayed
                    ngm.$formatters.push(function (mv) {

                        var disp = "";

                        if (scope.type === "float") { // Handle floats

                            mv = parseFloat(mv || 0);

                            /* If the value is a float, display it to two significant
                             * digits.  If the values are between 0.01 and 10,000 (or if the value is 0), just 
                             * display what is there.  Otherwise, use an exponential output.
                             */
                            if (mv !== 0 && (mv < 0.01 || mv >= 10000)) {
                                disp = mv.toExponential(2);
                            } else {
                                disp = mv.toFixed(2);
                            }
                        } else { // Handle integers

                            mv = parseInt(mv || 0);

                            if (mv !== 0 && abs(mv) > 10000) {
                                disp = mv.toExponential(2);
                            }

                        }

                        return disp;

                    });

                    /* Update the view value */
                    ngm.$render = function () {
                        scope.data = ngm.$viewValue;
                    }

                    /* Watch for changes in the view */
                    scope.$watch('data', function () {
                        var num = 0;
                        if (scope.type = "float") {
                            num = parseFloat(scope.data);
                        } else {
                            num = parseInt(scope.data);
                        }
                        ngm.$setViewValue(num);
                        if (scope.evntFunc !== undefined) {
                            scope.evntFunc();
                        }
                    });

                }
            }
    }]);

})();