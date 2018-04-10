define(['knockout'], function (ko) {

    var TodoItemViewModel = ko.validatedObservable({
        TodoId: ko.observable(),
        Description: ko.observable().extend({
            required: {
                params: true,
                message: 'Please enter task.'
            }
        }),
        IsDone: ko.observable()
    });

    return TodoItemViewModel;
});