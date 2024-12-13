function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
//function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};

class Pessoa{
    private nome: string
    private dinheiro: number

    constructor(nome: string, dinheiro: number){
        this.nome = nome
        this.dinheiro = dinheiro
    }

    getNome():string {
        return this.nome
    }

    getDinheiro(): number {
        return this.dinheiro
    }

    movDinheiro(valor: number){
        this.dinheiro += valor
    }
}

class Moto {
    private custo: number =0
    private motorista: Pessoa | null = null
    private passageiro: Pessoa | null = null

    setMotorista(motorista: Pessoa): boolean{
        if(this.motorista == null){
            this.motorista = motorista
            return true
        }
        return false
    }

    tirarMotorita(): void {
        this.motorista = null
    }

    setPassageiro(passageiro: Pessoa): boolean{
        if(this.motorista !== null && this.passageiro === null){
            this.passageiro = passageiro
            return true
        }
        return false
    }

    tirarPassageiro(): Pessoa | null {
        let passageiroAtual = this.passageiro
        this.passageiro = null
        return passageiroAtual
    }

    dirigir(distancia: number){
        if(this.motorista !== null && this.passageiro !== null){
            this.custo += distancia
        }
    }

    acabarCorrida(): string {
        if(this.motorista == null || this.passageiro == null){
            return `fail: Sem motorista ou passageiro`
        }

        let total = this.custo
        if(this.passageiro.getDinheiro() >= total){
            this.passageiro.movDinheiro(-total)
            this.motorista.movDinheiro(total)
        } else{
            let pago = this.passageiro.getDinheiro()
            this.passageiro.movDinheiro(-pago)
            this.motorista.movDinheiro(pago)
        }

        let nomePassageiro = this.passageiro.getNome()
        let dinheiroFinal = this.passageiro.getDinheiro()

        this.custo = 0
        this.tirarPassageiro

        return `${nomePassageiro}:${dinheiroFinal} leave`
    }

    show(): string {
        let motorista = this.motorista ? `${this.motorista.getNome()}:${this.motorista.getDinheiro()}` : "None"
        let passageiro = this.passageiro  ? `${this.passageiro.getNome()}:${this.passageiro.getDinheiro()}` : "None"

        return `Cost: ${this.custo}, Driver: ${motorista}, Passenger: ${passageiro}`
    }

}

class Adapter {
    moto: Moto = new Moto
    
    setDriver(name: string, money: number): void {
        let motorista = new Pessoa(name, money)
        if(!this.moto.setMotorista(motorista)){
            console.log('fail já existe um motorista')
        }

    }

    setPassenger(name: string, money: number): void {
        let passageiro = new Pessoa(name, money)
        if(!this.moto.setPassageiro(passageiro)){
            console.log('fail: já existe um passageiro')
        }
    }

    drive(distance: number): void {
       this.moto.dirigir(distance)
    }

    tirarPassageiro(): void {
        console.log(this.moto.acabarCorrida())
    }

    show(): void {
        console.log(this.moto.show())
    }
}

function main(): void {
    let adapter: Adapter = new Adapter();
    while (true) {
        write("$", "");
        const line = input();
        const args = line.split(" ");
        write(line);

        if      (args[0] === "end"      ) { break;                                   }
        else if (args[0] === "setDriver") { adapter.setDriver(args[1], +args[2]);    }
        else if (args[0] === "setPass"  ) { adapter.setPassenger(args[1], +args[2]); }
        else if (args[0] === "drive"    ) { adapter.drive(+args[1]);                 }
        else if (args[0] === "leavePass") { adapter.tirarPassageiro();                }
        else if (args[0] === "show"     ) { adapter.show();                          }
        else                              { console.log("fail: command not found");  }
    }
}

main();
