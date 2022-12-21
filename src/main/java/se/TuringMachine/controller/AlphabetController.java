package se.TuringMachine.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.entity.Alphabet;
import se.TuringMachine.service.MainService;

@CrossOrigin
@RestController
@RequestMapping("/alphabet")
@AllArgsConstructor
public class AlphabetController {
    private final MainService service;

    @PostMapping("/save")
    public ResponseEntity<?> saveAlphabet(@RequestBody Alphabet alphabet){
        service.saveAlphabet(alphabet);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/alp")
    public ResponseEntity<?> findAlphabet(@RequestParam Long id){
        Alphabet alphabet = service.findAlphabet(id);
        return alphabet != null ?
                new ResponseEntity<>(alphabet, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
