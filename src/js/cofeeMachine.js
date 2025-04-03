import makeCoffee from "./makeCoffee"

export default class coffeMachine {
    constructor() {}

    coffee() {
        const coffeeMachine = new makeCoffee()
        coffeeMachine.coffeList();
    }
}