package es.withoutbrakes.dishonorfactions;

import java.util.ArrayList;

public class Player {
	
	private ArrayList<Integer> pos = new ArrayList<>(2);
	private boolean shoot;
	
	public Player() {
		
	}

	public ArrayList<Integer> getPos() {
		return pos;
	}

	public void setPos(ArrayList<Integer> pos) {
		this.pos = pos;
	}

	public boolean isShoot() {
		return shoot;
	}

	public void setShoot(boolean shoot) {
		this.shoot = shoot;
	}
	
}
