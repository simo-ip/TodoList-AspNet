define(['knockout'], function (ko) {

    var viewModel = function () {
        var self = this;

        self.name = ko.observable();
    };

    return viewModel;
});