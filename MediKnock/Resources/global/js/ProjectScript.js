$(document).ready(function () {
    $('.alertforService').hide();
    
    $('#btnAlertSer').click(function () {

        $('.alertforService').hide();

    });
   
    



    //$('#modal-footer').show();
    
    var RangeDDL = 0;
    var RangeToDDL = 0;
    //Disable fileds of CUSTOMER INFO and Contact person on update
    debugger;

    //Disable fileds of Customer and Contact on project Update
    var proId = $('#hdProjectId').val();
    if (proId != 0) {

        //customer fileds
        $("#cusDiv input").attr("disabled", true);

        //Contact fileds
        //$("#ddlBsup").attr("disabled", true);
        $("#conDiv input").attr("disabled", true);

        //Fill List of Services on update project
        ServicesListOnUpdate(proId);
    }

    //ddlCustomer for disable or Enable Text fileds of customer detail
    $('#ddlCus').change(function () {
        var customerVal = $('#ddlCus').val();
        if (customerVal.length != 0) {

            //Web Servise Call
            CustomerDetailService(customerVal);

            $('#cusDiv input').val('');
            $("#cusDiv input").attr("disabled", true);
        }
        else {
            $("#cusDiv input").val('');
            $("#cusDiv input").removeAttr("disabled");
        }
    });
    //End

  

    //ddlContact for disable or Enable Text fileds of contact person detail
    $('#ddlcon').change(function () {        
        debugger;
        var conVal = $('#ddlcon').val();

        if (conVal.length != 0) {

            //Web Servise Call
            CotactDetailService(conVal);
            
            //$('#ddlBsup').val('');
            //$("#ddlBsup").attr("disabled", true);
            $('#conDiv input').val('');
            $("#conDiv input").attr("disabled", true);
        }
        else {
            
            //$('#ddlBsup').val("0").trigger('change');
            
            //$("#ddlBsup").removeAttr("disabled");
            $("#conDiv input").val('');
            $("#conDiv input").removeAttr("disabled");
        }
    });
    // End


    //ddlBuildingSup for disable or Enable Text fileds of Building supplier detail
    $('#ddlBuildingSup').change(function () {
        debugger;
        var BSupVal = $('#ddlBuildingSup').val();

        if (BSupVal != 0) {
            var textddl = $("#ddlBuildingSup option:selected").text();
            //alert("realy");
            //Web Servise Call
            //CotactDetailService(conVal);

            //$('#ddlBsup').val('');
            //$("#ddlBsup").attr("disabled", true);
            $('#txtBuildingSuplierID').val(BSupVal);
            $('#txtBuildingSuplier').val(textddl);
            $("#txtBuildingSuplier").attr("disabled", true);
        }
        else {

            //$('#ddlBsup').val("0").trigger('change');

            //$("#ddlBsup").removeAttr("disabled");
            $('#txtBuildingSuplierID').val('');
            $("#txtBuildingSuplier").val('');
            $("#txtBuildingSuplier").removeAttr("disabled");
        }
    });

    
    
    // End

    //ddlService for servies detail
    $('#ddlService').change(function () {
        debugger;
        var serVal = $('#ddlService').val();
        if (serVal.length != 0) {

            callAjaxMethodForServices(serVal);

            
        }
        else {
            debugger;
            $('#ddlQuantity').val('0').trigger('change');
            $('#txtRate').val('');
        }
    });
    //End

    //ddlRate for rate
    //Global vaviable for basic rate of service
    //Filled on ddlService selected change with web service below
    var baseRate = "";
    var chekIncrement = 0;
    $('#ddlQuantity').change(function () {
        debugger;
        var qntVal = $('#ddlQuantity').val();
        //if (qntVal != "0")
        //{
        if (RangeDDL != 0 && RangeToDDL != 0)
        {

                var qntVall = parseInt(qntVal);
                var RangeFromDDLL = parseInt(RangeDDL);
                var RangeToDLL = parseInt(RangeToDDL);

                if (qntVal.length != "0")
                {
                    if (qntVall >= RangeFromDDLL && qntVall <= RangeToDLL)
                    {
                        $('#txtRate').val(baseRate);
                    }
                    else if (qntVall > RangeToDLL) {
                        var serVal = $('#ddlService').val();
                        getBiggerValueOfServiceSlab(serVal, RangeToDLL, qntVall);

                    }

                    else if (qntVall < RangeFromDDLL) {
                        //if (chekIncrement > 0) {
                        if (qntVall != 0) {
                            var serVal = $('#ddlService').val();
                            getSmallerValuesOfServiceSlab(serVal, RangeFromDDLL, qntVall);
                        }
                        else if (qntVall == 0) {
                            //RangeDDL = 0;
                            //RangeToDDL = 0;

                            //$('#txtRate').val('');
                            //$('#ddlQuantity').val('').trigger('change');
                        }

                        //}
                        //chekIncrement++;
                    }
                }
                else {
                    //RangeDDL = 0;
                    //RangeToDDL = 0;
                }

            }
        else
        {
                debugger;
                if (qntVal != "0")
                {
                    if (qntVal.length != 0) {
                        var rat = parseInt(baseRate);
                        var qnt = parseInt(qntVal);
                        var total = rat * qnt;
                        $('#txtRate').val(total);
                    }
                }
                else if (qntVal == "0") {
                    debugger;
                    RangeDDL = 0;
                    RangeToDDL = 0;

                }
            }
        //}
        //else
        //{
        //    RangeDDL = 0;
        //    RangeToDDL = 0;
        //}
    });


    function getBiggerValueOfServiceSlab(ServID,RangeTo, ValueSelected)
    {
        debugger;
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/ServiceRateServiceSlab',

            data: '{ sId: "' + ServID + '", rangeToo:"' + RangeTo + '", ValueSelected:"' + ValueSelected + '" }',

            contentType: "application/json; charset=utf-8",

            async: false,

            dataType: "json",

            success: function (response) {
                debugger;
                var ServiceDet = response.d.toString();
                var ServiceDetSplit = ServiceDet.split('###');
                
                var ratSlab = ServiceDetSplit[0];
                var RangeFro = ServiceDetSplit[1];
                var rangTo =  ServiceDetSplit[2];
                if(rangTo > RangeTo)
                {
                    if (parseInt(rangTo) >= ValueSelected)
                    {
                        RangeDDL = RangeFro;
                        RangeToDDL = rangTo;
                        $('#txtRate').val('');
                        debugger;
                        $('#txtRate').val(ratSlab);
                        baseRate = $('#txtRate').val();
                        //Value of ddlQuantity changed
                        //if (RangeFrom < 11)
                        //{
                        $('#ddlQuantity').val(ValueSelected).trigger('change');
                        //}
                    }
                    else if (parseInt(RangeFro) > ValueSelected)
                    {
                        $('.alertforService').show();
                        //alert("Quantity do not match service range");
                    }
                    else
                    {
                        $('.alertforService').show();
                        //alert("Quantity exceeded the service range");
                    }
                    
                }
                else if (parseInt(RangeFro) > ValueSelected)
                {
                    $('.alertforService').show();
                    //alert("Quantity do not match service range");
                }
                else
                {
                    $('.alertforService').show();
                    //alert("Quantity exceeded the service range");
                }

                
                //$('#txtRate').attr("disabled", false);
                
            },

            failure: function (response) {
                alert("Service Failed");
            }

        });
    }
    //End

    function getSmallerValuesOfServiceSlab(ServID, RangeFrom, ValueSelected) {
        debugger;
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/ServiceRateServiceSlabSmaller',

            data: '{ sId: "' + ServID + '", rangeFroo:"' + RangeFrom + '", ValueSelected:"' + ValueSelected + '" }',

            contentType: "application/json; charset=utf-8",

            async: false,

            dataType: "json",

            success: function (response) {
                debugger;
                var ServiceDet = response.d.toString();
                var ServiceDetSplit = ServiceDet.split('###');

                var ratSlab = ServiceDetSplit[0];
                var RangeFro = ServiceDetSplit[1];
                var rangTo = ServiceDetSplit[2];
                if (RangeFro < RangeFrom && RangeFro > 0) {
                    if (ValueSelected >= RangeFro)
                    {
                        RangeDDL = RangeFro;
                        RangeToDDL = rangTo;
                        $('#txtRate').val('');


                        debugger;
                        $('#txtRate').val(ratSlab);
                        baseRate = $('#txtRate').val();
                        //Value of ddlQuantity changed
                        //if (RangeFrom < 10) {
                        $('#ddlQuantity').val(ValueSelected).trigger('change');

                        //}
                    }
                    else {
                        $('.alertforService').show();
                        //alert("Quantity below the service range");
                    }

                }
                else {
                    $('.alertforService').show();
                    //alert("Quantity below the service range");
                }


                //$('#txtRate').attr("disabled", false);

            },

            failure: function (response) {
                alert("Service Failed");
            }

        });
    }
    //End

    //Add Servise values in list 
    var i = 0;
    $('#btnAdd').click(function () {
        debugger;

        i++;

        var serTxt = $('#ddlService option:selected').text();
        var serVal = $('#ddlService option:selected').val();
        var qntVal = $('#ddlQuantity').val();
        var rateVal = $('#txtRate').val();
        if (serTxt == 'Select Service') {
            alert("Service must be selected.")
            $('#ddlService').focus();
            return false;
        }
        if (qntVal == 0) {
            alert("Quantity must be selected.")
            $('#ddlQuantity').focus();
            return false;
        }

        //Web service call for append list of services 
        ServicesList(serTxt, qntVal, rateVal, i, serVal);

        //Empty Fileds after Add click
        $('#ddlService').val('').trigger('change');
        //$('#ddlQuantity').val('0').trigger('change');
        $('#txtRate').val('0');

    });


    //Delete Service from list
    $('#deleteService').live('click', function () {
        var r = confirm("Are you sure!");
        if (r == true) {
            if (i != 0) {
                i--
            }
            var servicId = $(this).parents('tr').children("td:nth-child(1)").html();
            ServiceRemoveFromList(servicId);
            $(this).parents('tr').remove();
            return false;
        }
        return false;
    });

    //Edit Service from list
    $('#editService').live('click', function () {
        debugger;
        //Check already in edit mode
        var serTxt = $('#ddlService option:selected').text();
        var serVal = $('#ddlService option:selected').val();
        var qntVal = $('#ddlQuantity').val();
        var rateVal = $('#txtRate').val();

        if (serVal.length != 0 && qntVal.length != 0 && rateVal.length != 0) {

            i++;
            //Web service call for append list of services 
            ServicesList(serTxt, qntVal, rateVal, i, serVal);
        }

        if (i != 0) {
            i--
        }

        var servicId = $(this).parents('tr').children("td:nth-child(1)").html();
        ServiceRemoveFromList(servicId);

        var servicName = $(this).parents('tr').children("td:nth-child(2)").html();

        $("select#ddlService option").each(function () { this.selected = (this.text == servicName); });
        var serVal = $('#ddlService').val();
        $('#ddlService').val(serVal).trigger('change');

        var quantity = $(this).parents('tr').children("td:nth-child(3)").html();
        $('#ddlQuantity').val(quantity).trigger('change');

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

            url: '/WebServices/ServicePage.asmx/RemoveService',

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

  

    //Web servise called for service List
    function ServicesList(serName, quantity, price, id, serId) {
        chekIncrement = 0;
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/ServicesList',

            data: '{ serName: "' + serName + '", quantity: "' + quantity + '", price: "' + price + '",id: "' + id + '",serId: "' + serId + '"}',

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
    function ServicesListOnUpdate(val) {

        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/ServicesListOnUpdate',

            data: '{ proId: "' + val + '"}',

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

    //Web servise called for rate of service
    function callAjaxMethodForServices(val) {
        debugger;
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/ServiceRate',

            data: '{ sId: "' + val + '" }',

            contentType: "application/json; charset=utf-8",

            async: false,

            dataType: "json",

            success: function (response) {
                debugger;
                var ServiceDet = response.d.toString();
                var ServiceDetSplit = ServiceDet.split('###');
                var rat = ServiceDetSplit[0];
                var ChargedAs = ServiceDetSplit[1];
                var RateSlab = ServiceDetSplit[2];
                var RangeFrom = ServiceDetSplit[3];
                var rangeTo =  ServiceDetSplit[4];
                RangeDDL = RangeFrom;
                RangeToDDL = rangeTo;
                $('#txtRate').val('');
                if (ChargedAs == 1 || ChargedAs == '') {
                    debugger;
                    $('#txtRate').val(rat);
                    baseRate = $('#txtRate').val();
                    //Value of ddlQuantity changed
                    $('#ddlQuantity').val('1').trigger('change');
                    
                }
                else if(ChargedAs == 2)
                {
                    debugger;
                    $('#txtRate').val(RateSlab);
                    baseRate = $('#txtRate').val();
                    //Value of ddlQuantity changed
                    if (RangeFrom < 10)
                    {
                        $('#ddlQuantity').val(RangeFrom).trigger('change');

                    }
                }

                
                //$('#txtRate').attr("disabled", false);
                
            },

            failure: function (response) {
                alert("Service Failed");
            }

        });
    }
    //End

    //WEb service for customer detail
    function CustomerDetailService(val) {
        debugger;
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/CustomerDetail',

            data: '{ cusId: "' + val + '" }',

            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function (response) {
                var cusRes = response.d.toString();
                var cusDetail = cusRes.split('###');
                $('#txtCusName').val(cusDetail[0]);
                $('#txtCusContact').val(cusDetail[1]);
                $('#txtCusEmail').val(cusDetail[2]);
                $('#txtCusAdd').val(cusDetail[3]);
            },

            failure: function (response) {
                alert("Service Failed");
            }

        });
    }
    //End

    //WEb service for Contact Person detail
    function CotactDetailService(val) {       
        debugger;
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/ContactDetail',

            data: '{ conId: "' + val + '" }',

            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function (response) {
                
                var conRes = response.d.toString();
                var conDetail = conRes.split('###');
                //alert(conDetail[0] + conDetail[1] + conDetail[2] + conDetail[3] + conDetail[4]);
                //alert(conRes.toString());

                
                $('#txtConName').val(conDetail[0]);
                $('#txtConContact').val(conDetail[1]);
                $('#txtConEmail').val(conDetail[2]);
                //$('#txtConAdd').val(conDetail[3]);
                $('#txtComopanyContact').val(conDetail[4]);
                
                
                //$('#ddlBsup').val(conDetail[4]).trigger('change');
                //$('#ddlBsup').val(conDetail[4]);
                
            },

            failure: function (response) {
                alert("Service Failed");
            }

        });
    }
    //End

    //Check On Create project list of services
    $('#btnCreate').click(function () {
        unsaved = false;
        debugger;
        var txtProjectDescription = $("#txtProjectDescription").val();
        if (txtProjectDescription == "" || txtProjectDescription == null) {
            alert("Enter Project Description")
            return false;
        }
        
        var txtCusName = $("#txtCusName").val();
        if (txtCusName == "" || txtCusName == null) {
            alert("Enter Customer Name")
            return false;
        }
        
        var txtCusContact = $("#txtCusContact").val();
        if (txtCusContact == "" || txtCusContact == null) {
            alert("Enter Customer Contact")
            return false;
        }

        
        var txtCusEmail = $("#txtCusEmail").val();
        if (txtCusEmail == "" || txtCusEmail == null) {
            alert("Enter Customer Email")
            return false;
        }
        
        //var txtComopanyContact = $("#txtComopanyContact").val();
        //if (txtComopanyContact == "" || txtComopanyContact == null) {
        //    alert("Enter Company")
        //    return false;
        //}
        
        
        //var txtConName = $("#txtConName").val();
        //if (txtConName == "" || txtConName == null) {
        //    alert("Enter ANVARLIG SOKER Name")
        //    return false;
        //}

        //var txtConContact = $("#txtConContact").val();
        //if (txtConContact == "" || txtConContact == null) {
        //    alert("Enter ANVARLIG SOKER Contact Number")
        //    return false;
        //}
        
        //var txtConEmail = $("#txtConEmail").val();
        //if (txtConEmail == "" || txtConEmail == null) {
        //    alert("Enter ANVARLIG SOKER Email")
        //    return false;
        //}
        
        var txtBuildingSuplier = $("#txtBuildingSuplier").val();
        if (txtBuildingSuplier == "" || txtBuildingSuplier == null) {
            alert("Enter Building Supplier")
            return false;
        }
        
        var txtPostNo = $("#txtPostNo").val();
        if (txtPostNo == "" || txtPostNo == null) {
            alert("Enter PostNo")
            return false;
        }
        
        var txtPoststed = $("#txtPoststed").val();
        if (txtPoststed == "" || txtPoststed == null) {
            alert("Enter Poststed")
            return false;
        }
        
        var txtKommune = $("#txtKommune").val();
        if (txtKommune == "" || txtKommune == null) {
            alert("Enter Kommune")
            return false;
        }
        
        var txtGnrPro = $("#txtGnrPro").val();
        if (txtGnrPro == "" || txtGnrPro == null) {
            alert("Enter Gnr")
            return false;
        }
        
        var txtBnrPro = $("#txtBnrPro").val();
        if (txtBnrPro == "" || txtBnrPro == null) {
            alert("Enter Bnr")
            return false;
        }

        var txtProjectAddress = $("#txtProjectAddress").val();
        if (txtProjectAddress == "" || txtProjectAddress == null) {
            alert("Enter Property Address")
        }
        var trlength = $('#tService tr').length;
        if (trlength == 0) {
            alert("Minimum one service must be added");
            return false;
        }
    })

    ////Code for page unload alert if changings done
    //var unsaved = false;

    //$(":input").change(function () { //trigers change in all input fields including text type
    //    debugger;
    //    unsaved = true;
    //});

    //function unloadPage() {
    //    if (unsaved) {
    //        alert("save data");
    //        return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
    //    }
    //}
    //window.onbeforeunload = unloadPage;

})


