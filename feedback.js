'use strict';
function start()
{
    document.getElementById("submit").addEventListener("click", function() {
       
        let inputValue = document.getElementById("experience").value;
        let resultMessage = document.getElementById("resultPara");

        if(inputValue == 'poor' || inputValue == 'Average')
        {
        resultMessage.innerHTML = "Thank you for rating us "+inputValue + ".. we will try to impress you next time!!";
        }
        else
        {
            resultMessage.innerHTML = "Thank you for rating us "+inputValue;
        }
});
}

window.addEventListener("load",start,false);
