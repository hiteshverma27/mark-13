var dateInputRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector("#result")

function reverseString(string){
    var listOfChars = string.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedString = reverseListOfChars.join('');
    return reversedString;
    // return string.split('').reverse.join('');
}

function isPalindrome(string){
    var reverse = reverseString(string);
    return string===reverse;
}
function convertDateToString(date){
    var dateString = { day:'', month:'', year:''}
    if(date.day<10){
        dateString.day = "0"+date.day;
    } else {
        dateString.day=date.day.toString();
    }
    if(date.month<10){
        dateString.month = "0"+date.month;
    } else{
        dateString.month = date.month.toString();
    }
    dateString.year = date.year.toString();
    return dateString;
}
function getAllDateFormats(date){
    var dateStr = convertDateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindrome = getAllDateFormats(date);

    var flag = false;
    for(var i=0; i<listOfPalindrome.length; i++){
        if(isPalindrome(listOfPalindrome[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year){
    if(year%400===0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    if(year%4===0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // console.log(daysInMonth.length);
    if(month===2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month++;
            }
        }else{
            if(day>28){
                day =1;
                month++;
            }
        }
    }
    else{
        if(day>daysInMonth[month -1]){
            day =1;
            month++;
        }
    }
    if(month>12){
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}
function getNextPalindromeDate(date){
    var ctr = 0 ;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

var date = {
    day:31,
    month:12,
    year: 2020
}
function clickHandler(e){
    var bdayString =dateInputRef.value;
    if(bdayString !==""){
        var listOfDate = bdayString.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
            resultRef.innerText = 'Yeah! your birthday is a palindrome!!🎉🎉'
        }
        else{
            var [ctr, nextDate] = getNextPalindromeDate(date);
            resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!🧲`
        }
    }
}
showBtnRef.addEventListener("click", clickHandler)