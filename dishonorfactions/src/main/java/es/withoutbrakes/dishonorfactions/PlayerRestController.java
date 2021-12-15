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
	private Player rightPlayer;
	
	@Autowired
	private Player leftPlayer;
	
	
	@RequestMapping (value= "/{playerID}", method=RequestMethod.GET)
	public Position2D getPosPlayer(@PathVariable String playerID) {
		if(playerID.compareTo("left") == 0)
		{
			return leftPlayer.getPosition();
		}
		else if(playerID.compareTo("right") == 0)
		{
			return rightPlayer.getPosition();
		}
		else
		{
			return new Position2D(-1000, -1000);
		}
	}
	
	@RequestMapping (value= "/{playerID}", method=RequestMethod.PUT)
	public ResponseEntity<Boolean> setPosPlayer(@RequestBody Position2D newPos, @PathVariable String playerID) {
		
		if(playerID.compareTo("left") == 0)
		{
			leftPlayer.setPosition(newPos);
			return new ResponseEntity<>(true, HttpStatus.CREATED);
		}
		else if(playerID.compareTo("right") == 0)
		{
			rightPlayer.setPosition(newPos);
			return new ResponseEntity<>(true, HttpStatus.CREATED);
		}
		else
		{
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
	}
}
