package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.entity.Alphabet;
import se.TuringMachine.entity.Symbol;

import java.util.Set;

@Service
@AllArgsConstructor
public class MainService {
    private final AlgorithmService algorithmService;
    private final AlphabetService alphabetService;
    private final CommandService commandService;
    private final SymbolService symbolService;

    public void save(Algorithm algorithm){
        Alphabet alphabet = algorithm.getAlphabet();
        Set<Symbol> symbols = alphabet.getSymbol();
        for (Symbol symbol : symbols) {
            symbolService.save(symbol);
        }
        alphabetService.save(alphabet);
        algorithmService.save(algorithm);
    }
}
