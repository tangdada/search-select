class chinaTownDirective {
  constructor() {
    'ngInject';

    let directive = {
      restrict: 'E',
      replace: true,
      scope: {
        onSelect: '&',
        handleBottomClick: '&',
        selectOption: '=',
        options: '=',
        showBottom: '=',
        label: '@'
      },
      link: linkFunc,
      template: `
        <div class="search-select">
            <div class="search-select-head">

              <span class="search-select-label">{{label}}</span>
              <input ng-click="showBody($event)" ng-change="filterOpt(selectOption.name)" type="text" class="search-select-input" aria-describedby="basic-addon3" title="{{selectOption.name}}" ng-model="selectOption.name">
              <span class="u-icon-arr" ng-click="showList = !showList" ng-class="{'u-icon-arrU': showList, 'u-icon-arrD': !showList}"></span>
            </div>

            <div class="search-select-body" ng-show="showList">
              <div class="search-select-list">
                <div ng-show="!opt.hide" ng-class="{'on': selectOption && selectOption.id == opt.id}" ng-repeat="opt in options" ng-click="handleClick(opt)">{{opt.name}}</div>
              </div>
              <div ng-if="!!showBottom" ng-click="bottomClick()" class="search-select-bottom"><a href="javascript:void(0)"><i class="glyphicon glyphicon-plus greenfont"></i> {{showBottom}}</a></div>
            </div>

        </div>
      `
    };

    return directive;

    function linkFunc(scope, el, attr) {
      scope.showBody = showBody;
      scope.filterOpt = filterOpt;
      scope.handleClick = handleClick;
      scope.bottomClick = bottomClick;

      el.on('click', function(event) {
        event.stopPropagation();
      })
      $(document).on('click', function() {
        scope.showList = false;
        scope.selectOption = angular.copy(scope.selectOptionBak);
        filterOpt('');
        scope.$apply();
      })

      scope.$watch('options', (newVal) => {
        if (newVal && newVal.length > 0) {

          // 当前没有选中项
          if (!scope.selectOption) {
            select(newVal[0]);
          } else {
            let idx = getIndex(newVal, scope.selectOption);
            if (scope.selectOption && idx > -1) {
              select(newVal[idx]);
            } else {
              select(newVal[0]);
            }
          }
        }
      })

      function getIndex(list, opt) {
        for (let i=0; i<list.length; i++) {
          if (list[i].id === opt.id) {
            return i;
          }
        }
        return -1;
      }

      function filterOpt(name) {
        if (scope.options) {
          for (let i=0; i<scope.options.length; i++) {
            setOptHide(scope.options[i], name);
          }
        }
      }

      function setOptHide(opt, name) {
        if (!opt) {
          return false;
        }
        if (name && name.length >0) {
          if (opt.name.indexOf(name) > -1) {
            opt.hide = false;
          } else {
            opt.hide = true;
          }
        } else {
          opt.hide = false;
        }
      }

      function select(opt) {
        scope.selectOption = angular.copy(opt);
        scope.selectOptionBak = angular.copy(opt);
      }

      function handleClick(opt) {
        scope.showList = false;
        select(opt);
        filterOpt('');
        scope.onSelect({opt: scope.selectOption});
      }

      function showBody(event) {
        scope.showList = true;
        event.target.select();
      }

      function bottomClick() {
        scope.handleBottomClick();
      }

    }

  }
}

export default chinaTownDirective;
