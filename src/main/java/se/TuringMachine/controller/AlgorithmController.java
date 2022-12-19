package se.TuringMachine.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.service.AlgorithmService;
import se.TuringMachine.service.MainService;

@Controller
@AllArgsConstructor
public class AlgorithmController {
    private final MainService service;

    @PostMapping("/save")
    public ResponseEntity<?> saveAlgorithm(@RequestBody Algorithm algorithm){
        service.save(algorithm);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
