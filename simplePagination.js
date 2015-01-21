(function() {
  "use strict";

  var paginationModule = angular.module('simplePagination', []);

  paginationModule.factory('Pagination', function() {

    var pagination = {};

    pagination.getNew = function(perPage, nItems, nMaxPages) {

      perPage = perPage === undefined ? 5 : perPage;

      var paginator = {
        numPages: 1,
        perPage: perPage,
        page: 0
      };

      paginator.setNumPages = function(perPage, nItems, nMaxPages) {
        var perPage = perPage || paginator.perPage
        var numPages = Math.ceil(nItems/perPage)

        if (nMaxPages && numPages > nMaxPages) {
          numPages = nMaxPages
          perPage = Math.ceil(nItems / nMaxPages)
        }

        paginator.perPage = perPage
        paginator.numPages = numPages
      }

      if (nItems)
        paginator.setNumPages(perPage, nItems, nMaxPages);

      paginator.showAll = function(nItems) {
        paginator.page = 0
        paginator.numPages = 0
        paginator.perPage = nItems
      }

      paginator.prevPage = function() {
        if (paginator.page > 0) {
          paginator.page -= 1;
        }
      };

      paginator.nextPage = function() {
        if (paginator.page < paginator.numPages - 1) {
          paginator.page += 1;
        }
      };

      paginator.toPageId = function(id) {
        if (id >= 0 && id <= paginator.numPages - 1) {
          paginator.page = id;
        }
      };

      return paginator;
    };

    return pagination;
  });

  paginationModule.filter('startFrom', function() {
    return function(input, start) {
      if (input === undefined) {
        return input;
      } else {
        return input.slice(+start);
      }
    };
  });

  paginationModule.filter('range', function() {
    return function(input, total) {
      total = parseInt(total);
      for (var i = 0; i < total; i++) {
        input.push(i);
      }
      return input;
    };
  });

})();
