var buttons = document.getElementsByClassName("button");
var display = document.getElementById("display");
var operand1 = 0;
var operand2 = null;
var operator = null;
var count = 0;

for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(){
        var value = this.getAttribute('data-value');
        if(value == 'AC'){
            display.innerText = "0";
            operand1 = 0;
            operand2 = null;
            operator = null;
            count = 0;
        }
        else if(value == '+/-'){
            display.innerText = 0 - parseFloat(display.textContent);
        }
        else if(value == '%'){
            if(operand1 == '0'){
                operand1 = 1;
            }
            operator = '*';
            operand1 *= (parseFloat(display.textContent))/100;
            display.innerText = "";
            count = 0;
        }
        else if(value == '/'){
            operator = '/';
            operand1 /= parseFloat(display.textContent);
            display.innerText = "";
            count = 0;
        }
        else if(value == '*'){
            operator = '*';
            operand1 *= parseFloat(display.textContent);
            display.innerText = "";
            count = 0;
        }
        else if(value == '-'){
            operator = '-';
            operand1 -= parseFloat(display.textContent);
            display.innerText = "";
            count = 0;
        }
        else if(value == '+'){
            operator = '+';
            operand1 += parseFloat(display.textContent);
            display.innerText = "";
            count = 0;
        }
        else if(value == '='){
            operand2 = parseFloat(display.textContent);
            var result = eval(operand1 + " " + operator + " " + operand2);
            display.innerText = result;
            operand1 = 0;
            count = 0;
        }
        else{
            if(parseFloat(display.textContent) == '0'){
                display.innerText = "";
            }
            count++;
            if(count < 13){
                display.innerText += value;
            }
        }
    });
}