package es.withoutbrakes.dishonorfactions;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class ActiveUsers {
	
	private List<Username> activeUsersArray = new ArrayList<Username>();
	
	public ActiveUsers() {}

	public List<Username> getActiveUsersArray() {
		return activeUsersArray;
	}

	public void setActiveUsersArray(List<Username> activeUsersArray) {
		this.activeUsersArray = activeUsersArray;
	}
	
	public void AddUser(Username newUsername)
	{
		activeUsersArray.add(newUsername);
	}
	
	public Boolean DeleteUser(String usernameToDelete)
	{
		int index = 0;
		Boolean hasFound = false;
		while(index < activeUsersArray.size() && !hasFound)
		{
			if(usernameToDelete == activeUsersArray.get(index).getUsername())
			{
				activeUsersArray.remove(index);
				hasFound = true;
				System.out.println("BOROOOOO");
			}
			index++;
		}
		
		System.out.println(activeUsersArray.size());

		return hasFound;
	}
}