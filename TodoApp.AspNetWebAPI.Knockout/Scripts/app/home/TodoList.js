/*global ko JSON document window alert*/
(function () {
    var TodoItemViewModel, TodoViewModel, TodoModel, Pagination, Template;

    TodoItemViewModel = ko.validatedObservable({
        TodoId: ko.observable(),
        Description: ko.observable().extend({
            required: {
                params: true,
                message: 'Please enter task.'
            }
        }),
        IsDone: ko.observable()
    });

    TodoViewModel = {
        loading: ko.observable(true),
        errorMsg: ko.observable(),
        todoItem: TodoItemViewModel,
        todoList: ko.observableArray(),

        model: null,
        currentPage: 1,
        baseApiUrl:'/api/todo/',

        init: function (model) {
            

            this.model = model;
            
            var param1 = window.location.hash.split('#')[1];
            if (param1) {
                page = Number(param1);
                if (!isNaN(page)) {
                    this.currentPage = page;
                }
            }
            
            this.getData(this.baseApiUrl + this.currentPage);

            this.initValidation();
            window.addEventListener("hashchange", this.onHashChange, false)

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
            this.currentPage = data.CurrentPage;
            document.getElementById('CreateTodo').reset();
            this.errorMsg('');
            data.baseApiUrl = TodoViewModel.baseApiUrl;
            Pagination.render(data);
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
            var todo = { Description: TodoViewModel.todoItem().Description () };
               
            TodoViewModel.model.add(url, todo)
                .then(data => {
                    var newUrl = window.location.hash.split('#')[0];
                    history.pushState({}, null, newUrl +'#1');
                    TodoViewModel.getData(TodoViewModel.baseApiUrl + 1);
                    TodoViewModel.todoItem.Description('');
                })
                .catch(error => {
                    TodoViewModel.errorMsg(error);
                    TodoViewModel.todoItem().Description('')
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

    TodoModel = {
        getData: function (url) {
            return fetch(url)
                .then(response => response)
        },
        add: function (url, data) {
            // Default options are marked with *
            return fetch(url, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, same-origin, *omit
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json'
                },
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // *manual, follow, error
                referrer: 'no-referrer', // *client, no-referrer
            })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            //.catch(error => console.log('Error:', error));
        },
        save: function (url, data) {
            return fetch(url, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, same-origin, *omit
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json'
                },
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // *manual, follow, error
                referrer: 'no-referrer', // *client, no-referrer
            })
            .then(response => response)
        },
        delete: function (url) {
            return fetch(url, {
                method: 'delete'
            }).then(response => response);
        }
    };

    Pagination = {
        render: function (data) {
            var pagination = document.getElementById("pagination");
            var html = '';
            if (data.CurrentPage === 1) {
                html = '<li><span class="disabled">First page</span></li>';
            } else {
                html = '<li><a href="#1" data-uri="' + data.baseApiUrl + '/1">First page</a></li>';
            }
            for (var i = 1; i <= data.Pages; i++) {
                var prop = { url: '#' + i, uri: '/api/todo/' + i, caption: i }
                if (i === data.CurrentPage) {
                    html +='<li class="active"><span>' + i + '</span></li>';
                } else {
                    html += '<li><a href="#' + i + '" data-uri="' + data.baseApiUrl + i + '">' + i + '</a></li>';
                }
            }
            if (data.CurrentPage === data.Pages) {
                html += '<li><span class="disabled">Last page</span></li>';
            } else {
                html += '<li><a href="#' + data.Pages + '" data-uri=' + data.baseApiUrl + data.Pages + '>Last page</a></li>';
            }
            pagination.innerHTML = html;
        }
    }

    window.onload = function () {
        TodoViewModel.init(TodoModel);
    };

})();
