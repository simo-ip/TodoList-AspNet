/*global $ JSON document alert*/
(function () {
    var TodoViewModel, TodoModel, Pagination, Template;

    TodoItemViewModel = {
        TodoId: ko.observable(),
        Description: ko.observable(),
        IsDone: ko.observable()
    };

    TodoViewModel = {
        loading: ko.observable(true),

        todoItem: TodoItemViewModel,
        todoList: ko.observableArray(),

        model: null,
        currentPage: 1,
        baseApiUrl:'/api/todo/',

        init: function (model) {
            ko.applyBindings(TodoViewModel);

            this.model = model;
            this.getData(this.baseApiUrl+1);

            this.initValidation();

            $("#CreateTodo").on("submit", this.add);
            $(window).on('hashchange', this.onHashChange);
        },
        
        onHashChange() {
            var route = window.location.hash.replace('#', '') || 'index';
            if ($.isNumeric(route)) {
                TodoViewModel.getData(TodoViewModel.baseApiUrl + route);
            }
        },

        renderView: function (data) {
            this.currentPage = data.CurrentPage;
            document.getElementById('CreateTodo').reset();

            Pagination.render(data);
        },

        getData: function (url) {
            TodoViewModel.loading(true);
            TodoViewModel.model.getData(url)
                .done(function (data) {
                    TodoViewModel.renderView(data);
                    TodoViewModel.todoList(data.TodoList);
                })
                .fail(function (xhr, status, error) {
                    $('#errorMsg').text(error.Message)
                })
                .always(function () {
                    TodoViewModel.loading(false);
                });
        },

        add: function (e) {
            var url = TodoViewModel.baseApiUrl;
            var todo = { Description: TodoViewModel.todoItem.Description () };
               
            TodoViewModel.model.add(url, todo)
                .done(function (data) {
                    TodoViewModel.getData(TodoViewModel.baseApiUrl + 1);
                })
                .fail(function (xhr, status, error) {
                    $('#errorMsg').text(xhr.responseJSON.Message)
                });
        },

        edit: function (e) {
                var todo = e;
                var url = TodoViewModel.baseApiUrl + todo.TodoId;
                TodoViewModel.model.save(url, todo)
                    .done(function (data) {
                        TodoViewModel.getData(TodoViewModel.baseApiUrl + TodoViewModel.currentPage);
                    })
                    .fail(function (xhr, status, error) {
                        $('#errorMsg').text(xhr.responseJSON.Message)
                    });
        },

        delete: function (e) {
            var url = TodoViewModel.baseApiUrl + e.TodoId;
            TodoViewModel.model.delete(url)
                .done(function (data) {
                    TodoViewModel.getData(TodoViewModel.baseApiUrl + TodoViewModel.currentPage);
                })
                .fail(function (xhr, status, error) {
                    $('#errorMsg').text(xhr.responseJSON.Message)
                });
        },

        initValidation: function () {

            
        },
    };

    TodoModel = {
        getData: function (url) {
            return $.getJSON(url)
        },
        add: function (url, data) {
            return $.ajax({
                type: "POST",
                url: url,
                data: data
            });
        },
        save: function (url, data) {
            return $.ajax({
                type: "PUT",
                url: url,
                data: data
            });
        },
        delete: function (url) {
            return $.ajax({
                type: "DELETE",
                url: url
            });
        }
    };

    Pagination = {
        render: function (data) {
            $('.pagination').empty();
            if (data.CurrentPage === 1) {
                $('.pagination').append('<li><span class="disabled">First page</span></li>');
            } else {
                $('.pagination').append('<li><a href="#1" data-uri="/api/todo/1">First page</a></li>');
            }
            for (var i = 1; i <= data.Pages; i++) {
                var prop = { url: '#' + i, uri: '/api/todo/' + i, caption: i }
                if (i === data.CurrentPage) {
                    $('.pagination').append('<li class="active"><span>' + i + '</span></li>');
                } else {
                    $('.pagination').append('<li><a href="#' + i + '" data-uri="/api/todo/' + i + '">' + i + '</a></li>');
                }
            }
            if (data.CurrentPage === data.Pages) {
                $('.pagination').append('<li><span class="disabled">Last page</span></li>');
            } else {
                $('.pagination').append('<li><a href="#' + data.Pages + '" data-uri=/api/todo/' + data.Pages + '>Last page</a></li>');
            }
        }
    }

    $(document).ready(function () {
        TodoViewModel.init(TodoModel);
    });

})();
