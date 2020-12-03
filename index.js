"use strict";

let tabFinanzialIncome = [];
let tabFinanzialExpenses = [];

let containerAddFinancialIncome = document.querySelector('.container-financial-left');
let inputAddFinancialIncome = document.querySelector('.input-financial-change-income');
let inputAddFinancialIncomeAmount = document.querySelector('.input-financial-change-income-amount');
let buttonAddFinancialIncome = document.querySelector('.button-add-financial-change-income');

let containerAddFinancialExpenses = document.querySelector(".container-financial-right");
let inputAddFinancialExpenses = document.querySelector('.input-financial-change-expenses');
let inputAddFinancialExpensesAmount = document.querySelector('.input-financial-change-expenses-amount');
let buttonAddFinancialExpenses = document.querySelector('.button-add-financial-change-expenses');

const totalIncomeSpan = document.querySelector('.total-income');
const totalExpensesSpan = document.querySelector('.total-expenses');
const showLeftToEpencesSumme = document.querySelector('.show-rest-pln');
const showInfoLefttoExpensesSumme = document.querySelector('.show-left-to-expenses-summe');

addLeftToRelasedSumme();

let incoMe = '';
let amouNt = 0;
let incId = 0.00;
let containerListLeft = document.querySelector('.container-list-left');

let formOne = document.getElementById('form-income');

formOne.addEventListener('submit', function (event) {
    event.preventDefault();

    let incomeInp = event.target.elements[0];
    let incomeInpAmount = event.target.elements[1];

    let inputError = document.getElementById('input-error-left');

    if (incomeInp.value.length < 1 || incomeInpAmount.value.length < 1) {
        inputError.innerText = "wypelnij pola (min. po jednym znaku)"
        return;
    }
    if (incomeInpAmount.value.length > 12) {
        inputError.innerText = "za duza kwota (max: 999999999,99)";
        return;
    }
    if (incomeInp.value.length > 30) {
        inputError.innerText = "za dluga nazwa przychodu (max: 30 znakow)";
        return;
    }
    if (incomeInp.value.length > 0 && incomeInpAmount.value.length > 0) {
        inputError.innerText = " ";

        let finIncTable = {
            id: incId,
            incoMe: incomeInp.value,
            amouNt: +incomeInpAmount.value,
        };

        incId++;
        tabFinanzialIncome.push(finIncTable);
        updateFinanzialIncome();

    }
});

let expId = 0;
let expencEs = '';
let expAm = 0.00;
let containerListRight = document.querySelector('.container-list-right');

let formTwo = document.getElementById('form-expenses');

formTwo.addEventListener('submit', function (event) {
    event.preventDefault();

    let expensesInp = event.target.elements[0];
    let expensesInpAmount = event.target.elements[1];

    let inputError = document.getElementById('input-error-right');

    if (expensesInp.value.length < 1 || expensesInpAmount.value.length < 1) {
        inputError.innerText = "wypelnij pola (min. po jednym znaku)"
        return;
    }
    if (expensesInpAmount.value.length > 12) {
        inputError.innerText = "za duza kwota (max: 999999999,99)";
        return;
    }
    if (expensesInp.value.length > 30) {
        inputError.innerText = "za dluga nazwa przychodu (max: 30 znakow)";
        return;
    }
    if (expensesInp.value.length > 0 && expensesInpAmount.value.length > 0) {
        inputError.innerText = " ";

        let finExpTable = {
            id: expId,
            expencEs: expensesInp.value,
            expAm: +expensesInpAmount.value,
        };

        expId++;
        tabFinanzialExpenses.push(finExpTable);

        updateFinanzialExpenses();
    }
});

function updateFinanzialIncome() {

    containerListLeft.innerText = '';

    resetInputValue();

    for (let update of Object(tabFinanzialIncome)) {

        let incomeContainer = document.createElement('div');
        incomeContainer.setAttribute('class', 'container-content');

        let incomeLi = document.createElement('li');
        incomeLi.setAttribute('class', 'list-content-container');
        incomeLi.innerText = update.incoMe + " - " + (update.amouNt).toFixed(2) + " PLN";

        let incomeEditBtn = document.createElement('button');
        incomeEditBtn.setAttribute('class', 'income-edit-btn');
        incomeEditBtn.innerText = "Edytuj";

        incomeEditBtn.addEventListener('click', function () {
            incomeContainer.setAttribute('class', 'container-edit-input');
            incomeContainer.innerHTML = `
        <input class ="edit-input-income-one" id="editedInputOne-${update.id}" value="${update.incoMe}" type="text"></input>
        <input class ="edit-input-income-two" id="editedInputTwo-${update.id}" value="${update.amouNt}" type ="number"></input>
        <button class ="on-save-button-clicked" onclick="onSaveIncomeButtonClicked(${update.id})">Zapisz</button>
        `;
        });

        let incomeDeleteBtn = document.createElement('button');
        incomeDeleteBtn.innerText = "Usun";
        incomeDeleteBtn.id = update.id;

        incomeDeleteBtn.addEventListener('click', function (event) {
            tabFinanzialIncome = tabFinanzialIncome.filter(function (element) {
                return element.id !== Number(event.target.id);
            });

            updateFinanzialIncome();
            addLeftToRelasedSumme();
        });

        incomeContainer.appendChild(incomeLi);
        incomeContainer.appendChild(incomeEditBtn);
        incomeContainer.appendChild(incomeDeleteBtn);
        containerListLeft.appendChild(incomeContainer);

        addIncomeSumme();
        addLeftToRelasedSumme();
    }
}

