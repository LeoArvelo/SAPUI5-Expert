//@ts-nocheck
sap.ui.define([
"sap/ui/test/Opa5",
"sap/ui/test/actions/Press"

], 
/**
 * @param {typeof sap.ui.test.Opa5} Opa5
 * @param {typeof sap.ui.test.actions.Press} Press
 */
function(Opa5, Press){
"use strict";

    Opa5.createPageObjects({
        onTheAppPage : {
            actions : {
                isayHelloDialogButton : function () { return this.waitFor({
                        id : "button2",
                        viewName : "ns.HTML5Module.view.HelloPanel",
                        actions : new Press(),
                        errorMessage: "No encontrado 'say hello Button' on the HelloPanal View"
                    });
                   
                }
                    
            },
            assertions: {
                iSeeTheHelloDialog : function (){
                    return this.waitFor({
                        controlType: "sap.m.Dialog",
                        success: function(){
                            Opa5.assert.ok(true, 'El Dialog fue Abierto')
                        },
                        errorMessage :  "No encontrado el controlador del dialogo"

                    });

                }


            }

        }

        


    });

});