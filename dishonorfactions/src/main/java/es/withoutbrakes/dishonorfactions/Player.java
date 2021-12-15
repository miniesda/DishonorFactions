package es.withoutbrakes.dishonorfactions;
import org.springframework.stereotype.Component;

@Component
public class Player {
	
	private Position2D position;
	private boolean shoot;
	
	public Player() {
		
	}

	public Position2D getPosition() {
		return position;
	}

	public void setPosition(Position2D pos) {
		this.position = pos;
	}

	public boolean isShoot() {
		return shoot;
	}

	public void setShoot(boolean shoot) {
		this.shoot = shoot;
	}
	
}
