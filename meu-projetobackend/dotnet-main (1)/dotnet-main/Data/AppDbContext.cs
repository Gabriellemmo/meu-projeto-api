using Microsoft.EntityFrameworkCore;
using PrimeiraApi.Models;


namespace PrimeiraApi.Data;

public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){ }

    public DbSet<Livro> Livros => Set<Livro>();
    public DbSet<Autor> Autores => Set<Autor>();
    public DbSet<Usuario> Usuarios => Set<Usuario>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Livro>()
            .HasMany(p => p.Autores)
            .WithMany(c => c.Livros)
            .UsingEntity(j => j.ToTable("LivroAutor"));

        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.Login)
            .IsUnique();

        modelBuilder.Entity<Livro>(entity => {
            entity.Property(p => p.Valor).HasPrecision(18, 2);
            entity.Property(p => p.Titulo).HasMaxLength(120).IsRequired();
        });

        modelBuilder.Entity<Autor>(entity => {
            entity.Property(c => c.Nome).HasMaxLength(80).IsRequired();
        });
    }
}

