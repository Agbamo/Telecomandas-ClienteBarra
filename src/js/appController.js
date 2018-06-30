/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout','ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas','ojs/ojbutton'],
  function(oj, ko) {
     function ControllerViewModel() {
       var self = this;
      
       self.selectedMenuItem = ko.observable("");
       
       this.menuItems = [
           {id: 'zoomin', label: 'Zoom In', icon: 'oj-fwk-icon oj-fwk-icon-arrow-n', disabled: false},
           {id: 'zoomout', label: 'Zoom Out', icon: 'demo-icon-font demo-bookmark-icon-16', disabled: false},
           {id: 'divider', label: '----', icon: '', disabled: false},
           {id: 'save', label: 'Save', icon: 'demo-icon-font demo-palette-icon-24', disabled: false},
           {id: 'print', label: 'Print...', icon: 'demo-icon-font demo-chat-icon-24', disabled: true}
       ];
   
       self.menuItemAction = function( event ) {
           self.selectedMenuItem(event.target.value);
       };
   
      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'dashboard': {label: 'Inicio', isDefault: true},
         'mesasSoloId': {label: 'Mesas', isDefault: true},
         'users': {label: 'Usuarios'},
         'elegirCategoria': {label: 'Categorias'},
         'realComand': {label: 'Realizar comanda'}
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Navigation setup
      var navData = [
      {name: 'Inicio', id: 'dashboard',
        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      {name: 'Mesas', id: 'mesasSoloId',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
       {name: 'Categorias', id: 'elegirCategoria',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
      {name: 'Usuarios', id: 'users',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
       {name: 'Realizar comanda', id: 'realComand',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'},
       
     
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

           
    }

    

    

     return new ControllerViewModel();
  
  
    }
);

var mesas;

function Mesa(id, estado) {
  this.id=id;
  this.estado=estado;
  this.platos=[];
}

function getMesas() {
  var request=new XMLHttpRequest();
  request.open("get", "http://localhost:8080/Comandas/getMesas.jsp",false);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.onreadystatechange = function() {
    if (request.readyState==4 && request.status==200) {
      var respuesta=JSON.parse(request.responseText);
      mesas=[];
     
      for (var i=0; i<respuesta.length; i++) {
        var mesa=new Mesa(respuesta[i]._id, respuesta[i].estado);
        
        mesas.push(mesa);

        if (mesa.estado=="Libre") 
       {// btnCambiarEstado.innerHTML="Abrir";
      }else {
       // btnCambiarEstado.innerHTML="Cerrar";
       // var btnSeleccionarMesa=document.createElement("button"); td.appendChild(btnSeleccionarMesa); td.appendChild(document.createElement("br"));
        //btnSeleccionarMesa.innerHTML="Seleccionar";
        //btnSeleccionarMesa.setAttribute("onclick", "seleccionar(" + mesa._id + ")");
    
      }
      
      }
      
    }
  };	
  
        
        //cambiarEstado(2,"Libre");
        //cambiarEstado
        
  request.send();
}


var categorias;
function Categoria(_id,nombre) {
  this._id=_id
  this.nombre=nombre;
}

function getCategorias() {
  
  var request=new XMLHttpRequest();
  request.open("post", "http://localhost:8080/Comandas/getCategorias.jsp",false);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.onreadystatechange = function() {
    if (request.readyState==4 && request.status==200) {
      var respuesta=JSON.parse(request.responseText);
      categorias=[];
      
      for (var i=0; i<respuesta.length; i++) {
       var aux=respuesta[i];
     
        var categoria=new Categoria(_id=aux._id,aux.nombre);
        categorias.push(categoria);
      }
    }
  };	
  request.send();
}




var platosDeCategoria;
var plats;
function PlatosDeCat(idCategoria, idPlato, nombre) {
   
  this.idCategoria=idCategoria;
  this.idPlato=idPlato;
  this.nombre=nombre;
  this.unidades=0;


}
var iden='';
function ObtenerID(id){
  if(id==0){
    iden='5a82dbb5e65d08b3be7fda59';
  }
  if(id==1){
    iden='5a82dbb5e65d08b3be7fda78';
  }
  if(id==2){
iden='5a82dbb5e65d08b3be7fda55';
  } 

  if(id==3){
iden='5a82dbb5e65d08b3be7fda7d';
  }
  if(id==4){
iden ='5a82dbb5e65d08b3be7fda75';
  }
  if(id==5){
iden='5a82dbb5e65d08b3be7fda70';
  }
}

function getPlatosDeCategoria(idCategoria) {
 
 var idCategoria=idCategoria;//'5a82dbb5e65d08b3be7fda59';
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
/*
function cambiarEstado(idMesa, estado) {
  var request=new XMLHttpRequest();
  if (estado=="Libre")
    request.open("post", "http://localhost:8080/Comandas/abrirMesa.jsp",false);
  else
    request.open("post", "http://localhost:8080/Comandas/cerrarMesa.jsp",false);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.onreadystatechange = function() {
    if (request.readyState==4 && request.status==200) {
      var respuesta=JSON.parse(request.responseText);
      if (respuesta.resultado=="OK") {
        
        if (estado=="Libre")
         {// mesaActual=new Mesa(idMesa);
         }else
         {// mesaActual=null;
         }
      } else{}
       
    }
  };	
  var p = {
    _id : idMesa
  };
  request.send("p=" + JSON.stringify(p));
}






*/


 