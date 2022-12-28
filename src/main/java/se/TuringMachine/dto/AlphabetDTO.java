package se.TuringMachine.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AlphabetDTO {
    private Long id;
    private String name;
    private List<Character> alphabet;

    @Override
    public String toString() {
        StringBuilder str = new StringBuilder();
        for (Character c : alphabet) {
            str.append(c);
        }
        return str.toString();
    }
}

