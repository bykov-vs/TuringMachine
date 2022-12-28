package se.TuringMachine.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Algorithm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_algorithm")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_base")
    private Boolean isBase;

    @Column(name = "number_of_states")
    private Long numberOfStates;

    @ManyToOne
    @JoinColumn(name = "id_alphabet")
    private Alphabet alphabetEntity;
}
