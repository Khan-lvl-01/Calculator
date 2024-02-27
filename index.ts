import inquirer from "inquirer";

class Calculator {
    private numbers: number[];
    private operation: string;
    private result: number;

    constructor(numbers: number[] = [], operation: string = "", result: number = 0) {
        this.numbers = numbers;
        this.operation = operation;
        this.result = result;
    }

    public getNumbers(): number[] {
        return this.numbers;
    }

    public setNumbers(numbers: number[]) {
        this.numbers = numbers;
    }

    public getOperation(): string {
        return this.operation;
    }

    public setOperation(operation: string) {
        this.operation = operation;
    }

    public getResult(): number {
        return this.result;
    }

    public setResult(result: number) {
        this.result = result;
    }

    public add(result: number): void {
        let sum = result;
        for (let i = 0; i < this.numbers.length; i++) {
            sum += this.numbers[i];
        }
        this.setResult(sum);
        this.numbers = [];
    }
    
    public subtract(result: number): void {
        const numbers = this.getNumbers();
        if (numbers.length === 0) {
            console.log("No numbers to subtract");
            return;
        }
    
        let sub = result;
        for (let i = 0; i < numbers.length; i++) {
            sub -= numbers[i];
        }
        this.setResult(sub);
        this.numbers = [];
    }
    
    public multiply(result: number): void {
        let product = result;
        for (let i = 0; i < this.numbers.length; i++) {
            product *= this.numbers[i];
        }
        this.setResult(product);
        this.numbers = [];
    }
    
    public divide(result: number): void {
        const numbers = this.getNumbers();
    
        if (numbers.includes(0)) {
            console.log("Can't divide by zero");
            return;
        }
    
        let div = result;
        for (let i = 0; i < numbers.length; i++) {
            div /= numbers[i];
        }
        this.setResult(div);
        this.numbers = [];
    }
    public showResult(): void {
        console.log("Result: " + this.getResult());
    }
}

async function main() {
    let c = new Calculator();

    while (true) {
        console.log("1) Insert numbers");
        console.log("2) Add");
        console.log("3) Subtract");
        console.log("4) Multiply");
        console.log("5) Divide");
        console.log("6) Off");

        const { operation } = await inquirer.prompt([
            {
                type: "list",
                name: "operation",
                message: "What operation do you want to do?",
                choices: [1, 2, 3, 4, 5, 6],
            },
        ]);

        switch (operation) {
            case 1:
                const { numbers } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "numbers",
                        message: "Enter numbers (comma-separated)",
                    },
                ]);
                const numberArray = numbers.split(",").map((number: string) => Number(number.trim()));
                c.setNumbers([...c.getNumbers(), ...numberArray]);
                break;
                case 2:
                    c.add(c.getResult());
                    c.showResult();
                    break;
                case 3:
                    c.subtract(c.getResult());
                    c.showResult();
                    break;
                case 4:
                    c.multiply(c.getResult());
                    c.showResult();
                    break;
                case 5:
                    c.divide(c.getResult());
                    c.showResult();
                    break;
                case 6:
                    return 0;
                default:
                    console.log("Invalid choice");
        }
    }
}

main();