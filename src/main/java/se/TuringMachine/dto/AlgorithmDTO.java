package se.TuringMachine.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import se.TuringMachine.entity.Command;

import java.util.List;

@Data
@NoArgsConstructor
public class AlgorithmDTO {
    private Long id;
    private String name;
    private List<Character> alphabet;
    private List<Command> commands;
    private Long numberOfStates;
    private boolean isBase;

    private String tape;
    private int tapeHeadPosition;
}

