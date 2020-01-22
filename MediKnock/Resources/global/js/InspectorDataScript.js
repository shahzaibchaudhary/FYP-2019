$(document).ready(function () {
    
    var projectId = $('#hdPrId').val();


    $(".mfp-container").click(function () {
        debugger;
        $("#ImageEnlargeDiv").hide();
    })
    

    function EditCommentProject()
    {
        debugger;
        //Edit project inspector comments
        var innerText = $("#editInspComment")[0].innerText
        $("#txtCom").val(innerText);
        
    }

    $('#btnEditInspProDesc').click(function () {
        debugger;
        var DescriptionText = $("#txtProDesc").val();
        if (DescriptionText == "") {
            alert("Description can not be empty");
            return false;
        }
        callAjaxMethodForProjectDescription(projectId, DescriptionText);
        $("#editInspProDesc")[0].innerText = DescriptionText;
        alert("Saved");
    })
   
    $('#btnEditInspComment').click(function () {
        debugger;
        var commentText = $("#txtCom").val();
        if (commentText == "")
        {
            alert("Comment can not be empty");
            return false;
        }
        callAjaxMethodForProjectComment(projectId, commentText);
        $("#editInspComment")[0].innerText = commentText;
        alert("Seaved");
    })
    

    //Edit Project Checklist
    $('#btnEditInspChecklist').click(function () {
        debugger;
       
        alert("Saved");

    })
    

    //Edit Project Image Function
    $("#btnSaveImage").click(function () {
        debugger;
        var input = document.getElementById("file");

        file = input.files[0];
        if (file != undefined) {
            var formData = new FormData();

            if (!!file.type.match(/image.*/)) {
                //
                var totalFiles = document.getElementById("file").files.length;
                for (var i = 0; i < totalFiles; i++) {
                    var file = document.getElementById("file").files[i];

                    formData.append("imageUploadForm", file);
                }
                //
                //formData.append("image", file);
                $.ajax({
                    url: "/Project/Upload",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        debugger;
                        callAjaxMethodForProjectImage(projectId, response);
                        //projectImageLi
                        debugger;
                        var urlimg = '/Resources/ProjectSiteImages/' + response;
                        //Create HTML for ProjectImage
                        $('#projectImageLi')[0].innerHTML = "";
                        var innerDivHtml = "<img id='proImage' alt='gallery 3' onclick='showProjectImage()' class='img-responsive' src='" + urlimg + "' data-src=''>";
                        $('#projectImageLi').append(innerDivHtml);
                        alert("Saved");
                    }
                });
            } else {
                alert('Not a valid image!');
            }
        } else {
            alert('Input something!');
        }


        //var imagePath = $("#file").val();
        //var imagep = $('#file').context.forms[0].childNodes[5].childNodes[1].childNodes[1].childNodes[5].childNodes[0].currentSrc;

        // var imageSrc = $('#file').context.forms[0].childNodes[5].childNodes[1].childNodes[1].childNodes[5].childNodes[0].currentSrc;
        return false;
    })


    function uploadFile() {
        debugger;

    }

    //Web servise called for project comment edit
    function callAjaxMethodForProjectComment(projectId, Comment) {
        debugger;
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/InspectorDataProjectComment',

            data: '{ projectId: "' + projectId + '", Comment: "' + Comment + '"}',

            contentType: "application/json; charset=utf-8",

            async: false,

            dataType: "json",

            success: function (response) {
                debugger;
                var ServiceResponse = response.d.toString();

            },
            failure: function (response) {
                alert("Service Failed");
            }

        });
    }
    //End

    //Web servise called for project image edit
    function callAjaxMethodForProjectImage(projectId, imageNameResp) {
        debugger;
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/InspectorDataProjectImage',

            data: '{ projectId: "' + projectId + '", imageNameResp: "' + imageNameResp + '"}',

            contentType: "application/json; charset=utf-8",

            async: false,

            dataType: "json",

            success: function (response) {
                debugger;
                var ServiceResponse = response.d.toString();

            },
            failure: function (response) {
                alert("Service Failed");
            }

        });
    }
    //End

    //Web servise called for project description edit
    function callAjaxMethodForProjectDescription(projectId, Description) {
        debugger;
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/InspectorDataProjectDescription',

            data: '{ projectId: "' + projectId + '", Description: "' + Description + '"}',

            contentType: "application/json; charset=utf-8",

            async: false,

            dataType: "json",

            success: function (response) {
                debugger;
                var ServiceResponse = response;

            },
            failure: function (response) {
                alert("Service Failed");
            }

        });
    }
    //End

})

