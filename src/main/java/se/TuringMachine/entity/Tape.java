package se.TuringMachine.entity;

import lombok.Data;

@Data
public class Tape {
    private int tapeLength;

    private String firstOperand;

    private String secondOperand;

    private String sign;

    @Override
    public String toString() {
        return firstOperand + sign + secondOperand;
    }
}
