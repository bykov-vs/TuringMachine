package se.TuringMachine.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class TrackStep {
    private int col;
    private int row;
    private int tapeHeadPosition;
    private char newSymbol;
}

