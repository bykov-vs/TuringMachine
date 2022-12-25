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

    @ManyToOne
    @JoinColumn(name = "id_alphabet")
    private Alphabet alphabetEntity;

    @Transient
    private List<Symbol> alphabet;

    @Transient
    private List<Command> commands;

    @Transient
    private String tape;

    @Transient
    private Long numberOfStates;

    @Transient
    private int tapeHeadPosition;
}