function SaveChecklistEdit(data) 
{
    
    debugger;
    var SaveId = data.id;
    var splitSaveId = SaveId.split('-');
    var DevOrSimple = splitSaveId[0];
    var checklistId = splitSaveId[1];
    var checklistItemId = splitSaveId[2];
    
    var DevOrNot = DevOrSimple.substring(0, 3);
    //Checking status of main body
    var Check_listStatusMainBody = "";
    var Check_TextChecklistStatusMainBody = "";
    //Checking status of Dev Panel
    var Check_DevChecklistStatusMainBody = "";
    var Check_DevTextChecklistStatusMainBody = "";
    var ModelPopUpCloseBtnId = "#ModelPopUpCloseBtnId-" + checklistId + "-" + checklistItemId;
    var Dev_ModelPopUpCloseBtnId = "#DevModelPopUpCloseBtnId-" + checklistId + "-" + checklistItemId;
    if (DevOrNot != "Dev") {
        //Main
        Check_listStatusMainBody = "#ChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        Check_TextChecklistStatusMainBody = $(Check_listStatusMainBody)[0].innerText
    }
    else {
        //Dev Panel
        Check_DevChecklistStatusMainBody = "#DevChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        Check_DevTextChecklistStatusMainBody = $(Check_DevChecklistStatusMainBody)[0].innerText
    }

    //Radio button status
    //For Case: Its Normal Edit
    var Check_radioButtionId = "";
    var Check_ChecklistStatusEditBoxID = "";
    var Check_radioButtonCheckedValue = "";

    //For Case: Its From Dev Panel
    var Check_DevRadioButtionId = "";
    var Check_DevChecklistStatusEditBoxID = "";
    var Check_DevRadioButtonCheckedValue = "";
    if (DevOrNot != "Dev")
    {
        //Box
        Check_radioButtionId = "radio-" + checklistId + "-" + checklistItemId;
        Check_ChecklistStatusEditBoxID = "ChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        Check_radioButtonCheckedValue = $('input:radio[name=' + Check_radioButtionId + ']:checked').val();
    }
    else
    {
        Check_DevRadioButtionId = "Devradio-" + checklistId + "-" + checklistItemId;
        Check_DevChecklistStatusEditBoxID = "DevChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        Check_DevRadioButtonCheckedValue = $('input:radio[name=' + Check_DevRadioButtionId + ']:checked').val();
    }
    debugger;
    var fsdsdfsdf = 99;
    if (DevOrNot != "Dev" && Check_TextChecklistStatusMainBody != "Dev" && Check_radioButtonCheckedValue != 2) 
    {
        //Normal Checklist item edit 
        //Comments
        //Main
        var CommentId = "#ChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(CommentId)[0].innerText
        //Box
        var CommentIdBox = "#ChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var commentBoxText = $(CommentIdBox)[0].value;


        //Status Radio button
        //Main
        var ChecklistStatusEdit = "#ChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(ChecklistStatusEdit)[0].innerText
        //Box
        var radioButtionId = "radio-" + checklistId + "-" + checklistItemId;
        var ChecklistStatusEditBoxID = "ChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var radioButtonCheckedValue = $('input:radio[name=' + radioButtionId + ']:checked').val();
        //if (radioButtonCheckedValue == 3)
        //{

        //    var r = confirm("Selecting N/A will delete all the images from this checklist item. Are you sure");
        //    if (r == false) {
        //        return false;
        //    }
        //}

        //ImageGallery
        //Main & Box

        var ImageContainer = "#ImageContainer-" + checklistId + "-" + checklistItemId;
        var ImageContainerBox = "#ImageContainerBox-" + checklistId + "-" + checklistItemId;

        //ImageUploader
        var uploaderId = "#PicHolderId-" + checklistId + "-" + checklistItemId;
        var imagesFile = $(uploaderId);
        var formData = null;
        var file = imagesFile[0].files;
        if (file != undefined) {
            if (file.length > 0) {
                if (radioButtonCheckedValue == 3) {

                    var r = confirm("Images will not be saved because status is selected as N/A");
                    if (r == false) {
                        return false;
                    }
                }
                if (radioButtonCheckedValue != 3) {

                    formData = new FormData();
                    var totalFiles = file.length;
                    for (var i = 0; i < totalFiles; i++) {
                        if (!!file[i].type.match(/image.*/)) {
                            var fileSingle = file[i];
                            formData.append("imageUploadForm", fileSingle);
                        }
                    }
                    $.ajax({
                        url: "/Project/InspUploadChecklistImages?id=" + checklistItemId + "",
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            debugger;
                            imagesFile.val('').replaceWith(imagesFile = imagesFile.clone(true));
                            var ServiceResponse = response;
                            var splitImageNames = ServiceResponse.split('###');
                            var totalImages = splitImageNames.length;
                            for (var i = 0; i < totalImages; i++) {
                                var iSplit = splitImageNames[i].split('***');
                                var imageNameNew = iSplit[0];
                                var imageIdNew = iSplit[1];
                                var classDivImageDel = "DeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                var imageChecklistBox = "DivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                var ImageDeleteDivId = "DeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                //Main Image tags
                                var imageChecklistMain = "DivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                var ImageDeleteDivIdMain = "DeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;

                                //HtmlForBoxImages
                                var htmlForImages = "";
                                htmlForImages += '<div class="' + classDivImageDel + '">';
                                htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                htmlForImages += '</div></div></div>';
                                // Html for Main images
                                var HtmlForImagesMain = "";
                                HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                HtmlForImagesMain += '</div></div></div>';

                                $(ImageContainerBox).append(htmlForImages);
                                $(ImageContainer).append(HtmlForImagesMain);


                            }


                            //callAjaxMethodForProjectImage(projectId, response);
                            ////projectImageLi
                            //debugger;
                            //var urlimg = '/Resources/ProjectSiteImages/' + response;
                            ////Create HTML for ProjectImage
                            //$('#projectImageLi')[0].innerHTML = "";
                            //var innerDivHtml = "<img id='proImage' alt='gallery 3' onclick='showProjectImage()' class='img-responsive' src='" + urlimg + "' data-src=''>";
                            //$('#projectImageLi').append(innerDivHtml);

                        }
                    });
                }

            }
        }

        debugger;
        //Content save
        $.ajax({

            type: "POST",

            url: '/WebServices/ServicePage.asmx/InspectorDataChecklistContent',

            data: '{ commentBoxText: "' + commentBoxText + '", radioButtonCheckedValue: "' + radioButtonCheckedValue + '", checklistItemId: "' + checklistItemId + '"}',

            contentType: "application/json; charset=utf-8",

            async: false,

            dataType: "json",

            success: function (response) {
                debugger;
                var ServiceResponse = response;

                $(CommentId)[0].innerText = commentBoxText;
                $(CommentIdBox)[0].value = commentBoxText;
                if (radioButtonCheckedValue == "1") {
                    $(ChecklistStatusEdit)[0].innerText = "OK";
                }
                else if (radioButtonCheckedValue == "2") {
                    $(ChecklistStatusEdit)[0].innerText = "Dev";
                }
                else if (radioButtonCheckedValue == "3") {
                    $(ChecklistStatusEdit)[0].innerText = "N/A";

                    $(ImageContainerBox)[0].innerHTML = "";
                    $(ImageContainer)[0].innerHTML = "";
                }


            },
            failure: function (response) {
                alert("Service Failed");
            }

        });
        //alert("Checklist Edited");
    }
    //else if (DevOrNot == "Dev" && Check_DevTextChecklistStatusMainBody == "Dev") // && Check_DevRadioButtonCheckedValue == 2
    //{
    //    //Dev Fixing code here
    //    debugger;
    //    alert("Its a dev");


    //}
    else if (DevOrNot != "Dev" && Check_TextChecklistStatusMainBody == "Dev" && Check_radioButtonCheckedValue == 2) // && Check_DevRadioButtonCheckedValue == 2
    {
        //from normal panel dev to dev
        debugger;
        //alert("from normal panel dev to dev");
        //Comments
        //Main
        var CommentId = "#ChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(CommentId)[0].innerText
        // Main - Dev Panel
        var Dev_CommentId = "#DevChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        var Dev_CommentIdNoHash = "DevChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        //$(Dev_CommentId)[0].innerText

        //Box
        var CommentIdBox = "#ChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var commentBoxText = $(CommentIdBox)[0].value;
        //Box - Dev Panel 
        var Dev_CommentIdBox = "#DevChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var Dev_CommentIdBoxNoHash = "DevChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        //var Dev_commentBoxText = $(Dev_CommentIdBox)[0].value;

        //Status Radio button
        //Main
        var ChecklistStatusEdit = "#ChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(ChecklistStatusEdit)[0].innerText
        //Main - Dev panel
        var Dev_ChecklistStatusEdit = "#DevChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistStatusEditNoHash = "DevChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        //$(Dev_ChecklistStatusEdit)[0].innerText

        //Box
        var radioButtionId = "radio-" + checklistId + "-" + checklistItemId;
        var ChecklistStatusEditBoxID = "ChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var radioButtonCheckedValue = $('input:radio[name=' + radioButtionId + ']:checked').val();
        //Box - Dev panel
        debugger;
        var Dev_radioButtionId = "Devradio-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistStatusEditBoxID = "DevChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        // var Dev_radioButtonCheckedValue = $('input:radio[name=' + Dev_radioButtionId + ']:checked').val();

        //ImageGallery
        //Main & Box
        var ImageContainer = "#ImageContainer-" + checklistId + "-" + checklistItemId;
        var ImageContainerBox = "#ImageContainerBox-" + checklistId + "-" + checklistItemId;
        //Main & Box - Dev panel
        var Dev_ImageContainer = "#DevImageContainer-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerNoHash = "DevImageContainer-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerBox = "#DevImageContainerBox-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerBoxNoHash = "DevImageContainerBox-" + checklistId + "-" + checklistItemId;

        //Dev panel checklist HTML Container
        var Dev_PanelChecklistContainer = "#DevPanelChecklistContainer";

        //Color change background
        //Normal panel
        var checklistExpandBgColorDev = "#collapseBgColor-" + checklistId;
        var checklistNameTitle = $(checklistExpandBgColorDev).text();
        var NormalChecklistQuestionID = "#NormalChecklistQuestion-" + checklistId + "-" + checklistItemId;
        var NormalChecklistQuestion = $(NormalChecklistQuestionID).text();
        //Dev panel
        var NormalpanelBgColorChange = "#innerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        var DevpanelBgColorChange = "#DevinnerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        var DevpanelBgColorChangeNoHash = "DevinnerPanelChecklistBody-" + checklistId + "-" + checklistItemId;

        //Dev panel PopUpModelId 
        var DevmodalfooterEditCheckItem = "DevmodalfooterEditCheckItem" + checklistId + "-" + checklistItemId;
        var DevmodalfooterEditCheckItemHash = "#DevmodalfooterEditCheckItem" + checklistId + "-" + checklistItemId;
        //tAGS html bOX dEV
        var DevinnerPanelChecklistBodyBox = "DevinnerPanelChecklistBodyBox-" + checklistId + "-" + checklistItemId;
        var DEV_ChecklistInnerExpand = "Devcollapse-" + checklistId;
        var Dev_formChecklistIdBox = "DevFormChecklistItem" + ChecklistInnerExpand;

        debugger;
        //Make html for new Dev in Dev panel START
        //Tags & IDs
        var ChecklistInnerExpand = "collapse-" + checklistId;
        var htmlAppendChecklistMain = "#htmlAppendChecklist" + "-" + checklistId + "-" + checklistItemId;
        var formChecklistId = "FormChecklistItem" + ChecklistInnerExpand;
        var formPictureHolderId = "DevPicHolderId-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistEditSaveId = "DevSaveChecklist-" + checklistId + "-" + checklistItemId;

        //Get all images from DB
        var HtmlForImagesMainDevPanelMain = "";
        var htmlForImagesDevPanelBox = "";
        var iiii = 2;
        
        ///////////////////////////////////////////////////////Ends

        //Main images html

        //$(Dev_PanelChecklistContainer).append(HTMLChecklistReplace);


        //Make html for new Dev in Dev panel END
        if (iiii == 2) {
            //ImageUploader
            var uploaderId = "#PicHolderId-" + checklistId + "-" + checklistItemId;
            var imagesFile = $(uploaderId);
            var formData = null;
            var file = imagesFile[0].files;
            if (file != undefined) {
                if (file.length > 0) {
                    if (radioButtonCheckedValue == 3) {
                        var r = confirm("Images will not be saved because status is selected as N/A");
                        if (r == false) {
                            return false;
                        }
                    }
                    if (radioButtonCheckedValue != 3) {
                        formData = new FormData();
                        var totalFiles = file.length;
                        for (var i = 0; i < totalFiles; i++) {
                            if (!!file[i].type.match(/image.*/)) {
                                var fileSingle = file[i];
                                formData.append("imageUploadForm", fileSingle);
                            }
                        }
                        $.ajax({
                            url: "/Project/InspUploadChecklistImages?id=" + checklistItemId + "",
                            type: "POST",
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (response) {
                                debugger;
                                imagesFile.val('').replaceWith(imagesFile = imagesFile.clone(true));
                                var ServiceResponse = response;
                                var splitImageNames = ServiceResponse.split('###');
                                var totalImages = splitImageNames.length;
                                for (var i = 0; i < totalImages; i++) {
                                    var iSplit = splitImageNames[i].split('***');
                                    var imageNameNew = iSplit[0];
                                    var imageIdNew = iSplit[1];
                                    if (1 == 1) {
                                        var classDivImageDel = "DeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var imageChecklistBox = "DivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivId = "DeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //Main Image tags
                                        var imageChecklistMain = "DivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivIdMain = "DeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //HtmlForBoxImages
                                        var htmlForImages = "";
                                        htmlForImages += '<div class="' + classDivImageDel + '">';
                                        htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                        htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                        htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        htmlForImages += '</div></div></div>';
                                        // Html for Main images
                                        var HtmlForImagesMain = "";
                                        HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                        HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                        HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                        HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        HtmlForImagesMain += '</div></div></div>';
                                        $(ImageContainerBox).append(htmlForImages);
                                        $(ImageContainer).append(HtmlForImagesMain);
                                    }
                                    if (1 == 1) {
                                        //For dev panel
                                        var classDivImageDel = "DevDeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var imageChecklistBox = "DevDivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivId = "DevDeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //Main Image tags
                                        var imageChecklistMain = "DevDivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivIdMain = "DevDeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //HtmlForBoxImages
                                        var htmlForImages = "";
                                        htmlForImages += '<div class="' + classDivImageDel + '">';
                                        htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                        htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                        htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        htmlForImages += '</div></div></div>';
                                        // Html for Main images
                                        var HtmlForImagesMain = "";
                                        HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                        HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                        HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                        HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        HtmlForImagesMain += '</div></div></div>';
                                        $(Dev_ImageContainerBox).append(htmlForImages);
                                        $(Dev_ImageContainer).append(HtmlForImagesMain);
                                    }
                                }
                            }
                        });
                    }
                }
            }
            iiii++;
        }
        debugger;
        if (iiii == 3) {
            //Content save
            $.ajax({
                type: "POST",
                url: '/WebServices/ServicePage.asmx/InspectorDataChecklistContent',
                data: '{ commentBoxText: "' + commentBoxText + '", radioButtonCheckedValue: "' + radioButtonCheckedValue + '", checklistItemId: "' + checklistItemId + '"}',
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function (response) {
                    debugger;
                    var ServiceResponse = response;
                    $(CommentId)[0].innerText = commentBoxText;
                    $(CommentIdBox)[0].value = commentBoxText;
                    if (radioButtonCheckedValue == "1") {
                        $(ChecklistStatusEdit)[0].innerText = "OK";
                    }
                    else if (radioButtonCheckedValue == "2") {
                        $(ChecklistStatusEdit)[0].innerText = "Dev";
                    }
                    else if (radioButtonCheckedValue == "3") {
                        $(ChecklistStatusEdit)[0].innerText = "N/A";
                        $(ImageContainerBox)[0].innerHTML = "";
                        $(ImageContainer)[0].innerHTML = "";
                    }
                    //Dev panel 
                    $(Dev_CommentId)[0].innerText = commentBoxText;
                    $(Dev_CommentIdBox)[0].value = commentBoxText;
                    //if (radioButtonCheckedValue == "1") {
                    //    $(Dev_ChecklistStatusEdit)[0].innerText = "OK";
                    //}
                    //else if (radioButtonCheckedValue == "2") {
                    //    $(Dev_ChecklistStatusEdit)[0].innerText = "Dev";
                    //}
                    //else if (radioButtonCheckedValue == "3") {
                    //    $(Dev_ChecklistStatusEdit)[0].innerText = "N/A";
                    //    $(Dev_ImageContainerBox)[0].innerHTML = "";
                    //    $(Dev_ImageContainer)[0].innerHTML = "";
                    //}
                    debugger;
                    $(DevpanelBgColorChange).css('background-color', 'antiquewhite');
                    $(NormalpanelBgColorChange).css('background-color', 'antiquewhite');
                    $(checklistExpandBgColorDev).css('background-color', 'antiquewhite');

                    //$(DevpanelBgColorChange)[0].style.backgroundColor = "#F0F4F8";     //REACHED BG COLOR
                },
                failure: function (response) {
                    alert("Service Failed");
                }
            });
        }
        //alert("Checklist Edited");
        $(ModelPopUpCloseBtnId).trigger("click");
    }
    else if (DevOrNot != "Dev" && Check_TextChecklistStatusMainBody == "Dev" && Check_radioButtonCheckedValue != 2) // && Check_DevRadioButtonCheckedValue == 2
    {
        //from normal panel dev to normal
        debugger;
        //alert("from normal panel dev to normal");
        //Comments
        //Main
        var CommentId = "#ChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(CommentId)[0].innerText
        // Main - Dev Panel
        var Dev_CommentId = "#DevChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        var Dev_CommentIdNoHash = "DevChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        //$(Dev_CommentId)[0].innerText

        //Box
        var CommentIdBox = "#ChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var commentBoxText = $(CommentIdBox)[0].value;
        //Box - Dev Panel 
        var Dev_CommentIdBox = "#DevChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var Dev_CommentIdBoxNoHash = "DevChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        //var Dev_commentBoxText = $(Dev_CommentIdBox)[0].value;

        //Status Radio button
        //Main
        var ChecklistStatusEdit = "#ChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(ChecklistStatusEdit)[0].innerText
        //Main - Dev panel
        var Dev_ChecklistStatusEdit = "#DevChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistStatusEditNoHash = "DevChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        //$(Dev_ChecklistStatusEdit)[0].innerText

        //Box
        var radioButtionId = "radio-" + checklistId + "-" + checklistItemId;
        var ChecklistStatusEditBoxID = "ChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var radioButtonCheckedValue = $('input:radio[name=' + radioButtionId + ']:checked').val();
        //Box - Dev panel
        debugger;
        var Dev_radioButtionId = "Devradio-" + checklistId + "-" + checklistItemId;
        var Dev_radioButtionIdHash = "#Devradio-" + checklistId + "-" + checklistItemId;
        var radioChecklistItemID = "#DevradioId-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistStatusEditBoxID = "DevChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var $Devradios = $('input:radio[name=' + Dev_radioButtionId + ']');
        
        // var Dev_radioButtonCheckedValue = $('input:radio[name=' + Dev_radioButtionId + ']:checked').val();

        //ImageGallery
        //Main & Box
        var ImageContainer = "#ImageContainer-" + checklistId + "-" + checklistItemId;
        var ImageContainerBox = "#ImageContainerBox-" + checklistId + "-" + checklistItemId;
        //Main & Box - Dev panel
        var Dev_ImageContainer = "#DevImageContainer-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerNoHash = "DevImageContainer-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerBox = "#DevImageContainerBox-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerBoxNoHash = "DevImageContainerBox-" + checklistId + "-" + checklistItemId;

        //Dev panel checklist HTML Container
        var Dev_PanelChecklistContainer = "#DevPanelChecklistContainer";

        //Color change background
        //Normal panel
        var checklistExpandBgColorDev = "#collapseBgColor-" + checklistId;
        var checklistNameTitle = $(checklistExpandBgColorDev).text();
        var NormalChecklistQuestionID = "#NormalChecklistQuestion-" + checklistId + "-" + checklistItemId;
        var NormalChecklistQuestion = $(NormalChecklistQuestionID).text();
        //Dev panel
        var NormalpanelBgColorChange = "#innerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        var DevpanelBgColorChange = "#DevinnerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        var DevpanelBgColorChangeNoHash = "DevinnerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        //For Color change if images uploaded by party
        var PartyUploadedImageOrNotID = ".PartyUploadedImageOrNotID-" + checklistId + "-" + checklistItemId;
        var TextIfItsUploadedByParty = $(PartyUploadedImageOrNotID).val();

        

        //Dev panel PopUpModelId 
        var DevmodalfooterEditCheckItem = "DevmodalfooterEditCheckItem" + checklistId + "-" + checklistItemId;
        var DevmodalfooterEditCheckItemHash = "#DevmodalfooterEditCheckItem" + checklistId + "-" + checklistItemId;
        //tAGS html bOX dEV
        var DevinnerPanelChecklistBodyBox = "DevinnerPanelChecklistBodyBox-" + checklistId + "-" + checklistItemId;
        var DEV_ChecklistInnerExpand = "Devcollapse-" + checklistId;
        var Dev_formChecklistIdBox = "DevFormChecklistItem" + ChecklistInnerExpand;

        debugger;
        //Make html for new Dev in Dev panel START
        //Tags & IDs
        var ChecklistInnerExpand = "collapse-" + checklistId;
        var htmlAppendChecklistMain = "#htmlAppendChecklist" + "-" + checklistId + "-" + checklistItemId;
        var formChecklistId = "FormChecklistItem" + ChecklistInnerExpand;
        var formPictureHolderId = "DevPicHolderId-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistEditSaveId = "DevSaveChecklist-" + checklistId + "-" + checklistItemId;

        //Get all images from DB
        var HtmlForImagesMainDevPanelMain = "";
        var htmlForImagesDevPanelBox = "";
        var iiii = 2;

        ///////////////////////////////////////////////////////Ends

        //Main images html

        //$(Dev_PanelChecklistContainer).append(HTMLChecklistReplace);


        //Make html for new Dev in Dev panel END
        if (iiii == 2) {
            //ImageUploader
            var uploaderId = "#PicHolderId-" + checklistId + "-" + checklistItemId;
            var imagesFile = $(uploaderId);
            var formData = null;
            var file = imagesFile[0].files;
            if (file != undefined) {
                if (file.length > 0) {
                    if (radioButtonCheckedValue == 3) {
                        var r = confirm("Images will not be saved because status is selected as N/A");
                        if (r == false) {
                            return false;
                        }
                    }
                    if (radioButtonCheckedValue != 3) {
                        formData = new FormData();
                        var totalFiles = file.length;
                        for (var i = 0; i < totalFiles; i++) {
                            if (!!file[i].type.match(/image.*/)) {
                                var fileSingle = file[i];
                                formData.append("imageUploadForm", fileSingle);
                            }
                        }
                        $.ajax({
                            url: "/Project/InspUploadChecklistImages?id=" + checklistItemId + "",
                            type: "POST",
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (response) {
                                debugger;
                                imagesFile.val('').replaceWith(imagesFile = imagesFile.clone(true));
                                var ServiceResponse = response;
                                var splitImageNames = ServiceResponse.split('###');
                                var totalImages = splitImageNames.length;
                                for (var i = 0; i < totalImages; i++) {
                                    var iSplit = splitImageNames[i].split('***');
                                    var imageNameNew = iSplit[0];
                                    var imageIdNew = iSplit[1];
                                    if (1 == 1) {
                                        var classDivImageDel = "DeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var imageChecklistBox = "DivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivId = "DeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //Main Image tags
                                        var imageChecklistMain = "DivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivIdMain = "DeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //HtmlForBoxImages
                                        var htmlForImages = "";
                                        htmlForImages += '<div class="' + classDivImageDel + '">';
                                        htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                        htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                        htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        htmlForImages += '</div></div></div>';
                                        // Html for Main images
                                        var HtmlForImagesMain = "";
                                        HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                        HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                        HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                        HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        HtmlForImagesMain += '</div></div></div>';
                                        $(ImageContainerBox).append(htmlForImages);
                                        $(ImageContainer).append(HtmlForImagesMain);
                                    }
                                    if (1 == 1) {
                                        //For dev panel
                                        var classDivImageDel = "DevDeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var imageChecklistBox = "DevDivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivId = "DevDeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //Main Image tags
                                        var imageChecklistMain = "DevDivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivIdMain = "DevDeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //HtmlForBoxImages
                                        var htmlForImages = "";
                                        htmlForImages += '<div class="' + classDivImageDel + '">';
                                        htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                        htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                        htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        htmlForImages += '</div></div></div>';
                                        // Html for Main images
                                        var HtmlForImagesMain = "";
                                        HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                        HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                        HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                        HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        HtmlForImagesMain += '</div></div></div>';
                                        $(Dev_ImageContainerBox).append(htmlForImages);
                                        $(Dev_ImageContainer).append(HtmlForImagesMain);
                                    }
                                }
                            }
                        });
                    }
                }
            }
            iiii++;
        }
        debugger;
        if (iiii == 3) {
            //Content save
            $.ajax({
                type: "POST",
                url: '/WebServices/ServicePage.asmx/InspectorDataChecklistContent',
                data: '{ commentBoxText: "' + commentBoxText + '", radioButtonCheckedValue: "' + radioButtonCheckedValue + '", checklistItemId: "' + checklistItemId + '"}',
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function (response) {
                    debugger;
                    var ServiceResponse = response.d;
                    $(CommentId)[0].innerText = commentBoxText;
                    $(CommentIdBox)[0].value = commentBoxText;
                    if (radioButtonCheckedValue == "1") {
                        $(ChecklistStatusEdit)[0].innerText = "OK";
                    }
                    else if (radioButtonCheckedValue == "2") {
                        $(ChecklistStatusEdit)[0].innerText = "Dev";
                    }
                    else if (radioButtonCheckedValue == "3") {
                        $(ChecklistStatusEdit)[0].innerText = "N/A";
                        $(ImageContainerBox)[0].innerHTML = "";
                        $(ImageContainer)[0].innerHTML = "";
                    }
                    //Color change
                    debugger;
                    $(DevpanelBgColorChange).css('background-color', '#F0F4F8');
                    if (typeof TextIfItsUploadedByParty !== "undefined" && TextIfItsUploadedByParty == "Y") {
                        $(PartyUploadedImageOrNotID).val("N");
                        //$(DevpanelBgColorChange).css('background-color', 'moccasin');
                    }
                    $(NormalpanelBgColorChange).css('background-color', '#F0F4F8');
                    if (ServiceResponse != "0") {
                        $(checklistExpandBgColorDev).css('background-color', 'antiquewhite');
                    }
                    else {
                        $(checklistExpandBgColorDev).css('background-color', '#ffffff');
                        
                    }
                    //alert("Checklist Edited");
                    $(ModelPopUpCloseBtnId).trigger("click");
                    //Dev panel 
                    $(Dev_CommentId)[0].innerText = commentBoxText;
                    $(Dev_CommentIdBox)[0].value = commentBoxText;
                    if (radioButtonCheckedValue == "1") {
                        $(Dev_ChecklistStatusEdit)[0].innerText = "OK";
                        if ($Devradios != undefined) {
                            $Devradios[0].parentElement.attributes.class.nodeValue = "iradio_square-blue checked hover";
                            $Devradios[1].parentElement.attributes.class.nodeValue = "iradio_square-blue";
                        }
                    }
                    else if (radioButtonCheckedValue == "2") {
                        $(Dev_ChecklistStatusEdit)[0].innerText = "Dev";
                    }
                    else if (radioButtonCheckedValue == "3") {
                        $(Dev_ChecklistStatusEdit)[0].innerText = "N/A";
                        $(Dev_ImageContainerBox)[0].innerHTML = "";
                        $(Dev_ImageContainer)[0].innerHTML = "";
                        if ($Devradios != undefined) {
                            $Devradios[2].parentElement.attributes.class.nodeValue = "iradio_square-blue checked hover";
                            $Devradios[1].parentElement.attributes.class.nodeValue = "iradio_square-blue";
                        }
                    }
                    
                    //white #ffffff
                    //$(DevpanelBgColorChange)[0].style.backgroundColor = "#F0F4F8";     //REACHED BG COLOR
                },
                failure: function (response) {
                    alert("Service Failed");
                }
            });
        }
        

    }
    else if (DevOrNot == "Dev" && Check_DevTextChecklistStatusMainBody == "Dev" && Check_DevRadioButtonCheckedValue == 2) // && Check_DevRadioButtonCheckedValue == 2
    {
        //from dev panel dev to dev status already
        debugger;
        //alert("from dev panel dev to dev status already");
        //Comments
        //Main
        var CommentId = "#ChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(CommentId)[0].innerText
        // Main - Dev Panel
        var Dev_CommentId = "#DevChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(Dev_CommentId)[0].innerText

        //Box
        var CommentIdBox = "#ChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var commentBoxText = $(CommentIdBox)[0].value;
        //Box - Dev Panel
        var Dev_CommentIdBox = "#DevChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var Dev_commentBoxText = $(Dev_CommentIdBox)[0].value;

        //Status Radio button
        //Main
        var ChecklistStatusEdit = "#ChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(ChecklistStatusEdit)[0].innerText
        //Main - Dev panel
        var Dev_ChecklistStatusEdit = "#DevChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(Dev_ChecklistStatusEdit)[0].innerText

        //Box
        var radioButtionId = "radio-" + checklistId + "-" + checklistItemId;
        var ChecklistStatusEditBoxID = "ChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var radioButtonCheckedValue = $('input:radio[name=' + radioButtionId + ']:checked').val();
        //Box - Dev panel
        var Dev_radioButtionId = "Devradio-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistStatusEditBoxID = "DevChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var Dev_radioButtonCheckedValue = $('input:radio[name=' + Dev_radioButtionId + ']:checked').val();

        //ImageGallery
        //Main & Box
        var ImageContainer = "#ImageContainer-" + checklistId + "-" + checklistItemId;
        var ImageContainerBox = "#ImageContainerBox-" + checklistId + "-" + checklistItemId;
        //Main & Box - Dev panel
        var Dev_ImageContainer = "#DevImageContainer-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerBox = "#DevImageContainerBox-" + checklistId + "-" + checklistItemId;

        //Color change background
        //Dev panel
        var NormalpanelBgColorChange = "#innerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        var DevpanelBgColorChange = "#DevinnerPanelChecklistBody-" + checklistId + "-" + checklistItemId;

        //Main
        var checklistExpandBgColorDev = "#collapseBgColor-" + checklistId;

        debugger;
        //ImageUploader
        var uploaderId = "#DevPicHolderId-" + checklistId + "-" + checklistItemId;
        var imagesFile = $(uploaderId);
        var formData = null;
        var file = imagesFile[0].files;
        if (file != undefined) {
            if (file.length > 0) {
                if (Dev_radioButtonCheckedValue == 3) {
                    var r = confirm("Images will not be saved because status is selected as N/A");
                    if (r == false) {
                        return false;
                    }
                }
                if (Dev_radioButtonCheckedValue != 3) {
                    formData = new FormData();
                    var totalFiles = file.length;
                    for (var i = 0; i < totalFiles; i++) {
                        if (!!file[i].type.match(/image.*/)) {
                            var fileSingle = file[i];
                            formData.append("imageUploadForm", fileSingle);
                        }
                    }
                    $.ajax({
                        url: "/Project/InspUploadChecklistImages?id=" + checklistItemId + "",
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            debugger;
                            imagesFile.val('').replaceWith(imagesFile = imagesFile.clone(true));
                            var ServiceResponse = response;
                            var splitImageNames = ServiceResponse.split('###');
                            var totalImages = splitImageNames.length;
                            for (var i = 0; i < totalImages; i++) {
                                var iSplit = splitImageNames[i].split('***');
                                var imageNameNew = iSplit[0];
                                var imageIdNew = iSplit[1];
                                if (1 == 1) {
                                    var classDivImageDel = "DeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var imageChecklistBox = "DivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivId = "DeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //Main Image tags
                                    var imageChecklistMain = "DivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivIdMain = "DeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //HtmlForBoxImages
                                    var htmlForImages = "";
                                    htmlForImages += '<div class="' + classDivImageDel + '">';
                                    htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                    htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                    htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    htmlForImages += '</div></div></div>';
                                    // Html for Main images
                                    var HtmlForImagesMain = "";
                                    HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                    HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                    HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                    HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    HtmlForImagesMain += '</div></div></div>';
                                    $(ImageContainerBox).append(htmlForImages);
                                    $(ImageContainer).append(HtmlForImagesMain);
                                }
                                if (1 == 1) {
                                    //For dev panel
                                    var classDivImageDel = "DevDeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var imageChecklistBox = "DevDivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivId = "DevDeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //Main Image tags
                                    var imageChecklistMain = "DevDivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivIdMain = "DevDeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //HtmlForBoxImages
                                    var htmlForImages = "";
                                    htmlForImages += '<div class="' + classDivImageDel + '">';
                                    htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                    htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                    htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    htmlForImages += '</div></div></div>';
                                    // Html for Main images
                                    var HtmlForImagesMain = "";
                                    HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                    HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                    HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                    HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    HtmlForImagesMain += '</div></div></div>';
                                    $(Dev_ImageContainerBox).append(htmlForImages);
                                    $(Dev_ImageContainer).append(HtmlForImagesMain);
                                }
                            }
                            //callAjaxMethodForProjectImage(projectId, response);
                            ////projectImageLi
                            //debugger;
                            //var urlimg = '/Resources/ProjectSiteImages/' + response;
                            ////Create HTML for ProjectImage
                            //$('#projectImageLi')[0].innerHTML = "";
                            //var innerDivHtml = "<img id='proImage' alt='gallery 3' onclick='showProjectImage()' class='img-responsive' src='" + urlimg + "' data-src=''>";
                            //$('#projectImageLi').append(innerDivHtml);
                        }
                    });
                }
            }
        }
        debugger;
        //Content save
        $.ajax({
            type: "POST",
            url: '/WebServices/ServicePage.asmx/InspectorDataChecklistContent',
            data: '{ commentBoxText: "' + Dev_commentBoxText + '", radioButtonCheckedValue: "' + Dev_radioButtonCheckedValue + '", checklistItemId: "' + checklistItemId + '"}',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                debugger;
                var ServiceResponse = response;
                $(CommentId)[0].innerText = Dev_commentBoxText;
                $(CommentIdBox)[0].value = Dev_commentBoxText;
                if (Dev_radioButtonCheckedValue == "1") {
                    $(ChecklistStatusEdit)[0].innerText = "OK";
                }
                else if (Dev_radioButtonCheckedValue == "2") {
                    $(ChecklistStatusEdit)[0].innerText = "Dev";
                }
                else if (Dev_radioButtonCheckedValue == "3") {
                    $(ChecklistStatusEdit)[0].innerText = "N/A";
                    $(ImageContainerBox)[0].innerHTML = "";
                    $(ImageContainer)[0].innerHTML = "";
                }
                //Dev panel 
                $(Dev_CommentId)[0].innerText = Dev_commentBoxText;
                $(Dev_CommentIdBox)[0].value = Dev_commentBoxText;
                if (Dev_radioButtonCheckedValue == "1") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "OK";
                }
                else if (Dev_radioButtonCheckedValue == "2") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "Dev";
                }
                else if (Dev_radioButtonCheckedValue == "3") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "N/A";
                    $(Dev_ImageContainerBox)[0].innerHTML = "";
                    $(Dev_ImageContainer)[0].innerHTML = "";
                }
                debugger;
                $(DevpanelBgColorChange).css('background-color', 'antiquewhite');
                $(NormalpanelBgColorChange).css('background-color', 'antiquewhite');
                if (ServiceResponse != "0") {
                    $(checklistExpandBgColorDev).css('background-color', 'antiquewhite');
                }
                else {
                    $(checklistExpandBgColorDev).css('background-color', '#ffffff');
                }
                //$(DevpanelBgColorChange).css('background-color', '#F0F4F8');
                //$(NormalpanelBgColorChange).css('background-color', '#F0F4F8');
                //$(DevpanelBgColorChange)[0].style.backgroundColor = "#F0F4F8";     //REACHED BG COLOR
            },
            failure: function (response) {
                alert("Service Failed");
            }
        });
        //alert("Checklist Edited");
        $(Dev_ModelPopUpCloseBtnId).trigger("click");
    }
    else if (DevOrNot == "Dev" && Check_DevTextChecklistStatusMainBody == "Dev" && Check_DevRadioButtonCheckedValue != 2) // && Check_DevRadioButtonCheckedValue == 2
    {
        //from dev panel dev to normal
        debugger;
        //alert("from dev panel dev to normal");
        //Comments
        //Main
        var checklistExpandBgColorDev = "#collapseBgColor-" + checklistId;
        var CommentId = "#ChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(CommentId)[0].innerText
        // Main - Dev Panel
        var Dev_CommentId = "#DevChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(Dev_CommentId)[0].innerText

        //Box
        var CommentIdBox = "#ChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var commentBoxText = $(CommentIdBox)[0].value;
        //Box - Dev Panel
        var Dev_CommentIdBox = "#DevChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var Dev_commentBoxText = $(Dev_CommentIdBox)[0].value;

        //Status Radio button
        //Main
        var ChecklistStatusEdit = "#ChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(ChecklistStatusEdit)[0].innerText
        //Main - Dev panel
        var Dev_ChecklistStatusEdit = "#DevChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(Dev_ChecklistStatusEdit)[0].innerText

        //Box
        var radioButtionId = "radio-" + checklistId + "-" + checklistItemId;
        var ChecklistStatusEditBoxID = "ChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var radioButtonCheckedValue = $('input:radio[name=' + radioButtionId + ']:checked').val();
        var $radios = $('input:radio[name=' + radioButtionId + ']');
        //Box - Dev panel
        var Dev_radioButtionId = "Devradio-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistStatusEditBoxID = "DevChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var Dev_radioButtonCheckedValue = $('input:radio[name=' + Dev_radioButtionId + ']:checked').val();

        //ImageGallery
        //Main & Box
        var ImageContainer = "#ImageContainer-" + checklistId + "-" + checklistItemId;
        var ImageContainerBox = "#ImageContainerBox-" + checklistId + "-" + checklistItemId;
        //Main & Box - Dev panel
        var Dev_ImageContainer = "#DevImageContainer-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerBox = "#DevImageContainerBox-" + checklistId + "-" + checklistItemId;

        //Color change background
        //Dev panel
        var NormalpanelBgColorChange = "#innerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        var DevpanelBgColorChange = "#DevinnerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        //Uploaded by party then color should be
        var PartyUploadedImageOrNotID = ".PartyUploadedImageOrNotID-" + checklistId + "-" + checklistItemId;
        var TextIfItsUploadedByParty = $(PartyUploadedImageOrNotID).val();

        if (typeof TextIfItsUploadedByParty !== "undefined" && TextIfItsUploadedByParty == "Y") {
            $(PartyUploadedImageOrNotID).val("N");
            //$(checklistItemApendInnerPanel).css('background-color', 'moccasin');
        }

        debugger;
        //ImageUploader
        var uploaderId = "#DevPicHolderId-" + checklistId + "-" + checklistItemId;
        var imagesFile = $(uploaderId);
        var formData = null;
        var file = imagesFile[0].files;
        if (file != undefined) {
            if (file.length > 0) {
                if (Dev_radioButtonCheckedValue == 3) {
                    var r = confirm("Images will not be saved because status is selected as N/A");
                    if (r == false) {
                        return false;
                    }
                }
                if (Dev_radioButtonCheckedValue != 3) {
                    formData = new FormData();
                    var totalFiles = file.length;
                    for (var i = 0; i < totalFiles; i++) {
                        if (!!file[i].type.match(/image.*/)) {
                            var fileSingle = file[i];
                            formData.append("imageUploadForm", fileSingle);
                        }
                    }
                    $.ajax({
                        url: "/Project/InspUploadChecklistImages?id=" + checklistItemId + "",
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            debugger;
                            imagesFile.val('').replaceWith(imagesFile = imagesFile.clone(true));
                            var ServiceResponse = response;
                            var splitImageNames = ServiceResponse.split('###');
                            var totalImages = splitImageNames.length;
                            for (var i = 0; i < totalImages; i++) {
                                var iSplit = splitImageNames[i].split('***');
                                var imageNameNew = iSplit[0];
                                var imageIdNew = iSplit[1];
                                if (1 == 1) {
                                    var classDivImageDel = "DeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var imageChecklistBox = "DivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivId = "DeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //Main Image tags
                                    var imageChecklistMain = "DivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivIdMain = "DeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //HtmlForBoxImages
                                    var htmlForImages = "";
                                    htmlForImages += '<div class="' + classDivImageDel + '">';
                                    htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                    htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                    htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    htmlForImages += '</div></div></div>';
                                    // Html for Main images
                                    var HtmlForImagesMain = "";
                                    HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                    HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                    HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                    HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    HtmlForImagesMain += '</div></div></div>';
                                    $(ImageContainerBox).append(htmlForImages);
                                    $(ImageContainer).append(HtmlForImagesMain);
                                }
                                if (1 == 1)
                                {
                                    //For dev panel
                                    var classDivImageDel = "DevDeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var imageChecklistBox = "DevDivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivId = "DevDeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //Main Image tags
                                    var imageChecklistMain = "DevDivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivIdMain = "DevDeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //HtmlForBoxImages
                                    var htmlForImages = "";
                                    htmlForImages += '<div class="' + classDivImageDel + '">';
                                    htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                    htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                    htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    htmlForImages += '</div></div></div>';
                                    // Html for Main images
                                    var HtmlForImagesMain = "";
                                    HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                    HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                    HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                    HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    HtmlForImagesMain += '</div></div></div>';
                                    $(Dev_ImageContainerBox).append(htmlForImages);
                                    $(Dev_ImageContainer).append(HtmlForImagesMain);
                                }
                            }
                        }
                    });
                }
            }
        }
        debugger;
        //Content save
        $.ajax({
            type: "POST",
            url: '/WebServices/ServicePage.asmx/InspectorDataChecklistContent',
            data: '{ commentBoxText: "' + Dev_commentBoxText + '", radioButtonCheckedValue: "' + Dev_radioButtonCheckedValue + '", checklistItemId: "' + checklistItemId + '"}',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                debugger;
                var ServiceResponse = response.d;
                $(CommentId)[0].innerText = Dev_commentBoxText;
                $(CommentIdBox)[0].value = Dev_commentBoxText;
                if (Dev_radioButtonCheckedValue == "1") {
                    $(ChecklistStatusEdit)[0].innerText = "OK";
                    //$radios[0].prop('checked', true);
                    //$radios[0].outerHTML = '<input type="radio" name='+ radioButtionId + ' value="1" checked="true" data-radio="iradio_square-blue checked" style="position: absolute; opacity: 0;">';
                    //$radios.filter('[value=1]').prop('checked', true);
                    if ($radios != undefined)
                    {
                        $radios[0].parentElement.attributes.class.nodeValue = "iradio_square-blue checked hover";
                        $radios[1].parentElement.attributes.class.nodeValue = "iradio_square-blue";
                    }
                    //if (obj1 != undefined) {
                    //    obj1[0].parentElement.attributes.class.nodeValue = "iradio_square-blue";
                    //}
                }
                else if (Dev_radioButtonCheckedValue == "2") {
                    $(ChecklistStatusEdit)[0].innerText = "Dev";
                    
                    //$radios.filter('[value=2]').prop('checked', true);
                }
                else if (Dev_radioButtonCheckedValue == "3") {
                    $(ChecklistStatusEdit)[0].innerText = "N/A";
                    $(ImageContainerBox)[0].innerHTML = "";
                    $(ImageContainer)[0].innerHTML = "";
                    $radios[2].parentElement.attributes.class.nodeValue = "iradio_square-blue checked hover";
                    $radios[1].parentElement.attributes.class.nodeValue = "iradio_square-blue";
                    //$radios.filter('[value=3]').prop('checked', true);
                }
                //Dev panel 
                $(Dev_CommentId)[0].innerText = Dev_commentBoxText;
                $(Dev_CommentIdBox)[0].value = Dev_commentBoxText;
                if (Dev_radioButtonCheckedValue == "1") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "OK";
                }
                else if (Dev_radioButtonCheckedValue == "2") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "Dev";
                }
                else if (Dev_radioButtonCheckedValue == "3") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "N/A";
                    $(Dev_ImageContainerBox)[0].innerHTML = "";
                    $(Dev_ImageContainer)[0].innerHTML = "";
                }
                debugger;
                $(DevpanelBgColorChange).css('background-color', '#F0F4F8');
                $(NormalpanelBgColorChange).css('background-color', '#F0F4F8');
                if (ServiceResponse != "0") {
                    $(checklistExpandBgColorDev).css('background-color', 'antiquewhite');
                }
                else {
                    $(checklistExpandBgColorDev).css('background-color', '#ffffff');
                }
                //$(DevpanelBgColorChange)[0].style.backgroundColor = "#F0F4F8";     //REACHED BG COLOR
            },
            failure: function (response) {
                alert("Service Failed");
            }
        });
        //alert("Checklist Edited");
        $(Dev_ModelPopUpCloseBtnId).trigger("click");
    }
    else if (DevOrNot == "Dev" && Check_DevTextChecklistStatusMainBody != "Dev" && Check_DevRadioButtonCheckedValue == 2)
    {
        //from Dev panel Normal to Dev
        //alert("from Dev panel Normal to Dev");
        //Comments
        //Main
        var CommentId = "#ChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(CommentId)[0].innerText
        // Main - Dev Panel
        var Dev_CommentId = "#DevChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(Dev_CommentId)[0].innerText

        //Box
        var CommentIdBox = "#ChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var commentBoxText = $(CommentIdBox)[0].value;
        //Box - Dev Panel
        var Dev_CommentIdBox = "#DevChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var Dev_commentBoxText = $(Dev_CommentIdBox)[0].value;

        //Status Radio button
        //Main
        var ChecklistStatusEdit = "#ChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(ChecklistStatusEdit)[0].innerText
        //Main - Dev panel
        var Dev_ChecklistStatusEdit = "#DevChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(Dev_ChecklistStatusEdit)[0].innerText

        //Box
        var radioButtionId = "radio-" + checklistId + "-" + checklistItemId;
        var ChecklistStatusEditBoxID = "ChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var radioButtonCheckedValue = $('input:radio[name=' + radioButtionId + ']:checked').val();
        //Box - Dev panel
        var Dev_radioButtionId = "Devradio-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistStatusEditBoxID = "DevChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var Dev_radioButtonCheckedValue = $('input:radio[name=' + Dev_radioButtionId + ']:checked').val();
        var $radios = $('input:radio[name=' + radioButtionId + ']');

        //ImageGallery
        //Main & Box
        var ImageContainer = "#ImageContainer-" + checklistId + "-" + checklistItemId;
        var ImageContainerBox = "#ImageContainerBox-" + checklistId + "-" + checklistItemId;
        //Main & Box - Dev panel
        var Dev_ImageContainer = "#DevImageContainer-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerBox = "#DevImageContainerBox-" + checklistId + "-" + checklistItemId;

        //Color change background
        //Dev panel
        var NormalpanelBgColorChange = "#innerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        var DevpanelBgColorChange = "#DevinnerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        //Uploaded by party then color should be
        var PartyUploadedImageOrNotID = ".PartyUploadedImageOrNotID-" + checklistId + "-" + checklistItemId;
        var TextIfItsUploadedByParty = $(PartyUploadedImageOrNotID).val();
        

        debugger;
        //ImageUploader
        var uploaderId = "#DevPicHolderId-" + checklistId + "-" + checklistItemId;
        var imagesFile = $(uploaderId);
        var formData = null;
        var file = imagesFile[0].files;
        if (file != undefined) {
            if (file.length > 0) {
                if (Dev_radioButtonCheckedValue == 3) {
                    var r = confirm("Images will not be saved because status is selected as N/A");
                    if (r == false) {
                        return false;
                    }
                }
                if (Dev_radioButtonCheckedValue != 3) {
                    formData = new FormData();
                    var totalFiles = file.length;
                    for (var i = 0; i < totalFiles; i++) {
                        if (!!file[i].type.match(/image.*/)) {
                            var fileSingle = file[i];
                            formData.append("imageUploadForm", fileSingle);
                        }
                    }
                    $.ajax({
                        url: "/Project/InspUploadChecklistImages?id=" + checklistItemId + "",
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            debugger;
                            imagesFile.val('').replaceWith(imagesFile = imagesFile.clone(true));
                            var ServiceResponse = response;
                            var splitImageNames = ServiceResponse.split('###');
                            var totalImages = splitImageNames.length;
                            for (var i = 0; i < totalImages; i++) {
                                var iSplit = splitImageNames[i].split('***');
                                var imageNameNew = iSplit[0];
                                var imageIdNew = iSplit[1];
                                if (1 == 1) {
                                    var classDivImageDel = "DeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var imageChecklistBox = "DivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivId = "DeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //Main Image tags
                                    var imageChecklistMain = "DivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivIdMain = "DeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //HtmlForBoxImages
                                    var htmlForImages = "";
                                    htmlForImages += '<div class="' + classDivImageDel + '">';
                                    htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                    htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                    htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    htmlForImages += '</div></div></div>';
                                    // Html for Main images
                                    var HtmlForImagesMain = "";
                                    HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                    HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                    HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                    HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    HtmlForImagesMain += '</div></div></div>';
                                    $(ImageContainerBox).append(htmlForImages);
                                    $(ImageContainer).append(HtmlForImagesMain);
                                }
                                if (1 == 1) {
                                    //For dev panel
                                    var classDivImageDel = "DevDeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var imageChecklistBox = "DevDivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivId = "DevDeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //Main Image tags
                                    var imageChecklistMain = "DevDivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivIdMain = "DevDeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //HtmlForBoxImages
                                    var htmlForImages = "";
                                    htmlForImages += '<div class="' + classDivImageDel + '">';
                                    htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                    htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                    htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    htmlForImages += '</div></div></div>';
                                    // Html for Main images
                                    var HtmlForImagesMain = "";
                                    HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                    HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                    HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                    HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    HtmlForImagesMain += '</div></div></div>';
                                    $(Dev_ImageContainerBox).append(htmlForImages);
                                    $(Dev_ImageContainer).append(HtmlForImagesMain);
                                }
                            }
                            //callAjaxMethodForProjectImage(projectId, response);
                            ////projectImageLi
                            //debugger;
                            //var urlimg = '/Resources/ProjectSiteImages/' + response;
                            ////Create HTML for ProjectImage
                            //$('#projectImageLi')[0].innerHTML = "";
                            //var innerDivHtml = "<img id='proImage' alt='gallery 3' onclick='showProjectImage()' class='img-responsive' src='" + urlimg + "' data-src=''>";
                            //$('#projectImageLi').append(innerDivHtml);
                        }
                    });
                }
            }
        }
        debugger;
        //Content save
        $.ajax({
            type: "POST",
            url: '/WebServices/ServicePage.asmx/InspectorDataChecklistContent',
            data: '{ commentBoxText: "' + Dev_commentBoxText + '", radioButtonCheckedValue: "' + Dev_radioButtonCheckedValue + '", checklistItemId: "' + checklistItemId + '"}',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                debugger;
                var ServiceResponse = response.d;
                $(CommentId)[0].innerText = Dev_commentBoxText;
                $(CommentIdBox)[0].value = Dev_commentBoxText;
                if (Dev_radioButtonCheckedValue == "1") {
                    $(ChecklistStatusEdit)[0].innerText = "OK";
                    
                }
                else if (Dev_radioButtonCheckedValue == "2") {
                    $(ChecklistStatusEdit)[0].innerText = "Dev";
                    $radios[1].parentElement.attributes.class.nodeValue = "iradio_square-blue checked hover";
                    $radios[0].parentElement.attributes.class.nodeValue = "iradio_square-blue";
                    $radios[2].parentElement.attributes.class.nodeValue = "iradio_square-blue";
                }
                else if (Dev_radioButtonCheckedValue == "3") {
                    $(ChecklistStatusEdit)[0].innerText = "N/A";
                    $(ImageContainerBox)[0].innerHTML = "";
                    $(ImageContainer)[0].innerHTML = "";
                    
                }
                //Dev panel 
                $(Dev_CommentId)[0].innerText = Dev_commentBoxText;
                $(Dev_CommentIdBox)[0].value = Dev_commentBoxText;
                if (Dev_radioButtonCheckedValue == "1") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "OK";
                }
                else if (Dev_radioButtonCheckedValue == "2") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "Dev";
                }
                else if (Dev_radioButtonCheckedValue == "3") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "N/A";
                    $(Dev_ImageContainerBox)[0].innerHTML = "";
                    $(Dev_ImageContainer)[0].innerHTML = "";
                }
                $(DevpanelBgColorChange).css('background-color', 'antiquewhite');
                $(NormalpanelBgColorChange).css('background-color', 'antiquewhite');
                var divContainEmailBtn = "#divContainEmailBtn";
                $(divContainEmailBtn).css("display", "block");
                //$(checklistExpandBgColorDev).css('background-color', 'antiquewhite');
                if (ServiceResponse != "0") {
                    $(checklistExpandBgColorDev).css('background-color', 'antiquewhite');
                }
                else {
                    $(checklistExpandBgColorDev).css('background-color', '#ffffff');
                }
                if (typeof TextIfItsUploadedByParty !== "undefined" && TextIfItsUploadedByParty == "N") {
                    $(PartyUploadedImageOrNotID).val("Y");
                    $(DevpanelBgColorChange).css('background-color', 'moccasin');
                    $(NormalpanelBgColorChange).css('background-color', 'moccasin');
                }
                //$(DevpanelBgColorChange).css('background-color', '#F0F4F8');
                //$(NormalpanelBgColorChange).css('background-color', '#F0F4F8');
                //$(DevpanelBgColorChange)[0].style.backgroundColor = "#F0F4F8";     //REACHED BG COLOR
            },
            failure: function (response) {
                alert("Service Failed");
            }
        });
        //alert("Checklist Edited");
        $(Dev_ModelPopUpCloseBtnId).trigger("click");
    }
    else if (DevOrNot == "Dev" && Check_DevTextChecklistStatusMainBody != "Dev" && Check_DevRadioButtonCheckedValue != 2)
    {
        //from Dev panel Normal to Normal
        //alert("from Dev panel Normal to Normal");
        //Comments
        //Main
        var CommentId = "#ChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(CommentId)[0].innerText
        // Main - Dev Panel
        var Dev_CommentId = "#DevChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(Dev_CommentId)[0].innerText

        //Box
        var CommentIdBox = "#ChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var commentBoxText = $(CommentIdBox)[0].value;
        //Box - Dev Panel
        var Dev_CommentIdBox = "#DevChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var Dev_commentBoxText = $(Dev_CommentIdBox)[0].value;

        //Status Radio button
        //Main
        var ChecklistStatusEdit = "#ChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(ChecklistStatusEdit)[0].innerText
        //Main - Dev panel
        var Dev_ChecklistStatusEdit = "#DevChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(Dev_ChecklistStatusEdit)[0].innerText

        //Box
        var radioButtionId = "radio-" + checklistId + "-" + checklistItemId;
        var ChecklistStatusEditBoxID = "ChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var radioButtonCheckedValue = $('input:radio[name=' + radioButtionId + ']:checked').val();
        //Box - Dev panel
        var Dev_radioButtionId = "Devradio-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistStatusEditBoxID = "DevChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var Dev_radioButtonCheckedValue = $('input:radio[name=' + Dev_radioButtionId + ']:checked').val();

        //ImageGallery
        //Main & Box
        var ImageContainer = "#ImageContainer-" + checklistId + "-" + checklistItemId;
        var ImageContainerBox = "#ImageContainerBox-" + checklistId + "-" + checklistItemId;
        //Main & Box - Dev panel
        var Dev_ImageContainer = "#DevImageContainer-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerBox = "#DevImageContainerBox-" + checklistId + "-" + checklistItemId;

        //Color change background
        //Dev panel
        var NormalpanelBgColorChange = "#innerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        var DevpanelBgColorChange = "#DevinnerPanelChecklistBody-" + checklistId + "-" + checklistItemId;

        debugger;
        //ImageUploader
        var uploaderId = "#DevPicHolderId-" + checklistId + "-" + checklistItemId;
        var imagesFile = $(uploaderId);
        var formData = null;
        var file = imagesFile[0].files;
        if (file != undefined) {
            if (file.length > 0) {
                if (Dev_radioButtonCheckedValue == 3) {
                    var r = confirm("Images will not be saved because status is selected as N/A");
                    if (r == false) {
                        return false;
                    }
                }
                if (Dev_radioButtonCheckedValue != 3) {
                    formData = new FormData();
                    var totalFiles = file.length;
                    for (var i = 0; i < totalFiles; i++) {
                        if (!!file[i].type.match(/image.*/)) {
                            var fileSingle = file[i];
                            formData.append("imageUploadForm", fileSingle);
                        }
                    }
                    $.ajax({
                        url: "/Project/InspUploadChecklistImages?id=" + checklistItemId + "",
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            debugger;
                            imagesFile.val('').replaceWith(imagesFile = imagesFile.clone(true));
                            var ServiceResponse = response;
                            var splitImageNames = ServiceResponse.split('###');
                            var totalImages = splitImageNames.length;
                            for (var i = 0; i < totalImages; i++) {
                                var iSplit = splitImageNames[i].split('***');
                                var imageNameNew = iSplit[0];
                                var imageIdNew = iSplit[1];
                                if (1 == 1) {
                                    var classDivImageDel = "DeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var imageChecklistBox = "DivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivId = "DeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //Main Image tags
                                    var imageChecklistMain = "DivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivIdMain = "DeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //HtmlForBoxImages
                                    var htmlForImages = "";
                                    htmlForImages += '<div class="' + classDivImageDel + '">';
                                    htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                    htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                    htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    htmlForImages += '</div></div></div>';
                                    // Html for Main images
                                    var HtmlForImagesMain = "";
                                    HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                    HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                    HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                    HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    HtmlForImagesMain += '</div></div></div>';
                                    $(ImageContainerBox).append(htmlForImages);
                                    $(ImageContainer).append(HtmlForImagesMain);
                                }
                                if (1 == 1) {
                                    //For dev panel
                                    var classDivImageDel = "DevDeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var imageChecklistBox = "DevDivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivId = "DevDeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //Main Image tags
                                    var imageChecklistMain = "DevDivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    var ImageDeleteDivIdMain = "DevDeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                    //HtmlForBoxImages
                                    var htmlForImages = "";
                                    htmlForImages += '<div class="' + classDivImageDel + '">';
                                    htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                    htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                    htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    htmlForImages += '</div></div></div>';
                                    // Html for Main images
                                    var HtmlForImagesMain = "";
                                    HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                    HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                    HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                    HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                    HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                    HtmlForImagesMain += '</div></div></div>';
                                    $(Dev_ImageContainerBox).append(htmlForImages);
                                    $(Dev_ImageContainer).append(HtmlForImagesMain);
                                }
                            }
                            //callAjaxMethodForProjectImage(projectId, response);
                            ////projectImageLi
                            //debugger;
                            //var urlimg = '/Resources/ProjectSiteImages/' + response;
                            ////Create HTML for ProjectImage
                            //$('#projectImageLi')[0].innerHTML = "";
                            //var innerDivHtml = "<img id='proImage' alt='gallery 3' onclick='showProjectImage()' class='img-responsive' src='" + urlimg + "' data-src=''>";
                            //$('#projectImageLi').append(innerDivHtml);
                        }
                    });
                }
            }
        }
        debugger;
        //Content save
        $.ajax({
            type: "POST",
            url: '/WebServices/ServicePage.asmx/InspectorDataChecklistContent',
            data: '{ commentBoxText: "' + Dev_commentBoxText + '", radioButtonCheckedValue: "' + Dev_radioButtonCheckedValue + '", checklistItemId: "' + checklistItemId + '"}',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                debugger;
                var ServiceResponse = response;
                $(CommentId)[0].innerText = Dev_commentBoxText;
                $(CommentIdBox)[0].value = Dev_commentBoxText;
                if (Dev_radioButtonCheckedValue == "1") {
                    $(ChecklistStatusEdit)[0].innerText = "OK";
                }
                else if (Dev_radioButtonCheckedValue == "2") {
                    $(ChecklistStatusEdit)[0].innerText = "Dev";
                }
                else if (Dev_radioButtonCheckedValue == "3") {
                    $(ChecklistStatusEdit)[0].innerText = "N/A";
                    $(ImageContainerBox)[0].innerHTML = "";
                    $(ImageContainer)[0].innerHTML = "";
                }
                //Dev panel 
                $(Dev_CommentId)[0].innerText = Dev_commentBoxText;
                $(Dev_CommentIdBox)[0].value = Dev_commentBoxText;
                if (Dev_radioButtonCheckedValue == "1") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "OK";
                }
                else if (Dev_radioButtonCheckedValue == "2") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "Dev";
                }
                else if (Dev_radioButtonCheckedValue == "3") {
                    $(Dev_ChecklistStatusEdit)[0].innerText = "N/A";
                    $(Dev_ImageContainerBox)[0].innerHTML = "";
                    $(Dev_ImageContainer)[0].innerHTML = "";
                }

                //$(DevpanelBgColorChange).css('background-color', '#F0F4F8');
                //$(NormalpanelBgColorChange).css('background-color', '#F0F4F8');
                //$(DevpanelBgColorChange)[0].style.backgroundColor = "#F0F4F8";     //REACHED BG COLOR
            },
            failure: function (response) {
                alert("Service Failed");
            }
        });
        //alert("Checklist Edited");
        $(Dev_ModelPopUpCloseBtnId).trigger("click");
    }
    else if (DevOrNot != "Dev" && Check_DevTextChecklistStatusMainBody != "Dev" && Check_radioButtonCheckedValue == 2)
    {
       
        //from normal panel normal to dev from normal
        debugger;
        //alert("from normal panel normal to dev from normal");
        //Comments
        //Main
        var CommentId = "#ChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        $(CommentId)[0].innerText
        // Main - Dev Panel
        var Dev_CommentId = "#DevChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        var Dev_CommentIdNoHash = "DevChecklistCommentEdit-" + checklistId + "-" + checklistItemId;
        //$(Dev_CommentId)[0].innerText

        //Box
        var CommentIdBox = "#ChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var commentBoxText = $(CommentIdBox)[0].value;
        //Box - Dev Panel 
        var Dev_CommentIdBox = "#DevChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        var Dev_CommentIdBoxNoHash = "DevChecklistCommentEditBox-" + checklistId + "-" + checklistItemId;
        //var Dev_commentBoxText = $(Dev_CommentIdBox)[0].value;

        //Status Radio button
        //Main
        var ChecklistStatusEdit = "#ChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        $(ChecklistStatusEdit)[0].innerText
        //Main - Dev panel
        var Dev_ChecklistStatusEdit = "#DevChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistStatusEditNoHash = "DevChecklistStatusEdit-" + checklistId + "-" + checklistItemId;
        //$(Dev_ChecklistStatusEdit)[0].innerText

        //Box
        var radioButtionId = "radio-" + checklistId + "-" + checklistItemId;
        var ChecklistStatusEditBoxID = "ChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var radioButtonCheckedValue = $('input:radio[name=' + radioButtionId + ']:checked').val();
        //Box - Dev panel
        debugger;
        var Dev_radioButtionId = "Devradio-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistStatusEditBoxID = "DevChecklistStatusEditBox-" + checklistId + "-" + checklistItemId;
        var $Devradios = $('input:radio[name=' + Dev_radioButtionId + ']');
       // var Dev_radioButtonCheckedValue = $('input:radio[name=' + Dev_radioButtionId + ']:checked').val();

        //ImageGallery
        //Main & Box
        var ImageContainer = "#ImageContainer-" + checklistId + "-" + checklistItemId;
        var ImageContainerBox = "#ImageContainerBox-" + checklistId + "-" + checklistItemId;
        //Main & Box - Dev panel
        var Dev_ImageContainer = "#DevImageContainer-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerNoHash = "DevImageContainer-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerBox = "#DevImageContainerBox-" + checklistId + "-" + checklistItemId;
        var Dev_ImageContainerBoxNoHash = "DevImageContainerBox-" + checklistId + "-" + checklistItemId;

        //Dev panel checklist HTML Container
        var Dev_PanelChecklistContainer = "#DevPanelChecklistContainer";
        var CheckifAlreadyExistHtml = $(Dev_PanelChecklistContainer).html();

        //Color change background
        //Normal panel
        var ModelNormalIdPopUp = "#modalfooterEditCheckItem-"+ checklistId + "-" + checklistItemId;
        var checklistExpandBgColorDev = "#collapseBgColor-" + checklistId;
        var checklistNameTitle = $(checklistExpandBgColorDev).text();
        var NormalChecklistQuestionID = "#NormalChecklistQuestion-" + checklistId + "-" + checklistItemId;
        var NormalChecklistQuestion = $(NormalChecklistQuestionID).text();
        //Dev panel
        var NormalpanelBgColorChange = "#innerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        var DevpanelBgColorChange = "#DevinnerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        var DevpanelBgColorChangeNoHash = "DevinnerPanelChecklistBody-" + checklistId + "-" + checklistItemId;
        var checkboxEmailSendName = "CboxEmailSendName-" + checklistId + "-" + checklistItemId;

        var PartyUploadedImageOrNotID = ".PartyUploadedImageOrNotID-" + checklistId + "-" + checklistItemId;
        var TextIfItsUploadedByParty = $(PartyUploadedImageOrNotID).val();

        

        //Dev panel PopUpModelId 
        var DevmodalfooterEditCheckItem = "DevmodalfooterEditCheckItem" + checklistId + "-" + checklistItemId;
        var DevmodalfooterEditCheckItemHash = "#DevmodalfooterEditCheckItem" + checklistId + "-" + checklistItemId;
        //tAGS html bOX dEV
        var DevinnerPanelChecklistBodyBox = "DevinnerPanelChecklistBodyBox-" + checklistId + "-" + checklistItemId;
        var DEV_ChecklistInnerExpand = "Devcollapse-" + checklistId;
        var Dev_formChecklistIdBox = "DevFormChecklistItem" + ChecklistInnerExpand;

        debugger;
        //Make html for new Dev in Dev panel START
        //Tags & IDs
        var ChecklistInnerExpand = "collapse-" + checklistId;
        var htmlAppendChecklistMain = "#htmlAppendChecklist" + "-" + checklistId + "-" + checklistItemId;
        var htmlAppendChecklistMainNoHash = "htmlAppendChecklist" + "-" + checklistId + "-" + checklistItemId;

        var formChecklistId = "FormChecklistItem" + ChecklistInnerExpand;
        var formPictureHolderId = "DevPicHolderId-" + checklistId + "-" + checklistItemId;
        var Dev_ChecklistEditSaveId = "DevSaveChecklist-" + checklistId + "-" + checklistItemId;

        //Get all images from DB
        var HtmlForImagesMainDevPanelMain = "";
        var htmlForImagesDevPanelBox = "";
        var iiii = 1;
        if (iiii == 1) {
            if (CheckifAlreadyExistHtml.indexOf(DevpanelBgColorChangeNoHash) != -1) {
                //alert(" found");
                iiii++;
            }
            else
            {
                debugger;
                var remote = $.ajax({
                    //url: "/Project/InspChecklistImagesListForDevPanel?id=" + checklistItemId + "",           
                    //type: "POST",
                    //data: formData,
                    //contentType: "application/json; charset=utf-8",
                    //async: false,
                    //dataType: "json",
                    ///////////////////////////
                    type: "POST",
                    url: '/Project/InspChecklistImagesListForDevPanel',
                    data: '{ id: "' + checklistItemId + '"}',
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    dataType: "json",
                    success: function (response) {
                        debugger;

                    }
                }).responseText;
                debugger;
                var ServiceResponse = remote;
                var splitImageNames = ServiceResponse.split('###');
                var totalImages = splitImageNames.length;
                for (var i = 0; i < totalImages; i++) {
                    var iSplit = splitImageNames[i].split('***');
                    var imageNameNew = iSplit[0];
                    var imageIdNew = iSplit[1];
                    if (imageNameNew != "") {
                        //For dev panel
                        var classDivImageDel = "DevDeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                        var imageChecklistBox = "DevDivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                        var ImageDeleteDivId = "DevDeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                        //Main Image tags
                        var imageChecklistMain = "DevDivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                        var ImageDeleteDivIdMain = "DevDeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                        //HtmlForBoxImages
                        //htmlForImagesDevPanelBox = "";
                        htmlForImagesDevPanelBox += '<div class="' + classDivImageDel + '">';
                        htmlForImagesDevPanelBox += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                        htmlForImagesDevPanelBox += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                        htmlForImagesDevPanelBox += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                        htmlForImagesDevPanelBox += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                        htmlForImagesDevPanelBox += '</div></div></div>';
                        // Html for Main images
                        //HtmlForImagesMainDevPanelMain = "";
                        HtmlForImagesMainDevPanelMain += '<div class="' + classDivImageDel + '">';
                        HtmlForImagesMainDevPanelMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                        HtmlForImagesMainDevPanelMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                        HtmlForImagesMainDevPanelMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                        HtmlForImagesMainDevPanelMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                        HtmlForImagesMainDevPanelMain += '</div></div></div>';
                        //$(Dev_ImageContainerBox).append(htmlForImages);
                        //$(Dev_ImageContainer).append(HtmlForImagesMain);
                    }
                }
                //HTML for Dev Panel Box START
                var HtmlForDevPanelBox = "";
                HtmlForDevPanelBox += '<div class="modal fade" id="' + DevmodalfooterEditCheckItem + '" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" id="' + DevinnerPanelChecklistBodyBox + '">';
                HtmlForDevPanelBox += '<div class="modal-content"><input type="hidden" name="MainChecklistIdHdn" value="' + DEV_ChecklistInnerExpand + '" /><div class="modal-header">';
                HtmlForDevPanelBox += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icons-office-52"></i></button><h4 class="modal-title">Edit: <strong>' + checklistNameTitle + '</strong></h4></div>';
                HtmlForDevPanelBox += '<div class="modal-body"><form method="post" enctype="multipart/form-data" id="' + Dev_formChecklistIdBox + '"><div class="row"><div class="col-md-12"><div class="form-group"><div class="input-group">';
                HtmlForDevPanelBox += '<div class="icheck-inline" id="' + Dev_ChecklistStatusEditBoxID + '"><b>Status </b><label><input type="radio" name="' + Dev_radioButtionId + '" value="1" data-radio="iradio_square-blue"> OK</label>';
                HtmlForDevPanelBox += '<label><input type="radio" name="' + Dev_radioButtionId + '" value="2" checked data-radio="iradio_square-blue"> Dev</label>';
                HtmlForDevPanelBox += '<label><input type="radio" name="' + Dev_radioButtionId + '" value="3" data-radio="iradio_square-blue"> N/A</label></div></div></div></div><div class="col-md-12"><div class="form-group"><label class="form-label">Comment</label>';
                HtmlForDevPanelBox += '<input type="text" name="txtComChecklist" id="' + Dev_CommentIdBoxNoHash + '" value="" placeholder=" enter comment" class="form-control" required="required"></div></div>';
                //images code starts
                HtmlForDevPanelBox += '<div class="col-md-12"><div id="' + Dev_ImageContainerBoxNoHash + '">' + htmlForImagesDevPanelBox + '</div></div>';
                //*images code ends
                HtmlForDevPanelBox += '</div></form><div class="row"><div class="col-sm-7"><h3><strong></strong> Multiple image upload</h3><input name="file" id="' + formPictureHolderId + '" type="file" multiple /></div></div></div>';
                HtmlForDevPanelBox += '<div class="modal-footer" style="text-align:left;"><button id="' + Dev_ChecklistEditSaveId + '" onclick="SaveChecklistEdit(this)" class="btn btn-dark">Save</button>';
                HtmlForDevPanelBox += '<a href="#" data-dismiss="modal" id="' + Dev_ModelPopUpCloseBtnId + '" class="myCancel">Cancel</a></div></div></div></div>';
                //HTML for Dev panel Box END

                var Dev_HtmlChecklistPanel = "";
                debugger;
                Dev_HtmlChecklistPanel += '<div id="' + DevpanelBgColorChangeNoHash + '" style="margin-bottom: 15px;background-color: antiquewhite;"><table class="table table-hover"><tbody><tr>';
                Dev_HtmlChecklistPanel += '<td colspan ="2"><label> <div class="icheckbox_minimal-grey" id="' + checkboxEmailSendName + '" style="position: relative;" onclick="checkBoxSelectEmailForParty(this)"></div> Check if DEV to be added in email list</label></td></tr><tr>';
                Dev_HtmlChecklistPanel += '<td>Checklist: <b> ' + checklistNameTitle + '</b></td><td><span class="text-right"><a href="#" class="editinsp" data-toggle="modal" data-target="' + DevmodalfooterEditCheckItemHash + '">Fix</a></span></td></tr>';
                Dev_HtmlChecklistPanel += '<tr><td colspan="2">Question: <b> ' + NormalChecklistQuestion + '</b></td></tr><tr><td>Status: <b id="' + Dev_ChecklistStatusEditNoHash + '"> Dev</b></td><td>Comment: <b id="' + Dev_CommentIdNoHash + '"> done</b></td></tr></tbody></table>';
                Dev_HtmlChecklistPanel += '<div id="' + Dev_ImageContainerNoHash + '">' + HtmlForImagesMainDevPanelMain + '</div><div style="clear: both"></div></div>';
                Dev_HtmlChecklistPanel += HtmlForDevPanelBox;
                $(Dev_PanelChecklistContainer).append(Dev_HtmlChecklistPanel);
                iiii++;
            }
        }
        ///////////////////////////////////////////////////////Ends

        //Main images html

        //$(Dev_PanelChecklistContainer).append(HTMLChecklistReplace);
        
        
        //Make html for new Dev in Dev panel END
        if (iiii == 2) {
            //ImageUploader
            var uploaderId = "#PicHolderId-" + checklistId + "-" + checklistItemId;
            var imagesFile = $(uploaderId);
            var formData = null;
            var file = imagesFile[0].files;
            if (file != undefined) {
                if (file.length > 0) {
                    if (radioButtonCheckedValue == 3) {
                        var r = confirm("Images will not be saved because status is selected as N/A");
                        if (r == false) {
                            return false;
                        }
                    }
                    if (radioButtonCheckedValue != 3) {
                        formData = new FormData();
                        var totalFiles = file.length;
                        for (var i = 0; i < totalFiles; i++) {
                            if (!!file[i].type.match(/image.*/)) {
                                var fileSingle = file[i];
                                formData.append("imageUploadForm", fileSingle);
                            }
                        }
                        $.ajax({
                            url: "/Project/InspUploadChecklistImages?id=" + checklistItemId + "",
                            type: "POST",
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (response) {
                                debugger;
                                imagesFile.val('').replaceWith(imagesFile = imagesFile.clone(true));
                                var ServiceResponse = response;
                                var splitImageNames = ServiceResponse.split('###');
                                var totalImages = splitImageNames.length;
                                for (var i = 0; i < totalImages; i++) {
                                    var iSplit = splitImageNames[i].split('***');
                                    var imageNameNew = iSplit[0];
                                    var imageIdNew = iSplit[1];
                                    if (1 == 1) {
                                        var classDivImageDel = "DeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var imageChecklistBox = "DivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivId = "DeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //Main Image tags
                                        var imageChecklistMain = "DivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivIdMain = "DeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //HtmlForBoxImages
                                        var htmlForImages = "";
                                        htmlForImages += '<div class="' + classDivImageDel + '">';
                                        htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                        htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                        htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        htmlForImages += '</div></div></div>';
                                        // Html for Main images
                                        var HtmlForImagesMain = "";
                                        HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                        HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                        HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                        HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        HtmlForImagesMain += '</div></div></div>';
                                        $(ImageContainerBox).append(htmlForImages);
                                        $(ImageContainer).append(HtmlForImagesMain);
                                    }
                                    if (1 == 1) {
                                        //For dev panel
                                        var classDivImageDel = "DevDeleteImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var imageChecklistBox = "DevDivImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivId = "DevDeleteImageBoxBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //Main Image tags
                                        var imageChecklistMain = "DevDivImage-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        var ImageDeleteDivIdMain = "DevDeleteImageBox-" + checklistId + "-" + checklistItemId + "-" + imageIdNew;
                                        //HtmlForBoxImages
                                        var htmlForImages = "";
                                        htmlForImages += '<div class="' + classDivImageDel + '">';
                                        htmlForImages += '<div id="' + imageChecklistBox + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivId + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivId + '\')">';
                                        htmlForImages += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        htmlForImages += '<div id="' + ImageDeleteDivId + '" class="ImageDeleteDivInsp">';
                                        htmlForImages += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        htmlForImages += '</div></div></div>';
                                        // Html for Main images
                                        var HtmlForImagesMain = "";
                                        HtmlForImagesMain += '<div class="' + classDivImageDel + '">';
                                        HtmlForImagesMain += '<div id="' + imageChecklistMain + '" class="ImageMainDivInsp" onmouseover="imageOpen(\'' + ImageDeleteDivIdMain + '\')" onmouseout="DeleteHideMouseOut(\'' + ImageDeleteDivIdMain + '\')">';
                                        HtmlForImagesMain += "<img alt='gallery 3' onclick='showImage(this)' class='img-responsive' src='/Resources/ChecklistTypeImages/" + imageNameNew + "' data-src='' style='max-height: 100px;'>";
                                        HtmlForImagesMain += '<div id="' + ImageDeleteDivIdMain + '" class="ImageDeleteDivInsp">';
                                        HtmlForImagesMain += '<a href="javascript:void(0);" class="ImageDeleteLinkInsp" onclick="deleteImage(\'' + imageIdNew + '\',\'' + classDivImageDel + '\')" style="padding: 0px;">&nbsp; Delete</a>';
                                        HtmlForImagesMain += '</div></div></div>';
                                        $(Dev_ImageContainerBox).append(htmlForImages);
                                        $(Dev_ImageContainer).append(HtmlForImagesMain);
                                    }
                                }
                            }
                        });
                    }
                }
            }
            iiii++;
        }
        debugger;
        if (iiii == 3) {
            //Content save
            $.ajax({
                type: "POST",
                url: '/WebServices/ServicePage.asmx/InspectorDataChecklistContent',
                data: '{ commentBoxText: "' + commentBoxText + '", radioButtonCheckedValue: "' + radioButtonCheckedValue + '", checklistItemId: "' + checklistItemId + '"}',
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function (response) {
                    debugger;
                    var ServiceResponse = response.d;
                    $(CommentId)[0].innerText = commentBoxText;
                    $(CommentIdBox)[0].value = commentBoxText;
                    if (radioButtonCheckedValue == "1") {
                        $(ChecklistStatusEdit)[0].innerText = "OK";
                    }
                    else if (radioButtonCheckedValue == "2") {
                        $(ChecklistStatusEdit)[0].innerText = "Dev";
                    }
                    else if (radioButtonCheckedValue == "3") {
                        $(ChecklistStatusEdit)[0].innerText = "N/A";
                        $(ImageContainerBox)[0].innerHTML = "";
                        $(ImageContainer)[0].innerHTML = "";
                    }
                    //Dev panel 
                    $(Dev_CommentId)[0].innerText = commentBoxText;
                    $(Dev_CommentIdBox)[0].value = commentBoxText;
                    //color change
                    debugger;
                    $(DevpanelBgColorChange).css('background-color', 'antiquewhite');
                    $(NormalpanelBgColorChange).css('background-color', 'antiquewhite');
                    var divContainEmailBtn = "#divContainEmailBtn";
                    $(divContainEmailBtn).css("display", "block");
                    if (typeof TextIfItsUploadedByParty !== "undefined" && TextIfItsUploadedByParty == "N") {
                        $(PartyUploadedImageOrNotID).val("Y");
                        $(DevpanelBgColorChange).css('background-color', 'moccasin');
                        $(NormalpanelBgColorChange).css('background-color', 'moccasin');
                    }
                    //$(checklistExpandBgColorDev).css('background-color', 'antiquewhite');
                    if (ServiceResponse != "0") {
                        $(checklistExpandBgColorDev).css('background-color', 'antiquewhite');
                    }
                    else {
                        $(checklistExpandBgColorDev).css('background-color', '#ffffff');
                    }
                    if (radioButtonCheckedValue == "1") {
                        $(Dev_ChecklistStatusEdit)[0].innerText = "OK";
                    }
                    else if (radioButtonCheckedValue == "2") {
                        $(Dev_ChecklistStatusEdit)[0].innerText = "Dev";
                        $Devradios[1].parentElement.attributes.class.nodeValue = "iradio_square-blue checked hover";
                        $Devradios[0].parentElement.attributes.class.nodeValue = "iradio_square-blue";
                        $Devradios[2].parentElement.attributes.class.nodeValue = "iradio_square-blue";
                    }
                    else if (radioButtonCheckedValue == "3") {
                        $(Dev_ChecklistStatusEdit)[0].innerText = "N/A";
                        $(Dev_ImageContainerBox)[0].innerHTML = "";
                        $(Dev_ImageContainer)[0].innerHTML = "";
                    }
                    

                    //$(DevpanelBgColorChange)[0].style.backgroundColor = "#F0F4F8";     //REACHED BG COLOR
                },
                failure: function (response) {
                    alert("Service Failed");
                }
            });
        }
        //alert("Checklist Edited");
        $(ModelPopUpCloseBtnId).trigger("click");
    }
    
}

