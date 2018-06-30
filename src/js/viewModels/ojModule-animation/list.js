define(['ojs/ojcore', 'knockout', 'jquery', 'appController','ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
function(oj, ko, $,appData)
{   
   
    getMesas();
    
    
    var data = 
    [{id: mesas[0].id, name: 'Mesa 1', date: mesas[0].estado, content: 'Metwo, Furball, Puss'},
                {id: mesas[1].id, name: 'Mesa 2', date: mesas[1].estado, content: 'Ad one more'},
                {id: mesas[2].id, name: 'Mesa 3', date: mesas[2].estado, content: 'Fied, Shake & Bake, Sautee'},
                {id: mesas[3].id, name: 'Mesa 4', date: mesas[3].estado, content: 'Bdroom to kitchen and back'},
                {id: mesas[4].id, name: 'Mesa 5', date: mesas[4].estado, content: 'Mlk, bread, meat, veggie, can, etc.'},
                {id: mesas[5].id, name: 'Mesa 6', date: mesas[5].estado, content: 'ñ'},
                {id: mesas[6].id, name: 'Mesa 7', date: mesas[6].estado, content: 'BD'},
                {id: mesas[7].id, name: 'Mesa 8', date: mesas[7].estado, content: 'ñilk, bread, meat, veggie, can, etc.'},
                {id: mesas[8].id, name: 'Mesa 9', date: mesas[8].estado, content: 'ñ'},
                {id: mesas[9].id, name: 'Mesa 10', date: mesas[9].estado, content: 'l'},
               ];
    
    var viewModel = function(moduleParams)
    {
        this.dataSource = new oj.ArrayTableDataSource(data, {idAttribute: "id"});

        this.gotoContent = function(event) {
            if (event.detail.value != null)
            {   
               var row = data[event.detail.value];
                moduleParams.content(row.content);
                moduleParams.currentModule("content");                
            }
        };
    }

    return viewModel;
});	
