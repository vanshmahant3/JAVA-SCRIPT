function reverseString(str){
    return str.split("").reverse().join("");
}
function message(){
    var msg = "Palindrome Checker";
    function display(){
        return msg;
    }
    return display;
}

function checkPalindrome(){
    try{
        var word = document.getElementById("word").value;
        if(word == "")
        {
            throw "Please enter a string";
        }
        if(!/^[A-Za-z0-9]+$/.test(word)){
            throw "Only alphabets/digits are allowed!";
        }
        if(word.length<3){
            throw "Please enter atleast 3 characters";
        }
        if(word.length>30){
            throw "Maximum 30 characters allowed";
        }
        let input = word.toLowerCase();
        var reverse = reverseString(input);
        if(input==reverse){
            document.write("<h2>"+message()()+"</h2>");
            document.write("<hr>");
            document.write("<b> Word:</b>"+word+"<br><br>");
            document.write("<b>Result: </b> PALINDROME");
        }
        else{
            document.write("<h2>"+message()()+"</h2>");
            document.write("<hr>");
            document.write("<b> Word:</b>"+word+"<br><br>");
            document.write("<b>Result: </b> NOT A PALINDROME");
        }

    }
    catch(error){
        alert(error);
    }
}
