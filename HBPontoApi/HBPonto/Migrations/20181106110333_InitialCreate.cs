using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HBPonto.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Relatories",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Jira = table.Column<string>(maxLength: 50, nullable: false),
                    Started = table.Column<DateTime>(nullable: false),
                    Time = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relatories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Relatories_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Relatories_UserId",
                table: "Relatories",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Relatories");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
