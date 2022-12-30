package se.TuringMachine.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.TuringMachine.dto.AlgorithmDTO;
import se.TuringMachine.dto.ResultTapeDTO;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.exception.InvalidStateException;
import se.TuringMachine.exception.MaxIterationException;
import se.TuringMachine.response.AlgorithmResponse;
import se.TuringMachine.response.BasicResponse;
import se.TuringMachine.service.AlgorithmService;
import se.TuringMachine.service.ExecuteService;
import se.TuringMachine.service.MainService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/algorithm")
@AllArgsConstructor
public class AlgorithmController {
    private final MainService service;
    private final ExecuteService executeService;
    private final AlgorithmService algorithmService;

    @PostMapping("/save")
    public AlgorithmResponse saveAlgorithm(@RequestBody AlgorithmDTO algorithm){
        return service.saveAlgorithm(algorithm);
    }

    @GetMapping("/all")
    public List<AlgorithmDTO> getAll(@RequestParam("isBase") boolean isBase){
        return algorithmService.getAll(isBase);
    }

//    @GetMapping("/{id}")
//    public AlgorithmDTO getById(@PathVariable Long id){
//        return algorithmService.getById(id);
//    }

    @GetMapping("/delete/{id}")
    public BasicResponse deleteById(@PathVariable Long id){
        return algorithmService.deleteById(id);
    }

    @GetMapping("/alg")
    public ResponseEntity<?> findAlgorithm(@RequestParam Long id){
        Algorithm algorithm = service.findAlgorithm(id);
        return algorithm != null ?
                new ResponseEntity<>(algorithm, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/execute")
    public ResultTapeDTO executeAlgorithm(@RequestBody AlgorithmDTO algorithm){
        try {
            ResultTapeDTO resultTapeDTO = executeService.execute(algorithm, algorithm.getTape());
            resultTapeDTO.setSuccessful(true);
            resultTapeDTO.setMessage("Алгоритм успешно выполнен");
            return resultTapeDTO;
        } catch (InvalidStateException e) {
            return new ResultTapeDTO(false, "Алгоритм привёл в пустое состояние");
        }catch (MaxIterationException e){
            return new ResultTapeDTO(false, "Зацикливание алгоритма");
        }catch (Exception e){
            return new ResultTapeDTO(false, "Что-то пошло не так");
        }

    }
}