function deleteImage(pictureDBid, divClass) {
    debugger;
    var r = confirm("Are you sure!");
    if (r == false)
    {
        return false;
    }
    //var nameclass = "." + divClass;
    var DevOrNot = divClass.substring(0, 3);
    
    //$(nameclass).empty();
    callAjaxMethodForChecklistImageDelete(pictureDBid);
    if (DevOrNot == "Dev") {
        var nameclassDev = "." + divClass;
        $(nameclassDev).empty();
        var newVal = divClass.substring(3, divClass.length);
        newVal = "." + newVal;
        $(newVal).empty();
    }
    else {
        var nameclassDev = "." + divClass;
        $(nameclassDev).empty();
        var newVal = "Dev" + divClass;
        newVal = "." + newVal;
        $(newVal).empty();
        
    }
    //imageChecklistBox.innerHTML = '';

   // alert("Image Deleted");
}
//Web servise called for image delete
function callAjaxMethodForChecklistImageDelete(ImageId) {
    debugger;
    $.ajax({

        type: "POST",

        url: '/WebServices/ServicePage.asmx/InspectorDataChecklistImageDelete',

        data: '{ ImageId: "' + ImageId + '"}',

        contentType: "application/json; charset=utf-8",

        async: false,

        dataType: "json",

        success: function (response) {
            debugger;
            var ServiceResponse = response.d.toString();

        },
        failure: function (response) {
            alert("Service Failed");
        }

    });
}
//End
var checklistIdsChecked = new Array();

