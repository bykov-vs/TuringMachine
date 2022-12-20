package se.TuringMachine.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.TuringMachine.dto.TestDTO;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.service.MainService;

@CrossOrigin
@RestController
@AllArgsConstructor
public class AlgorithmController {
    private final MainService service;

    @PostMapping("/save")
    public ResponseEntity<?> saveAlgorithm(@RequestBody Algorithm algorithm){
        service.save(algorithm);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/")
    public TestDTO testFront() {
        TestDTO testDTO = new TestDTO();
        testDTO.setName("\"it works\"");
        return testDTO;
    }
}
