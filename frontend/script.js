const input = document.getElementById("input");
const todoList = document.getElementById("todo-list");

const addTodo = () => {
    const todoText = input.value.trim();

    if (todoText === "") {
        alert("Please Enter the todo");
        return;
    }

    fetch("http://localhost:4000/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoText }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("Task Added: ", data);

            const newTodo = document.createElement("li");
            newTodo.innerHTML = data.todoText;

            newTodo.dataset.id = data._id;

            // ===== EDIT BUTTON =====
            const edit = document.createElement("button");
            edit.innerText = "EDIT";
            edit.style.backgroundColor = "green";
            edit.style.color = "white";
            edit.onclick = () => {
                const updatedText = prompt(
                    "Edit your todo: ",
                    newTodo.firstChild.textContent
                );
                if (updatedText !== null && updatedText.trim() !== "") {
                    const id = newTodo.dataset.id;

                    fetch(`http://localhost:4000/api/update/${id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ todoText: updatedText.trim() }),
                    })
                        .then((res) => res.json())
                        .then((updatedTodo) => {
                            console.log("Updated: ", updatedTodo);
                            newTodo.firstChild.textContent = updatedTodo.todoText + " ";
                        })
                        .catch((error) => console.log("Error updating: ", error));
                }
            };

            // ===== DELETE BUTTON =====
            const Delete = document.createElement("button");
            Delete.innerHTML = "DELETE";
            Delete.style.background = "red";
            Delete.style.color = "white";
            Delete.onclick = () => {
                const id = newTodo.dataset.id;

                fetch(`http://localhost:4000/api/delete/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => {
                        if (res.ok) {
                            todoList.removeChild(newTodo);
                            console.log("Deleted successfully");
                        } else {
                            console.error("Failed to delete on server");
                        }
                    })
                    .catch((error) => console.log("Error deleting: ", error));
            };

            newTodo.appendChild(edit);
            newTodo.appendChild(Delete);
            todoList.appendChild(newTodo);
            input.value = "";
        })
        .catch((error) => {
            console.log("Error:", error);
        });
};