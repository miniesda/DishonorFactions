package es.withoutbrakes.dishonorfactions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/username")
public class UsernameRestController {

	@Autowired
	private ActiveUsers activeUsersArray;
	
	@RequestMapping(value = "/connect", method = RequestMethod.POST)
	public ResponseEntity<Boolean> ConnectUser(@RequestBody String name)
	{
		Username newUsername = new Username(name);
		activeUsersArray.AddUser(newUsername);
		return new ResponseEntity<>(true, HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/disconnect/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> DisconnectUser(@PathVariable String id)
	{
		Boolean hasRemoved = activeUsersArray.DeleteUser(id);
		
		if(hasRemoved)
		{
			return new ResponseEntity<>(true, HttpStatus.CREATED);
		}
		else
		{
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
	}
}
