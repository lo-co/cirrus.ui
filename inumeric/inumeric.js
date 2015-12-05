(function () {
    angular.module('cirrus.ui.inumeric', [])
        .directive('cuiNumeric', [function () {

            return {
                restric: 'E',
                require: "ngModel",
                transclude: true,
                scope: {
                    width: '=?'
                },
                transclude: true,
                template: '<div class="input-group" style="margin-top:2px; ">' +
                    '<span class="input-group-addon" ng-transclude style = "border-color:whitesmoke;width:40px"></span>' +
                    '<input class="form-control"  style = "padding-left:5px;border-color:whitesmoke; background-color:#777; color:white"  ng-model="data">' +
                    '</div>',
                link: function (scope, e, attrs, ngm) {
                    var iVal = e.find('input')[0];
                    console.log(attrs);
                    console.log((attrs.readonly === undefined))
                    console.log(iVal)

                    if (attrs.readonly !== undefined) {
                        iVal.setAttribute("readonly", "");
                    }
                    
                    ngm.$formatters.push(function(mv){
                        var disp = "";
                        mv = parseFloat(mv || 0);
                        
                        if (mv !==0 && (mv < 0.01 || mv >= 10000)) {
                                disp = mv.toExponential(2);
                            } else {
                                disp = mv.toFixed(2);
                            }
                        
                        return disp;
                        
                        
                    });
                    
                    ngm.$render = function(){
                        scope.data = ngm.$viewValue;
                    }

                }
            }
    }]);

})();