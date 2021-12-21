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

import java.util.Comparator;
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
		Collections.sort(rows, new Comparator<RankingRow>() {
		    @Override
		    public int compare(RankingRow z1, RankingRow z2) {
		        if (z1.getPoints() > z2.getPoints())
		            return 1;
		        if (z1.getPoints() < z2.getPoints())
		            return -1;
		        return 0;
		    }
		});
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
			FileOutputStream fos = new FileOutputStream("ranking.txt", false);
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos));
			
			for(int i = 0; i < maxRows; i++)
			{
				bw.write(";");
				bw.newLine();
				
				bw.write(rows.get(i).getUsername());
				bw.newLine();
					
				bw.write(String.valueOf(rows.get(i).getPoints()));
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
            
            while(line != null && line.compareTo(";") == 0)
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
