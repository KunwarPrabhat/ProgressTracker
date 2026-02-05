using System.ComponentModel.DataAnnotations;

namespace QuestionTracker.Api.Models;

public class Question
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string LeetCodeUrl { get; set; } = string.Empty;

    // personal notes / solution
    public string? Notes { get; set; }

    // Checkbox in UI
    public bool IsCompleted { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int UserId { get; set; }
    // public User User { get; set; } = null!;
    public User? User { get; set; }


}
