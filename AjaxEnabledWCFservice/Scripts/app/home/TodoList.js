/*global $ JSON document alert*/
(function () {
    var TodoViewModel, TodoModel, Pagination, Template;

    TodoViewModel = {
        model: null,
        validator: null,
        currentPage: 1,
        baseApiUrl:'http://localhost:54558/_Server/TodoService.svc',

        init: function (model) {

            this.model = model;

            this.getData(this.baseApiUrl + '/GetTodo?page=' +1);

            this.initValidation();

            $("#CreateTodo").on("submit", this.add);
            $(window).on('hashchange', this.onHashChange);
        },

        onHashChange() {
            var route = window.location.hash.replace('#', '') || 'index';
            if ($.isNumeric(route)) {
                TodoViewModel.getData(TodoViewModel.baseApiUrl + '/GetTodo?page=' + route);
            }
        },

        getFormData($form) {
            var checkboxes = $form.find('input[type="checkbox"]');
            $.each(checkboxes, function (key, value) {
                if (value.checked === false) {
                    value.value = false;
                } else {
                    value.value = true;
                }
                $(value).attr('type', 'hidden');
            });

            var unindexed_array = $form.serializeArray();
            var indexed_array = {};

            $.map(unindexed_array, function (n, i) {
                indexed_array[n['name']] = n['checked'] ? true : n['value'];
            });

            return indexed_array;
        },

        renderView: function (data) {
            this.currentPage = data.CurrentPage;
            $('#todoList').empty();
            document.getElementById('CreateTodo').reset();

            $.each(data.TodoList, function (key, item) {
                $('#todoList').append(function () {
                    return Template.render(item);
                });
            });

            var checkboxes = $('form').find('input[type="checkbox"]');
            $.each(checkboxes, function (key, value) {
                if (value.value == "true") {
                    $(value).attr('checked', 'checked');
                }
            });

            Pagination.render(data);

            $(".pagination a").click(function (event) {
                //event.preventDefault();           
                //var uri = $(event.target).data('uri');
                //TodoViewModel.getData(uri);
            });

            $(".deleteButton").on("click", this.delete);
            $(".editTodo").on("submit", this.edit);


            $('form.editTodo').each(function (key, form) {
                $(form).validate({
                    errorPlacement: function (error, element) {
                        var msgBox = $(this.currentForm).find('ul');
                        error.appendTo(msgBox);
                    },
                    wrapper: "li",
                    rules: {
                        Description: { required: true },
                    },
                    errorElement: "span",
                    errorClass: "text-danger"
                });
            });

        },

        getData: function (url) {
            TodoViewModel.model.getData(url)
                .done(function (data) {
                    TodoViewModel.renderView(data.d);
                })
                .fail(function (xhr, status, error) {
                    $('#errorMsg').text(error.Message)
                });
        },

        add: function (e) {
            e.preventDefault();

            var $form = $(e.target);
            if ($form.valid()) {

                var url = TodoViewModel.baseApiUrl + "/Create";
                var formData = TodoViewModel.getFormData($form);

                var data = new Object();
                data.todoItem = new Object();
                data.todoItem.Description = formData.Description;

                TodoViewModel.model.add(url, data)
                    .done(function (data) {
                        TodoViewModel.getData(TodoViewModel.baseApiUrl + '/GetTodo?page=' + 1);
                    })
                    .fail(function (xhr, status, error) {
                        $('#errorMsg').text(xhr.responseJSON.Message)
                    });
            }
        },

        edit: function (e, data) {
            e.preventDefault();
            debugger;
            var $form = $(e.target);
            if ($form.valid()) {
                var todo = TodoViewModel.getFormData($form);

                var url = TodoViewModel.baseApiUrl + todo.TodoId;
                TodoViewModel.model.save(url, todo)
                    .done(function (data) {
                        TodoViewModel.getData(TodoViewModel.baseApiUrl + '/GetTodo?page=' + TodoViewModel.currentPage);
                    })
                    .fail(function (xhr, status, error) {
                        $('#errorMsg').text(xhr.responseJSON.Message)
                    });
            }

        },

        delete: function (e) {
            e.preventDefault();
            var todoId = $(this).val()
            var url = TodoViewModel.baseApiUrl + '/Delete';
            TodoViewModel.model.delete(url, todoId)
                .done(function (data) {
                    TodoViewModel.getData(TodoViewModel.baseApiUrl + '/GetTodo?page=' + TodoViewModel.currentPage);
                })
                .fail(function (xhr, status, error) {
                    $('#errorMsg').text(xhr.responseJSON.Message)
                });
        },

        initValidation: function () {

            TodoViewModel.validator = $("#CreateTodo").validate({
                errorLabelContainer: "#validation-errors",
                wrapper: "li",
                rules: {
                    Description: { required: true },
                },
                errorElement: "span",
                errorClass: "text-danger"
            });
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
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                processData: true,
                dataType: "json",

            });
        },
        save: function (url, data) {
            return $.ajax({
                type: "POST",
                url: url,
                data: data
            });
        },
        delete: function (url, id) {
            return $.ajax({
                type: "POST",
                url: url,
                data: '{"id": "' + id + '"}',
                contentType: "application/json; charset=utf-8",
                data: '{"id": "' + id + '"}',
                processData: true,
                dataType: "json",
            });
        }
    };

    Template = {
        itemTpl: $('script[data-template="listitem"]').text().split(/\$\{(.+?)\}/g),
        pars: function (props) {
            return function (tok, i) { return (i % 2) ? props[tok] : tok; };
        },
        render: function (item) {
            return this.itemTpl.map(this.pars(item)).join('');
        }
    }

    Pagination = {
        render: function (data) {
            $('.pagination').empty();
            if (data.CurrentPage == 1) {
                $('.pagination').append('<li><span class="disabled">First page</span></li>');
            } else {
                $('.pagination').append('<li><a href="#1" data-uri="' + TodoViewModel.baseApiUrl + '/GetTodo?page=' + 1 +'">First page</a></li>');
            }
            for (var i = 1; i <= data.Pages; i++) {
                if (i == data.CurrentPage) {
                    $('.pagination').append('<li class="active"><span>' + i + '</span></li>');
                } else {
                    $('.pagination').append('<li><a href="#' + i + '" data-uri="' + TodoViewModel.baseApiUrl + '/GetTodo?page=' + i + '">' + i + '</a></li>');
                }
            }
            if (data.CurrentPage == data.Pages) {
                $('.pagination').append('<li><span class="disabled">Last page</span></li>');
            } else {
                $('.pagination').append('<li><a href="#' + data.Pages + '" data-uri=' + TodoViewModel.baseApiUrl + '/GetTodo?page=' + data.Pages + '>Last page</a></li>');
            }
        }
    }

    $(document).ready(function () {
        TodoViewModel.init(TodoModel);
    });

})();