function updateFinanzialExpenses() {

    const showSummeIncome = addIncomeSumme();

    showLeftToEpencesSumme.innerText = showSummeIncome.toFixed(2) + " " + "PLN";
    containerListRight.innerText = '';
    resetInputValue();

    for (let update of Object(tabFinanzialExpenses)) {

        let expensesContainer = document.createElement('div');
        expensesContainer.setAttribute('class', 'container-content');

        let expensesLi = document.createElement('li');
        expensesLi.setAttribute('class', 'list-content-container');
        expensesLi.innerText = update.expencEs + " - " + (update.expAm).toFixed(2) + " PLN";

        let expensesEditBtn = document.createElement('button');
        expensesEditBtn.setAttribute('class', 'expenses-edit-btn');
        expensesEditBtn.innerText = "Edytuj";

        expensesEditBtn.addEventListener('click', function () {
            expensesContainer.setAttribute('class', 'container-edit-input');
            expensesContainer.innerHTML = `
        <input class ="edit-input-expemses-one" id="editedInputExpensesOne-${update.id}" value="${update.expencEs}" type="text"></input>
        <input class ="edit-input-expenses-two" id="editedInputExpensesTwo-${update.id}" value="${update.expAm}" type ="number" ></input>
        <button class ="on-save-button-clicked" onclick="onSaveExpensesButtonClicked(${update.id})">Zapisz</button>
        `;
        });

        let expensesDeleteBtn = document.createElement('button');
        expensesDeleteBtn.setAttribute('class', 'expenses-delete-btn');
        expensesDeleteBtn.innerText = "Usun";
        expensesDeleteBtn.id = update.id;

        expensesDeleteBtn.addEventListener('click', function (event) {
            tabFinanzialExpenses = tabFinanzialExpenses.filter(function (element) {
                return element.id !== Number(event.target.id);
            });

            updateFinanzialExpenses();
            addLeftToRelasedSumme();

        });

        expensesContainer.appendChild(expensesLi);
        expensesContainer.appendChild(expensesEditBtn);
        expensesContainer.appendChild(expensesDeleteBtn);
        containerListRight.appendChild(expensesContainer);

        addExpensesSumme();
        addLeftToRelasedSumme();
    }
}

function onSaveIncomeButtonClicked(id) {

    let editedInputTwo = document.querySelector('.edit-input-income-two').value

    if (editedInputTwo < 0) {
        return;
    }

    const element = tabFinanzialIncome.find(elem => elem.id === id);
    const elemOne = document.getElementById(`editedInputOne-${id}`);
    const elemTwo = document.getElementById(`editedInputTwo-${id}`);
    element.incoMe = elemOne.value;
    element.amouNt = +elemTwo.value;

    updateFinanzialIncome();
}

function onSaveExpensesButtonClicked(id) {

    let editedExpensesTwo = document.querySelector('.edit-input-expenses-two').value

    if (editedExpensesTwo < 0) {
        return;
    }

    const element = tabFinanzialExpenses.find(elem => elem.id === id);
    const elemOne = document.getElementById(`editedInputExpensesOne-${id}`);
    const elemTwo = document.getElementById(`editedInputExpensesTwo-${id}`);
    element.expencEs = elemOne.value;
    element.expAm = +elemTwo.value;

    updateFinanzialExpenses();
}

function addIncomeSumme() {

    let showSummeIncome = 0;
    totalIncomeSpan.innerText = '';
    tabFinanzialIncome.forEach(function (element) {
        showSummeIncome += element.amouNt;
        totalIncomeSpan.innerText = showSummeIncome.toFixed(2) + " PLN";
    });

    return showSummeIncome;
}

function addExpensesSumme() {

    let showSummeExpenses = 0;
    totalExpensesSpan.innerText = '';
    tabFinanzialExpenses.forEach(function (element) {
        showSummeExpenses += element.expAm;
        totalExpensesSpan.innerText = showSummeExpenses.toFixed(2) + " PLN";
    });

    return showSummeExpenses;
}

function addLeftToRelasedSumme() {

    const showSummeIncome = addIncomeSumme();
    const showSummeExpenses = addExpensesSumme();
    let summeOne = showSummeIncome;
    let summeTwo = showSummeExpenses;
    let leftRelSumme = summeOne - summeTwo;
    if (summeOne === summeTwo) {
        showInfoLefttoExpensesSumme.innerText = "Bilans wynosi zero";
        showLeftToEpencesSumme.innerText = '';
        return;
    }
    if (summeOne < summeTwo) {
        showInfoLefttoExpensesSumme.innerText = "Bilans jest ujemny. Jesteś na minusie:";
        showLeftToEpencesSumme.innerText = leftRelSumme.toFixed(2) + " " + "PLN";
        return;
    }
    if (summeOne > summeTwo) {
        showInfoLefttoExpensesSumme.innerText = "Możesz jeszcze wydać:"
        showLeftToEpencesSumme.innerText = leftRelSumme.toFixed(2) + " " + "PLN";
        return;
    }
}

function resetInputValue() {

    inputAddFinancialIncome.value = '';
    inputAddFinancialIncomeAmount.value = '';
    inputAddFinancialExpenses.value = '';
    inputAddFinancialExpensesAmount.value = '';
}