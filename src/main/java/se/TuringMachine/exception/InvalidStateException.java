package se.TuringMachine.exception;

public class InvalidStateException extends RuntimeException{
    public InvalidStateException(String message) {
        super(message);
    }

    public InvalidStateException() {
        super("Алгоритм привёл в недопустимое состояние!");
    }
}
