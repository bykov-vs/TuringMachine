package se.TuringMachine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.TuringMachine.entity.Algorithm;

@Repository
public interface AlgorithmRepo extends JpaRepository<Algorithm, Long> {
}
