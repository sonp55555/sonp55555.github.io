//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}




// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
var unavailableDates = ["07/01/2021","06/30/2021"];
const setDateFormat = "mm/dd/yy";

function disableDates1(date) {
    $('#select2').change(function(){
  if(this.value == 'Clarke Griffin' && (date.getDay() == 0 || date.getDay()==6 || date.getDay()==2)){
	  return [false];
	  var string = jQuery.datepicker.formatDate(setDateFormat, date);
	  return [ unavailableDates.indexOf(string) === -1 ]
  }
  else if(this.value == 'Raven Reyes'){
	  $("#dateInput").datepicker(
    {
        dateFormat: setDateFormat,
        // no calendar before June 1rst 2020
        minDate: new Date('06/01/2020'),  
        maxDate: '+4M',
        // used to disable some dates
        beforeShowDay: $.datepicker.noWeekends,
        beforeShowDay: disableDates2
    }   	
);
  }
});
}


function clarkeDates(date){
	var day = date.getDay();
	return [(day!=3 && day!=0 && day!=6)];
}

function bellamyDates(date){
	var day = date.getDay();
	return [(day!=2 && day!=0 && day!=6)];
}

function ravenDates(date){
	var day = date.getDay();
	return [(day!=1 && day!=0 && day!=6)];
}

// start jQuery listening...
$(document).ready(function() {

	// date input
	$("#date").datepicker(
		{
			dateFormat: 'dd-mm-yy',
			minDate: 1,
			maxDate: '+4M',
			changeYear: true,
			changeMonth: true,
		}
	);
	
	$("#select2").change(function(){
    	if ($("#select2").val()!="--Click Here to Select A Veterinarian--"){
    		var vet = $("#select2").val();
    		if (vet=="Clarke Griffin"){
    			$("#date").datepicker("option", "beforeShowDay", clarkeDates);
	    	}else if(vet=="Bellamy Blake"){
	    		$("#date").datepicker("option", "beforeShowDay", bellamyDates);
	    	}else if (vet=="Raven Reyes"){
	    		$("#date").datepicker("option", "beforeShowDay", ravenDates);
	    	}
    	}
    });
	


});

$(function() {
  $('#timepicker-input').timepicker({
    //timeFormat: 'h:mm p',
    interval: 60,
    minTime: '10',
    maxTime: '6:00pm',
    defaultTime: '11:00am',
    startTime: '10:00am',
    dynamic: true,
    dropdown: true,
    scrollbar: true
  });
});



function recieveOp1() {
	var vet = document.getElementById("select2");
	if (vet.value!=""){
		document.getElementById("After").style.display="block";
		document.getElementById("After2").style.display="block";
	}
}



function phone_formatting(ele,restore) {
  var new_number,
      selection_start = ele.selectionStart,
      selection_end = ele.selectionEnd,
      number = ele.value.replace(/\D/g,'');
  
  // automatically add dashes
  if (number.length > 2) {
    // matches: 123 || 123-4 || 123-45
    new_number = number.substring(0,3) + '-';
    if (number.length === 4 || number.length === 5) {
      // matches: 123-4 || 123-45
      new_number += number.substr(3);
    }
    else if (number.length > 5) {
      // matches: 123-456 || 123-456-7 || 123-456-789
      new_number += number.substring(3,6) + '-';
    }
    if (number.length > 6) {
      // matches: 123-456-7 || 123-456-789 || 123-456-7890
      new_number += number.substring(6);
    }
  }
  else {
    new_number = number;
  }
  
  // if value is heigher than 12, last number is dropped
  // if inserting a number before the last character, numbers
  // are shifted right, only 12 characters will show
  ele.value =  (new_number.length > 12) ? new_number.substring(0,12) : new_number;
  
  // restore cursor selection,
  // prevent it from going to the end
  // UNLESS
  // cursor was at the end AND a dash was added
  document.getElementById('msg').innerHTML='<p>Selection is: ' + selection_end + ' and length is: ' + new_number.length + '</p>';
  
  if (new_number.slice(-1) === '-' && restore === false
      && (new_number.length === 8 && selection_end === 7)
          || (new_number.length === 4 && selection_end === 3)) {
      selection_start = new_number.length;
      selection_end = new_number.length;
  }
  else if (restore === 'revert') {
    selection_start--;
    selection_end--;
  }
  ele.setSelectionRange(selection_start, selection_end);

}
  
function phone_number_check(field,e) {
  var key_code = e.keyCode,
      key_string = String.fromCharCode(key_code),
      press_delete = false,
      dash_key = 189,
      delete_key = [8,46],
      direction_key = [33,34,35,36,37,38,39,40],
      selection_end = field.selectionEnd;
  
  // delete key was pressed
  if (delete_key.indexOf(key_code) > -1) {
    press_delete = true;
  }
  
  // only force formatting is a number or delete key was pressed
  if (key_string.match(/^\d+$/) || press_delete) {
    phone_formatting(field,press_delete);
  }
  // do nothing for direction keys, keep their default actions
  else if(direction_key.indexOf(key_code) > -1) {
    // do nothing
  }
  else if(dash_key === key_code) {
    if (selection_end === field.value.length) {
      field.value = field.value.slice(0,-1)
    }
    else {
      field.value = field.value.substring(0,(selection_end - 1)) + field.value.substr(selection_end)
      field.selectionEnd = selection_end - 1;
    }
  }
  // all other non numerical key presses, remove their value
  else {
    e.preventDefault();
//    field.value = field.value.replace(/[^0-9\-]/g,'')
    phone_formatting(field,'revert');
  }

}

document.getElementById('phone').onkeyup = function(e) {
  phone_number_check(this,e);
}





function addHyphen (element) {
    	let ele = document.getElementById(element.id);
        ele = ele.value.split('-').join('');    // Remove dash (-) if mistakenly entered.

        let finalVal = ele.match(/.{1,4}/g).join('-');
        document.getElementById(element.id).value = finalVal;
		
    }

function isNumber(evt)
		 {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true; }
	
function theFunction() {
		var fname = document.getElementById("fname");
		var date = document.getElementById("date");
		var appt = document.getElementById("appt");
		var exampleFormControlSelect1 = document.getElementById("exampleFormControlSelect1");
		var select2 = document.getElementById("select2");
		var phone = document.getElementById("phone");
		
  alert('Thank you ' + fname.value + ', we have recieved your appointment request!\nThe following are the details of your appointment:\nDate: ' + date.value + '\nTime: ' + appt.value + '\nService: ' + exampleFormControlSelect1.value + '\nDoctor: ' + select2.value + '\nWe will be calling you at ' + phone.value + ' to confirm your booking.');
}


			
			
	
	