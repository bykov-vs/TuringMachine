package se.TuringMachine.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Command {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_command")
    private Long id;

    private String move;

    private Character newSymbol;

    private int nextState;

    private int state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_algorithm")
    private Algorithm algorithm;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_symbol")
    private Symbol symbol;

    @Override
    public String toString() {
        return "Command{" +
                "id=" + id +
                ", move='" + move + '\'' +
                ", newSymbol=" + newSymbol +
                ", nextState=" + nextState +
                ", state=" + state +
                '}';
    }
}