// Another way to bind the event
$(window).bind('beforeunload', function () {
    if (unsaved) {
        debugger;
        return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
    }
});

// Monitor dynamic inputs
$(document).on('change', ':input', function () { //triggers change in all input fields including text type
    debugger;
    unsaved = true;
});

function GetPosted() {
    debugger;
    var txtPostNo = $('#txtPostNo').val();
    $("#txtPoststed").attr("disabled", true);
    $("#txtKommune").attr("disabled", true);
    if (txtPostNo != "")
    {
        

        //alert(txtPostNo);
        $.ajax({
            type: "POST",
            url: '/WebServices/ServicePage.asmx/GetPostNumber',
            data: '{ PostNum: "' + txtPostNo + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                debugger;
                var PostRes = response.d.toString();
                //alert(PostRes);
                if (PostRes != "")
                {

                    $('#txtPoststed').val('');
                    $('#txtKommune').val('');
                    var PostDetail = PostRes.split('###');
                    $('#txtPoststed').val(PostDetail[0]);
                    $('#txtKommune').val(PostDetail[1]);
                    $("#txtPoststed").removeAttr("disabled");
                    $("#txtKommune").removeAttr("disabled");

                }
                else
                {
                    alert("Postnr Incorrect");
                }
                
            },

            failure: function (response) {

                alert("Service Failed");
            }
        });
        
        //$('#txtBuildingSuplier').val(textddl);
        //$("#txtBuildingSuplier").attr("disabled", true);

        //$("#txtBuildingSuplier").val('');
        //$("#txtBuildingSuplier").removeAttr("disabled");
    }
    $("#txtPoststed").removeAttr("disabled");
    $("#txtKommune").removeAttr("disabled");
    //else
    //{
    //    alert("No text");
    //}
    
}

