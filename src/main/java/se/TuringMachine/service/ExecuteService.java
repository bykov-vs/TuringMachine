package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.dto.AlgorithmDTO;
import se.TuringMachine.dto.ResultTapeDTO;
import se.TuringMachine.dto.TrackStep;
import se.TuringMachine.entity.Command;
import se.TuringMachine.exception.InvalidStateException;
import se.TuringMachine.exception.MaxIterationException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class ExecuteService {

    public ResultTapeDTO execute(AlgorithmDTO algorithm, String tape) {
        List<Command> commands = algorithm.getCommands();
        List<List<Command>> states = groupCommandsByStates(commands);
        StringBuilder dynamicTape = new StringBuilder();
        char[] symbols = tape.toCharArray();
        for (char symbol : symbols) {
            dynamicTape.append(symbol);
        }
        int indexOfSymbol = algorithm.getTapeHeadPosition();
        int MAX_ITERS = 1000;
        int iters = 0;
        int indexOfState = 0;
        Command currentCommand = null;
        List<TrackStep> track = new ArrayList<>();

        while (indexOfState < algorithm.getNumberOfStates() && iters < MAX_ITERS && indexOfSymbol < algorithm.getTape().length()) {
            iters++;
//            if (indexOfSymbol < 0) {
//                indexOfSymbol++;
//                dynamicTape.insert(indexOfSymbol, "_");
//            }
//            if (indexOfSymbol >= dynamicTape.length()) {
//                dynamicTape.append("_");
//            }
            char currentSymbol = dynamicTape.charAt(indexOfSymbol);
            //char currentSymbol = indexOfSymbol < 0 || indexOfSymbol >= symbols.length ? ' ': symbols[indexOfSymbol];
            currentCommand = getCurrentCommand(states.get(indexOfState), currentSymbol);
            int prevState = indexOfState;
            if (indexOfState >= algorithm.getNumberOfStates()){
                track.add(new TrackStep(prevState+1, getRowByCharacter(algorithm, currentSymbol), indexOfSymbol, currentCommand.getNewSymbol()));
                break;
            }
            if (iters == MAX_ITERS){
                throw new MaxIterationException();
            }
            if (currentCommand == null){
                System.out.println("state : " + indexOfState);
                System.out.println("symbol : " + currentSymbol);
                throw new InvalidStateException();
            }

            if (currentCommand.getNextState() != -1)
                indexOfState = currentCommand.getNextState();
            if (currentCommand.getNewSymbol() != null)
                dynamicTape.replace(indexOfSymbol,
                        indexOfSymbol + 1,
                        String.valueOf(currentCommand.getNewSymbol()));



            track.add(new TrackStep(prevState+1, getRowByCharacter(algorithm, currentSymbol), indexOfSymbol, currentCommand.getNewSymbol()));
            switch (currentCommand.getMove()) {
                case "Л" -> indexOfSymbol--;
                case "П" -> indexOfSymbol++;
            }
            //Добавить проверки на зацикливание программы и невозможное состояние (из которого нельзя выйти)
            //Добавить выход из цикла (состояние остановки???)
            //если indexOfSymbol отрицательный или больше длины ленты, то currentSymbol = ""?
            //ДОБАВИТЬ ТРАССИРОВКУ (????)
        }

        ResultTapeDTO result = new ResultTapeDTO();
        result.setTrackSteps(track);
        result.setTapeLength(dynamicTape.length());
        return result;

    }

    private int getRowByCharacter(AlgorithmDTO algorithm, char currentSymbol) {
        for (int i = 0; i < algorithm.getAlphabet().size(); i++) {
            if (algorithm.getAlphabet().get(i) == currentSymbol){
                return i + 1;
            }
        }
        return 0;
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
                tempCommands = new ArrayList<>();
                indexState++;
                tempCommands.add(command);
            }
        }
        if (tempCommands.size() != 0)
            states.add(tempCommands);
        return states;
    }

    private Command getCurrentCommand(List<Command> commands, char currentSymbol) {
        for (Command command : commands) {
            //System.out.println(command);
            if (command.getSymbol().equals(currentSymbol)) {
                return command;
            }
        }
        return null;
    }
}
