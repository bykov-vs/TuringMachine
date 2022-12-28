package se.TuringMachine.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import se.TuringMachine.entity.Command;

import java.util.List;

@Data
@NoArgsConstructor
public class AlgorithmResponse extends BasicResponse {
    private Long id;
    private String name;
    private List<Character> alphabet;
    private List<Command> commands;
    private Long numberOfStates;
    private Boolean isBase;

    public AlgorithmResponse(boolean isSuccessful, String message, Long id) {
        super(isSuccessful, message);
        this.id = id;
    }
}

