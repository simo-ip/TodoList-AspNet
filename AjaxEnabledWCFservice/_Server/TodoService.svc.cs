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
        //[OperationContract]
        public void DoWork()
        {
            // Add your operation implementation here
            return;
        }

        // Add more operations here and mark them with [OperationContract]
        //[WebGet]
        //[OperationContract]
        public string Message()
        {
            return "Hello";
        }

        
        //[WebGet]
        //[OperationContract]
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
                Pages = service.GetPageNumber(),
                TodoList = list
            };

            return model;
        }
    }

    [ServiceContract]
    public interface ITodoWcfService
    {
        [WebGet]
        [OperationContract]
        string Message();

        [WebGet]
        [OperationContract]
        void DoWork();

        [WebGet]
        [OperationContract]
        TodoViewModel GetTodo(int page);

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
        public int Pages { get; set; }
        [DataMember]
        public IEnumerable<TodoItem> TodoList { get; set; }
    }
}
