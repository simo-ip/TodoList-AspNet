// Main viewmodel class
define(['knockout', 'validation', '../common/httpModel', './todoItemViewModel', '../common/paginationModel'],
    function (ko, validation, TodoModel, TodoItemViewModel, paginationModel) {
    
    var TodoViewModel = {
        loading: ko.observable(true),
        errorMsg: ko.observable(),
        todoItem: TodoItemViewModel,
        todoList: ko.observableArray(),

        model: null,
        currentPage: 1,
        baseApiUrl: '/api/todo/',

        init: function () {
            
            TodoViewModel.model = TodoModel;

            var param1 = window.location.hash.split('#')[1];
            if (param1) {
                page = Number(param1);
                if (!isNaN(page)) {
                    this.currentPage = page;
                }
            }

            TodoViewModel.getData(TodoViewModel.baseApiUrl + TodoViewModel.currentPage);

            TodoViewModel.initValidation();
            window.addEventListener("hashchange", TodoViewModel.onHashChange, false)

            ko.applyBindings(TodoViewModel);
        },

        onHashChange: function () {
            var param1 = window.location.hash.split('#')[1];
            if (param1) {
                page = Number(param1);
                if (!isNaN(page)) {
                    TodoViewModel.getData(TodoViewModel.baseApiUrl + page)
                }
            }
        },

        renderView: function (data) {
            TodoViewModel.currentPage = data.CurrentPage;
            document.getElementById('CreateTodo').reset();
            TodoViewModel.errorMsg('');
            data.baseApiUrl = TodoViewModel.baseApiUrl;
            
            paginationModel.render(data);
        },

        getData: function (url) {
            TodoViewModel.loading(true);
            TodoViewModel.model.getData(url)
                .then(response => response.json())
                .then(data => {
                    TodoViewModel.renderView(data);
                    TodoViewModel.todoList(data.TodoList);
                    TodoViewModel.loading(false);
                })
                .catch(error => {
                    TodoViewModel.errorMsg(error);
                    TodoViewModel.loading(false);
                });
        },

        add: function (e) {
            var result = ko.validation.group(TodoViewModel.todoItem, { deep: true });
            if (!TodoViewModel.todoItem.isValid()) {
                result.showAllMessages(true);
                return false;
            }

            var url = TodoViewModel.baseApiUrl;
            var todo = { Description: TodoViewModel.todoItem().Description() };

            TodoViewModel.model.add(url, todo)
                .then(data => {
                    var newUrl = window.location.hash.split('#')[0];
                    history.pushState({}, null, newUrl + '#1');
                    TodoViewModel.getData(TodoViewModel.baseApiUrl + 1);
                    TodoViewModel.todoItem.Description('');
                })
                .catch(error => {
                    TodoViewModel.errorMsg(error);
                    TodoViewModel.todoItem.Description('')
                });
        },

        edit: function (e) {
            // TODO
            //var result = ko.validation.group(TodoItemViewModel, { deep: true });
            //if (!TodoViewModel.todoList.isValid()) {
            //    result.showAllMessages(true);
            //    return false;
            //}

            var todo = e;
            var url = TodoViewModel.baseApiUrl + todo.TodoId;
            TodoViewModel.model.save(url, todo)
                .then(data => {
                    TodoViewModel.getData(TodoViewModel.baseApiUrl + TodoViewModel.currentPage);
                })
                .catch(error => TodoViewModel.errorMsg(error));
        },

        delete: function (e) {
            var url = TodoViewModel.baseApiUrl + e.TodoId;
            TodoViewModel.model.delete(url)
                .then(response => {
                    TodoViewModel.getData(TodoViewModel.baseApiUrl + TodoViewModel.currentPage);
                })
                .catch(error => TodoViewModel.errorMsg(error))
        },

        initValidation: function () {
            // enable validation
            ko.validation.init({
                decorateElement: true,
                errorElementClass: 'err',
                insertMessages: false
            });
        },
    };





    return TodoViewModel;
});