using Microsoft.EntityFrameworkCore.Migrations;

namespace CacheService.Migrations
{
    public partial class InitalMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CacheItems",
                columns: table => new
                {
                    ID = table.Column<string>(type: "text", nullable: false),
                    Querry = table.Column<string>(type: "text", nullable: true),
                    Awnser = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CacheItems", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CacheItems");
        }
    }
}
