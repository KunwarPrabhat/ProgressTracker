using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuestionTracker.Api.Models;

public class Question
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    public string? LeetCodeUrl { get; set; }

    public string? Notes { get; set; }

    public bool IsCompleted { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // =========================
    // Foreign key to the owning user
    // =========================

    [Required]
    public int UserId { get; set; }

    // Navigation property to the owning user (EF Core)
    public User? User { get; set; }
}
