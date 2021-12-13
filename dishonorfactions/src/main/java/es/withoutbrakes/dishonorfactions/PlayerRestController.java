package es.withoutbrakes.dishonorfactions;

import org.springframework.web.bind.annotation.*;

//import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/player")
public class PlayerRestController {
	
	@Autowired
	private Player player;
	
	
	@RequestMapping (method=RequestMethod.GET)
	public int getPosPlayer() {
		return player.getPos();
	}
	
	@RequestMapping (method=RequestMethod.PUT)
	public ResponseEntity<Boolean> setPosPlayer(@RequestBody int newPos) {
		player.setPos(newPos);
		return new ResponseEntity<>(true, HttpStatus.CREATED); 
	}
	
	//@RequestMapping (method=RequestMethod.GET)
	//public boolean getShoot() {
	//	return player.isShoot();
	//}
}
