function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
//function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};

class Carregador{
    private potencia: number

    constructor(potencia: number){
        this.potencia = potencia
    }

}

class Bateria{
    private carga: number
    private capacidade: number

    constructor(capacidade: number){
        this.carga = 0
        this.capacidade = capacidade
    }
    
}

class Notebook{
    private ligado: boolean
    private bateria: Bateria | null
    private carregador: Carregador | null

    constructor(){
        this.ligado = false
        this.bateria = null
    }

    ligar(){
        if(this.carregador !== null || this.bateria !== null){
            return true
        }
        
    }

    usar(tempo: number){
        if(this.ligado == true){

        }

    }

    setCarregador(carregador: Carregador){
        this.carregador = carregador
    }

    setBateria(bateria: Bateria){
        this.bateria = bateria
    }

    tirarCarregador() {
        this.carregador = null
    }

    toString(){
        status: ''
        
    }


}

class Adapter {
 private notebook: Notebook = new Notebook();
    show(): void {
        // console.log(this.notebook.toString());
    }

    turnOn(): void {
        // this.notebook.turnOn();
    }

    turnOff(): void {
        // this.notebook.turnOff();
    }

    setCharger(power: number): void {
       //this.notebook.setCarregador(power)
    }

    removeCharger(): void {
        // let charger = this.notebook.removeCharger();
        // if (charger) {
        //     console.log(`Removido ${charger}`);
        // } else {
        //     console.log("fail: Sem carregador");
        // }
    }

    setBattery(capacity: number): void {
        //TODO Implementar
    }

    removeBattery(): void {
        // let battery = this.notebook.removeBattery();
        // if (battery) {
        //     console.log(`Removido ${battery}`);
        // } else {
        //     console.log("fail: Sem bateria");
        // }
    }

    use(minutes: number): void {
        // this.notebook.use(minutes);
    }
}

// Função principal
function main() {
    const adapter = new Adapter();
    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);

        if      (args[0] === "end"        ) { break;                           }
        else if (args[0] === "show"       ) { adapter.show();                  }
        else if (args[0] === "turn_on"    ) { adapter.turnOn();                }
        else if (args[0] === "turn_off"   ) { adapter.turnOff();               }
        else if (args[0] === "use"        ) { adapter.use(+args[1]);           }
        else if (args[0] === "set_charger") { adapter.setCharger(+args[1]);    }
        else if (args[0] === "rm_charger" ) { adapter.removeCharger();         }
        else if (args[0] === "set_battery") { adapter.setBattery(+args[1]);    }
        else if (args[0] === "rm_battery" ) { adapter.removeBattery();         }
        else                                { write("fail: comando inválido"); }

    }
}

main();
