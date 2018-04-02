using DataAccess.Entities;
using Services;
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

        public void Create(TodoItem todoItem)
        {
            ITodoService service = new TodoService();
            Todo todo = new Todo
            {
                Description = todoItem.Description
            };
            service.Create(todo);
        }

        public void Delete(int id)
        {
            ITodoService service = new TodoService();
            service.Delete(id);
        }

        public TodoViewModel GetTodo(int page)
        {
            ITodoService service = new TodoService();

            List<TodoItem> list = service.GetData(page).TodoList.Select(a => new TodoItem {
                TodoId = a.TodoId,
                Description = a.Description,
                IsDone = a.IsDone
            }).ToList();

            TodoViewModel model = new TodoViewModel()
            {
                CurrentPage = page,
                Pages = service.GetPageNumber(),
                TodoList = list
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
