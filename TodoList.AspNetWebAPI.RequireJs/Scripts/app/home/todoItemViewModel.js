define(['knockout'], function (ko) {
    debugger;
        var TodoItemViewModel = {
        TodoId: ko.observable(),
        Description: ko.observable(),
            //.extend({
            //required: {
            //    params: true,
            //    message: 'Please enter task.'
            //}
            //},
        IsDone: ko.observable()
    };

    //var TodoItemViewModel = ko.validatedObservable({
    //    TodoId: ko.observable(),
    //    Description: ko.observable().extend({
    //        required: {
    //            params: true,
    //            message: 'Please enter task.'
    //        }
    //    }),
    //    IsDone: ko.observable()
    //});

    return TodoItemViewModel;
});