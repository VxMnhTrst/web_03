function calculate(calculation,check)
{
    if(typeof(calculation.firstNum) != "number" || typeof(calculation.secondNum) != "number" ||
        Object.is(NaN, calculation.firstNum) || Object.is(NaN, calculation.secondNum))
    {
        check.result = 0;
        check.noti = "Not a number";
        return false;
    }

    switch(calculation.operator)
    {
        case "+":
            check.result = calculation.firstNum + calculation.secondNum;
            check.noti = "";
            return true;
        case "-":
            check.result = calculation.firstNum - calculation.secondNum;
            check.noti = "";
            return true;
        case "*":
            check.result = calculation.firstNum * calculation.secondNum;
            check.noti = "";
            return true;
        case "/":
            if(calculation.secondNum === 0)
            {
                check.result = 0;
                check.noti = "Cannot divide by 0";
                return false;
            }
            check.result = calculation.firstNum / calculation.secondNum;
            check.noti = "";
            return true;
        default:
            check.noti = "Not an operator";
            return false;
    }
}

function handleForm()
{
    const firstNumInput = document.getElementById("first-number").value;
    const secondNumInput = document.getElementById("second-number").value;
    var opeList = document.getElementsByName("calc");

    const regCheck = /[^0-9]/;
    if(regCheck.test(firstNumInput) || regCheck.test(secondNumInput))
    {
        return {
            firstNum: NaN,
            secondNum: NaN,
            operator: Array.from(opeList).filter(ope => ope.checked === true)[0].value,
        }
    }

    var formInput = {
        firstNum: parseFloat(firstNumInput),
        secondNum: parseFloat(secondNumInput),
        operator: Array.from(opeList).filter(ope => ope.checked === true)[0].value,
    }
    
    return formInput;
}

function handleResult(formInput)
{
    var check = {
        result: 0,
        noti: "",
    }

    var checkErr = calculate(formInput,check);
    console.log(checkErr);

    const result = document.getElementById("result");
    result.innerHTML = `<p>${check.result}</p>`;

    const noti = document.getElementById("notification");
    noti.innerHTML = `<p>${check.noti}</p>`;
}

function handleSubmit()
{
    var formInput = handleForm();
    handleResult(formInput);
}

function handleChangeResultAndNoti()
{
    const result = document.getElementById("result");
    result.innerHTML = "";

    const noti = document.getElementById("notification");
    noti.innerHTML = "";
}

const firstInput = document.getElementById("first-number");
const secondInput = document.getElementById("second-number");
const opeList = document.getElementsByName("calc");

firstInput.onchange = handleChangeResultAndNoti;
secondInput.onchange = handleChangeResultAndNoti;
opeList.forEach(ope => {
    ope.onchange = handleChangeResultAndNoti;
});


const calcBtn = document.getElementById("calcBtn");
calcBtn.onclick = handleSubmit;

