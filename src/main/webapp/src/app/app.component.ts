import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {HttpService} from "./HttpService";
import {TapeComboboxComponent} from "./tape-combobox.component";

let tapeLength = 0;
let tapeHeadPosition = 8;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [HttpService],
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    symbols: string[] = ["0", "1", "+"]
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
        this.ref.instance.symbols = this.symbols
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

    createTape() : Promise<any> {
        return new Promise((resolve) => {
            for (let i = 0; i < 16; i++) {
                this.addChild()
            }
        })
    }

    initTapeHeadPosition() : Promise<void> {
        return new Promise((resolve) => {
            setTimeout(()=> {
                let tapeScope = document.getElementById('tape-element-scope-' + tapeHeadPosition)
                if (tapeScope) {
                    tapeScope.setAttribute('class', 'tape-element-scope selected')
                }
                resolve();
            }, 200);
        })
    }

    sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    moveLeftTapeHead() {
        (async () => {
            if (tapeHeadPosition > 1) {
                let tapeScope = document.getElementById('tape-element-scope-' + tapeHeadPosition)
                if (tapeScope) {
                    tapeScope.setAttribute('class', 'tape-element-scope')
                }
                await this.sleep(100);
                tapeHeadPosition--;
                tapeScope = document.getElementById('tape-element-scope-' + tapeHeadPosition)
                if (tapeScope) {
                    tapeScope.setAttribute('class', 'tape-element-scope selected')
                }
            }
        })();
    }

    moveRightTapeHead() {
        (async () => {
            if (tapeHeadPosition < tapeLength) {
                let tapeScope = document.getElementById('tape-element-scope-' + tapeHeadPosition)
                if (tapeScope) {
                    tapeScope.setAttribute('class', 'tape-element-scope')
                }
                await this.sleep(100);
                tapeHeadPosition++;
                tapeScope = document.getElementById('tape-element-scope-' + tapeHeadPosition)
                if (tapeScope) {
                    tapeScope.setAttribute('class', 'tape-element-scope selected')
                }
            }
        })();
    }

    ngAfterViewInit() {
        (async () => {
            await new Promise<void>(resolve => {
                setTimeout(()=> {
                    this.createTape();
                    resolve();
                }, 200);
            }).then(() => {
                this.initTapeHeadPosition()
            });
        })()
    }
}
