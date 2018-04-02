using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        ToDoContext context;
        DbSet<T> dbSet;

        public BaseRepository()
        {
            context = new ToDoContext();
            dbSet = context.Set<T>();
        }

        public IQueryable<T> GetAll()
        {
            return dbSet;
        }

        public T GetById(int id)
        {
            return dbSet.Find(id);
        }

        public void Create(T entity)
        {
            dbSet.Add(entity);
            Save();
        }

        public void Delete(T entity)
        {
            dbSet.Remove(entity);
            Save();
        }

        public void Delete(int id)
        {
            var entity = dbSet.Find(id);
            Delete(entity);
        }
                
        public void Update(T entity)
        {
            context.Entry(entity).State = EntityState.Modified;
            Save();
        }

        public void Save()
        {
            context.SaveChanges();
        }

        #region Dispose

        // Flag: Has Dispose already been called?
        bool disposed = false;

        // Public implementation of Dispose pattern callable by consumers.
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                // Free any other managed objects here.
                //
            }

            // Free any unmanaged objects here.
            if (context != null)
                context.Dispose();

            disposed = true;
        }

        ~BaseRepository()
        {
            Dispose(false);
        }

        #endregion
    }
}
