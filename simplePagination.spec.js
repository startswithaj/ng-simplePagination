'use strict';

describe('simplePagination', function() {

  var pagination;

  // load the app
  beforeEach(module('simplePagination'));

  // get service
  beforeEach(inject(function(Pagination) {
    pagination = Pagination.getNew();
  }));

  it('should paginate', function() {
    pagination.numPages = 2;

    expect(pagination.page).toBe(0);

    pagination.nextPage();
    expect(pagination.page).toBe(1);

    pagination.prevPage();
    expect(pagination.page).toBe(0);
  });

  it('should not paginate outside min and max page', function() {
    pagination.numPages = 2;

    pagination.page = 0;
    pagination.prevPage();
    expect(pagination.page).toBe(0);

    pagination.page = 1;
    pagination.nextPage();
    expect(pagination.page).toBe(1);
  });

  it('should jump to a given page id', function() {
    pagination.numPages = 3;

    expect(pagination.page).toBe(0);

    pagination.toPageId(2);
    expect(pagination.page).toBe(2);
  });

  it('contructor should take nItems param'), function() {
    pagination = Pagination.getNew(7, 22);
    expect(pagination.numPages).toBe(4);
    expect(pagination.perPage).toBe(7);
  }
  it('contructor should take nItems param & nMaxPages overides'), function() {
    pagination = Pagination.getNew(7, 22, 3);
    expect(pagination.numPages).toBe(3);
    expect(pagination.perPage).toBe(7);
  }
  it('contructor should take nItems param & nMaxPages ignored'), function() {
    pagination = Pagination.getNew(10, 20, 3);
    expect(pagination.numPages).toBe(2);
    expect(pagination.perPage).toBe(10);
  }

  it('should configure number of pages', function() {
    pagination.setNumPages(9, 22);
    expect(pagination.numPages).toBe(3);
    expect(pagination.perPage).toBe(9);
  });

  it('should configure perPage for max number of pages', function() {
    pagination.setNumPages(null, 22, 3);
    expect(pagination.numPages).toBe(3);
    expect(pagination.perPage).toBe(8);
  });

});
