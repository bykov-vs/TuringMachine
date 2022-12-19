package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.entity.Command;
import se.TuringMachine.entity.Tape;
import se.TuringMachine.exception.InvalidStateException;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ExecuteService {

    public void execute(Algorithm algorithm, Tape tape){
        List<Command> commands = algorithm.getCommands();
        List<List<Command>> states = groupCommandsByStates(commands);
        String line = tape.toString();
        char[] symbols = line.toCharArray();
        int indexOfSymbol = 0;
        int MAX_ITERS = 1000;
        int iters = 0;
        int indexOfState = 0;
        Command currentCommand = null;
        LinkedHashMap<Integer, Character> track = new LinkedHashMap<>();

        while (indexOfState < states.size() || iters < MAX_ITERS){
            iters++;
            char currentSymbol = indexOfSymbol < 0 || indexOfSymbol >= symbols.length ? ' ': symbols[indexOfSymbol];
            currentCommand = getCurrentCommand(states.get(indexOfState), currentSymbol);
            if (currentCommand == null)
                throw new InvalidStateException();
            if (currentCommand.getNextState() != -1)
                indexOfState = currentCommand.getNextState();
            if (currentCommand.getNewSymbol() != null)
                symbols[indexOfSymbol] = currentCommand.getNewSymbol();
            switch (currentCommand.getMove()) {
                case "Л" -> indexOfSymbol--;
                case "П" -> indexOfSymbol++;
            }

            track.put(indexOfState, currentSymbol);

            //Добавить проверки на зацикливание программы и невозможное состояние (из которого нельзя выйти)
            //Добавить выход из цикла (состояние остановки???)
            //если indexOfSymbol отрицательный или больше длины ленты, то currentSymbol = ""?
            //Добавить трассировку
        }
        for (Map.Entry<Integer, Character> entry : track.entrySet()) {
            System.out.println(entry.getKey() + " : " + entry.getValue());
        }
    }

    private List<List<Command>> groupCommandsByStates(List<Command> commands){
        List<List<Command>> states = new ArrayList<>();
        List<Command> tempCommands = new ArrayList<>();
        commands = commands.stream()
                .sorted(Comparator.comparingInt(Command::getState))
                .collect(Collectors.toList());

        int indexState = 0;
        for (Command command : commands) {
            if (command.getState() == indexState){
                tempCommands.add(command);
            }
            if (command.getState() > indexState){
                states.add(tempCommands);
                indexState++;
                tempCommands.clear();
            }
        }
        return states;
    }

    private Command getCurrentCommand(List<Command> commands, char currentSymbol){
        for (Command command : commands) {
            if (command.getSymbol().getName().equals(currentSymbol)){
                return command;
            }
        }
        return null;
    }
}
