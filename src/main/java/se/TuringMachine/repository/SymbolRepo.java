package se.TuringMachine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.TuringMachine.entity.Symbol;

@Repository
public interface SymbolRepo extends JpaRepository<Symbol, Long> {
}
