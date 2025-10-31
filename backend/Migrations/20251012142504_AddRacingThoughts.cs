using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JournalerBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddRacingThoughts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RacingThoughts",
                table: "Entries",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RacingThoughts",
                table: "Entries");
        }
    }
}
