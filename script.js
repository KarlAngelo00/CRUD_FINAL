$(document).ready(function() {
    loadTasks();

    // Add Task
    $('#task-form').submit(function(e) {
        e.preventDefault();
        const title = $('#title').val();
        const description = $('#description').val();
        const status = $('#status').val();

        $.post('tasks.php?action=create', { title, description, status }, function() {
            loadTasks();
            $('#task-form')[0].reset();
        });
    });

    // Load Tasks
    function loadTasks() {
        $.get('tasks.php?action=read', function(data) {
            const tasks = JSON.parse(data);
            $('#task-list').empty();
            tasks.forEach(task => {
                $('#task-list').append(`
                    <li>
                        <strong>${task.title}</strong>
                        <p>${task.description}</p>
                        <p>Status: ${task.status}</p>
                        <p>Created At: ${new Date(task.created_at).toLocaleString()}</p>
                        <button class="edit-task" data-id="${task.id}" data-title="${task.title}" data-description="${task.description}" data-status="${task.status}">Edit</button>
                        <button class="delete-task" data-id="${task.id}">Delete</button>
                    </li>
                `);
            });
        });
    }

    // Delete Task
    $(document).on('click', '.delete-task', function() {
        const id = $(this).data('id');
        $.post('tasks.php?action=delete', { id }, function() {
            loadTasks();
        });
    });

    // Edit Task
    $(document).on('click', '.edit-task', function() {
        const id = $(this).data('id');
        const title = $(this).data('title');
        const description = $(this).data('description');
        const status = $(this).data('status');

        // Fill the form with existing data
        $('#title').val(title);
        $('#description').val(description);
        $('#status').val(status); // You will need to add a status input field to the form

        // Change the form action to update
        $('#task-form').off('submit').on('submit', function(e) {
            e.preventDefault();
            const updatedTitle = $('#title').val();
            const updatedDescription = $('#description').val();
            const updatedStatus = $('#status').val();

            $.post('tasks.php?action=update', { id, title: updatedTitle, description: updatedDescription, status: updatedStatus }, function() {
                loadTasks();
                $('#task-form')[0].reset();
                // Reset form submission to handle new task creation
                $('#task-form').off('submit').on('submit', addTask);
            });
        });
    });
});

