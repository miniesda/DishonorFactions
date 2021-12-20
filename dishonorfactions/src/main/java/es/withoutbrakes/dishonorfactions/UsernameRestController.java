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
	@Autowired
	private UsernameDataBase usernamesDataBase;
	
	@RequestMapping(value = "/connect", method = RequestMethod.POST)
	public ResponseEntity<Boolean> ConnectUser(@RequestBody String name)
	{
		Username newUsername = new Username(name);
		activeUsersArray.addUser(newUsername);
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
	
	public void signIn()
	{
		
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<Boolean> register(@RequestBody Username newUsername)
	{
		Boolean addedSuccesfully = usernamesDataBase.addUsername(newUsername);
		if(addedSuccesfully)
		{
			activeUsersArray.addUser(newUsername);
			return new ResponseEntity<>(true, HttpStatus.CREATED);
		}
		else
		{
			return new ResponseEntity<>(false, HttpStatus.CONFLICT);
		}
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.PUT)
	public ResponseEntity<Boolean> login(@RequestBody Username username)
	{
		Boolean isUserAndPasswordCorrect = usernamesDataBase.isUserInDataBase(username);
		if(isUserAndPasswordCorrect)
		{
			activeUsersArray.addUser(username);
			return new ResponseEntity<>(true, HttpStatus.CREATED);
		}
		else
		{
			return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
		}
	}
}
