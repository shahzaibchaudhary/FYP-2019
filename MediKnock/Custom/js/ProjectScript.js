function ValidateClick() {
    debugger;
    var Validate = true;
    var ErrorHtml = "<span2 style='display: block;' title='{#Message#}' class='tooltipMain'>" +
                "<div style='margin-top: -25px; clear: both; float: right; position: relative; left: -8px;'>" +
                    "<img src='/images/validation_icon.png' alt='Validation' style='float: left; border: 0px; width: 12px;' /></div></span2>";

    // var ErrorHtml = "<img src='/images/validation_icon.png' alt='Validation' style='float: left; border: 0px; width: 12px;' /></span2>";

    // TextBoxses Validate
    $("input[validation='validate']").each(function () {
        var Value = $(this).val();
        if (Value == "" || Value == " ") {
            var Msg = "Required Field";
            $(this).addClass("input-error");
            //$(this).after(ErrorHtml.replace("{#Message#}", Msg));
            Validate = false;
        }
        else {
            //$("#ValidationID").hide();
            $(this).removeClass('input-error');
        }
    });

    // Text areas
    $("textarea[validation='validatetextarea']").each(function () {
        debugger;
        var Value = $(this).val();
        if (Value == "" || Value == " ") {
            var Msg = "Required Field";
            $(this).addClass("input-error");
            //$(this).after(ErrorHtml.replace("{#Message#}", Msg));
            Validate = false;
        }
        else {
            $(this).removeClass('input-error');
        }
    });

    // Email TextBoxses
    $("input[validation='validateEmail']").each(function () {
        var Value = $(this).val();
        if (Value == "" || Value == " " || IsEmail(Value) == false) {
            var Msg = "Not Valid Email Address";
            $(this).addClass("input-error");
            //$(this).after(ErrorHtml.replace("{#Message#}", Msg));
            Validate = false;
        }
        else {
            //$(this).nextAll('span2').remove();
            $(this).removeClass('input-error');
        }
    });

    // Compare TextBoxses
    $("input[validationMatch='validationMatch']").each(function () {
        var Value = $(this).val();
        var CompareValue = $("#" + $(this).attr("matchid")).val();
        if (Value != CompareValue || Value == "" || Value == " " || CompareValue == "" || CompareValue == " ") {
            var Msg = "Password Must Match";
            $(this).after(ErrorHtml.replace("{#Message#}", Msg));
            Validate = false;
        }
        else {
            $(this).nextAll('span2').remove();
        }
    });

    //// DropDownList Validate
    //$("select[validation='validateDDL']").each(function () {
    //    var Value = $(this).val();
    //    if (Value == "0" || Value == "-1") {
    //        var Msg = "Please Select";
    //        $(this).after(ErrorHtml.replace("{#Message#}", Msg));
    //        Validate = false;
    //    }
    //    else {
    //        $(this).nextAll('span2').remove();
    //    }
    //});
    // DropDownList Validate
    $("select[validation='validateDDL']").each(function () {
        var Value = $(this).val();
        if (Value == "-1") {
            var Msg = "Please Select";
            //$(this).after(ErrorHtml.replace("{#Message#}", Msg));
            $(this).addClass("input-error");
            Validate = false;
        }
        else {
            $(this).removeClass("input-error");

            //$(this).nextAll('span2').remove();
        }
    });

    if (Validate == true) {
        debugger;
        $("#ValidationID").hide();
    } else {
        debugger;
        $("#ValidationID").show();
    }

    return Validate;
}


function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}