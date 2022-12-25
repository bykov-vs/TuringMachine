package se.TuringMachine.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.TuringMachine.dto.TestDTO;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.service.ExecuteService;
import se.TuringMachine.service.MainService;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/algorithm")
@AllArgsConstructor
public class AlgorithmController {
    private final MainService service;
    private final ExecuteService executeService;

    @PostMapping("/save")
    public ResponseEntity<?> saveAlgorithm(@RequestBody Algorithm algorithm){
        service.saveAlgorithm(algorithm);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/alg")
    public ResponseEntity<?> findAlgorithm(@RequestParam Long id){
        Algorithm algorithm = service.findAlgorithm(id);
        return algorithm != null ?
                new ResponseEntity<>(algorithm, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/execute")
    public ResponseEntity<?> executeAlgorithm(@RequestBody Algorithm algorithm, @RequestBody String tape){
        return new ResponseEntity<>(executeService.execute(algorithm, tape), HttpStatus.OK);
    }

    @GetMapping("/")
    public TestDTO testFront() {
        TestDTO testDTO = new TestDTO();
        testDTO.setName("\"it works\"");
        return testDTO;
    }
}
