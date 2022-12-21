import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {HttpService} from "./HttpService";
import {TapeCombobox} from "./tapecombobox";

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
                <form class="settings">
                    <p>Параметры запуска:</p>
                    <div class="tape-length">
                        <p>Длина ленты:</p>
                        <input class="input-text" type="number" id="tape-length" min="10" max="200" value=16>
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
    @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
    ref!: ComponentRef<TapeCombobox>

    addChild() {
        this.ref = this.vcr.createComponent(TapeCombobox)
    }

    removeChild() {
        const index = this.vcr.indexOf(this.ref.hostView)

        if (index != -1)
            this.vcr.remove(index)
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
}
