package es.withoutbrakes.dishonorfactions;

import org.springframework.stereotype.Component;

@Component
public class Username
{
	private String username;
	
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
}
