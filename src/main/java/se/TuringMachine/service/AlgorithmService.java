package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.dto.AlgorithmDTO;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.repository.AlgorithmRepository;
import se.TuringMachine.response.BasicResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AlgorithmService implements DefaultService<Algorithm>{
    private final AlgorithmRepository repository;
    private final CommandService commandService;


    public Algorithm saveAlgorithm(Algorithm algorithm) {
        return repository.save(algorithm);
    }

    public void save(Algorithm algorithm) {
        repository.save(algorithm);
    }

    public Algorithm findById(Long id) {
        Optional<Algorithm> algorithm = repository.findById(id);
        return algorithm.orElse(null);
    }

    public List<Algorithm> findAll() {
        return repository.findAll();
    }

    public List<AlgorithmDTO> getAll(Boolean isBase) {
        System.out.println(isBase);
        System.out.println(repository.findAll().size());
        List<AlgorithmDTO> dtos = new ArrayList<>();
        List<Algorithm> entities = repository.findAllAlgorithms(isBase);
        for (Algorithm entity: entities) {
            System.out.println(entity.getIsBase());
            System.out.println(entity.getIsBase() == isBase);

            AlgorithmDTO dto = new AlgorithmDTO();
            dto.setId(entity.getId());
            dto.setName(entity.getName());
            dto.setNumberOfStates(entity.getNumberOfStates());
            dto.setIsBase(entity.getIsBase());

            List<Character> symbols = new ArrayList<>();
            String alphabet = entity.getAlphabetEntity().getName();
            for (int i = 0; i < alphabet.length(); i++) {
                symbols.add(alphabet.charAt(i));
            }
            dto.setAlphabet(symbols);

            dto.setCommands(commandService.getAllByAlgorithm(entity.getId()));
            dtos.add(dto);
        }
        return dtos;
    }

    public Algorithm delete(Long id) {
        Optional<Algorithm> algorithm = repository.findById(id);
        if (algorithm.isEmpty()){
            return null;
        }
        repository.deleteById(id);
        return algorithm.get();
    }

    public Algorithm delete(Algorithm algorithm) {
        Optional<Algorithm> a = repository.findById(algorithm.getId());
        if (a.isEmpty()){
            return null;
        }
        repository.deleteById(algorithm.getId());
        return a.get();
    }

    public BasicResponse deleteById(Long id) {
        try {
            commandService.deleteAllByAlgorithm(id);
            repository.deleteById(id);
            return new BasicResponse(true, "Алгоритм удалён");
        } catch (Exception e) {
            return new BasicResponse(false, "Ошибка, алгоритм не удалён");
        }
    }

    public Boolean existsAlgorithmByAlphabet(Long alphabetId) {
        return repository.getAlgorithmByAlphabet(alphabetId).size() > 0;
    }
}
