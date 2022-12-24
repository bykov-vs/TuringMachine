import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent {
  @Input() 
  symbols : String[] = []
  alphabet: Boolean = false

  
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
