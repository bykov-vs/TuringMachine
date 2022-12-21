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
                        <button class="common-button" (click)="showAlphabet()">Алфавит</button>
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
                        <button class="common-button launch-button" type="submit">ЗАПУСТИТЬ</button>
                    </div>
                    
                </form>
            </div>
            
            <p>Имя пользователя: {{user?.name}}</p>
        </div>`,
    // styleUrls: ['./style.css'],
    providers: [HttpService]
    // selector: 'app-root',
    // templateUrl: './app.component.html',
    // styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    symbols: string[] = ["1", "2", "3"]
    alphabet: Boolean = false
    @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
    ref!: ComponentRef<TapeComboboxComponent>

    addChild() {
        ++tapeLength
        this.ref = this.vcr.createComponent(TapeComboboxComponent)
        this.ref.instance.label = tapeLength
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
    items: any = [
        {
            id: 1,
            name: 'qwe'
        }

    ];
    jsonObject: JSON;

    constructor(private httpService: HttpService) {
        this.jsonObject = <JSON>this.items;
    }

    ngOnInit() {
        this.httpService.getData().subscribe({next: (data: any) => this.user = new User(data.name)});
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
    ngAfterViewInit() {
        for (let i = 0; i < 16; i++){
            this.addChild()
        }
    }
}
