package es.withoutbrakes.dishonorfactions;

import org.springframework.stereotype.Component;

@Component
public class Username
{
	private String username;
	private String password;
	
	public Username() {	}
	
	public Username(String name)
	{
		username = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
