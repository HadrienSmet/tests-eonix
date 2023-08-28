import { ListType } from "../types/ListType";

class Human {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

export class Trainer extends Human {
    ordersList: ListType;
    monkey: Monkey;
    constructor(name: string, ordersList: ListType, monkey: Monkey) {
        super(name);
        this.ordersList = ordersList;
        this.monkey = monkey;
    }
    order(randomIndex: number) {
        const randomOrder = this.ordersList[randomIndex];
        return `${this.name} dis à ${this.monkey.name}: '${randomOrder.order}'`;
    }
}

export class Monkey {
    trainer: string;
    name: string;
    tricksList: ListType;
    constructor(trainer: string, name: string, tricksList: ListType) {
        this.trainer = trainer;
        this.name = name;
        this.tricksList = tricksList;
    }
    obey(randomIndex: number) {
        const action = this.tricksList[randomIndex].order;
        const actionArray = action.split(" ");
        const firstWord = actionArray[0];
        const lowerArray = firstWord.toLowerCase().split("");
        if (lowerArray[lowerArray.length - 1] === "s") {
            lowerArray.pop();
            lowerArray!.push("t");
        }
        actionArray.splice(0, 1, lowerArray.join(""));

        const answer = actionArray.join(" ");

        return `${this.name} s'éxécute suite à l'ordre de ${this.trainer} et il ${answer}`;
    }
}

export class Spectator extends Human {
    constructor(name: string) {
        super(name);
    }
    reacts(orderType: string, monkeyName: string) {
        if (orderType === "music") {
            return `${this.name} siffle pour encourager ${monkeyName}`;
        } else {
            return `${this.name} applaudit devant les performances de ${monkeyName}`;
        }
    }
}
