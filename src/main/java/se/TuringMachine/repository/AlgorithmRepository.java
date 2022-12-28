package se.TuringMachine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import se.TuringMachine.entity.Algorithm;

import java.util.List;

@Repository
public interface AlgorithmRepository extends JpaRepository<Algorithm, Long> {
    @Query("SELECT e FROM Algorithm e WHERE e.alphabetEntity.id = :alphabetId")
    List<Algorithm> getAlgorithmByAlphabet(Long alphabetId);

    @Query("SELECT e FROM Algorithm e WHERE e.isBase = ?1")
    List<Algorithm> findAllAlgorithms(Boolean isBase);
}
