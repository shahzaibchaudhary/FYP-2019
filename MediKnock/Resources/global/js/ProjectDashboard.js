
$(document).ready(function () {

    //ddlBuildingSup for disable or Enable Text fileds of Building supplier detail
    $('#ddlProjectLeader').change(function () {
        debugger;
        var BSupVal = $('#ddlProjectLeader').val();

        if (BSupVal != 0) {
            //var textddl = $("#ddlProjectLeader option:selected").text();

            //Web Servise Call
            ProjectLeaderDetailService(BSupVal);
        }
        else {
            $('#txtProjectLeaderID').val('');
            $('#txtProjectLeaderName').val('');
            $('#txtProjectLeaderContact').val('');
            $('#txtProjectLeaderEmail').val('');
            
            $("#txtProjectLeaderName").removeAttr("disabled");
            $("#txtProjectLeaderContact").removeAttr("disabled");
            $("#txtProjectLeaderEmail").removeAttr("disabled");
        }
    });
    $('#ddlProjectLeaderSideBar').change(function () {
        debugger;
        var BSupVal = $('#ddlProjectLeaderSideBar').val();

        if (BSupVal != 0) {
            //var textddl = $("#ddlProjectLeader option:selected").text();

            //Web Servise Call
            ProjectLeaderDetailServiceSideBar(BSupVal);
        }
        else {
            $('#txtProjectLeaderIDSideBar').val('');
            $('#txtProjectLeaderNameSideBar').val('');
            $('#txtProjectLeaderContactSideBar').val('');
            $('#txtProjectLeaderEmailSideBar').val('');

            $("#txtProjectLeaderNameSideBar").removeAttr("disabled");
            $("#txtProjectLeaderContactSideBar").removeAttr("disabled");
            $("#txtProjectLeaderEmailSideBar").removeAttr("disabled");
        }
    });
    function ProjectLeaderDetailServiceSideBar(val) {

        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/ProjectLeaderDetail',

            data: '{ LeaderID: "' + val + '"}',

            contentType: "application/json; charset=utf-8",

            async: false,

            dataType: "json",

            success: function (response) {
                debugger;

                var Respnse = response.d;

                $('#txtProjectLeaderIDSideBar').val(Respnse.Id);
                $('#txtProjectLeaderNameSideBar').val(Respnse.Title);
                $('#txtProjectLeaderContactSideBar').val(Respnse.ContactNumber);
                $('#txtProjectLeaderEmailSideBar').val(Respnse.Email);

                $("#txtProjectLeaderNameSideBar").attr("disabled", true);
                $("#txtProjectLeaderContactSideBar").attr("disabled", true);
                $("#txtProjectLeaderEmailSideBar").attr("disabled", true);

            },

            failure: function (response) {
                alert("Service Failed");
            }

        });
        //End
    }
    function ProjectLeaderDetailService(val) {

        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/ProjectLeaderDetail',

            data: '{ LeaderID: "' + val + '"}',

            contentType: "application/json; charset=utf-8",

            async: false,

            dataType: "json",

            success: function (response) {
                debugger;
                
                var Respnse = response.d;

                $('#txtProjectLeaderID').val(Respnse.Id);
                $('#txtProjectLeaderName').val(Respnse.Title);
                $('#txtProjectLeaderContact').val(Respnse.ContactNumber);
                $('#txtProjectLeaderEmail').val(Respnse.Email);

                $("#txtProjectLeaderName").attr("disabled", true);
                $("#txtProjectLeaderContact").attr("disabled", true);
                $("#txtProjectLeaderEmail").attr("disabled", true);

            },

            failure: function (response) {
                alert("Service Failed");
            }

        });
        //End
    }



    // End

    $('#txtDateCom').datetimepicker({
        minDate: +0,
        format: 'd-M-Y',
        timepicker: false,
    });

    $('#txtDateInspection').datetimepicker({
        minDate: +0,
        format: 'd-M-Y',
        timepicker: false,
    });

    $('#txtDateCustomerContact').datetimepicker({
        minDate: +0,
        format: 'd-M-Y',
        timepicker: false,
    });

    $("#ddlTypeCustomerContact").change(function () {
        debugger;
        var selectedDDLMonth = $("#ddlTypeCustomerContact").val();
        var monthinc = parseInt(selectedDDLMonth);
        var date1 = new Date();
        date1.setMonth(date1.getMonth() + monthinc);
        var dateformated = $.datepicker.formatDate("d-M-yy", date1);
        //$("#txtDateCustomerContact").val(date1)
        // $("#txtDateCustomerContact").datepicker("d-M-Y", new Date());
        $("#txtDateCustomerContact").val(dateformated);
        $("#txtDateCustomerContact").prop('disabled', false);
        $("#ddlTypeCustomerContact").prop('disabled', true);
        $("#hdContactCustomerDDL").val(selectedDDLMonth);
    })

    $("#btnUpload").click(function () {
        debugger;

        //var listItems = $(".nav-tabs li");

        var date = new Date();
        var formate = "" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + "";
        $("#txtDate").val(formate);

        //listItems.each(function (li) {
        //    var liClass = $(this).attr("class");
        //    if (liClass == "active") {
        //        var id = $(this).attr("id");
        //        var ids = id.split('#');
        //        //Party Id
        //        var tId = ids[0];
        //        var pId = ids[1];

        //        $("#hdPartyId").val(pId);

        //        DocTypeList(tId);
        //        $("#ddlType").val("0").trigger('change');
        //    }
        //});
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //$("#btnUpload").click(function () {
    //    debugger;

    //    var listItems = $(".nav-tabs li");

    //    var date = new Date();
    //    var formate = "" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + "";
    //    $("#txtDate").val(formate);

    //    listItems.each(function (li) {
    //        var liClass = $(this).attr("class");
    //        if (liClass == "active") {
    //            var id = $(this).attr("id");
    //            var ids = id.split('#');
    //            //Party Id
    //            var tId = ids[0];
    //            var pId = ids[1];

    //            $("#hdPartyId").val(pId);

    //            DocTypeList(tId);
    //            $("#ddlType").val("0").trigger('change');
    //        }
    //    });
    //})

    $(".btn-primary").click(function () {
        debugger;

        var ValuesInTD = $(this);
        var PartyDOCTypeId = ValuesInTD.attr("partydoctypeid");
        var PartyTypeId = ValuesInTD.attr("partytypeid");
        var partyIdU = ValuesInTD.attr("partyid");
        $("#hdPartyIdU").val(partyIdU);
        $("#hdPartyTypeIdU").val(PartyTypeId);
        $("#hdDocTypeIdU").val(PartyDOCTypeId);
        //var listItems = $(".nav-tabs li");

        var date = new Date();
        var formate = "" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + "";
        $("#txtDateU").val(formate);

        //listItems.each(function (li) {
        //    var liClass = $(this).attr("class");
        //    if (liClass == "active") {
        //        var id = $(this).attr("id");
        //        var ids = id.split('#');
        //        //Party Id
        //        var tId = ids[0];
        //        var pId = ids[1];

        //        $("#hdPartyId").val(pId);

        //        DocTypeList(tId);
        //        $("#ddlType").val("0").trigger('change');
        //    }
        //});
    })
    //Save Doc
    $("#btnSaveDocU").click(function () {
        debugger;
        //var partyIdU = $("#ddlType").val();
        //var fileName = $("#fileU").val();

        //if (partyIdU == 0) {
        //    alert("Please select document type");
        //    return false;
        //}
        //if (fileName.length == 0) {
        //    alert("Please chose file");
        //    return false;
        //}

        //$("#hdPartyIdU").val(partyIdU);
        $("#dtnSvDocU").trigger("click");

    })

    $("#btnAssignInsp").click(function () {
        debugger;

        //var listItems = $(".nav-tabs li");

        var date = new Date();
        var formate = "" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + "";


        //listItems.each(function (li) {
        //    var liClass = $(this).attr("class");
        //    if (liClass == "active") {
        //        var id = $(this).attr("id");
        //        var ids = id.split('#');
        //        //Party Id
        //        var tId = ids[0];
        //        var pId = ids[1];

        //        $("#hdPartyId").val(pId);

        //        DocTypeList(tId);
        //        $("#ddlType").val("0").trigger('change');
        //    }
        //});
    })

    //Save Doc
    $("#btnSaveDoc").click(function () {
        debugger;
        var partyId = $("#ddlType").val();
        //var fileName = $("#file").val();

        if (partyId == 0) {
            alert("Please select document type");
            return false;
        }
        //if (fileName.length == 0) {
        //    alert("Please chose file");
        //    return false;
        //}

        $("#hdPartyId").val(partyId);
        $("#dtnSvDoc").trigger("click");

    })

    //Save Upload AnsvarligSokerFile PDF IG
    $("#btnAnsvarligSokerFileSubmit").click(function () {
        debugger;
        var fileOrignal = $("#fileAnsvarligSokerFile");
        var fileName = $("#fileAnsvarligSokerFile").val();


        if (fileName.length == 0) {
            alert("Please chose file");
            return false;
        }

        if (fileOrignal[0].files[0].type == "application/pdf") {
            $("#dtnSvAnsvarligSokerFile").trigger("click");
        }
        else {
            alert("Please Select PDF file type");
            return false;
        }




    })

   
    

    //Save Project Inspector
    $("#btnSaveInsp").click(function () {
        debugger;
        var txtDateInspection = $('#txtDateInspection').val();
        var inspectorId = $("#ddlTypeInsp").val();
        var cbinspectorMail = $("#cbInspectorEmail")
        //alert(inspectorId);

        if (inspectorId == 0) {
            alert("Please select Inspector");
            return false;
        }

        $("#hdInspectorId").val(inspectorId);
        $("#dtnSvInsp").trigger("click");

    })

   

    //Save Project Leader and contact customer reminder
    $("#btnSaveCustomerContact").click(function () {
        debugger;
        var txtDateCustomer = $('#txtDateCustomerContact').val();
        var customerContactId = $("#ddlTypeCustomerContact").val();

        //Project leader name check
        var txtProjectLeaderName = $("#txtProjectLeaderName").val();
        if (txtProjectLeaderName == null || txtProjectLeaderName == "") {
            alert("Please Enter Project Leader Name");
            return false;
        }
        //Project Leader contact number check
        var txtProjectLeaderContact = $("#txtProjectLeaderContact").val();
        if (txtProjectLeaderContact == null || txtProjectLeaderContact == "") {
            alert("Please Enter Project Leader Contact Number");
            return false;
        }

        //Project Leader email check
        var txtProjectLeaderEmail = $("#txtProjectLeaderEmail").val();
        if (txtProjectLeaderEmail == null || txtProjectLeaderEmail == "") {
            alert("Please Enter Project Leader Email");
            return false;
        }
        


        //alert(inspectorId);

        if (customerContactId == 0) {
            alert("Please select Contact Customer");
            return false;
        }


        $("#hdContactCustomerDDL").val(customerContactId);
        $("#dtnSvProLeaderAndCustomer").trigger("click");

    })

    //Save Project Leader side bar
    $("#btnSaveProLeaderSideBar").click(function () {
        debugger;
        //var txtDateCustomer = $('#txtDateCustomerContact').val();
        //var customerContactId = $("#ddlTypeCustomerContact").val();

        //alert(inspectorId);

        //if (customerContactId == 0) {
        //    alert("Please select Contact Customer");
        //    return false;
        //}

        //$("#hdContactCustomerDDL").val(customerContactId);
        $("#dtnSvProLeaderSideBar").trigger("click");

    })

    //List of Document types fro web service


    $('#btnSave').click(function () {

        alert("sadfsd");

        alert("asd");
    })

    

});
//function AnversligSokerPopUp(val) {
//    debugger;
//    $('#modal-AnsvarligPdfDetail').modal('hide');
//    var open = "#" + val.id;
    
