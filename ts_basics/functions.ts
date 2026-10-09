//functions in TypeScript --> template for defining functions
function add(a: number, b: number): number {
    return a + b;
}   
function subtract(a: number, b: number): number {
    return a - b;
}
add(5, 3);
subtract(5, 3);

//optional parameters
function login(username: string, password?: string){
    console.log(username);
    console.log(password)
}
console.log("****Optional Parameters*****")
login("admin","pass123")
login("admin")

//default parameter
function loginApp(username: string, password: string = "pass123"){
    console.log(username);
    console.log(password)
}
console.log("****default Parameters*****")
loginApp("admin","pass123")
loginApp("admin")

//Rest paramerts
function addNumbers(...numbers:number[]): number {
    let total = 0;    
    for (let number of numbers){
        total += number;
    }
    return total;
}
console.log("****rest Parameters*****")
console.log(addNumbers(10,20))
console.log(addNumbers(10,20,30))
console.log(addNumbers(10,20,30,40))

//Arrow function
const add2Values = (a: number, b: number): number => {
    return a+b;
};
console.log("******Arrow Functions*********")
console.log(add2Values(20,30))

//arrow function with only one expression
const addTwoValues = (a: number, b: number): number => a+b;
console.log("******Arrow Functions in one line*********")
console.log(addTwoValues(50,30))

/*
test("Login test", async({page}) => {
    await page.goto("https://google.com")
})
*/
//arrow function --> (parameters) => {function body}\

//Call back function --> A function that is passed as an argument to another function

console.log("*********Call back Function ************")
function executeTest(actionStep: () => void){
    console.log("Launch Application...");
    actionStep();
    console.log("Verify Successful Login");
}

executeTest(() => {
    console.log("SSO Login performed")
})

executeTest(() => {
    console.log("MFA Login performed")
})