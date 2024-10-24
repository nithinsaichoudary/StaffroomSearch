

# Staff Room Numbers Search for University Faculty

This project provides an application to search for university faculty details, including their room numbers and profile pictures. Faculty information is retrieved by web scraping based on faculty IDs obtained from an Excel file uploaded by the admin. The project is built using **Node.js**, **Express**, **MongoDB**, and **Cheerio** (for web scraping).

## Features

- **Faculty Search**: Users can search for faculty by their name or ID and retrieve relevant information like room number, phone number, email, and profile picture.
- **Excel Upload**: Admins can upload an Excel file containing faculty details, which will be processed and stored in a MongoDB database.
- **File Management**: Admins can view and delete previously uploaded Excel files.
- **MongoDB Integration**: Faculty data (names, IDs, room numbers, etc.) is stored in MongoDB for efficient querying.
  
## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **File Handling**: Multer (for Excel file uploads)
- **Frontend**: HTML, Bootstrap for UI
- **Deployment**: Can be hosted on platforms like Heroku or a cloud provider of your choice

## Installation

### Prerequisites

- **Node.js** installed on your machine
- **MongoDB** (Locally installed or a cloud service like MongoDB Atlas)

### Step-by-step Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/staff-room-redeem.git
   cd staff-room-redeem
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   - If using MongoDB locally, ensure that MongoDB is running on `localhost:27017`.
   - If using a cloud database, update your `MONGODB_URI` in the `.env` file.

4. **Run the application:**
   ```bash
   npm start
   ```

5. **Visit** `http://localhost:4000` in your browser.

## Usage

### Admin Side:

1. **Upload Excel File**:
   - Admins can log in and upload an Excel file containing faculty details (name, ID, etc.).
   - The system will extract faculty IDs from the uploaded file and scrape their profile pictures from the university website.

2. **Manage Uploaded Files**:
   - View the list of uploaded Excel files.
   - Delete unwanted files if necessary.

### User Side:

1. **Search Faculty**:
   - Users can search for faculty by name or ID.
   - The system displays the faculty's room number, contact details, and profile picture.


## File Upload and Management

- The **admin** can upload an Excel file containing faculty data.
- The server processes the file and stores the relevant data in MongoDB.

## API Endpoints

- `POST /upload` - Endpoint for uploading Excel files.
- `GET /files` - Get a list of uploaded files.
- `DELETE /delete/:filename` - Delete a specific file.
- `GET /search?query=<name_or_id>` - Search for faculty by name or ID.

## Project Structure

```bash
staff-room-redeem/
├── models/
│   └── faculty.js            # Mongoose model for Faculty data
├── public/
│   └── styles/               # CSS and images for frontend
├── routes/
│   └── redeemRoutes.js       # API routes for handling faculty data
├── views/
│   └── user.html             # User-facing search page
├── uploads/                  # Uploaded Excel files (handled by Multer)
├── app.js                    # Main entry point of the app
├── package.json              # Project metadata and dependencies
└── README.md                 # This file
```

## Future Improvements

- **Authentication**: Add user authentication for both admins and users.
- **Pagination**: Implement pagination for large faculty databases.
- **Real-time updates**: Enable real-time search results using WebSockets.


This README should provide a comprehensive overview of your project and guide others on how to set it up, run it, and contribute to it.
