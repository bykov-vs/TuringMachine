package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import se.TuringMachine.dto.AlgorithmDTO;
import se.TuringMachine.entity.Command;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CreateBaseAlgorithmsService {
    private final MainService mainService;

    @EventListener(ApplicationReadyEvent.class)
    public void doSomethingAfterStartup() {
        AlgorithmDTO dto = new AlgorithmDTO();

        dto.setBase(true);
        dto.setName("Сложение");
        dto.setNumberOfStates(5L);

        List<Character> alphabet = new ArrayList<>();
        alphabet.add('_');
        alphabet.add('*');
        alphabet.add('+');
        alphabet.add('=');
        alphabet.add('0');
        dto.setAlphabet(alphabet);

        List<Command> commands = new ArrayList<>();
        commands.add(new Command("Л", '=', 0, 1, '_'));
        commands.add(new Command("П", '_', 1, 2, '_'));
        commands.add(new Command("Л", '*', 3, 1, '_'));
        commands.add(new Command("П", '_', 4, 5, '_'));

        commands.add(new Command("П", '*', 0, 0, '*'));
        commands.add(new Command("Л", '*', 1, 1, '*'));
        commands.add(new Command("П", '0', 2, 3, '*'));
        commands.add(new Command("П", '*', 3, 3, '*'));

        commands.add(new Command("П", '+', 0, 0, '+'));
        commands.add(new Command("Л", '+', 1, 1, '+'));
        commands.add(new Command("П", '+', 2, 2, '+'));
        commands.add(new Command("П", '+', 3, 3, '+'));
        commands.add(new Command("Л", '+', 4, 4, '+'));

        commands.add(new Command("Л", '=', 1, 1, '='));
        commands.add(new Command("Л", '=', 2, 4, '='));
        commands.add(new Command("П", '=', 3, 3, '='));

        commands.add(new Command("П", '0', 1, 2, '0'));
        commands.add(new Command("Л", '*', 4, 4, '0'));

        dto.setCommands(commands);
        mainService.saveAlgorithm(dto);
        System.out.println("hello world, I have just started up");
    }
}
