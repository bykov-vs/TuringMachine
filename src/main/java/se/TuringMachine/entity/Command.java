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

    private String name;

    private int state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_algorithm")
    private Algorithm algorithm;
}
