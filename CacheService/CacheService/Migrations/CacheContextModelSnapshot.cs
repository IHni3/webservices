﻿// <auto-generated />
using CacheService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CacheService.Migrations
{
    [DbContext(typeof(CacheContext))]
    partial class CacheContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("CacheService.Models.CacheItem", b =>
                {
                    b.Property<string>("ID")
                        .HasColumnType("text");

                    b.Property<string>("Awnser")
                        .HasColumnType("text");

                    b.Property<string>("Querry")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("CacheItems");
                });
#pragma warning restore 612, 618
        }
    }
}