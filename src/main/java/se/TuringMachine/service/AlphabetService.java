package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.entity.Alphabet;
import se.TuringMachine.repository.AlphabetRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class AlphabetService implements DefaultService<Alphabet> {
    private final AlphabetRepo repo;
    @Override
    public void save(Alphabet alphabet) {
        repo.save(alphabet);
    }

    @Override
    public Alphabet find(Long id) {
        return null;
    }

    @Override
    public List<Alphabet> findAll() {
        return null;
    }

    @Override
    public Alphabet delete(Long id) {
        return null;
    }

    @Override
    public Alphabet delete(Alphabet alphabet) {
        return null;
    }
}
