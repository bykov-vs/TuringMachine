package se.TuringMachine.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BasicResponse {
    private boolean isSuccessful;
    private String message;
}

