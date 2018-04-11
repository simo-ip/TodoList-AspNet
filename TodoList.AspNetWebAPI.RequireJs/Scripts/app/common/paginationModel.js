define([], function () {
    var paginationModel = {
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
                    html += '<li class="active"><span>' + i + '</span></li>';
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

    return paginationModel;
});