package es.withoutbrakes.dishonorfactions;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStreamWriter;

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
		RankingRow aux;
		 for (int i = 0; i < rows.size() - 1; i++) {
		        for (int j = 0; j < rows.size() - i - 1; j++) {
		            if (rows.get(j + 1).getPoints() < rows.get(j).getPoints()) {
		                aux = rows.get(j + 1);
		                rows.add(j + 1, rows.get(j));
		                rows.add(j, aux);
		            }
		        }
		    }
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
		try
		{
			FileOutputStream fos = new FileOutputStream("usernames.txt", false);
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos));
			
			for(int i = 0; i < maxRows; i++)
			{
				bw.write(";");
				bw.newLine();
				
				bw.write(rows.get(i).getUsername());
				bw.newLine();
					
				bw.write(rows.get(i).getPoints());
				bw.newLine();
			}
			
			bw.close();
		}
		catch(IOException e)
		{
			System.out.println(e);
		}
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
            	line = bufferedReader.readLine();
            }
            
            reader.close();
		}
		catch(IOException e)
		{
			System.out.println(e);
		}
	}
}
