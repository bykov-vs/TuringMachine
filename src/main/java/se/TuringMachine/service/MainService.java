package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.entity.Alphabet;
import se.TuringMachine.entity.Command;
import se.TuringMachine.entity.Symbol;

import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class MainService {
    private final AlgorithmService algorithmService;
    private final AlphabetService alphabetService;
    private final CommandService commandService;
    private final SymbolService symbolService;

    public void saveAlgorithm(Algorithm algorithm){
        Alphabet alphabet = algorithm.getAlphabet();
        Set<Symbol> symbols = alphabet.getSymbol();
        for (Symbol symbol : symbols) {
            symbolService.save(symbol);
        }
        List<Command> commands = algorithm.getCommands();
        for (Command command : commands) {
            commandService.save(command);
        }
        alphabetService.save(alphabet);
        algorithmService.save(algorithm);
    }

    public Algorithm findAlgorithm(Long id){
        return algorithmService.find(id);
    }

    public void saveAlphabet(Alphabet alphabet){
        if (alphabetService.find(alphabet.getId()) == null)
            alphabetService.save(alphabet);
    }

    public Alphabet findAlphabet(Long id){
        return alphabetService.find(id);
    }
}
