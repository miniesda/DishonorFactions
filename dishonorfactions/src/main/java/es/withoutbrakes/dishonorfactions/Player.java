package es.withoutbrakes.dishonorfactions;

import java.util.ArrayList;

public class Player {
	
	//private ArrayList<Integer> pos = new ArrayList<>(2);
	private int pos;
	private boolean shoot;
	
	public Player() {
		
	}

	public int getPos() {
		return pos;
	}

	public void setPos(int pos) {
		this.pos = pos;
	}

	public boolean isShoot() {
		return shoot;
	}

	public void setShoot(boolean shoot) {
		this.shoot = shoot;
	}
	
}
