using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JournalerBackend.DbContexts;
using JournalerBackend.Entities;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace JournalerBackend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class JournalerController(JournalerDbContext context) : ControllerBase
    {
        private readonly JournalerDbContext _context = context;

        [Authorize]
        [HttpGet]
        public async Task<JsonResult> GetEntryEntities()
        {
            if (!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId))
            {
                return new JsonResult(new { message = "The user was not found in the request" })
                {
                    StatusCode = 400
                };
            }

            var entries = await _context.Entries.Where(e => e.User.Id == userId).ToDictionaryAsync(e => e.Date);
            return new JsonResult(new { entries });
        }

        [Authorize]
        [HttpPost]
        public async Task<JsonResult> PostEntryEntity([FromBody] AddModel model)
        {
            if (!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId))
            {
                return new JsonResult(new { message = "The user was not found in the request" })
                {
                    StatusCode = 400
                };
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return new JsonResult(new { message = "The user was not found in the database" })
                {
                    StatusCode = 400
                };
            }

            model.Entry.User = user;
            model.Entry.Date = model.Date;

            _context.Entries.Add(model.Entry);
            await _context.SaveChangesAsync();

            return new JsonResult(new { model.Entry.Id });
        }

        [Authorize]
        [HttpPut]
        public async Task<JsonResult> PutEntryEntity(EntryEntity editedEntry)
        {
            var entry = _context.Entries.SingleOrDefault(e => e.Id == editedEntry.Id);

            if (entry == null)
            {
                return new JsonResult(new { message = "The entry was not found in the database" })
                {
                    StatusCode = 400
                };
            }

            entry.Mood = editedEntry.Mood;
            entry.Weather = editedEntry.Weather;
            entry.SleepQuality = editedEntry.SleepQuality;
            entry.Menstruation = editedEntry.Menstruation;
            entry.Exercise = editedEntry.Exercise;
            entry.AnxietyThoughts = editedEntry.AnxietyThoughts;
            entry.AutoCriticism = editedEntry.AutoCriticism;
            entry.SensorialOverload = editedEntry.SensorialOverload;
            entry.Notes = editedEntry.Notes;

            await _context.SaveChangesAsync();

            return new JsonResult(new { editedEntry.Id });
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteEntry([FromBody] DeleteModel deleteModel)
        {
            var entity = await _context.Entries.SingleOrDefaultAsync(e => e.Id == deleteModel.Id);
            if (entity == null)
            {
                return BadRequest("The entry was not found in the database.");
            }

            _context.Entries.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        public class DeleteModel
        {
            public int Id { get; set; }
        }

        public class AddModel
        {
            public EntryEntity Entry { get; set; }
            public string Date { get; set; }
        }
    }
}


