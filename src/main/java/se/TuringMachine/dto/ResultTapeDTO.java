package se.TuringMachine.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ResultTapeDTO {
    List<TrackStep> trackSteps;
    Integer tapeLength;
}

