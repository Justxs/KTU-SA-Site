using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KTU_SA_API.Migrations
{
    /// <inheritdoc />
    public partial class AddedRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "StudentAsociationUnitId",
                table: "Post",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Post_StudentAsociationUnitId",
                table: "Post",
                column: "StudentAsociationUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_StudentAsociationUnit_StudentAsociationUnitId",
                table: "Post",
                column: "StudentAsociationUnitId",
                principalTable: "StudentAsociationUnit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_StudentAsociationUnit_StudentAsociationUnitId",
                table: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Post_StudentAsociationUnitId",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "StudentAsociationUnitId",
                table: "Post");
        }
    }
}
