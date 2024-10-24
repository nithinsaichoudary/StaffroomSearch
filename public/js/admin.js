    // Function to fetch and display the list of uploaded files
    function fetchFiles() {
        fetch('/files')
            .then(response => response.json())
            .then(data => {
                console.log('Files fetched:', data); // Debug log to see what files are being fetched
                const fileList = document.getElementById('fileList');
                const files = document.getElementById('files');
                files.innerHTML = ''; // Clear the current list

                if (data.length > 0) {
                    fileList.style.display = 'block'; // Show the list
                    data.forEach(file => {
                        const li = document.createElement('li');
                        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                        li.innerHTML = `
                    <span>${file}</span>
                    <div>
                        <a href="/download/${file}" class="btn btn-sm btn-info mr-2">View</a>
                        <button class="btn btn-sm btn-danger" onclick="deleteFile('${file}')">Delete</button>
                    </div>`;
                        files.appendChild(li);
                    });
                } else {
                    fileList.style.display = 'none'; // Hide the list if no files
                }
            })
            .catch(err => {
                console.error('Error fetching files:', err);
            });
    }

    // Function to delete a file
    function deleteFile(fileName) {
        console.log('Deleting file:', fileName); // Debug log to confirm delete function is called
        fetch(`/delete/${fileName}`, { method: 'DELETE' })
            .then(response => response.text())
            .then(result => {
                document.getElementById('result').innerHTML = `<p>${result}</p>`;
                fetchFiles(); // Refresh the file list after deletion
            })
            .catch(err => {
                console.error('Error deleting file:', err);
                document.getElementById('result').innerHTML = `<p>Error: ${err.message}</p>`;
            });
    }
    // File Upload
    document.getElementById('uploadForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', document.getElementById('file').files[0]);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(result => {
                document.getElementById('result').innerHTML = `<p>${result}</p>`;
                fetchFiles(); // Refresh the file list after upload
            })
            .catch(err => {
                document.getElementById('result').innerHTML = `<p>Error: ${err.message}</p>`;
            });
    });

    // Fetch files when the page loads
    window.onload = fetchFiles;