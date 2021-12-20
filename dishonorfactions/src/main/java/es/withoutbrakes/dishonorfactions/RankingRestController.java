package es.withoutbrakes.dishonorfactions;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ranking")
public class RankingRestController {

	@Autowired
	private Ranking ranking;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<RankingRow> getRankingRows()
	{
		return ranking.getRows();
	}
}