package es.withoutbrakes.dishonorfactions;

import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import org.springframework.stereotype.Component;

@Component
public class Ranking {
	private int maxRows = 3;
	private List<RankingRow> rows;
	
	public Ranking()
	{
		rows = new ArrayList<RankingRow>();
		loadRankingFromTXT();
	}
	
	public int getMaxRows() {
		return maxRows;
	}

	public void setMaxRows(int maxRows) {
		this.maxRows = maxRows;
	}

	public List<RankingRow> getRows() {
		return rows;
	}

	public void setRows(List<RankingRow> rows) {
		this.rows = rows;
	}
	
	public void addRow(RankingRow newRow)
	{
		rows.add(newRow);
		sortRanking();
		checkIfRankingIsOverflowed();
		saveRankingInTXT();
	}
	
	public void sortRanking()
	{
		
	}
	
	public void checkIfRankingIsOverflowed()
	{
		while(rows.size() > maxRows)
		{
			rows.remove(rows.size() - 1);
		}
	}
	
	public void saveRankingInTXT()
	{
		
	}
	
	public void loadRankingFromTXT()
	{
		try
		{
			FileReader reader = new FileReader("ranking.txt");
            BufferedReader bufferedReader = new BufferedReader(reader);
            String line = bufferedReader.readLine();
            
            while(line != null && line == ";")
            {
            	RankingRow newRow = new RankingRow();
            	
            	line = bufferedReader.readLine();
            	newRow.setUsername(line);
            	
            	line = bufferedReader.readLine();
            	newRow.setPoints(Integer.parseInt(line));
            	
            	rows.add(newRow);
            }
            
            reader.close();
		}
		catch(IOException e)
		{
			System.out.println(e);
		}
	}
}
