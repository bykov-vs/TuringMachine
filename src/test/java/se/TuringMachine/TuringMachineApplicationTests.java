package se.TuringMachine;

import lombok.Data;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.service.ExecuteService;

@SpringBootTest
@Data
class TuringMachineApplicationTests {

	private final ExecuteService executeService;

	@Test
	void contextLoads() {
	}

	@Test
	void executeAlgorithm(){
		Algorithm algorithm = new Algorithm();

	}
}
