(function () {
    angular.module('cirrus.ui.ibutton', [])
        /* .config('$routeProvider', function($routeProvider){
             $routeProvider.when('/ibutton')
         })*/
        .directive('cuiIbutton', [function () {

            var cStyle = '{"background-color":iVal? "green":"red"}';

            var template = '<button class="btn btn-block btn-default btn-sm" ng-style="" style="border-style:groove;padding-top:0px;padding-bottom:0px; padding-left:0px; padding-right: 0px;border-radius: 5px;background-color:#777; color:white; border-color:darkgrey;border-width:2px;font-weight: 500;text-transform:uppercase; text-align:left; font-size:100%;">' +
                '<div style="float:left;height:100%; margin-left:5px;"><span class="badge" style="border-style:inset;height:1em; width:1em;border-color: grey;border-width: 1px; border-radius:0px; top:5px; float:left; margin-right:5px;padding-right: 0px;clear:both; display:inline-block" ></span></div> <div style="padding-top:0px;padding-bottom:0px;padding-left: 5px;display:inline-block;border-left:2px groove darkgrey;width:auto; margin:0;' +
                'color: ghostwhite"  ng-transclude></div>' +
                '</button>';

            /* Link function used in the DDO returned below...*/
            var link = function (scope, e, attrs) {

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
                    evntFunc: '&?'
                },
                template: template,
                link: link
            }
    }]);

})();