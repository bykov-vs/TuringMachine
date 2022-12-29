package se.TuringMachine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import se.TuringMachine.entity.Command;

import java.util.List;

@Repository
public interface CommandRepo extends JpaRepository<Command, Long> {
    @Modifying
    @Query("DELETE FROM Command e where e.algorithm.id = :algorithmId")
    void deleteAllByAlgorithm(Long algorithmId);

    @Query("SELECT e FROM Command e WHERE e.algorithm.id = :algorithmId")
    List<Command> getAllByAlgorithm(Long algorithmId);
}
