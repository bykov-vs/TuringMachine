package se.TuringMachine.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import se.TuringMachine.dto.AlphabetDTO;
import se.TuringMachine.response.BasicResponse;
import se.TuringMachine.service.AlphabetService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/alphabet")
@AllArgsConstructor
public class AlphabetController {
    private final AlphabetService service;

    @PostMapping("/save")
    public BasicResponse saveAlphabet(@RequestBody AlphabetDTO alphabetDTO){
         return service.saveAlphabet(alphabetDTO);
    }

    @GetMapping("/all")
    public List<AlphabetDTO> getAll(){
        return service.getAll();
    }

    @GetMapping("/{id}")
    public AlphabetDTO getById(@PathVariable Long id){
        return service.getById(id);
    }

    @GetMapping("/delete/{id}")
    public BasicResponse deleteById(@PathVariable Long id){
        return service.deleteById(id);
    }

//    @GetMapping("/alp")
//    public ResponseEntity<?> findAlphabet(@RequestParam Long id){
//        Alphabet alphabet = service.findAlphabet(id);
//        return alphabet != null ?
//                new ResponseEntity<>(alphabet, HttpStatus.OK) :
//                new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
}
