// Classess --> Organize and reuse the behaviours
/*
    class contains:
        1. Properties --> data
        2. Methods --> behavior
        3. Constructors --> Initialization
*/

class Car {
    //properties
    public model!: string ;
    private color!: string ;
    protected speed!: number ;    

    constructor(model: string, color: string, speed: number){
        this.model = model;
        this.color = color;
        this.speed = speed;
    }
    
    //methods
    start(): void{
        console.log("Car started")
    }

    stop(): void{
        console.log("Car stopped")
    }
}

/*
    brand: string --> Initialization is missing .. How to fix?
    1. Definite assignment assertion (!) --->model!: string;  ---->  "!" only silence the compiler
    2. Default values --> model: string = "";
    3. Optional properties --->  model?: string ;
*/

const toyota = new Car("Innova","Black",100);

/*
//access properties
toyota.model = "Innova";
toyota.color = "Black";
toyota.speed = 100;
*/
console.log(toyota.model)
console.log(toyota.color)
console.log(toyota.speed)

//access methods
toyota.start();
toyota.stop();