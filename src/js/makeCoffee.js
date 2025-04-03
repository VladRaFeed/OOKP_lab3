import typesOfCofee from './coffeeTypes'

export default class makeCoffee {
    constructor() {}

    getCoffeList() {
        const typesLen = typesOfCofee.typesOfCofee.length;
        let coffee = [];
        for (let i = 0; i < typesLen; i++) {
            const element = typesOfCofee.typesOfCofee[i];
            coffee.push(element);
        }
        return coffee;
    }

    yourCoffee(obj) {
        const data = obj;
        const text = `
            <div class="coffee-card-details">
                <h3 class="coffee-card-title">Ваш напій: ${data.title}</h3>
                <ul class="coffee-card-list">
                    <li class="coffee-card-item">
                        <p>Цукор: ${data.sugar}</p>
                    </li>
                    <li class="coffee-card-item">
                        <p>Кількість еспресо: ${data.esspressoCups}</p>
                    </li>
                    <li class="coffee-card-item">
                        <p>Вміст молока: ${data.milk}</p>
                    </li>
                    <li class="coffee-card-item coffee-card-price">
                        <p>Ціна: ${data.price}</p>
                    </li>
                </ul>
            </div>
            <button id="makeMore" class="makeMoreCoffe">Зробити ще!</button>
        `

        return text
    }

    addSugar(obj) {

        return new Promise((resolve) => {
            const sugarMarkup = `
                <div class="sugar-wrapper">
                    <p>Бажаєте додати цукру?</p>
                    <button id="yes" class="sugar-button">Так</button>
                    <button id="no" class="sugar-button">Ні</button>
                </div>
            `
    
            const sugarWrapper = document.getElementById('sugar');
            
            sugarWrapper.innerHTML = sugarMarkup;
            
            const yesBtn = document.getElementById('yes');
            const noBtn = document.getElementById('no');
            
            obj.sugar = 0;

            yesBtn.addEventListener('click', () => {
                obj.sugar += 1;
                sugarWrapper.innerHTML = "";
                resolve(obj);
            })
    
            noBtn.addEventListener('click', () => {
                sugarWrapper.innerHTML = "";
                resolve(obj);
            })

        })

    }

    async makeSelectedCoffee(e) {
        const createBtn = document.querySelector('.make-own-coffee-btn');
        createBtn.classList.toggle('hide')
        const coffee = e.srcElement.offsetParent.childNodes[1].childNodes[1].innerText;
        const coffeeList = await this.getCoffeList();
        let result = null;

        for (let i = 0; i < coffeeList.length; i++) {
            if(coffeeList[i].title === coffee) {
                result = coffeeList[i]
            }
        }

        result = await this.addSugar(result)

        const makedCoffeeWrapper = document.getElementById('makedCoffee');
        const coffeelist = document.querySelector('.coffeelist');
        const newText = await this.yourCoffee(result)
        
        coffeelist.innerHTML = '';

        makedCoffeeWrapper.innerHTML = newText;

        const makeMore = document.querySelector('.makeMoreCoffe');
        makeMore.addEventListener('click', () => {this.coffeList(); makedCoffeeWrapper.innerHTML = ''; 
            createBtn.classList.toggle('hide');})

    }

    coffeList() {
        const typesLen = typesOfCofee.typesOfCofee.length;
        let markup = '';
        for (let i = 0; i < typesLen; i++) {
            const data = typesOfCofee.typesOfCofee[i];
            markup += `
                <li class="coffee-card">
                    <div class="coffee-card-content">
                        <h3 class="coffee-title">${data.title}</h3>
                        <p class="coffee-price">${data.price}</p>
                        <button class="coffee-button">Обрати</button>
                    </div>
                </li>
            `
        }

        const coffeelist = document.querySelector('.coffeelist');
        
        coffeelist.innerHTML = markup;

        const coffeeListBtn = document.querySelectorAll('.coffee-button')

        coffeeListBtn.forEach(button => {
            button.addEventListener('click', this.makeSelectedCoffee.bind(this))
        })
    }

    createCoffe(title, sub, espr, milk, price) {
        console.log(title, sub, espr, milk, price)
        const newObject = {
            "title": title,
            "Опис": sub,
            "esspressoCups": espr,
            "sugar": 0,
            "milk": milk,
            "price": price
        }

        typesOfCofee.typesOfCofee.push(newObject)
        const createBtn = document.querySelector('.make-own-coffee-btn');
        createBtn.classList.toggle('hide');
    }

    createYourCoffee() {
        const coffeelist = document.querySelector('.coffeelist');
        const createBtn = document.querySelector('.make-own-coffee-btn');
        const formWrapper = document.querySelector('.formWrapper')
        
        coffeelist.innerHTML = '';
        createBtn.classList.toggle('hide')
        const markupCreate = `
            <form class="custom-coffee-form">
                <label for="title">Назва кави</label>
                <input type="text" name="title" id="title">
            
                <label for="subscription">Опис</label>
                <input type="text" name="subscription" id="sub">
            
                <label for="espresso">Кількість чашок еспрессо</label>
                <input type="number" name="espresso" id="espresso">
            
                <label for="milk">Додати молоко?</label>
                <input type="checkbox" name="milk" id="milk">
            
                <label for="price">Встановіть ціну</label>
                <input type="number" name="price" id="price">
            
                <button type="button" id="create">Створити</button>
            </form>
        `

        formWrapper.innerHTML = markupCreate;
        
        const title = document.getElementById('title')
        const sub = document.getElementById('sub')
        const espr = document.getElementById('espresso')
        const milk = document.getElementById('milk')
        const price = document.getElementById('price')

        const createCoffeeBtn = document.getElementById('create');
        createCoffeeBtn.addEventListener('click', () => {this.createCoffe(title.value, sub.value, espr.value, milk.value, price.value); formWrapper.innerHTML = ''; this.coffeList()})
        
    }
}