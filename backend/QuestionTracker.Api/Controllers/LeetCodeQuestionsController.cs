using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestionTracker.Api.Data;
using QuestionTracker.Api.Models;

namespace QuestionTracker.Api.Controllers;

[ApiController]
[Route("api/leetcode-questions")]
[Authorize]
public class LeetCodeQuestionsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public LeetCodeQuestionsController(ApplicationDbContext db)
    {
        _db = db;
    }

    // =========================
    // GET SQL 50
    // GET: api/leetcode-questions/sql
    // =========================
    [HttpGet("sql")]
    public async Task<ActionResult> GetSql50()
    {
        var questions = await _db.LeetCodeQuestions
            .Where(q => q.Category == "SQL")
            .OrderBy(q => q.Id)
            .ToListAsync();

        return Ok(questions);
    }
}
