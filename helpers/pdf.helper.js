const pdfMakePrinter = require('pdfmake/src/printer');

var pdfHelper = function(){

    var VOUCHER_TEMPLATE = {header:{columns:[{text:"",style:"documentHeaderLeft"},{text:"",style:"documentHeaderCenter"},{text:"",style:"documentHeaderRight"}]},footer:{columns:[{text:"{{COMPANY_PHONE_1}} | {{COMPANY_PHONE_2}} \n {{COMPANY_EMAIL}}",style:"documentFooterLeft"},{text:"{{COMPANY_WEBSITE}} \n {{COMPANY_INSTAGRAM}}",style:"documentFooterCenter"},{text:"{{COMPANY_ADDRESS}} \n {{COMPANY_ADDRESS_LINE2}}",style:"documentFooterRight"}]},content:[{columns:[{image:"{{LOGO}}",width:150},[{text:"VOUCHER",style:"invoiceTitle",width:"*"},{stack:[{columns:[{text:"#",style:"invoiceSubTitle",width:"*"},{text:"{{VOUCHER_NUMBER}}",style:"invoiceSubValue",width:100}]},{columns:[{text:"Data de Emissão",style:"invoiceSubTitle",width:"*"},{text:"{{DATE_OF_ISSUE}}",style:"invoiceSubValue",width:100}]},{columns:[{text:"Data Realização",style:"invoiceSubTitle",width:"*"},{text:"{{DATE}}",style:"invoiceSubValue",width:100}]}]}]]},{columns:[{text:"Agência",style:"invoiceBillingTitle"},{text:"Cliente",style:"invoiceBillingTitle"}]},{columns:[{text:"{{GUIDE_NAME}} \n {{COMPANY_NAME}}",style:"invoiceBillingDetails"},{text:"{{CUSTOMER_NAME}} \n {{CUSTOMER_HOTEL}}",style:"invoiceBillingDetails"}]},"\n\n",{table:{headerRows:1,widths:["*",40,"auto","auto","auto"],body:[[{text:"Serviço",style:"itemsHeader"},{text:"Qtd.",style:["itemsHeader","center"]},{text:"Valor (US$)",style:["itemsHeader","center"]},{text:"Desconto (US$)",style:["itemsHeader","center"]},{text:"Total (US$)",style:["itemsHeader","center"]}],[[{text:"{{SERVICE_NAME}}",style:"itemTitle"},{text:"{{SERVICE_SHORT_DESCRIPTION}}",style:"itemSubTitle"}],{text:"{{QUANTITY}}",style:"itemNumber"},{text:"{{UNIT_PRICE}}",style:"itemNumber"},{text:"{{DISCOUNT}}",style:"itemNumber"},{text:"{{TOTAL}}",style:"itemTotal"}]]},layout:"lightHorizontalLines"},{text:"Descrição",style:"invoiceBillingTitle"},{text:"{{SERVICE_DESCRIPTION}}",style:"notesText"},{text:"Informações Complementares",style:"invoiceBillingTitle"},{text:"{{EXTRA_INFORMATION}}",style:"notesText"},{text:"Notas Especiais",style:"invoiceBillingTitle"},{text:"{{NOTES}}",style:"notesText"},{text:"Informações de Pagamento",style:"invoiceBillingTitle"},{text:"{{PAYMENT_INFORMATION}}",style:"notesText"}],styles:{documentHeaderLeft:{fontSize:10,margin:[5,5,5,5],alignment:"left"},documentHeaderCenter:{fontSize:10,margin:[5,5,5,5],alignment:"center"},documentHeaderRight:{fontSize:10,margin:[5,5,5,5],alignment:"right"},documentFooterLeft:{fontSize:8,margin:[5,5,5,5],alignment:"center"},documentFooterCenter:{fontSize:8,margin:[5,5,5,5],alignment:"center"},documentFooterRight:{fontSize:8,margin:[5,5,5,5],alignment:"center"},invoiceTitle:{fontSize:22,bold:!0,alignment:"right",margin:[0,0,0,15]},invoiceSubTitle:{fontSize:12,alignment:"right"},invoiceSubValue:{fontSize:12,alignment:"right"},invoiceBillingTitle:{fontSize:14,bold:!0,alignment:"left",margin:[0,20,0,5]},invoiceBillingDetails:{alignment:"left"},invoiceBillingAddressTitle:{margin:[0,7,0,3],bold:!0},invoiceBillingAddress:{},itemsHeader:{margin:[0,5,0,5],bold:!0},itemTitle:{bold:!0},itemSubTitle:{italics:!0,fontSize:11},itemNumber:{margin:[0,5,0,5],alignment:"center"},itemTotal:{margin:[0,5,0,5],bold:!0,alignment:"center"},notesTitle:{fontSize:10,bold:!0,margin:[0,50,0,3]},notesText:{fontSize:10,aligment:"justified"},center:{alignment:"center"}},defaultStyle:{columnGap:20}};    

    function _generatePdf(docDefinition, callback) {
        try {
            const fontDescriptors = {
                Roboto: {
                    normal: 'helpers/fonts/Roboto-Regular.ttf',
                    bold: 'helpers/fonts/Roboto-Medium.ttf',
                    italics: 'helpers/fonts/Roboto-Italic.ttf',
                    bolditalics: 'helpers/fonts/Roboto-MediumItalic.ttf'
            	}
            };
            const printer = new pdfMakePrinter(fontDescriptors);
            const doc = printer.createPdfKitDocument(docDefinition);
            
            let chunks = [];

            doc.on('data', function(chunk) {
                chunks.push(chunk);
            });
            
            doc.on('end', function() {
                const result = Buffer.concat(chunks);
                callback(result.toString('base64'));
            });
            
            doc.end();
            
        } catch(err) {
            throw(err);
        }
    };

    function _getVoucherTemplate(){
        return VOUCHER_TEMPLATE;
    }

    function _replaceTags(docDefinition, tags){
        var stringDoc = JSON.stringify(docDefinition);

        tags.forEach(tag => {
            stringDoc = stringDoc.replace(tag.key, tag.value);
        });

        return JSON.parse(stringDoc);
    }

    function _generateVoucherFilename(ticket){
        var customerName = ticket.customer.name.toUpperCase().replace(' ', '_');
        return 'VOUCHER_' + ticket.number.toString().padStart(6, '0') + '_' + customerName.trim() + '.pdf';
    }

    return{
        generateVoucherFilename: _generateVoucherFilename,
        generatePdf: _generatePdf,
        getVoucherTemplate: _getVoucherTemplate,
        replaceTags: _replaceTags
    }

}();

module.exports = pdfHelper;