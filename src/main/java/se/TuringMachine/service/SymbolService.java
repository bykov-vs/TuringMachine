package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.entity.Symbol;
import se.TuringMachine.repository.SymbolRepo;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SymbolService implements DefaultService<Symbol> {
    private final SymbolRepo repo;
    @Override
    public void save(Symbol symbol) {
        repo.save(symbol);
    }

    @Override
    public Symbol findById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Symbol> findAll() {
        return repo.findAll();
    }

    @Override
    public Symbol delete(Long id) {
        Optional<Symbol> symbol = repo.findById(id);
        if (symbol.isPresent())
            repo.deleteById(id);
        return symbol.orElse(null);
    }

    @Override
    public Symbol delete(Symbol symbol) {
        Optional<Symbol> deleteSymbol = repo.findById(symbol.getId());
        if (deleteSymbol.isPresent())
            repo.delete(symbol);
        return deleteSymbol.orElse(null);
    }
}
