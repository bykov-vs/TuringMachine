package se.TuringMachine.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Algorithm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_algorithm")
    private Long id;

    private String name;

    private int tapeLength;

    private String firstOperand;

    private String secondOperand;

    @JoinColumn(name = "id_alphabet")
    private Alphabet alphabet;

    @Transient
    private List<Command> commands;
}
