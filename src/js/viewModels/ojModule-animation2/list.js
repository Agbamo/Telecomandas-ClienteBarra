


define(['ojs/ojcore', 'knockout', 'jquery', 'elegirCategoria','appController','ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],


function(oj, ko, $,elegirCategoria,appData)
{     

    

    var data = [{id: 0, name: categorias[0].nombre, date: 'Apr 2', content: categorias[0]._id},
                {id: 1, name: categorias[1].nombre, date: 'Apr 3', content:categorias[1]._id},
                {id: 2, name: categorias[2].nombre, date: 'Apr 4', content:categorias[2]._id},
                {id: 3, name: categorias[3].nombre, date: 'Apr 5', content:categorias[3]._id},
                {id: 4, name: categorias[4].nombre, date: 'Apr 6', content:categorias[4]._id},
                {id: 5, name: categorias[5].nombre, date: 'Apr 7', content:categorias[5]._id}             
               ]
    
    var viewModel = function(moduleParams)
    {
        this.dataSource = new oj.ArrayTableDataSource(data, {idAttribute: "id"});
        
        this.gotoContent = function(event) {
            if (event.detail.value != null)
            {   
                
                
                var row = data[event.detail.value];
                ObtenerID(row.id);
                moduleParams.content(row.content);
                moduleParams.currentModule("content");                
            }
        };
    }

    return viewModel;
});	
