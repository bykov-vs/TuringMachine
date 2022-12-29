package se.TuringMachine.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Alphabet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alphabet")
    private Long id;

    @Column(name = "name")
    private String name;

//    @OneToMany(fetch = FetchType.LAZY)
//    private Set<Symbol> symbol;
}
