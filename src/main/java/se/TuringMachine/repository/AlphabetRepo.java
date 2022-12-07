package se.TuringMachine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.TuringMachine.entity.Alphabet;

@Repository
public interface AlphabetRepo extends JpaRepository<Alphabet, Long> {
}
