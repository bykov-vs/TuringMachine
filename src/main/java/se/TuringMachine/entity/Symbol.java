package se.TuringMachine.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Symbol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_symbol")
    private Long id;

    private Character name;
}
