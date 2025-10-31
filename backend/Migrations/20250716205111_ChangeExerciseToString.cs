using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JournalerBackend.Migrations
{
    /// <inheritdoc />
    public partial class ChangeExerciseToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ExerciseTemp",
                table: "Entries",
                nullable: true);

            migrationBuilder.Sql(@"
                UPDATE ""Entries""
                SET ""ExerciseTemp"" =
                    CASE
                        WHEN ""Exercise"" = true THEN 'Yes'
                        WHEN ""Exercise"" = false THEN 'No'
                        ELSE NULL
                    END
            ");

            migrationBuilder.DropColumn(
                name: "Exercise",
                table: "Entries");

            migrationBuilder.RenameColumn(
                name: "ExerciseTemp",
                table: "Entries",
                newName: "Exercise");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
