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
        public async Task<JsonResult> GetEntryEntities() {
            if(!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId)) {
                return new JsonResult(new {message = "The user was not found in the request"}) {
                    StatusCode = 400
                };
            }

            var entries = await _context.Entries.Where(e => e.User.Id == userId).ToListAsync();
            return new JsonResult(new {entries});
        }

        [Authorize]
        [HttpPost]
        public async Task<JsonResult> PostEntryEntity([FromBody] EntryEntity entity)
        {
            if(!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId)) {
                return new JsonResult(new {message = "The user was not found in the request"}) {
                    StatusCode = 400
                };
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user == null) {
                return new JsonResult(new {message = "The user was not found in the database"}) {
                    StatusCode = 400
                };
            }

            entity.User = user;

            _context.Entries.Add(entity);
            await _context.SaveChangesAsync();

            return new JsonResult(new {entity.Id});
        }

        [Authorize]
        [HttpPut]
        public async Task<JsonResult> PutYourEntity(EntryEntity editedEntry)
        {
            var entry = _context.Entries.SingleOrDefault(e => e.Id == editedEntry.Id);

            if (entry == null)
            {
                return new JsonResult(new {message = "The entry was not found in the database"}) {
                    StatusCode = 400
                };
            }

            entry.Entry = editedEntry.Entry;
            entry.Mood = editedEntry.Mood;
            entry.Date = editedEntry.Date;

            await _context.SaveChangesAsync();

            return new JsonResult(new {editedEntry.Id});
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

        public class DeleteModel {
            public int Id { get; set; }
        }
    }
}


