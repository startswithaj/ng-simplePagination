# ng-simplePagination

**Previously known as "angular-SimplePagination"**; is an AngularJS module for simple pagination on static data. No directives here, just a service and some helpful filters.

Mostly based on various snippets which I found on JSFiddle, with some changes by me.

## Quick start

```
bower install ng-simplePagination
```
or alternatively download and include `simplePagination.js` after `angular.min.js`.

Add the `simplePagination` module as a dependency when creating your app, e.g.

```
var app = angular.module('myApp', ['simplePagination']);`
```

Inject the `Pagination` service to the controller containing the data which you want to paginate, and set it on the $scope:

```
app.controller('MyCtrl', ['$scope', 'Pagination',
function($scope, Pagination) {
  $scope.pagination = Pagination.getNew();
}]);
```

This defaults to 5 items per page. You can pass an optional parameter with the number of items you want per page:

```
$scope.pagination = Pagination.getNew(10);
```
You can also pass in the number of items you will be displaying and it will calculate and set the number of pages. Here's an example with a pre-defined `$scope.posts` array for a blog application:
```
$scope.pagination = Pagination.getNew(10, $scope.posts.length);
```
If you want to limit the number of pages you can pass in a max number of pages parameter. This will use your specified perPage number unless it cannot fit all the items within your specified max number of pages.

```
$scope.pagination = Pagination.getNew(10, $scope.posts.length, 3);
```
In the above example if $scope.posts.length is equal to 36. The number per page will be 12, so they all fit on 3 pages. If $scope.posts.length is 20 there will be 2 pages of 10.

To calculate and set the number of pages manually depending on your data.

```
$scope.pagination.numPages = Math.ceil($scope.posts.length/$scope.pagination.perPage);
```

To automatically set the number of pages
```
$scope.pagination.setNumPages(perPage, nItems, nMaxPages);
$scope.pagination.setNumPages(10, $scope.posts.length);
$scope.pagination.setNumPages(10, $scope.posts.length, 15);
```

Replace `$scope.posts` with whatever data you have initialised.

## Rendering

There is a custom filter called `startFrom` to help you rendering items per page.

```
<div ng-repeat="post in posts | startFrom: pagination.page * pagination.perPage | limitTo: pagination.perPage">
	<!-- stuff -->
</div>
```

Again, replace `post in posts` with your data.

### Previous / Next page buttons
```
<button ng-click="pagination.prevPage()">Previous</button>
<button ng-click="pagination.nextPage()">Next</button>
```
Optionally you can add some logic to hide/disable the buttons using the `pagination.page` and `pagination.numPages` attributes; here's an example:

```
ng-hide="pagination.page == 0" ng-click="pagination.prevPage()"
ng-hide="pagination.page + 1 >= pagination.numPages" ng-click="pagination.nextPage()"
```

### Page numbers
Using another built-in filter called `range`:
```
<ul class="pagination">
<li><a href="" ng-click="pagination.prevPage()">&laquo;</a></li>
  <li ng-repeat="n in [] | range: pagination.numPages" ng-class="{active: n == pagination.page}">
  <a href="" ng-click="pagination.toPageId(n)">{{n + 1}}</a>
  </li>
  <li><a href="" ng-click="pagination.nextPage()">&raquo;</a></li>
</ul>
```

### Show all
Sometimes a user may want to see the entire list unpaginated. Paginator has a function that will remove pagination showAll(). Pagination can be reinstated by called setNumPages again with the required params.
```
<li><a href="" ng-click="pagination.showAll()">Show All</a></li>
<li><a href="" ng-click="pagination.setNumPages(10, posts.length)">Show paginated</a></li>
```

If you use, bootstrap.css, Above given list HTML coding give good appearance. Note that the first page is actually __0__ hence the {{n + 1}}.

## Contributions

Any pull requests are more than welcome. Please make your changes in your own branch, make sure the current specs in `simplePagination.spec.js` are passing (Jasmine/Karma) and update/add tests if necessary.

For problems/suggestions please create an issue on Github.

## Contributors

* [@svileng](https://twitter.com/svileng)

## Credits

* AngularJS range filter: [http://www.yearofmoo.com/](http://www.yearofmoo.com/2012/10/more-angularjs-magic-to-supercharge-your-webapp.html#more-about-loops)
* AngularJS pagination: [http://jsfiddle.net/2ZzZB/56/](http://jsfiddle.net/2ZzZB/56/)
* Other uknown JSFiddles
