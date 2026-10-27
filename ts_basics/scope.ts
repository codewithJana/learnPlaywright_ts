//let & const are blocked scope
//var is bot a blocked scope

//Global scope
let browserName = "chrome";
function testBrowser(){
    console.log(browserName)
}

testBrowser();

//Local or function scope
function loginapps(){
    let username = "admin";
    console.log(username)
}
//console.log(username) --> unaccessible due to function scope
loginapps()

//Block scope
if(true){
    let browser = "firefox";
    console.log(browser);
}
//console.log(browser);
//var is not a blocked scope