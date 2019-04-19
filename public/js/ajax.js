'use strict';

$('#new-todo-form').submit(function (e) {
    e.preventDefault();

    var toDoItem = $(this).serialize();

    $.post('/todos', toDoItem, function (data) {
        $('#todo-list').append('\n            <li class="list-group-item">\n                <form action="/todos/' + data._id + '" method="POST" class="edit-item-form">\n                    <div class="form-group">\n                        <label for="' + data._id + '">Item Text</label>\n                        <input type="text" value="' + data.text + '" name="todo[text]" class="form-control" id="' + data._id + '">\n                    </div>\n                    <button class="btn btn-primary">Update Item</button>\n                </form>\n                <span class="lead">\n                    ' + data.text + '\n                </span>\n                <div class="pull-right">\n                    <button class="btn btn-sm btn-warning edit-button">Edit</button>\n                    <form style="display: inline" method="POST" action="/todos/' + data._id + '" class="delete-item-form">\n                        <button type="submit" class="btn btn-sm btn-danger">Delete</button>\n                    </form>\n                </div>\n                <div class="clearfix"></div>\n            </li>\n        ');

        $('#new-todo-form').find('.form-control').val('');
    });
});

$('#todo-list').on('click', '.edit-button', function () {
    $(this).parent().siblings('.edit-item-form').toggle();
});

$('#todo-list').on('submit', '.edit-item-form', function (e) {
    e.preventDefault();

    var toDoItem = $(this).serialize();
    var actionUrl = $(this).attr('action');
    var $originalItem = $(this).parent('.list-group-item');

    $.ajax({
        url: actionUrl,
        data: toDoItem,
        type: 'PUT',
        originalItem: $originalItem,
        success: function success(data) {
            this.originalItem.html('\n                <form action="/todos/' + data._id + '" method="POST" class="edit-item-form">\n                    <div class="form-group">\n                        <label for="' + data._id + '">Item Text</label>\n                        <input type="text" value="' + data.text + '" name="todo[text]" class="form-control" id="' + data._id + '">\n                    </div>\n                    <button class="btn btn-primary">Update Item</button>\n                </form>\n                <span class="lead">\n                    ' + data.text + '\n                </span>\n                <div class="pull-right">\n                    <button class="btn btn-sm btn-warning edit-button">Edit</button>\n                    <form style="display: inline" method="POST" action="/todos/' + data._id + '" class="delete-item-form">\n                        <button type="submit" class="btn btn-sm btn-danger">Delete</button>\n                    </form>\n                </div>\n                <div class="clearfix"></div>\n            ');
        }
    });
});

$('#todo-list').on('submit', '.delete-item-form', function (e) {
    e.preventDefault();

    var confirmResponse = confirm('Are you sure?');

    if (confirmResponse) {
        var actionUrl = $(this).attr('action');
        var $itemToDelete = $(this).closest('.list-group-item');

        $.ajax({
            url: actionUrl,
            type: 'DELETE',
            itemToDelete: $itemToDelete,
            success: function success(data) {
                this.itemToDelete.remove();
            }
        });
    } else {
        $(this).find('button').blur();
    }
});