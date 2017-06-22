import SearchSelectDirective from './searchSelect.directive';
require("./searchSelect.less");

angular.module('search-select', [])
.directive('searchSelect', ()=> new SearchSelectDirective())
