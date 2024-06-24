import { renderOrderSummary } from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js'
//import '../data/backend-practice.js';

//1 - VERSION 

//This is a "Promise Chaining"
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve("Product loading is done"); //Resolve gives its param to then
    });
}).then((param)=>{
    console.log(param);

    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve("Cart loading is also done");
        });
    });
}).then((param)=>{
    console.log(param);

    renderOrderSummary();
    renderPaymentSummary();
});



//2 - VERSION
//Async & await can be used with promises 
//If our function is declared with async then it should return a promise
//And closest (ya'ni o'rab turuvchi ichkaridan eng birinchi) function should be async for await
async function loadPage(){
    try{
        await loadProductsFetch();

        const value = await new Promise((resolve)=>{
            loadCart(()=>{
                resolve("Cart loading is also done");
            });
        });
        
    }catch(err){
        console.log(err);
    }

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

//Promise.all() executes all promises and waits for all of them to finish
/*
Promise.all([
    loadProductsFetch(),

    new Promise((resolve)=>{
        loadCart(()=>{
            resolve("Cart loading is also done");
        });
    })
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})
*/
