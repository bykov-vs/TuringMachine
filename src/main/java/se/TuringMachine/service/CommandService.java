package se.TuringMachine.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.entity.Command;
import se.TuringMachine.repository.CommandRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class CommandService implements DefaultService<Command>{
    private final CommandRepo repo;

    @Override
    public void save(Command command) {
        repo.save(command);
    }

    @Override
    public Command findById(Long id) {
        return null;
    }

    @Override
    public List<Command> findAll() {
        return null;
    }

    @Override
    public Command delete(Long id) {
        return null;
    }

    @Override
    public Command delete(Command command) {
        return null;
    }

    @Transactional
    public void deleteAllByAlgorithm(Long algorithmId) {
        repo.deleteAllByAlgorithm(algorithmId);
    }

    public List<Command> getAllByAlgorithm(Long algorithmId) {
        return repo.getAllByAlgorithm(algorithmId);
    }
}
