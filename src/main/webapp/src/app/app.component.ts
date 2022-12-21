import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {HttpService} from "./HttpService";
import {TapeComboboxComponent} from "./tape-combobox.component";

let tapeLength = 0;

@Component({
    selector: 'app-root',
    template: `
        <div>
            <h1>Машина Тьюринга</h1>
            <div class="header-buttons">
                <button class="header-button common-button" type="submit"> О СИСТЕМЕ</button>
                <button class="header-button common-button" type="submit"> ОБ АВТОРАХ</button>
            </div>
            <hr>
            <div class="main row">
                <div class="algorithm">
                    <div class="tape row">
                        <ng-template #viewContainerRef></ng-template>
                    </div>

                    <div class="alphabet">
                        <button class="button common-button" (click)="showAlphabet()">Алфавит</button>
                        <div *ngIf="alphabet" class="symbols">

                            <div class="symbol-group" *ngFor="let symbol of symbols; index as i">
                                <input  class="symbol" type="text"
                                        [value]="symbol"
                                        id={{i}}
                                        (change)="changeSymbol($event)">
                                <button id={{i}} (click)="deleteSymbol($event)">Удалить</button>
                            </div>
                            <button *ngIf="symbols.length < 5" (click)="addSymbol()">Добавить</button>

                        </div>
                    </div>

                    <div class="table">
                        <ul class="column">
                            <li class="column-header"></li>
                            <li>0</li>
                            <li>1</li>
                            <li>+</li>
                            <li>_</li>
                        </ul>
                        <ul class="column">
                            <li class="column-header">Q1</li>
                            <li id="col-1-row-1">1 🠔 Q1</li>
                            <li id="col-1-row-2">0 🠔 Q2</li>
                            <li id="col-1-row-3">_ 🠖 Q5</li>
                            <li id="col-1-row-4"> </li>
                        </ul>
                        <ul class="column">
                            <li class="column-header">Q2</li>
                            <li id="col-2-row-1">0 🠔 Q2</li>
                            <li id="col-2-row-2">1 🠔 Q2</li>
                            <li id="col-2-row-3">+ 🠔 Q3</li>
                            <li id="col-2-row-4"> </li>
                        </ul>
                        <ul class="column">
                            <li class="column-header">Q3</li>
                            <li id="col-3-row-1">1 🠖 Q4</li>
                            <li id="col-3-row-2">0 🠔 Q3</li>
                            <li id="col-3-row-3"> </li>
                            <li id="col-3-row-4">1 🠖 Q4</li>
                        </ul>
                        <ul class="column">
                            <li class="column-header">Q4</li>
                            <li id="col-4-row-1">0 🠖 Q4</li>
                            <li id="col-4-row-2">1 🠖 Q4</li>
                            <li id="col-4-row-3">+ 🠖 Q4</li>
                            <li id="col-4-row-4">_ 🠔 Q1</li>
                        </ul>
                        <ul class="column">
                            <li class="column-header">Q5</li>
                            <li id="col-5-row-1"> </li>
                            <li id="col-5-row-2">_ 🠖 Q5</li>
                            <li id="col-5-row-3"> </li>
                            <li id="col-5-row-4">_ 🠗 Q6</li>
                        </ul>
                    </div>
                </div>
                <form class="settings">
                    <p>Параметры запуска:</p>
                    <div class="tape-length">
                        <p>Длина ленты:</p>
                        <input (change)="onTapeLengthChange($event)" class="input-text" type="number" id="tape-length" min="10" max="200" value=16>
                    </div>
                    <div class="operand">
                        <p>Операнд 1:</p>
                        <input class="input-text" type="number" id="operand-1" min="0" max="20">
                    </div>
                    <div class="operand">
                        <p>Операнд 2:</p>
                        <input class="input-text" type="number" id="operand-2" min="0" max="20">
                    </div>
                    
                    <div class="launch">
                        <p>Режим:</p>
                        <div>
                            <input type="radio" id="standard" name="drone" value="standard"
                                   checked>
                            <label for="standard">СТАНДАРТНЫЙ</label>
                        </div>

                        <div>
                            <input type="radio" id="step-by-step" name="drone" value="step-by-step">
                            <label for="step-by-step">ПОШАГОВЫЙ</label>
                        </div>

                        <div>
                            <input type="radio" id="fast" name="drone" value="fast">
                            <label for="fast">БЫСТРЫЙ</label>
                        </div>
                    </div>
                    <div class="center">
                        <button (click)="runAlgorithm()" class="common-button launch-button" type="submit">ЗАПУСТИТЬ</button>
                    </div>
                    
                </form>
                
            </div>
            
        </div>`,
    // styleUrls: ['./style.css'],
    providers: [HttpService]
    // selector: 'app-root',
    // templateUrl: './app.component.html',
    // styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    symbols: string[] = ["0", "1", "+", "_"]
    alphabet: Boolean = false
    @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
    ref!: ComponentRef<TapeComboboxComponent>

    steps: any = [
        {
            col: "1",
            row: "2",
            tape: "10",
            newVal: "0"
        },
        {
            col: "2",
            row: "2",
            tape: "9",
            newVal: "1"
        },
        {
            col: "2",
            row: "3",
            tape: "8",
            newVal: "+"
        },
        {
            col: "3",
            row: "2",
            tape: "7",
            newVal: "0"
        },
        {
            col: "3",
            row: "1",
            tape: "6",
            newVal: "1"
        },
        {
            col: "4",
            row: "1",
            tape: "7",
            newVal: "0"
        },
        {
            col: "4",
            row: "3",
            tape: "8",
            newVal: "+"
        },
        {
            col: "4",
            row: "2",
            tape: "9",
            newVal: "1"
        },
        {
            col: "4",
            row: "1",
            tape: "10",
            newVal: "0"
        },
        {
            col: "4",
            row: "4",
            tape: "11",
            newVal: "_"
        },
        {
            col: "1",
            row: "1",
            tape: "10",
            newVal: "1"
        },
        {
            col: "1",
            row: "2",
            tape: "9",
            newVal: "0"
        },
        {
            col: "2",
            row: "3",
            tape: "8",
            newVal: "+"
        },
        {
            col: "3",
            row: "1",
            tape: "7",
            newVal: "1"
        },
        {
            col: "4",
            row: "3",
            tape: "8",
            newVal: "+"
        },
        {
            col: "4",
            row: "1",
            tape: "9",
            newVal: "0"
        },
        {
            col: "4",
            row: "2",
            tape: "10",
            newVal: "1"
        },
        {
            col: "4",
            row: "4",
            tape: "11",
            newVal: "_"
        },
        {
            col: "1",
            row: "2",
            tape: "10",
            newVal: "0"
        },
        {
            col: "2",
            row: "1",
            tape: "9",
            newVal: "0"
        },
        {
            col: "2",
            row: "3",
            tape: "8",
            newVal: "+"
        },
        {
            col: "3",
            row: "2",
            tape: "7",
            newVal: "0"
        },
        {
            col: "3",
            row: "2",
            tape: "6",
            newVal: "0"
        },
        {
            col: "3",
            row: "2",
            tape: "5",
            newVal: "0"
        },
        {
            col: "3",
            row: "4",
            tape: "4",
            newVal: "1"
        },
        {
            col: "4",
            row: "1",
            tape: "5",
            newVal: "0"
        },
        {
            col: "4",
            row: "1",
            tape: "6",
            newVal: "0"
        },
        {
            col: "4",
            row: "1",
            tape: "7",
            newVal: "0"
        },
        {
            col: "4",
            row: "3",
            tape: "8",
            newVal: "+"
        },
        {
            col: "4",
            row: "1",
            tape: "9",
            newVal: "0"
        },
        {
            col: "4",
            row: "1",
            tape: "10",
            newVal: "0"
        },
        {
            col: "4",
            row: "4",
            tape: "11",
            newVal: "_"
        },
        {
            col: "1",
            row: "1",
            tape: "10",
            newVal: "1"
        },
        {
            col: "1",
            row: "1",
            tape: "9",
            newVal: "1"
        },
        {
            col: "1",
            row: "3",
            tape: "8",
            newVal: "_"
        },
        {
            col: "5",
            row: "2",
            tape: "9",
            newVal: "_"
        },
        {
            col: "5",
            row: "2",
            tape: "10",
            newVal: "_"
        },
    ]



    addChild() {
        ++tapeLength
        this.ref = this.vcr.createComponent(TapeComboboxComponent)
        this.ref.instance.label = tapeLength
        this.ref.instance.id = tapeLength
    }

    removeChild() {
        this.vcr.remove(this.vcr.length - 1)
        --tapeLength
    }

    onTapeLengthChange(event: any) {
        let newTapeLength = event.target.value
        let oldTapeLength = tapeLength
        if (newTapeLength >= 10 && newTapeLength <= 200){
            if (newTapeLength > oldTapeLength ) {
                for (let i = 0; i < newTapeLength - oldTapeLength; i++){
                    this.addChild()
                }
            } else {
                for (let i = 0; i < oldTapeLength - newTapeLength; i++){
                    this.removeChild()
                }
            }
        }
    }

    user: User | undefined;

    constructor(private httpService: HttpService) {
    }

    ngOnInit() {
        // this.httpService.getData().subscribe({next: (data: any) => this.user = new User(data.name)});
    }

    showAlphabet(){
        this.alphabet = !this.alphabet
    }

    addSymbol(){
        this.symbols.push("")
    }

    changeSymbol(event : any){
        this.symbols[event.target.id] = event.target.value
    }

    deleteSymbol(event : any){
        this.symbols.splice(event.target.id, 1)
    }

    sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    runAlgorithm() {
        let element, tapeScope, combobox
        (async () => {
            for (const x of this.steps) {
                element = document.getElementById('col-' + x.col + '-row-' + x.row)
                tapeScope = document.getElementById('tape-element-scope-' + x.tape)
                combobox = document.getElementById('tape-element-' + x.tape)
                if (element && tapeScope && combobox) {
                    element.setAttribute('class', 'selected')
                    tapeScope.setAttribute('class', 'tape-element-scope selected')
                    await this.sleep(1000);
                    element.setAttribute('class', '')
                    tapeScope.setAttribute('class', 'tape-element-scope')
                    // @ts-ignore
                    combobox.value = x.newVal
                }
            }
        })();
    }

    createTape() {
        for (let i = 0; i < 16; i++){
            this.addChild()
        }
    }

    ngAfterViewInit() {
        (async () => {
            this.createTape()
            let tapeScope = document.getElementById('tape-element-scope-10')
            console.log(tapeScope)
            if (tapeScope) {
                tapeScope.setAttribute('class', 'tape-element-scope selected')
            }
        })()

    }
}
