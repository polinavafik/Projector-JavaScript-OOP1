/*Домашнє завдання по темі "ООП в JS 1"

1) чотири класи для створення об'єктів-сутностей 
HappinessChecker SandessRemover RebelExecuter MessCleaner + доп клас RegularCitizen та батьківський класс HUMAN

2) у кожного класу має бути мінімум 3 властивості та мінімум 3 методи
властивості - name type occupation mood 
+ #workDaysCounter 
+ #happyCheckerCount 
+ state
+ position
методи: 
для всіх - areYouARobot
містяни - introduce* shareMood changeMood   introduce* - різне
робітники - introduce* workerPhrase work    introduce* - різне

3) у кожного класу має бути своя унікальна властивість
начебто у всіх є :)

4) у кожного класу має бути приватна властивість
тут не вказано що мають бути унікальні приватні властивості, тому вони є у всії робітників однакові + у HappinessChecker своя
#workDaysCounter; #happyCheckerCount;

5) у двох класів має бути спільний предок та спільний метод характерний тільки для них
у всіх робітників спільний предок FactoryWorker та спільні методи, характерні тільки для робітників

6) у всіх чотирьох класів має бути один (крім проміжних) клас-предок
У всіх классів (4 класси робітників + звичайні люди) один батьківський класс - HUMAN
*/




//---------------------------------------------
/*Happiness Factory це така державна установа, яка підтримує високий рівень щастя серед населення

Є чотири типи робітників + звичайні люди

1 тип - HappinessChecker, перевіряє рівень щастя обраної людини
2 тип - SandessRemover, дає спеціальі пігулки "щастя" нещасливій людині і робить її щасливою. Якщо людина занадто довго була нещасливою, вона стає злою на нашу державну установу, тому цю людину необхідно вилучити з нашого суспільства.
3 тип - RebelExecuter, вилучає людей
4 тип - MessCleaner, прибирає після RebelExecuter
*/



class Human {
    constructor(name) {
        this.name = name;
        this.type = 'Human'
    }
    areYouARobot = () => console.log(`I'm only human after all, Don't put your blame on me`);
}

class RegularCitizen extends Human {
    constructor(name, type) {
        super(name, type);
        this.occupation = 'Regular Citizen';
        this.mood = getMood();
    }
    introduce = () => console.log(`My name is ${this.name} and Im a regular folk`);
    shareMood = () => console.log(`Why whould you ask me that😃`)
    changeMood = () => this.mood = getMood();
}

class FactoryWorker extends Human {
    #workDaysCounter;

    constructor(name, type) {
        super(name, type);
        this.mood = 'Happy'
        this.occupation = 'Factory Worker';
        this.#workDaysCounter = 0;
    }

    introduce = () => console.log(`My name is ${this.name} and I am Happy no matter what!`);
    workerPhrase = () => console.log(`I work at the Happiness Factory`);
    work = () => this.#workDaysCounter = this.#workDaysCounter + 1;
}

class HappinessChecker extends FactoryWorker {
    #happyCheckerCount;

    constructor(name, type, mood, occupation) {
        super(name, type, mood, occupation);
        this.hasHappyMeter = true;
        this.#happyCheckerCount = 0;
        this.position = 'Happiness Checker';
    }
    checkHappiness = (citizen) => {
        if (citizen.mood === 'Happy') {
            console.log(`${citizen.name} is happy`)
            citizen.state = 'checked';
        } else if (citizen.mood !== 'Happy') {
            console.log(`${citizen.name} is not happy`)
            citizen.state = 'notHappy';
        }

        this.#happyCheckerCount = this.#happyCheckerCount + 1;
    }
    catFact = () => console.log(`Cats are believed to be the only mammals who don’t taste sweetness`)

}

