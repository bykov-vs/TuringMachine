package se.TuringMachine.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.TuringMachine.dto.AlgorithmDTO;
import se.TuringMachine.dto.ResultTapeDTO;
import se.TuringMachine.entity.Algorithm;
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
    public List<AlgorithmDTO> getAll(){
        return algorithmService.getAll();
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
    public ResponseEntity<?> executeAlgorithm(@RequestBody AlgorithmDTO algorithm){
        ResultTapeDTO resultTapeDTO = executeService.execute(algorithm, algorithm.getTape());
        return new ResponseEntity<>(resultTapeDTO, HttpStatus.OK);
    }
}
