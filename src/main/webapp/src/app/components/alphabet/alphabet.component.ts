import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent {
  @Input() 
  symbols : String[] = []
  alphabet: Boolean = false

  @Output() alphabetChangeEvent  = new EventEmitter<String[]>()


  showAlphabet(){
    this.alphabet = !this.alphabet
}

  addSymbol(){
    this.symbols.push("")
    this.alphabetChangeEvent.emit(this.symbols)
  }

  changeSymbol(event : any){
    //console.log(this.symbols)
    let symbols = this.symbols
    let prevValue = this.symbols[event.target.id]
    if (this.symbols.includes(event.target.value)){
      this.symbols = [];
      setTimeout(() => this.symbols = symbols, 1)
      return
    }
    this.symbols[event.target.id] = event.target.value
    this.alphabetChangeEvent.emit(this.symbols)
  }

  deleteSymbol(event : any){
      this.symbols.splice(event.target.id, 1)
      this.alphabetChangeEvent.emit(this.symbols)
  }
}
