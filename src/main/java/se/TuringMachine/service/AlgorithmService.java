package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.repository.AlgorithmRepo;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AlgorithmService implements DefaultService<Algorithm>{
    private final AlgorithmRepo algorithmRepo;

    public void save(Algorithm algorithm) {
        algorithmRepo.save(algorithm);
    }

    public Algorithm findById(Long id) {
        Optional<Algorithm> algorithm = algorithmRepo.findById(id);
        return algorithm.orElse(null);
    }

    public List<Algorithm> findAll() {
        return algorithmRepo.findAll();
    }

    public Algorithm delete(Long id) {
        Optional<Algorithm> algorithm = algorithmRepo.findById(id);
        if (algorithm.isEmpty()){
            return null;
        }
        algorithmRepo.deleteById(id);
        return algorithm.get();
    }

    public Algorithm delete(Algorithm algorithm) {
        Optional<Algorithm> a = algorithmRepo.findById(algorithm.getId());
        if (a.isEmpty()){
            return null;
        }
        algorithmRepo.deleteById(algorithm.getId());
        return a.get();
    }
}