function checkBoxSelectEmailForParty(Detail) {
    debugger;
    //var d = Detail;
    
    $(Detail).toggleClass("checked");
    var str1 = Detail.className;
    var str2 = "checked";
    var id = Detail.id;
    var splitId = id.split('-');
    var ChecklistID = splitId[1];
    var checklistItemId = splitId[2];
    var checklistItemApendInnerPanel = "#DevinnerPanelChecklistBody-" + ChecklistID + "-" + checklistItemId;
    var Dev_ChecklistStatusEdit = "#DevChecklistStatusEdit-" + ChecklistID + "-" + checklistItemId;
    var PartyUploadedImageOrNotID = ".PartyUploadedImageOrNotID-" + ChecklistID + "-" + checklistItemId;
    var TextIfItsUploadedByParty = $(PartyUploadedImageOrNotID).val();
    var status = $(Dev_ChecklistStatusEdit)[0].innerText;
    if (str1.indexOf(str2) != -1) {
        //in case of checked
        // or var arr = [];
        checklistIdsChecked.push(checklistItemId);
        $(checklistItemApendInnerPanel).css('background-color', 'lightsalmon');
    }
    
    else if(status == "Dev")
    {
        //var y = checklistIdsChecked
        var removeItem = checklistItemId;
        checklistIdsChecked = jQuery.grep(checklistIdsChecked, function (value) {
            return value != removeItem;
        });
        $(checklistItemApendInnerPanel).css('background-color', 'antiquewhite');

        //If uploaded by Party
        if (typeof TextIfItsUploadedByParty !== "undefined" && TextIfItsUploadedByParty == "Y")
        {
            $(checklistItemApendInnerPanel).css('background-color', 'moccasin');
        }
    }
    else if (status == "OK") {
        //var y = checklistIdsChecked
        var removeItem = checklistItemId;
        checklistIdsChecked = jQuery.grep(checklistIdsChecked, function (value) {
            return value != removeItem;
        });
        $(checklistItemApendInnerPanel).css('background-color', '#F0F4F8');

        //If uploaded by Party
        if (typeof TextIfItsUploadedByParty !== "undefined" && TextIfItsUploadedByParty == "Y") {
            $(checklistItemApendInnerPanel).css('background-color', 'moccasin');
        }
    }
    
    
    
}
function SendEmailToPlumber() {
    debugger;
    var projectId = $('#hdPrId').val();
    var CommentText = $("#txtAreaCommentPlumbber").val();
    if (checklistIdsChecked.length === 0) {
        alert("Please Select DEV");
        return false;
    }

    var url = '/Email/DevPdfSendToParties?ProId=' + projectId + '&eId=7&checklistItemId=' + checklistIdsChecked + '&status=del';
    window.location.href = url;
    //$.ajax({

    //    type: "POST",

    //    url: '/WebServices/ServicePage.asmx/SendEmailToPlumber',

    //    data: '{ projectId: "' + projectId + '", CommentText: "' + CommentText + '"}',

    //    contentType: "application/json; charset=utf-8",

    //    async: false,

    //    dataType: "json",

    //    success: function (response) {
    //        debugger;
    //        var ServiceResponse = response.d;
    //        alert("Email sent! ");
    //    },
    //    failure: function (response) {
    //        alert("Service Failed");
    //    }

    //});
    
}
function hideImage() {
    $('#ImageEnlargeDiv').hide();
    $('#imageUrlToPaste').attr("src", '');
}
function showProjectImage() {
    debugger;
   var img=  $('#proImage')[0].src;
    $('#ImageEnlargeDiv').show();
    $('#imageUrlToPaste').attr("src", img);
}

function showImage(alldata) {
    debugger;
    var url= alldata.src
    //var img = $('#proImage')[0].src;
    $('#ImageEnlargeDiv').show();
    $('#imageUrlToPaste').attr("src", url);
}



function imageOpen(divClass) {

    debugger;
    var divClas = "#" + divClass;
    $(divClas).show();



}
function DeleteHideMouseOut(divClass) {

    debugger;
    var divClas = "#" + divClass;
    $(divClas).hide();
}

function ApproveInspectionReport(ID) {
    debugger;
    var r = confirm("Are you sure you want to approve?");
    if (r == true) {
        var url = '/Project/ApproveInspectionReport?ProjectId=' + ID;
        window.location.href = url;
    }
   
}
