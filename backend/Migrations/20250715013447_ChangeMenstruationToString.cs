using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JournalerBackend.Migrations
{
    /// <inheritdoc />
    public partial class ChangeMenstruationToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MenstruationTemp",
                table: "Entries",
                nullable: true);

            migrationBuilder.Sql(@"
                UPDATE ""Entries""
                SET ""MenstruationTemp"" =
                    CASE
                        WHEN ""Menstruation"" = true THEN 'Yes'
                        WHEN ""Menstruation"" = false THEN 'No'
                        ELSE NULL
                    END
            ");

            migrationBuilder.DropColumn(
                name: "Menstruation",
                table: "Entries");

            migrationBuilder.RenameColumn(
                name: "MenstruationTemp",
                table: "Entries",
                newName: "Menstruation");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
