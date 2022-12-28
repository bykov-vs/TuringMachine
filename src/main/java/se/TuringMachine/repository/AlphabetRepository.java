package se.TuringMachine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import se.TuringMachine.entity.Alphabet;

import java.util.List;

@Repository
public interface AlphabetRepository extends JpaRepository<Alphabet, Long> {
    @Query("SELECT e FROM Alphabet e WHERE e.id = :id")
    Alphabet findAlphabetById(Long id);

    @Query("SELECT e.id FROM Alphabet e WHERE e.name = :name")
    Long getAlphabetIdByName(String name);

    @Query("SELECT e FROM Alphabet e")
    List<Alphabet> getAll();
}
