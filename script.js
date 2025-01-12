let posts = [];

// Function to add a post
function addPost() {
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    const italicize = document.getElementById("italicize").checked;
    const bold = document.getElementById("bold").checked;
    const underline = document.getElementById("underline").checked;
    const date = new Date().toLocaleDateString();

    // Get selected image
    const imageInput = document.getElementById("postImage");
    let imageUrl = "";
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        imageUrl = URL.createObjectURL(file); // Local URL for display
    }

    // Get ingredients
    const ingredientRows = document.querySelectorAll("#ingredientsTable tbody tr");
    let ingredients = [];
    ingredientRows.forEach(row => {
        const ingredient = row.cells[0].querySelector("input").value;
        const quantity = row.cells[1].querySelector("input").value;
        if (ingredient && quantity) ingredients.push({ ingredient, quantity });
    });

    // Style content
    let styledContent = content;
    if (italicize) styledContent = `<i>${styledContent}</i>`;
    if (bold) styledContent = `<b>${styledContent}</b>`;
    if (underline) styledContent = `<u>${styledContent}</u>`;

    // Add the post to the array
    posts.push({ title, content: styledContent, date, imageUrl, ingredients });
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
    displayPosts();
}

// Function to display posts
function displayPosts() {
    const postList = document.getElementById("postList");
    postList.innerHTML = ""; // Clear current posts

    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        let ingredientsHTML = "";
        if (post.ingredients.length > 0) {
            ingredientsHTML = `<h4>Ingredients:</h4><ul>`;
            post.ingredients.forEach(item => {
                ingredientsHTML += `<li>${item.ingredient} - ${item.quantity}</li>`;
            });
            ingredientsHTML += `</ul>`;
        }

        postElement.innerHTML = `
            <div class="post-title">${index + 1}. ${post.title}</div>
            <div class="post-date">Posted on: ${post.date}</div>
            <img src="${post.imageUrl}" alt="Post Image" style="width:100%; max-height:200px; object-fit:cover;">
            <p>${post.content}</p>
            ${ingredientsHTML}
        `;

        postList.appendChild(postElement);
    });
}

// Function to add an ingredient row
function addIngredientRow() {
    const table = document.getElementById("ingredientsTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);

    cell1.innerHTML = '<input type="text" placeholder="Ingredient">';
    cell2.innerHTML = '<input type="text" placeholder="Quantity">';
}