//    $(open).modal('show');


//   // $('#ListofAnversligDocPop').trigger('click');
//}

function DocTypeList(val) {

    $.ajax({

        type: "POST",

        url: '/WebServices/ServicePage.asmx/DocTypeList',

        data: '{ typeId: "' + val + '"}',

        contentType: "application/json; charset=utf-8",

        async: false,

        dataType: "json",

        success: function (response) {
            var list = response.d.toString();
            $('#ddlType').empty();
            $('#ddlType').append(list);
        },

        failure: function (response) {
            alert("Service Failed");
        }

    });
    //End
}

//Replace and Upload AnsvarligSokerFile PDF IG
$(".SubmitBtnAnsvarligPdfReplace").click(function () {
    debugger;
    var ids = id.split('#');
    //        //Party Id
    //        var tId = ids[0];
    //        var pId = ids[1];

    var fileOrignal = $("#fileAnsvarligSokerFileReplace");
    var fileName = $("#fileAnsvarligSokerFileReplace").val();


    if (fileName.length == 0) {
        alert("Please chose file");
        return false;
    }

    if (fileOrignal[0].files[0].type == "application/pdf") {
        $("#dtnSvAnsvarligSokerFile").trigger("click");
    }
    else {
        alert("Please Select PDF file type");
        return false;
    }
})
function SubmitBtnAnsvarligPdfReplace(data) {
    debugger;
    var ids = data.id;
    var IdDocSplit = ids.split('--');
    var IdDoc = IdDocSplit[1];
    var fileID = "#UploaderCntrAnsvarligPdfReplace--" + IdDoc;
    var TriggerBtnID = "#TriggerBtnAnsvarligPdfReplace--" + IdDoc;
    var fileOrignal = $(fileID);
    var fileName = $(fileID).val();


    if (fileName.length == 0) {
        alert("Please chose file");
        return false;
    }

    if (fileOrignal[0].files[0].type == "application/pdf") {
        $(TriggerBtnID).trigger("click");
    }
    else {
        alert("Please Select PDF file type");
        return false;
    }

}

//Deletes Uploaded Docs from document panel
function DeleteDocument(ID, ProjectID) {
    debugger;
    var r = confirm("Are you sure!");

    if (r == true) {

        var url = '/Project/ProjectDocDelete?id=' + ID + '&proid=' + ProjectID + '';
        window.location.href = url;
    }
    return false;
}