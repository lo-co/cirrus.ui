(function () {
    angular.module('cirrus.ui.string', [])
        .directive('cuiString', [function () {

            return {
                restric: 'E',
                require: "ngModel",
                transclude: true,
                scope: {
                    width: '=?',
                    evntFunc: '&?'
                },
                template: '<div class="input-group istring">' +
                    '<span class="input-group-addon" ng-transclude></span>' +
                    '<input type="text" class="form-control" ng-model="data">' +
                    '</div>',
                link: function (scope, e, attrs, ngm) {

                    // Reference to the input element...
                    var inputElem = e.find('input');
                    var sElem = e.find('.input-group-addon');

                    if (scope.width === undefined) {
                        scope.width = 40;
                    }

                    console.log(inputElem);

                    // Set the width of the .input-group-addon
                    sElem.css("width", scope.width + "px");
                    
                    // Attach the event function provided to a blur event 
                    inputElem.on('blur', function (event) {
                        if (scope.evntFunc !== undefined) {
                            console.log("event fired with function");
                            scope.evntFunc();
                        } else {
                            console.log('event fired with no function');
                        }
                    });

                    /* Set the look based on whether the user specifies if the 
                     * element is readonly.
                     */
                    if (attrs.readonly !== undefined) {
                        // Set the attribute on the input element.
                        inputElem[0].setAttribute("readonly", "");
                        inputElem.find('input').css("background-color", "#777");
                        inputElem.find('input').css("color", "white");
                    } else {
                        inputElem.find('input').css("background-color", "whitesmoke");
                        inputElem.find('input').css("color", "#777");
                    }

                    // Handle how the model value is displayed
                    ngm.$formatters.push(function (mv) {
                        return mv;
                    });

                    ngm.$render = function () {
                        scope.data = ngm.$viewValue;
                    };

                    /* Watch for changes in the view */
                    scope.$watch('data', function () {
                        ngm.$setViewValue(scope.data);
                    });

                }
            }
            }]);

})();