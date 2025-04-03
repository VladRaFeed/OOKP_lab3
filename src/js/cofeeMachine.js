import makeCoffee from "./makeCoffee"

export default class coffeMachine {
    constructor() {}

    coffee() {
        const coffeeMachine = new makeCoffee()
        const createYourCoffee = document.querySelector('.make-own-coffee-btn');
        coffeeMachine.coffeList();
        createYourCoffee.addEventListener('click', () => {coffeeMachine.createYourCoffee()})
    }
}