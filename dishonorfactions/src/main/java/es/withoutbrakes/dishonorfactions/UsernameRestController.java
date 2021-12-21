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
	
	public Boolean ConnectUser(String name)
	{
		Username newUsername = new Username(name);
		activeUsersArray.addUser(newUsername);
		return true;
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
			System.out.println("Es por este");
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<Boolean> register(@RequestBody Username newUsername)
	{
		Boolean addedSuccesfully = usernamesDataBase.addUsername(newUsername);
		if(addedSuccesfully)
		{
			Boolean hasBeenAddedToConected = ConnectUser(newUsername.getUsername());
			if(hasBeenAddedToConected)
			{
				return new ResponseEntity<>(true, HttpStatus.CREATED);
			}
			else
			{
				return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
			}
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
			Boolean hasBeenAddedToConected = ConnectUser(username.getUsername());
			if(hasBeenAddedToConected)
			{
				return new ResponseEntity<>(true, HttpStatus.CREATED);
			}
			else
			{
				return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
			}
		}
		else
		{
			return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
		}
	}
}
