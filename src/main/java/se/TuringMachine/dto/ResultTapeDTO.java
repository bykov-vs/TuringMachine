package se.TuringMachine.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import se.TuringMachine.response.BasicResponse;

import java.util.List;

@Data
@NoArgsConstructor
public class ResultTapeDTO extends BasicResponse {
    List<TrackStep> trackSteps;
    Integer tapeLength;

    public ResultTapeDTO(boolean isSuccessful, String message) {
        super(isSuccessful, message);
    }
}

