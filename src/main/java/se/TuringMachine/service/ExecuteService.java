package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.entity.Command;
import se.TuringMachine.exception.InvalidStateException;

import java.util.*;

@Service
@AllArgsConstructor
public class ExecuteService {
    @AllArgsConstructor
    class TrackStep {
        private int col;
        private int row;
        private int newState;
        private char newSymbol;
    }

    public Map<List<TrackStep>, Integer> execute(Algorithm algorithm, String tape) {

        List<Command> commands = algorithm.getCommands();

        List<List<Command>> states = groupCommandsByStates(commands);

        StringBuilder dynamicTape = new StringBuilder();
        char[] symbols = tape.toCharArray();
        for (char symbol : symbols) {
            dynamicTape.append(symbol);
        }
        int indexOfSymbol = 0;
        int MAX_ITERS = 1000;
        int iters = 0;
        int indexOfState = 0;
        Command currentCommand = null;
        List<TrackStep> track = new ArrayList<>();
        Map<List<TrackStep>, Integer> result = new HashMap<>();

        while (indexOfState < states.size() && iters < MAX_ITERS) {
            iters++;
            if (indexOfSymbol < 0) {
                indexOfSymbol++;
                dynamicTape.insert(indexOfState, " ");
            }
            if (indexOfSymbol >= dynamicTape.length()) {
                dynamicTape.append(" ");
            }
            char currentSymbol = dynamicTape.charAt(indexOfSymbol);
            //char currentSymbol = indexOfSymbol < 0 || indexOfSymbol >= symbols.length ? ' ': symbols[indexOfSymbol];
            currentCommand = getCurrentCommand(states.get(indexOfState), currentSymbol);
            int prevState = indexOfState;
            if (currentCommand == null)
                throw new InvalidStateException();
            if (currentCommand.getNextState() != -1)
                indexOfState = currentCommand.getNextState();
            if (currentCommand.getNewSymbol() != null)
                dynamicTape.replace(indexOfSymbol,
                        indexOfSymbol + 1,
                        String.valueOf(currentCommand.getNewSymbol()));
            switch (currentCommand.getMove()) {
                case "Л" -> indexOfSymbol--;
                case "П" -> indexOfSymbol++;
            }

            track.add(new TrackStep(prevState, currentSymbol, indexOfState, currentCommand.getNewSymbol()));

            //Добавить проверки на зацикливание программы и невозможное состояние (из которого нельзя выйти)
            //Добавить выход из цикла (состояние остановки???)
            //если indexOfSymbol отрицательный или больше длины ленты, то currentSymbol = ""?
            //ДОБАВИТЬ ТРАССИРОВКУ (????)
        }
        result.put(track, dynamicTape.length());
        return result;

    }

    private List<List<Command>> groupCommandsByStates(List<Command> commands) {
        List<List<Command>> states = new ArrayList<>();
        List<Command> tempCommands = new ArrayList<>();
        List<Command> sortedCommands = commands.stream()
                .sorted(Comparator.comparingInt(Command::getState)).toList();
        int indexState = 0;
        for (Command command : sortedCommands) {
            if (command.getState() == indexState) {
                tempCommands.add(command);
            }
            if (command.getState() > indexState) {
                states.add(tempCommands);
                indexState++;
                tempCommands = new ArrayList<>();
            }
        }
        if (tempCommands.size() != 0)
            states.add(tempCommands);
        return states;
    }

    private Command getCurrentCommand(List<Command> commands, char currentSymbol) {
        for (Command command : commands) {
            System.out.println(command);
            if (command.getSymbol().getName().equals(currentSymbol)) {
                return command;
            }
        }
        return null;
    }
}
