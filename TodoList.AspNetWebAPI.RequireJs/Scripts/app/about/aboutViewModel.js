console.log('vm start');
// Main viewmodel class
define(['knockout'], function (ko) {
    console.log('vm');
    return function aboutViewModel() {
        this.firstName = ko.observable('Bert');
        this.firstNameCaps = ko.pureComputed(function () {
            return this.firstName().toUpperCase();
        }, this);
    };
});
console.log('vm end');