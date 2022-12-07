package se.TuringMachine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.TuringMachine.entity.Command;

@Repository
public interface CommandRepo extends JpaRepository<Command, Long> {
}
