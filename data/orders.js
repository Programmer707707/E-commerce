export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order); // puts order on the top
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}