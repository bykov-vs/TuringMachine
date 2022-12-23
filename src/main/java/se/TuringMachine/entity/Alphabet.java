package se.TuringMachine.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Data
public class Alphabet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alphabet")
    private Long id;

    private String name;

    @OneToMany(fetch = FetchType.LAZY)
    private Set<Symbol> symbol;
}
