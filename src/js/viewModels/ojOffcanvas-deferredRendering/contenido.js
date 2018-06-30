define(['knockout', 'jquery', 'ojs/ojcore', 'ojs/ojknockout', 'promise', 'ojs/ojnavigationlist', 'ojs/ojarraytabledatasource'],
function(ko, $)
{
  var viewModel = function()
  {
    this.generateData = function(count)
    {
      var data, i;
      data = [];
      for (i = 0; i < count; i++) 
      {
        data.push({'id': i, 'name': "Item " + (i + 1)});
      }
      return data;
    };
    this.dataSource = ko.observable(new oj.ArrayTableDataSource(this.generateData(7), 
                                                                {idAttribute: 'id'}));
  }

  return viewModel;
});