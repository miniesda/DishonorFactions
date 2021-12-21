package es.withoutbrakes.dishonorfactions;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ranking")
public class RankingRestController {

	@Autowired
	private Ranking ranking;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<RankingRow> getRankingRows()
	{
		System.out.println("me llamo bien");
		return ranking.getRows();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Boolean> addRowToRanking(@RequestBody RankingRow newRow)
	{
		System.out.println(newRow.getUsername());
		ranking.addRow(newRow);
		return new ResponseEntity<>(true, HttpStatus.CREATED);
	}
}