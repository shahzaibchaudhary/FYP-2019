var i = 0;
$(document).ready(function () {
    var SerID = $('#hdServiceId').val();
    if (SerID != 0)
    {
        ServicesSlabListOnUpdate(SerID);
    }


    //Add Servise Rate values in list 
    
    $('#btnAdd').click(function () {
        debugger;

        i++;

        var serTxt = $('#ddlRangeFrom option:selected').text();
        var serVal = $('#ddlRangeFrom option:selected').val();
        var qntVal = $('#ddlRangeTo').val();
        if (serVal == 0)
        {
            alert("Antall enheter (Fra)");
            return false;
        }
        if (qntVal == 0) {
            alert("Antall enheter (Til)");
            return false;
        }
        if (serVal > qntVal)
        {
            alert("Gjenstander (Fra) kan ikke være større enn antall elementer (Til)");
            return false;
        }
        if (serVal == qntVal) {
            alert("Gjenstander (Fra) kan ikke være lik antall elementer (Til)");
            return false;
        }
        var rateVal = $('#txtRate').val();
        if (rateVal == 0)
        {
            alert("Prisen kan ikke være '0'");
            return false;
        }
        //if (serTxt == 'Select Service') {
        //    alert("Service must be selected.")
        //    //$('#ddlService').focus();
        //   // return false;
        //}
        //if (qntVal == 0) {
        //    alert("Quantity must be selected.")
        //    //$('#ddlQuantity').focus();
        //   // return false;
        //}
        //Web service call for append list of services 
        ServicesList(serTxt, qntVal, rateVal, i, serVal);

        //Empty Fileds after Add click
        $('#ddlRangeFrom').val('0').trigger('change');
        $('#ddlRangeTo').val('0').trigger('change');
        $('#txtRate').val('0');

    });


    //Web servise called for service List
    function ServicesList(serName, RangeTo, Rate, id, RangeFrom) {
        debugger;
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/ServicesListRateSlab',

            data: '{ serName: "' + serName + '", RangeTo: "' + RangeTo + '", Rate: "' + Rate + '",id: "' + id + '",RangeFrom: "' + RangeFrom + '"}',

            contentType: "application/json; charset=utf-8",

            async: false,

            dataType: "json",

            success: function (response) {
                var list = response.d.toString();
                $('#tService').append(list);
            },

            failure: function (response) {
                alert("Service Failed");
            }

        });
    }
    //End

    //Web servise called for service List
    function ServicesSlabListOnUpdate(val) {

        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/ServicesSlabListOnUpdate',

            data: '{ SerID: "' + val + '"}',

            contentType: "application/json; charset=utf-8",

            async: false,
            dataType: "json",
            success: function (response) {
                var list = response.d.toString();
                $('#tService').append(list);
            },
            failure: function (response) {
                alert("Service Failed");
            }
        });
    }
    //End


    //Edit Service from list
    $('#editServicerate').live('click', function () {
        debugger;
        //Check already in edit mode
        var serTxt = $('#ddlRangeFrom option:selected').text();
        var serVal = $('#ddlRangeFrom option:selected').val();
        var qntVal = $('#ddlRangeTo').val();
        var rateVal = $('#txtRate').val();

        if (serVal != "0" && qntVal != "0" && rateVal != "0") {

            i++;
            //Web service call for append list of services 
            ServicesList(serTxt, qntVal, rateVal, i, serVal);
        }

        //if (i != 0) {
        //    i--
        //}

        var servicId = $(this).parents('tr').children("td:nth-child(1)").html();
        ServiceRemoveFromList(servicId);

        var servicName = $(this).parents('tr').children("td:nth-child(2)").html();

        //$("select#ddlService option").each(function () { this.selected = (this.text == servicName); });
        var rangeFrom = $(this).parents('tr').children("td:nth-child(2)").html();
        //var serVal = $('#ddlRangeFrom').val(rangeFrom);
        $('#ddlRangeFrom').val(rangeFrom).trigger('change');

        var quantity = $(this).parents('tr').children("td:nth-child(3)").html();
        $('#ddlRangeTo').val(quantity).trigger('change');

        var rate = $(this).parents('tr').children("td:nth-child(4)").html();
        rate = rate.replace('NOK', '');
        $('#txtRate').val(rate);

        var servicName = $(this).parents('tr').remove();


        return false;
    });


    //Web servise called for rate of service
    function ServiceRemoveFromList(val) {
        debugger;
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/RemoveServiceSlab',

            data: '{ servicId: "' + val + '" }',

            contentType: "application/json; charset=utf-8",

            async: false,

            dataType: "json",

            success: function (response) {
            },

            failure: function (response) {
                alert("Service Failed");
            }

        });
    }
    //End



    //Delete Service from list
    $('#deleteServicerate').live('click', function () {
        var r = confirm("Are you sure!");
        if (r == true) {
            //if (i != 0) {
            //    i--
            //}
            var servicId = $(this).parents('tr').children("td:nth-child(1)").html();
            ServiceRemoveFromList(servicId);
            $(this).parents('tr').remove();
            return false;
        }
        return false;
    });
})



