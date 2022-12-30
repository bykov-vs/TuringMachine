import {Component, ComponentRef, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';
import {User} from './user';
import {HttpService} from "./HttpService";
import {TapeComboboxComponent} from "./tape-combobox.component";
import {Command} from "./components/alg-table/command";
import {MatDialog} from '@angular/material/dialog';
import { AboutDevsDialogComponent } from './components/about-devs-dialog/about-devs-dialog.component';
import {AlgTableComponent} from "./components/alg-table/alg-table.component";
import {AlphabetComponent} from "./components/alphabet/alphabet.component";

let tapeLength = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [HttpService],
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    symbols: string[] = ["_", "0", "1", "+"]
    @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
    ref!: ComponentRef<TapeComboboxComponent>
    @ViewChild(AlgTableComponent) algTableComponent: AlgTableComponent | undefined;
    @ViewChild(AlphabetComponent) alphabetComponent: AlphabetComponent | undefined;

    cellValues: Command[][] = [[]]
    tapeHeadPosition = 8;
    numberOfStates: number = 3;
    tapeLen : number = 0


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

    setCommands(newCommands: Command[][]) {
        this.cellValues = newCommands;
    }

    setNumberOfStates(newNumberOfStates: number) {
        this.numberOfStates = newNumberOfStates
    }

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

    onTapeLengthChange(tapeLen : any) {
        let newTapeLength = tapeLen
        let oldTapeLength = tapeLength
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

    user: User | undefined;

    constructor(private httpService: HttpService, public dialog: MatDialog) {
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
                let tapeScope = document.getElementById('tape-element-scope-' + this.tapeHeadPosition)
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
            if (this.tapeHeadPosition > 1) {
                let tapeScope = document.getElementById('tape-element-scope-' + this.tapeHeadPosition)
                if (tapeScope) {
                    tapeScope.setAttribute('class', 'tape-element-scope')
                }
                await this.sleep(100);
                this.tapeHeadPosition--;
                tapeScope = document.getElementById('tape-element-scope-' + this.tapeHeadPosition)
                if (tapeScope) {
                    tapeScope.setAttribute('class', 'tape-element-scope selected')
                }
            }
        })();
    }

    moveRightTapeHead() {
        (async () => {
            if (this.tapeHeadPosition < tapeLength) {
                let tapeScope = document.getElementById('tape-element-scope-' + this.tapeHeadPosition)
                if (tapeScope) {
                    tapeScope.setAttribute('class', 'tape-element-scope')
                }
                await this.sleep(100);
                this.tapeHeadPosition++;
                tapeScope = document.getElementById('tape-element-scope-' + this.tapeHeadPosition)
                if (tapeScope) {
                    tapeScope.setAttribute('class', 'tape-element-scope selected')
                }
            }
        })();
    }
    clear(){
        this.onTapeLengthChange(0)
        this.onTapeLengthChange(16)
    }
    alphabetChanges(alphabet : any){
        this.symbols = alphabet
        // @ts-ignore
        this.algTableComponent.deleteCellsValue();
        // this.ref = this.vcr.get(0);
        // this.ref.instance.symbols = this.symbols
        while(tapeLength > 0) {
            this.removeChild()
        }
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
        console.log("it working" + this.symbols.length)
        this.alphabetComponent?.setAlphabet(alphabet)
    }

    setAlphabet(alphabet : any) {
        this.symbols = alphabet
        // @ts-ignore
        this.algTableComponent.deleteCellsValue();
        this.alphabetComponent?.setAlphabet(alphabet)
    }

    openDialog(){
        const dialogRef = this.dialog.open(AboutDevsDialogComponent, {
            data: {name: "test"},
          });

          dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
          });
    }

    ngAfterViewInit() {
        (async () => {
            await new Promise<void>(resolve => {
                setTimeout(()=> {
                    this.createTape();
                    resolve();
                }, 10);
            }).then(() => {
                this.initTapeHeadPosition()
            });
        })()
    }
}
