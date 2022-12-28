package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.dto.AlphabetDTO;
import se.TuringMachine.entity.Alphabet;
import se.TuringMachine.repository.AlphabetRepository;
import se.TuringMachine.response.BasicResponse;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AlphabetService implements DefaultService<Alphabet> {
    private final AlphabetRepository repository;

    public BasicResponse saveAlphabet(AlphabetDTO alphabet){
        Long alphabetId = repository.getAlphabetIdByName(alphabet.toString());
        if (alphabetId != null) {
             return new BasicResponse(false, "Такой алфавит уже существует");
        }
        else {
            Alphabet entity = new Alphabet();
            entity.setName(alphabet.toString());
            repository.save(entity);
            return new BasicResponse(true, "Алфавит создан");
        }
    }
    @Override
    public void save(Alphabet alphabet) {
        repository.save(alphabet);
    }

    @Override
    public Alphabet findById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public List<Alphabet> findAll() {
        return null;
    }

    public List<AlphabetDTO> getAll() {

        List<AlphabetDTO> dtos = new ArrayList<>();
        List<Alphabet> entities = repository.getAll();
        for (Alphabet entity: entities) {
            AlphabetDTO dto = new AlphabetDTO();
            List<Character> symbols = new ArrayList<>();
            for (int i = 0; i < entity.getName().length(); i++) {
                symbols.add(entity.getName().charAt(i));
            }
            dto.setAlphabet(symbols);
            dto.setId(entity.getId());
            dto.setName(entity.getName());
            dtos.add(dto);
        }
        return dtos;
    }

    public AlphabetDTO getById(Long id) {
        Alphabet entity = repository.findAlphabetById(id);
        AlphabetDTO dto = new AlphabetDTO();
        dto.setName(entity.getName());
        dto.setId(entity.getId());
        List<Character> symbols = new ArrayList<>();
        for (int i = 0; i < entity.getName().length(); i++) {
            symbols.add(entity.getName().charAt(i));
        }
        dto.setAlphabet(symbols);
        return dto;
    }

    public BasicResponse deleteById(Long id) {
        try {
            repository.deleteById(id);
            return new BasicResponse(true, "Алфавит удалён");
        } catch (Exception e) {
            return new BasicResponse(false, "Ошибка, алфавит не удалён");
        }
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