class SandessRemover extends FactoryWorker {
    constructor(name, type, mood, occupation) {
        super(name, type, mood, occupation);
        this.hasHappyPills = true;
        this.position = 'Sandess Remover';
    }
    removeSadness = (citizen) => {
        if (citizen.state === 'notHappy' && citizen.mood === 'Sad') {
            console.log(`${citizen.name} needs some happiness pills`)
            console.log(`Giving ${citizen.name} some pills`)
            citizen.mood = 'Happy'
            citizen.state = 'usedPills';
            console.log(`Now ${citizen.name} is Happy`)
        } else if (citizen.state === 'notHappy' && citizen.mood === 'Angry') {
            console.log(`${citizen.name} is angry! We cannot help here... Call the executer...`)
            citizen.state = 'Ready for Execution'
        } else {
        }
    }
}
class RebelExecuter extends FactoryWorker {
    constructor(name, type, mood, occupation) {
        super(name, type, mood, occupation);
        this.hasWeapon = true;
        this.position = 'Rebel Executer';
    }
    executeRebel = (citizen) => {
        if (citizen.state === 'Ready for Execution') {
            console.log(`We're sorry we couldn help you, now you ~must~ be executed. Goodbye, ${citizen.name}`)
            localStorage.setItem('mess', true)
        } else {
        }
    }
}

class MessCleaner extends FactoryWorker {
    constructor(name, type, mood, occupation) {
        super(name, type, mood, occupation);
        this.hasUniqueFeature = true; //я не знала що придумати
    }
    cleanMess = () => {
        if (localStorage.getItem('mess') === 'true') {
            console.log(`${this.name} is cleaning the mess`)
            localStorage.setItem('mess', false)
        } else {
            console.log(`Nothing to clean here`)
        }
    }

}

const Angela = new HappinessChecker('Angela Martin', 'Happy')
const Andy = new SandessRemover('Andy Bernard', 'Happy')
const Dwight = new RebelExecuter('Dwight Schrute', 'Happy')
const Creed = new MessCleaner('Creed Bratton', 'Happy')

const Pam = new RegularCitizen('Pam Beesly')
const Jim = new RegularCitizen('Jim Halpert')
const Stanley = new RegularCitizen('Stanley Hudson')
const Kevin = new RegularCitizen('Kevin Malone')
const Kelly = new RegularCitizen('Kelly Kapoor')
const Ryan = new RegularCitizen('Ryan Howard')

console.log('---------------------------------------')
console.log('Introducing a Worker and a Citizent from a Happiness Factory Project😃')
console.log(Angela)
console.log(Pam)


console.log('---------------------------------------')
console.log('Time for annual happiness checking!😃')

Angela.checkHappiness(Pam)
Angela.checkHappiness(Jim)
Angela.checkHappiness(Stanley)
Angela.checkHappiness(Kevin)
Angela.checkHappiness(Kelly)
Angela.checkHappiness(Ryan)

console.log(Pam)
console.log('---------------------------------------')
console.log('Lest fix up those who are in need😃')
Andy.removeSadness(Pam)
Andy.removeSadness(Jim)
Andy.removeSadness(Stanley)
Andy.removeSadness(Kevin)
Andy.removeSadness(Kelly)
Andy.removeSadness(Ryan)

console.log(Pam)
console.log('---------------------------------------')
console.log('Goodbuy to all the disturbance😃')
Dwight.executeRebel(Pam)
Dwight.executeRebel(Jim)
Dwight.executeRebel(Stanley)
Dwight.executeRebel(Kevin)
Dwight.executeRebel(Kelly)
Dwight.executeRebel(Ryan)

console.log('---------------------------------------')
console.log('Cleaning process if needed😃')
Creed.cleanMess()





function getRandomNumber() {
    const random = Math.floor(Math.random() * 4)
    return random;
}
function getMood() {
    let mood;
    let result = getRandomNumber();
    if (result === 1 || result === 3) {
        mood = 'Happy'
    } else if (result === 2) {
        mood = 'Sad'
    } else if (result === 0) {
        mood = 'Angry'
    }
    return mood
}
