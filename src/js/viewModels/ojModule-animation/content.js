define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojbutton'],
function(oj, ko, $)
{     
    var viewModel = function(moduleParams)
    {
    
      var aux;
    
    
      var self = this;
              
              self.tabbarSelectionChange = false;

              this.selectionChange = function(event)
              {
                self.tabbarSelectionChange = true;
                var selection = event.detail.value;
                if (selection === 'thisweek')
                {
                  self.currentList = 'list';
                }
                else if (selection === 'nextweek')
                {
                  self.currentList = 'list2';
                }
                self.currentModule(self.currentList);
              };
              
              // These observables are bound to the params option of the ojModule binding,
              // so that they are accessible from the modules being loaded.
              this.currentList = "list";
              this.currentModule = ko.observable(this.currentList);
              this.content = ko.observable("");
 
              this.modulePath = ko.pureComputed(
                function()
                {
                  return ('ojModule-animation2/' + self.currentModule());
                }
              );
              
              this.switcherCallback = function(context)
              {
                // Callback function that can return different animations based on application logic.
                //
                // context.valueAccessor().params can be used to access the ojModule params option,
                // which may contain additional states from the router if it is used with ojModule.
                
                if (self.tabbarSelectionChange) { // sibling (tab switch) navigation animation
                  self.tabbarSelectionChange = false;
                  if (self.currentModule() === 'list') {
                    return 'navSiblingEarlier';
                  }
                  return 'navSiblingLater';
                } else { // drill down/up (parent list <--> child content) animation
                  var module = self.currentModule();
                  if (module === 'list' || module === 'list2') {
                    return 'navParent';
                  }
                  return 'navChild';
                }                  
              };


      
      this.content = moduleParams.content;

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
    
    
    
    
    
      }





    return viewModel;
});	
