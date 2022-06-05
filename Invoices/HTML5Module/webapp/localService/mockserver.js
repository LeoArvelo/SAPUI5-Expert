//@ts-nocheck
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"

],
/**
 * 
 * @param {typeof sap.ui.core.util.MockServer } MockServer 
 * @param {typeof sap.ui.model.json.JSONModel } JSONModel 
 * @param {typeof sap.base.util.UriParameters } UriParameters 
 * @param {typeof sap.base.Log } Log 
 */
function (MockServer, JSONModel, UriParameters, Log) {
    "use strict";

    var oMockServer,
        _sAppPath = "ns/HTML5Module/",
        _sJsonFilesPath = _sAppPath + "localService/mockdata";

    var oMockServerInterface = {

        /**
         * inicializando el servidor mock de forma asincrona
         * @protected
         * @param {object} oOptionsParameter
         * @returns {Promise} una promesa que ha sido resuelta 
         *                    cuando ha arrancado el servidor mock
         */

         init: function (oOptionsParameter){
            var oOptions  = oOptionsParameter || {};

            return new Promise (function (fnResolve, fnReject){
                var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                    oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function(){
                        var oUriParameters = new UriParameters (window.location.href);
                        
                        //analisis del manifest en busqueda del uri del metadata
                        var  sJsonFileUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                        var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                        var sMetaDataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

                        // aseguramiento de que hay un barra al final de la url

                        var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();
                        
                        // creacion del servidor mock o detencion del existente a reinicializarse

                        if(!oMockServer){
                            oMockServer = new MockServer ({
                                rootUri : sMockServerUrl

                            });

                        }else{
                            oMockServer.stop();

                        }

                        //configurar el mock server con las optiones de dadas o por defecto con un delay de 0.5seg
                        MockServer.config({

                            autoRespond : true,
                            autoRespondAfter : (oOptions.delay || oUriParameters.get("ServerDelay") || 500 )

                        });

                        // simulacion de las peticiones usando los datos mock
                        oMockServer.simulate( sMetaDataUrl , {
                            sMockdataBaseUrl : sJsonFileUrl,
                            bGenerateMissingMockData : true

                        });

                        var aRequests = oMockServer.getRequests();

                        // creacion de una respuesta de error para cada peticion

                        var fnResponse = function (iErrCode, Smessage, aRequests) {
                            aRequests.response = function (oXhr) {

                                oXhr.respond(iErrCode, {"content-type" : "text/plain;chartset= utf-8"},Smessage );
                            };

                        };

                        //simular los metadata errors

                        if(oOptions.metadataError || oUriParameters.get("metadataError")){
                            aRequests.forEach(function (aEntry) {
                                if(aEntry.path.toString().indexoff("$metadata") > -1 ){
                                    fnResponse (500, "metada Error", aEntry);

                                }
                            });
                                
                            
                        };

                        //simulacion de los errores de peticiones

                        var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                        var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                        if(sErrorParam){
                            aRequests.forEach(function (aEntry) {
                                fnResponse (iErrorCode, sErrorParam, aEntry );
                                
                            });
                        };

                        //establecer respuestas y arrancar el servidor

                        oMockServer.setRequests(aRequests);
                        oMockServer.start();
                        Log.info("Running de app with mock data");
                        fnResolve();



                    });

                    oManifestModel.attachRequestFailed(function(){
                        var sError = "Failed to load the aplication manifest";

                        Log.error(sError);
                        fnReject(new Error (sError));


                    });

            });

         }

    };

    return oMockServerInterface;
});