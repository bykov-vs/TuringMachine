import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {HttpService} from "./HttpService";

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
            <p>Имя пользователя: {{user?.name}}</p>
        </div>`,
    // styleUrls: ['./style.css'],
    providers: [HttpService]
    // selector: 'app-root',
    // templateUrl: './app.component.html',
    // styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    user: User | undefined;

    constructor(private httpService: HttpService) {
    }

    ngOnInit() {

        this.httpService.getData().subscribe({next: (data: any) => this.user = new User(data.name)});
    }
}
