using DataAccess.Entities;
using Services.dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface ITodoService
    {
        int GetPageNumber();

        ITodoListDto GetData(int page);

        Todo GetById(int id);

        void Create(Todo entity);

        void Update(Todo entity);

        void Delete(int id);
    }
}
