package es.withoutbrakes.dishonorfactions;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class UsernameDataBase
{
	private List<Username> usernamesRegistered = new ArrayList<>();
	
	public UsernameDataBase()
	{
		loadUsernamesFromTXT();
	}

	public List<Username> getUsernamesRegistered() {
		return usernamesRegistered;
	}

	public void setUsernamesRegistered(List<Username> usernamesRegistered) {
		this.usernamesRegistered = usernamesRegistered;
	}
	
	public Boolean addUsername(Username newUser)
	{
		if(!checkIfUsernameIsAlreadyRegistered(newUser))
		{
			usernamesRegistered.add(newUser);
			saveUsernameInTXT(newUser.getUsername(), newUser.getPassword());
			return true;
		}
		else
		{
			System.out.println("The user already exists");
			return false;
		}
	}
	
	public Boolean checkIfUsernameIsAlreadyRegistered(Username newUser)
	{
		Boolean exists = false;
		int i = 0;
		while(exists == false && i < usernamesRegistered.size())
		{
			if(newUser.getUsername().compareTo(usernamesRegistered.get(i).getUsername()) == 0)
			{
				exists = true;
			}
			i++;
		}
		return exists;
	}
	
	public void saveUsernameInTXT(String nickname, String password)
	{
		try
		{
			FileOutputStream fos = new FileOutputStream("usernames.txt", true);
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos));
			
			bw.write(";");
			bw.newLine();
			
			bw.write(nickname);
			bw.newLine();
				
			bw.write(password);
			bw.newLine();
			bw.close();
		}
		catch(IOException e)
		{
			System.out.println(e);
		}
	}
	
	public void loadUsernamesFromTXT()
	{
		System.out.println("me llami");
		try
		{
			FileReader reader = new FileReader("usernames.txt");
            BufferedReader bufferedReader = new BufferedReader(reader);
            String line = bufferedReader.readLine();
            
            while(line != null && line.compareTo(";") == 0)
            {
            	System.out.println("me aaaaaa");
            	Username newUsername = new Username();
            	
            	line = bufferedReader.readLine();
            	newUsername.setUsername(line);
            	
            	line = bufferedReader.readLine();
            	newUsername.setPassword(line);
            	
            	usernamesRegistered.add(newUsername);
            	line = bufferedReader.readLine();
            }
            
            reader.close();
		}
		catch(IOException e)
		{
			System.out.println(e);
		}
	}
	
	public Boolean isUserInDataBase(Username user)
	{
		int i = 0;
		Boolean found = false;
		while(!found && i < usernamesRegistered.size())
		{
			if(usernamesRegistered.get(i).getUsername().compareTo(user.getUsername()) == 0 &&
					usernamesRegistered.get(i).getPassword().compareTo(user.getPassword()) == 0)
			{
				found = true;
			}
			i++;
		}
		
		return found;
	}
}
