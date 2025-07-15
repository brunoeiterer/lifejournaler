using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JournalerBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddAppetiteLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppetiteLevel",
                table: "Entries",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppetiteLevel",
                table: "Entries");
        }
    }
}
