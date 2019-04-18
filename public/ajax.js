$('#new-todo-form').submit(function(e) {
    e.preventDefault();

    var toDoItem = $(this).serialize();

    $.post('/todos', toDoItem, function(data) {
        debugger;
    })
});