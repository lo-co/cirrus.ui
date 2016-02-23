(function () {
    angular.module('cirrus.ui.inumeric', [])
        .directive('cuiNumeric', [function () {

            return {
                restrict: 'E',
                require: "ngModel",
                transclude: true,
                scope: {
                    width: '=?',
                    dtype: '=?',
                    evntFunc: '&?'
                },
                template: '<div class="input-group inumeric">' +
                    '<span class="input-group-addon" ng-transclude></span>' +
                    '<input class="form-control"  ng-model="data">' +
                    '</div>',
                link: function (scope, e, attrs, ngm) {

                    // Reference to the input element...
                    var iVal = e.find('input');
                    var sElem = e.find('.input-group-addon');
                    
                    sElem.css("width", scope.width + "px");

                    console.log(scope.dtype);
                    /* Type can be float or an integer. The default is float. */
                    if (scope.dtype === undefined) {
                        scope.dtype = "float";
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

                        if (scope.dtype === "float") { // Handle floats

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
                            }else {
                                disp = mv.toFixed(0);
                            }

                        }

                        return disp;

                    });

                    /* Update the view value */
                    ngm.$render = function () {
                        scope.data = ngm.$viewValue;
                    };

                    /* Watch for changes in the view */
                    iVal.on('blur', function () {
                        var num = 0;
                        if (scope.dtype = "float") {
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