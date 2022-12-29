package se.TuringMachine.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Command {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_command")
    private Long id;

    private String move;

    private Character newSymbol;

    private int state;

    private int nextState;

    private Character symbol;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_algorithm")
    private Algorithm algorithm;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_symbol")
    private Symbol symbolEntity;

    public Command(String move, Character newSymbol, int state, int nextState, Character symbol) {
        this.move = move;
        this.newSymbol = newSymbol;
        this.state = state;
        this.nextState = nextState;
        this.symbol = symbol;
    }

    @Override
    public String toString() {
        return "Command{" +
                "id=" + id +
                ", move='" + move + '\'' +
                ", newSymbol=" + newSymbol +
                ", nextState=" + nextState +
                ", state=" + state +
                ", symbol=" + symbol +
                '}';
    }
}
