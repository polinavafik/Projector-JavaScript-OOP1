/*Домашнє завдання по темі "ООП в JS 1"
Реалізуйте наступну систему, схожу до розглянутої на вебінарі:
1) чотири класи для створення об'єктів-сутностей (це можуть бути тварини, покемони, раси і т.д. - проявіть фантазію)
2) у кожного класу має бути мінімум 3 властивості та мінімум 3 методи(але можна й більше)
3) у кожного класу має бути своя унікальна властивість
4) у кожного класу має бути приватна властивість
5) у двох класів має бути спільний предок та спільний метод характерний тільки для них
6) у всіх чотирьох класів має бути один (крім проміжних) клас-предок */

/*Happiness Factory це така державна установа, яка підтримує високий рівень щастя серед населення

Є чотири типи робітників + звичайні люди

1 тип - HappinessChecker, перевіряє рівень щастя обраної людини
2 тип - SandessRemover, дає спеціальі пігулки "щастя" нещасливій людині і робить її щасливою. Якщо людина занадто довго була нещасливою, вона стає злою на нашу державну установу, тому цю людину необхідно вилучити з нашого суспільства.
3 тип - RebelExecuter, вилучає людей
4 тип - MessCleaner, прибирає після RebelExecuter
*/


//6. Human це клас-предок усіх кнцевих класів (4 види робітників + містяни)
class Human {
    constructor(name) {
        this.name = name;
        this.type = 'Human'
    }
}

class RegularCitizen extends Human {
    constructor(name) {
        super(name);
        this.occupation = 'Regular Citizen';
        this.mood = getMood();
    }
    introduce = () => console.log(`My name is ${this.name} and Im a regular folk`);
    shareMood = () => console.log(`Why whould you ask me that😃`)
    changeMood = () => this.mood = getMood();
}

//5. спільний предок та спільний метод у чотирьох класів
class FactoryWorker extends Human {
    #workDaysCounter;
    //4. у кожного класу має бути приватна властивість - не сказано, що вона повинна бути унікальна, тому в мене в 4 класів робітників є каунтер робочих днів і це і є приватна властивість)))
    constructor(name) {
        super(name);
        this.mood = 'Happy'
        this.occupation = 'Factory Worker';
        this.#workDaysCounter = 0;
    }

    introduce = () => console.log(`My name is ${this.name} and I am Happy no matter what!`);
    workerPhrase = () => console.log(`I work at the Happiness Factory`);
    work = () => this.#workDaysCounter = this.#workDaysCounter + 1;
}

class HappinessChecker extends FactoryWorker {
    constructor(name) {
        super(name);
    }
    checkHappiness = (citizen) => {
        if (citizen.mood === 'Happy') {
            console.log(`${citizen.name} is happy`)
        } else if (citizen.mood !== 'Happy') {
            console.log(`${citizen.name} is not happy`)
        }
        citizen.state = 'Checked'
    }
}

class SandessRemover extends FactoryWorker {
    constructor(name, mood) {
        super(name, mood);
    }
    removeSadness = (citizen) => {
        if (citizen.state === 'Checked' && citizen.mood === 'Sad') {
            console.log(`${citizen.name} needs some happiness pills`)
            console.log(`Giving ${citizen.name} some pills`)
            citizen.mood = 'Happy'
            console.log(`Now ${citizen.name} is Happy`)
        } else if (citizen.state === 'Checked' && citizen.mood === 'Angry') {
            console.log(`${citizen.name} is too self aware! We cannot help him... Call the executer...`)
            citizen.state = 'Ready for Execution'
        }
    }
}
class RebelExecuter extends FactoryWorker {
    constructor(name, mood) {
        super(name, mood);
    }
    executeRebel = (citizen) => {
        if (citizen.state === 'Ready for Execution') {
            console.log(`We are sorry we couldn help you, now you must be executed. Goodbye, ${citizen.name}`)
            localStorage.setItem('mess', 1)
        }
    }
}

class MessCleaner extends FactoryWorker {
    constructor(name, mood, position) {
        super(name, mood, position);
    }
    cleanMess = () => {

    }
}

const Angela = new HappinessChecker('Angela Martin', 'Happy')
const Andy = new SandessRemover('Andy Bernard', 'Happy')
const Dwight = new RebelExecuter('Dwight Schrute', 'Happy')
const Oscar = new MessCleaner('Oscar Martinez', 'Happy')

const Pam = new RegularCitizen('Pam Beesly')
const Jim = new RegularCitizen('Jim Halpert')
const Stanley = new RegularCitizen('Stanley Hudson')
const Toby = new RegularCitizen('Toby Flenderson')


console.log(Pam)


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
