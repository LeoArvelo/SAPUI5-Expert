//@ts-nocheck
sap.ui.define([
"ns/HTML5Module/model/InvoicesFormatter",
"sap/ui/model/resource/ResourceModel"


], 
/**
 * @param {sap.ui.model.resource.ResourceModel} ResourceModel
 */
function(InvoicesFormatter, ResourceModel){
    "use strict";

    QUnit.module("Qninvoices Status", {
        beforeEach : function (){
            this._oResourceModel = new ResourceModel ({
                bundleUrl: sap.ui.require.toUrl("ns/HTML5Module") + "/i18n/i18n.properties"
            });


        },

        afterEach: function (){
            this._oResourceModel.destroy();

        }

    });

    QUnit.test("Deberia regresar Invoices Status", function(assert){

        let oModel = this.stub();
        oModel.withArgs("i18n").returns(this._oResourceModel);

        let oViewStub = {
            getModel : oModel
        };

        let oControllerStub = {
            getView : this.stub().returns(oViewStub)
        };

        let fnIsolatedFormatter = InvoicesFormatter.invoicesStatus.bind(oControllerStub);

        //assert, afirmaciones

        assert.strictEqual(fnIsolatedFormatter("A"), "New", "el Status para A es correcto");
        assert.strictEqual(fnIsolatedFormatter("B"), "In Progress", "el Status para B es correcto");
        assert.strictEqual(fnIsolatedFormatter("C"), "Done", "el Status para C es correcto");
    });


});