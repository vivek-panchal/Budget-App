let totalAmaount= document.getElementById("total-amount");
let userAmount= document.getElementById("user-amount");
const checkAmountButton= document.getElementById("check-amount");
const totalAmountButton=document.getElementById("total-amount-button");
const productTitle=document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError= document.getElementById("product-title-error");
const productCostError =document.getElementById("product-cost-error");
const amount=document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue=document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount=0;

//set Budget part
totalAmountButton.addEventListener("click", ()=>{
    tempAmount= totalAmaount.value;
    //empty or negative value
    if(tempAmount==="" || tempAmount<0){
        errorMessage.classList.remove("hide");
    }else{
        errorMessage.classList.add("hide");
        //set budget
        amount.innerHtml =tempAmount;
        //set Balance
        balanceValue.innerText = tempAmount - expenditureValue.innerText;

        //clear input box
        totalAmaount.value="";
    }
});

//Function To Disable Edit and Delete Button
const disableButtons = (bool) =>{
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) =>{
        element.disabled  =bool;
    });
};

//Function to modify list element

const modifyElement = (element, edit =false) =>{
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;

    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }

    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

//Function to create list
const listCreator = (expenseName, expenseValue) =>{
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content","flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid","fa-pen-to-square","edit");
    editButton.style.fontSize="24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid","fa-trash-can", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list",appendChild)(sublistContent);
};

//Function to add Expenses
checkAmountButton.addEventListener("click", () =>{
    //empty checks
    if(!userAmount.value || !productTitle.value){
        productTitleError.classList.remove("hide");
        return false;
    }
    //Enable buttons
    disableButtons(false);
    //Expense
    let expenditure = parseInt(userAmount.value);
    //Total expense (existing + new)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    //Total balance(budget - total expense)
    const totalBalance=tempAmount -sum;
    balanceValue.innerText = totalBalance;
    //create list
    listCreator(productTitle.value, userAmount.value);
    //Empty inputs
    productTitle.value="";
    userAmount.value="";
});
