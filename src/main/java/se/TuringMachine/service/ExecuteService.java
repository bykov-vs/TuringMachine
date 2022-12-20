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
        StringBuilder dynamicTape = new StringBuilder();
        char[] symbols = line.toCharArray();
        for (char symbol : symbols) {
            dynamicTape.append(symbol);
        }
        int indexOfSymbol = 0;
        int MAX_ITERS = 1000;
        int iters = 0;
        int indexOfState = 0;
        Command currentCommand = null;
        LinkedHashMap<Integer, Character> track = new LinkedHashMap<>();

        while (indexOfState < states.size() && iters < MAX_ITERS){
            iters++;
            if (indexOfSymbol < 0){
                indexOfSymbol++;
                dynamicTape.insert(indexOfState, " ");
            }
            if (indexOfSymbol >= dynamicTape.length()){
                dynamicTape.append(" ");
            }
            System.out.println("CURRENT ITER" + indexOfState);
            char currentSymbol = dynamicTape.charAt(indexOfSymbol);
            //char currentSymbol = indexOfSymbol < 0 || indexOfSymbol >= symbols.length ? ' ': symbols[indexOfSymbol];
            currentCommand = getCurrentCommand(states.get(indexOfState), currentSymbol);
            System.out.println("CURRENT STATE : " + indexOfState);
            System.out.println("CURRENT SYMBOL IS "+currentSymbol);
            if (currentCommand == null)
                throw new InvalidStateException();
            if (currentCommand.getNextState() != -1)
                indexOfState = currentCommand.getNextState();
            if (currentCommand.getNewSymbol() != null)
                dynamicTape.replace(indexOfSymbol,
                        indexOfSymbol+1,
                        String.valueOf(currentCommand.getNewSymbol()));
                //symbols[indexOfSymbol] = currentCommand.getNewSymbol();
            switch (currentCommand.getMove()) {
                case "Л" -> indexOfSymbol--;
                case "П" -> indexOfSymbol++;
            }

            track.put(indexOfState, currentSymbol);

            //Добавить проверки на зацикливание программы и невозможное состояние (из которого нельзя выйти)
            //Добавить выход из цикла (состояние остановки???)
            //если indexOfSymbol отрицательный или больше длины ленты, то currentSymbol = ""?
            //ДОБАВИТЬ ТРАССИРОВКУ (????)
        }
        System.out.println(dynamicTape.toString());

    }

    private List<List<Command>> groupCommandsByStates(List<Command> commands){
        System.out.println("IN GROUP COMMANDS");
        List<List<Command>> states = new ArrayList<>();
        List<Command> tempCommands = new ArrayList<>();
        List<Command> sortedCommands = commands.stream()
                .sorted(Comparator.comparingInt(Command::getState)).toList();
        System.out.println("IN sorting secTION");
        for (Command command : sortedCommands) {
            System.out.println(command + "lol");
        }
        System.out.println("AFTER OUT");
        int indexState = 0;
        for (Command command : sortedCommands) {
            if (command.getState() == indexState){
                tempCommands.add(command);
                System.out.println("ahahahhahaha");
            }
            if (command.getState() > indexState){
                states.add(tempCommands);
                indexState++;
                tempCommands = new ArrayList<>();
            }
        }
        if (tempCommands.size() != 0)
            states.add(tempCommands);
        return states;
    }

    private Command getCurrentCommand(List<Command> commands, char currentSymbol){
        for (Command command : commands) {
            System.out.println(command);
            if (command.getSymbol().getName().equals(currentSymbol)){
                return command;
            }
        }
        return null;
    }
}
