//@ts-nocheck
sap.ui.define([
"ns/HTML5Module/localService/mockserver",
"sap/ui/test/opaQunit",
"./pages/HelloPanel"

], 
/**
 * @param {typeof sap.ui.test.OpaQunit} opaQunit
 * 
 */
function(mockserver, opaQunit){
"use strict";
    QUnit.module("Navigation");
    opaQunit("Deberia abrir el Hello Dialog", function(Given, When, Then){
        // Inicializando mockserver
        mockserver.init();


        //Arreglos arrangements

        Given.iStartMyUIComponent({
            componentConfig: {
                name: "ns.HTML5Module"
            }

        });

        //Acciones actions
        When.onTheAppPage.isayHelloDialogButton();

        //Afirmaciones assertions

        Then.onTheAppPage.iSeeTheHelloDialog();

        //Limpieza clean up
         Then.iTeardownMyApp();
    });

});