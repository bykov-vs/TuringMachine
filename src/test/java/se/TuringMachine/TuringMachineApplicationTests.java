package se.TuringMachine;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.TuringMachine.entity.Algorithm;
import se.TuringMachine.entity.Command;
import se.TuringMachine.entity.Symbol;
import se.TuringMachine.entity.Tape;
import se.TuringMachine.service.ExecuteService;

import java.util.ArrayList;

@SpringBootTest
class TuringMachineApplicationTests {

	@Autowired
	private ExecuteService executeService;

	@Test
	void contextLoads() {
	}

	@Test
	void executeAlgorithm(){
		Algorithm algorithm = new Algorithm();
		Symbol s1 = new Symbol();
		Symbol s2 = new Symbol();
		Symbol s3 = new Symbol();
		s1.setName('0');
		s2.setName('1');
		s3.setName(' ');
		Command command1 = new Command();
		Command command2 = new Command();

		command1.setAlgorithm(algorithm);
		command1.setMove("П");
		command1.setNewSymbol('1');
		command1.setState(0);
		command1.setNextState(0);
		command1.setSymbolEntity(s1);

		command2.setAlgorithm(algorithm);
		command2.setState(0);
		command2.setNewSymbol('1');
		command2.setNextState(0);
		command2.setMove("П");
		command2.setSymbolEntity(s2);

		Command command3 = new Command();
		command3.setAlgorithm(algorithm);
		command3.setMove("Н");
		command3.setState(0);
		command3.setNextState(1);
		command3.setSymbolEntity(s3);

		ArrayList<Command> list = new ArrayList<>();
		list.add(command1);
		list.add(command2);
		list.add(command3);

		algorithm.setCommands(list);

		Tape tape = new Tape();
		tape.setFirstOperand("010");
		tape.setSecondOperand("101");
		tape.setSign("");
		executeService.execute(algorithm, tape.toString());
	}
}
