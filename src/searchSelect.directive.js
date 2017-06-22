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
      controller: SearchSelectController,
      controllerAs: 'ssCtrl',
      bindToController: true,
      template: `
        <div class="search-select">
            <div class="search-select-head">

              <span class="search-select-label">{{ssCtrl.label}}</span>
              <input ng-click="ssCtrl.showBody($event)" ng-change="ssCtrl.filterOpt(ssCtrl.selectOption.name)" type="text" class="search-select-input" aria-describedby="basic-addon3" title="{{ssCtrl.selectOption.name}}" ng-model="ssCtrl.selectOption.name">
              <span class="u-icon-arr" ng-click="ssCtrl.showList = !ssCtrl.showList" ng-class="{'u-icon-arrU': ssCtrl.showList, 'u-icon-arrD': !ssCtrl.showList}"></span>
            </div>

            <div class="search-select-body" ng-show="ssCtrl.showList">
              <div class="search-select-list">
                <div ng-show="!opt.hide" ng-class="{'on': ssCtrl.selectOption && ssCtrl.selectOption.id == opt.id}" ng-repeat="opt in ssCtrl.options" ng-click="ssCtrl.handleClick(opt)">{{opt.name}}</div>
              </div>
              <div ng-if="!!ssCtrl.showBottom" ng-click="ssCtrl.bottomClick()" class="search-select-bottom"><a href="javascript:void(0)"><i class="glyphicon glyphicon-plus greenfont"></i> {{ssCtrl.showBottom}}</a></div>
            </div>

        </div>
      `
    };

    return directive;

    function linkFunc(scope, el, attr) {

      el.on('click', function(event) {
        event.stopPropagation();
      })
      $(document).on('click', function() {
        scope.ssCtrl.showList = false;
        scope.ssCtrl.selectOption = angular.copy(scope.ssCtrl.selectOptionBak);
        scope.ssCtrl.filterOpt('');
        scope.$apply();
      })
    }

  }
}

class SearchSelectController {
  constructor($http, $scope) {
    'ngInject';
    $scope.$watch(angular.bind(this, (val) => {
      return this.options;
    }), (newVal) => {
      if (newVal && newVal.length > 0) {

        // 当前没有选中项
        if (!this.selectOption) {
          this.select(newVal[0]);
        } else {
          let idx = this.getIndex(newVal, this.selectOption);
          if (this.selectOption && idx > -1) {
            this.select(newVal[idx]);
          } else {
            this.select(newVal[0]);
          }
        }
      }
    });

  }

  getIndex(list, opt) {
    for (let i=0; i<list.length; i++) {
      if (list[i].id === opt.id) {
        return i;
      }
    }
    return -1;
  }

  filterOpt(name) {
    if (this.options) {
      for (let i=0; i<this.options.length; i++) {
        this.setOptHide(this.options[i], name);
      }
    }
  }

  setOptHide(opt, name) {
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

  select(opt) {
    this.selectOption = angular.copy(opt);
    this.selectOptionBak = angular.copy(opt);
  }

  handleClick(opt) {
    this.showList = false;
    this.select(opt);
    this.filterOpt('');
    this.onSelect({opt: this.selectOption});
  }

  showBody(event) {
    this.showList = true;
    event.target.select();
  }

  bottomClick() {
    this.handleBottomClick();
  }

}

export default chinaTownDirective;
