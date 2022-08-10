const puppeteers = require('puppeteer');
const loginLink = "https://www.hackerrank.com/auth/login";
const codeObj = require('./codes');
const email = "xyz@gmail.com";
const password = "xyz@1000";

const browserOpen = puppeteers.launch({
    headless : false,
    args : ['--start-maximized'],
    defaultViewport : null
})
let page;

browserOpen.then(function (browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function (newTab){
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function(){
    let emailIsEntered = page.type('input[id="input-1"]', email, {delay : 50});
    return emailIsEntered;
}).then(function(){
    let passwordIsEntered = page.type('input[type="password"]', password, {delay : 50});
    return passwordIsEntered;
}).then(function(){
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]', {delay : 50});
    return loginButtonClicked;
}).then(function () {
    console.log("algorithm")
    let clickOnAlgoPromise = waitAndClick("a[data-attr1='algorithms']", page);
    return clickOnAlgoPromise;
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"]', page);
    return getToWarmUp;
}).then(function (){
    // $ -> document.querySelector();
    // $$ -> document.querySelectorAll();
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay : 3000});
    console.log(allChallengesPromise.length);
    return allChallengesPromise;
}).then(function (questionsArray){
    let questionWillBeSolved = questionSolver(page, questionsArray[0], codeObj.answers[0]);
    return questionWillBeSolved;
}).catch(function(error){
    console.log(error);
})

function waitAndClick(selector, currentPage){
    return new Promise((resolve, reject) => {
        let waitForModelPromise = currentPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModel = currentPage.click(selector);
            return clickModel;
        }).then(function(){
            console.log('3');
            resolve();
        }).catch(function(error){
            console.log(error);
            reject();
        })
    })
}

function questionSolver(page, question, answer){
    return new Promise((resolve, reject) => {
        let questionWillBeClicked = question.click();
        questionWillBeClicked.then(function() {
            let textEditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return textEditorInFocusPromise;
        }).then(function(){
            return waitAndClick('.checkbox-input', page)
        }).then(function(){
            return page.waitForSelector('#input-1', page);
        }).then(function() {
            return page.type('#input-1', answer, {delay : 10});
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let aIsPressed = page.keyboard.press('A', {delay : 100});
            return aIsPressed;
        }).then(function(){
            let xIsPressed = page.keyboard.press('X', {delay : 100});
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function(){
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return mainEditorInFocus;
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let aIsPressed = page.keyboard.press('A', {delay : 100});
            return aIsPressed;
        }).then(function(){
            let vIsPressed = page.keyboard.press('V', {delay : 100});
            return vIsPressed;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function(){
            return page.click('.hr-monaco__run-code', {delay : 50});
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}

