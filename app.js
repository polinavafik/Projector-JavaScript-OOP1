// thief warrior wizard druid archer 

// лавкрафт ужасы

//happiness fctory with special workers whh reduce sad make happy execute imposters etc

/*Домашнє завдання по темі "ООП в JS 1"
Реалізуйте наступну систему, схожу до розглянутої на вебінарі:
1) чотири класи для створення об'єктів-сутностей (це можуть бути тварини, покемони, раси і т.д. - проявіть фантазію)
2) у кожного класу має бути мінімум 3 властивості та мінімум 3 методи(але можна й більше)
3) у кожного класу має бути своя унікальна властивість
4) у кожного класу має бути приватна властивість
4) у двох класів має бути спільний предок та спільний метод характерний тільки для них
5) у всіх чотирьох класів має бути один (крім проміжних) клас-предок */

//Happiness Factory

class Human {
    constructor (name, type, mood) {
        this.name = name;
        this.type = type;
        this.mood = mood;
    }
}

class RegularCitizen extends Human {
    constructor (name, type, mood) {
        super (name, type, mood);
    }
    sayPhrase = () => console.log(`My name is ${this.name} and Im a regular folk`);
}

class FactoryWorker extends Human {
    constructor(name, type, mood, position) {
        super (name, type, mood);
        this.position = position;
    }

    sayPhrase = () => console.log(`My name is ${this.name} and I am Happy no matter what!`); 
}

class HappinessChecker extends FactoryWorker {
    constructor (name, type, mood, position) {
        super (name, type, mood, position);
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
    constructor (name, type, mood, position) {
        super (name, type, mood, position);
    }
    removeSadness = (citizen) => {
        if (citizen.state === 'Checked' && citizen.mood === 'Sad') {
            console.log (`${citizen.name} needs some happiness pills`)
            console.log (`Giving ${citizen.name} some pills`)
            citizen.mood = 'Happy'
            console.log (`Now ${citizen.name} is Happy`)
        } else if (citizen.state === 'Checked' && citizen.mood === 'Angry') {
            console.log (`${citizen.name} is a rebel! We cannot help him... Call the executer...`)
            citizen.state = 'Ready for Execution'
        }
    }
}
class RebelExecuter extends FactoryWorker {
    constructor (name, type, mood, position) {
        super (name, type, mood, position);
    }
    execute = (citizen) => {
        if (citizen.state === 'Ready for Execution') {
            console.log (`${citizen.name}, we are sorry we couldn help you, now you must be executed. Goodbye, ${citizen.name}`)
            
        }
    }
}


const Angela = new HappinessChecker('Angela Martin','Factory Worker', 'Happy')
const Andy = new SandessRemover('Andy Bernard','Factory Worker', 'Happy')
const Dwight = new RebelExecuter('Dwight Schrute','Factory Worker', 'Happy')
const Pam = new RegularCitizen ('Pam Beesly', 'Regular CItizen', 'Happy')
const Jim = new RegularCitizen ('Jim Halpert', 'Regular CItizen', 'Happy')
const Stanley = new RegularCitizen ('Stanley Hudson', 'Regular CItizen', 'Angry')
const Toby = new RegularCitizen ('Toby Flenderson', 'Regular CItizen', 'Sad')




console.log(Pam)
Angela.checkHappiness(Pam)
console.log(Pam)

