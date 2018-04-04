using DataAccess.Entities;
using DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

namespace AjaxEnabledWCFservice._Server
{
    //[ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class TodoWcfService : ITodoWcfService
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        // Add more operations here and mark them with [OperationContract]

        const double PAGE_SIZE = 5;

        public void Create(TodoItem todoItem)
        {
            ITodoRepository repository = new TodoRepository();

            Todo todo = new Todo
            {
                Description = todoItem.Description
            };

            repository.Create(todo);
        }

        public void Update(TodoItem todoItem)
        {
            ITodoRepository repository = new TodoRepository();

            Todo todo = new Todo
            {
                TodoId = todoItem.TodoId,
                Description = todoItem.Description,
                IsDone = todoItem.IsDone
            };

            repository.Update(todo);
        }

        public void Delete(int id)
        {
            ITodoRepository repository = new TodoRepository();
            repository.Delete(id);
        }

        public TodoViewModel GetTodo(int page)
        {
            ITodoRepository repository = new TodoRepository();

            List<Todo> todoList = repository.GetAll()
                .OrderByDescending(c => c.TodoId).Skip((int)((page - 1) * PAGE_SIZE)).Take((int)PAGE_SIZE).ToList();

            List<TodoItem> todoItemlist = todoList.Select(a => new TodoItem {
                TodoId = a.TodoId,
                Description = a.Description,
                IsDone = a.IsDone
            }).ToList();

            double rowCount = repository.GetAll().Count();
            int pageCount = (int)Math.Ceiling(rowCount / PAGE_SIZE);

            TodoViewModel model = new TodoViewModel()
            {
                CurrentPage = page,
                Pages = pageCount,
                TodoList = todoItemlist
            };

            return model;
        }
    }

    [ServiceContract]
    public interface ITodoWcfService
    {
        [OperationContract]
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.WrappedRequest, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        void Create(TodoItem todoItem);

        [OperationContract]
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.WrappedRequest, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        void Update(TodoItem todoItem);

        [WebGet]
        [OperationContract]
        TodoViewModel GetTodo(int page);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        void Delete(int id);

    }

    [DataContract]
    public class TodoItem
    {
        [DataMember]
        public int TodoId { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public bool IsDone { get; set; }
    }

    [DataContract]
    public class TodoViewModel
    {
        [DataMember]
        public int CurrentPage { get; set; }
        [DataMember]
        public int Pages { get; set; }
        [DataMember]
        public IEnumerable<TodoItem> TodoList { get; set; }
    }
}
