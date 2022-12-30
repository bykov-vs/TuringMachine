package se.TuringMachine.exception;

public class MaxIterationException extends RuntimeException{
    public MaxIterationException() {
        super("Алгоритм зациклился!");
    }

}
