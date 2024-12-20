document.getElementById('snippet-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const title = document.getElementById('title').value;
    const language = document.getElementById('language').value;
    const code = document.getElementById('code').value;

    // Create a new snippet object
    const newSnippet = {
        title,
        language,
        code
    };

    // Get existing snippets from localStorage
    let snippets = JSON.parse(localStorage.getItem('snippets')) || [];

    // Add the new snippet to the array
    snippets.push(newSnippet);

    // Save the updated snippets back to localStorage
    localStorage.setItem('snippets', JSON.stringify(snippets));

    // Clear form fields
    document.getElementById('snippet-form').reset();
    alert('Snippet added successfully!');
});

window.onload = function() {
    // Load snippets if on snippets page
    if (document.getElementById('snippets')) {
        const snippets = JSON.parse(localStorage.getItem('snippets')) || [];
        const snippetsContainer = document.getElementById('snippets');
        
        snippets.forEach(snippet => {
            const snippetElement = document.createElement('div');
            snippetElement.classList.add('snippet');
            
            snippetElement.innerHTML = `
                <h3>${snippet.title}</h3>
                <p class="language">${snippet.language}</p>
                <pre>${escapeHtml(snippet.code)}</pre>
            `;
            
            snippetsContainer.appendChild(snippetElement);
        });
    }
};

// Function to escape HTML characters (to prevent XSS)
function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (m) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[m];
    });
}
