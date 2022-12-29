package se.TuringMachine.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import se.TuringMachine.dto.AlgorithmDTO;
import se.TuringMachine.dto.AlphabetDTO;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.entity.Alphabet;
import se.TuringMachine.entity.Command;
import se.TuringMachine.response.AlgorithmResponse;

@Service
@AllArgsConstructor
public class MainService {
    private final AlgorithmService algorithmService;
    private final AlphabetService alphabetService;
    private final CommandService commandService;
    private final SymbolService symbolService;

    public AlgorithmResponse saveAlgorithm(AlgorithmDTO dto){
        try {
            Algorithm entity;
            if (dto.getId() == null) {
                entity = new Algorithm();
            }
            else {
                entity = algorithmService.findById(dto.getId());
                commandService.deleteAllByAlgorithm(dto.getId());
            }
            entity.setName(dto.getName());

            AlphabetDTO alphabetDTO = new AlphabetDTO();
            alphabetDTO.setAlphabet(dto.getAlphabet());
            Long alphabetId = alphabetService.getAlphabetIdByName(alphabetDTO.toString());
            if (alphabetId == null) {
                alphabetService.saveAlphabet(alphabetDTO);
                alphabetId = alphabetService.getAlphabetIdByName(alphabetDTO.toString());
            }

            entity.setNumberOfStates(dto.getNumberOfStates());
            entity.setBase(dto.isBase());
            entity.setAlphabetEntity(alphabetService.findById(alphabetId));
            entity = algorithmService.saveAlgorithm(entity);

            for (Command command: dto.getCommands()) {
                command.setAlgorithm(entity);
                commandService.save(command);
            }
            return new AlgorithmResponse(true, "Алгоритм сохранён", entity.getId());
        } catch (Exception e) {
            return new AlgorithmResponse(false, "При сохранении алгоритма произошла ошибка", null);
        }
    }

    public Algorithm findAlgorithm(Long id){
        return algorithmService.findById(id);
    }



    public Alphabet findAlphabet(Long id){
        return alphabetService.findById(id);
    }
}
