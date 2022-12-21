import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {HttpService} from "./HttpService";
import {TapeCombobox} from "./tapecombobox";

// declare let angular: any;
// let myApp = angular.module('myApp',[]);
//
// myApp.controller('DoubleController', ['$scope', function($scope: { items: { id: number; name: string; }[]; }) {
//     $scope.items = [
//         {
//             id: 1,
//             name: 'qwe'
//         }
//
//     ];
// }]);

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
            <div class="algorithm">
                <div class="tape row">
                    <div class="tape-element-scope">
                        <p class="label">1</p>
                        <div class="tape-element">
                            <app-tape-combobox></app-tape-combobox>
                        </div>
                    </div>
                    <div class="tape-element-scope">
                        <p>2</p>
                        <div class="tape-element">
                            <p>3</p>
                        </div>
                    </div>
                    <div class="tape-element-scope">
                        <p>2</p>
                        <div class="tape-element">
                            <p>3</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="alphabet">
                <button class="button" (click)="showAlphabet()">Алфавит</button>
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
}
