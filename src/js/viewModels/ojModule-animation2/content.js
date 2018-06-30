

var aaa;
define(['ojs/ojcore', 'knockout', 'jquery','appController','ojs/ojarraydataprovider', 'ojs/ojlistview','ojs/ojknockout', 'ojs/ojbutton'],
  function (oj, ko, $,appData) {

 
    
 
    var viewModel = function(moduleParams)
    {
      var self = this;
      var aux='';
      this.content= moduleParams.content;
      self.currentItem = ko.observable();
     getPlatosDeCategoria(iden);
    

      var users = ko.observableArray(platosDeCategoria);
     
     


     

      self.ArrayDataProvider = new oj.ArrayDataProvider(users, { idAttribute: 'idCategoria'});

      self.mostrarNombre = function(data)
        {
            //var itemId = "fruit"+event.detail.value.substring(3);
            // Access current item via ui.it
           
           aux=aux+" "+data.nombre;
            self.currentItem(aux);

        }

        

        this.gotoList = function(event) {
            moduleParams.currentModule(moduleParams.currentList);            
        };
        self.button2Text = "Button 2";

    
    self.clickedButton = ko.observable("");
    self.buttonClick = function(event){

      document.write('kkk');
        self.clickedButton(event.currentTarget.id);
        return true;
    }
    }
    return viewModel;

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
   // return user;
  }
);




var platosDeCategoria;
var plats;
function PlatosDeCat(idCategoria, idPlato, nombre) {
   
  this.idCategoria=idCategoria;
  this.idPlato=idPlato;
  this.nombre=nombre;
  this.unidades=0;


}

function getPlatosDeCategoria(hola) {
 
 var idCategoria=hola;//"5a82dbb5e65d08b3be7fda78";
  var request=new XMLHttpRequest();
  request.open("post", "http://localhost:8080/Comandas/getPlatosDeCategoria.jsp",false);
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      //response.addHeader("Access-Control-Allow-Origin", "*");
  request.onreadystatechange = function() {
    if (request.readyState==4 && request.status==200) {
      var respuesta=JSON.parse(request.responseText);
      var platos=respuesta;
      platosDeCategoria=[];
      var aux;
      for (var i=0; i<platos.length; i++) {
      aux=platos[i];
                  plats=new PlatosDeCat(aux.idCategoria,aux.idPlato,aux.nombre);
                  platosDeCategoria.push(plats);
      
      }
      
    }
  };	
  var p = {
    idCategoria : idCategoria
  };
  request.send("p=" + JSON.stringify(p));
}
