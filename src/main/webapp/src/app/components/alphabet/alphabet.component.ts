import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {HttpService} from "../../HttpService";
import {MatDialog} from "@angular/material/dialog";
import {AlphabetDownloadWindowComponent} from "../alphabet-download-window/alphabet-download-window.component";

@Component({
    selector: 'app-alphabet',
    templateUrl: './alphabet.component.html',
    styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent {
    @Input()
    symbols: String[] = []
    alphabet: Boolean = false

    @Output() alphabetChangeEvent = new EventEmitter<String[]>()

    constructor(private httpService: HttpService, public dialog: MatDialog) {
    }

    showAlphabet() {
        this.alphabet = !this.alphabet
    }

    addSymbol() {
        this.symbols.push("")
        this.alphabetChangeEvent.emit(this.symbols)
    }

    changeSymbol(event: any) {
        //console.log(this.symbols)
        let symbols = this.symbols
        let prevValue = this.symbols[event.target.id]
        if (this.symbols.includes(event.target.value)) {
            this.symbols = [];
            setTimeout(() => this.symbols = symbols, 1)
            return
        }
        this.symbols[event.target.id] = event.target.value
        this.alphabetChangeEvent.emit(this.symbols)
    }

    deleteSymbol(event: any) {
        this.symbols.splice(event.target.id, 1)
        this.alphabetChangeEvent.emit(this.symbols)
    }


    saveAlphabet() {
        // @ts-ignore
        let request: any = {alphabet: this.symbols}
        this.httpService.savaAlphabet(request)
            .subscribe((data: any) => {
                alert(data.message)
            })
        // console.log("after request" + this.steps)
        // this.runAlgorithm()
    }

    downloadAlphabets() {
        this.httpService.getAllAlphabets()
            .subscribe((data: any) => {
                const dialogRef = this.dialog.open(AlphabetDownloadWindowComponent, {
                    data: data,
                });

                dialogRef.afterClosed().subscribe(async newSymbols => {
                    if (newSymbols) {
                        this.symbols = newSymbols
                        this.alphabetChangeEvent.emit(this.symbols)
                    }
                    console.log('The dialog was closed');
                });
            })
    }
}
