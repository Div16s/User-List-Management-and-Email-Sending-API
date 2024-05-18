# User List Management and Email Sending API

This is a Node.js backend application designed to manage a list of users with customizable properties and send emails to the users. It includes functionalities for list creation, user addition via CSV upload, and sending personalized emails with placeholders.

## Features

1. **List Creation**: Admin can create a list with a title and custom properties.
2. **User Addition**: Admin can add users to the list via CSV upload. The application handles CSVs with 10,000+ records efficiently using `fast-csv`.
3. **CSV Format**: The CSV's first row will have header values. 'name' and 'email' are required fields for a user, and 'email' should be unique. Custom properties can be set for a user by defining headers matching the custom properties title in the CSV.
4. **Unique Emails**: Ensures no two users with the same email are present in a list.
5. **Error Handling**: If some users are not added due to errors, returns the CSV with the list and the error.
6. **Email Sending**: Admin can send an email to the complete list, including custom properties as placeholders in the email body. The email will also contain an unsubscribe link.
7. **Unsubscribe Feature**: Allows users to unsubscribe from the list by clicking a link in the email.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Nodemailer
- fast-csv

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Div16s/User-List-Management-and-Email-Sending-API.git
    cd User-List-Management-and-Email-Sending-API
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    EMAIL=your_email_address
    PASSWORD=your_email_password
    ```

4. Start the application:
    ```bash
    npm start
    ```

## API Endpoints

### 1. Create List
- **Endpoint**: `POST /api/create-list`
- **Description**: Creates a new list with a title and custom properties.
- **Request Body**:
    ```json
    {
        "title": "Tech Subscribers",
        "customProperties": [
            { "title": "city", "fallbackValue": "Unknown" }
        ]
    }
    ```
- **Response**:
    ```json
    {
        "_id": "list_id",
        "title": "Tech Subscribers",
        "customProperties": [
            { "title": "city", "fallbackValue": "Unknown" }
        ]
    }
    ```

### 2. Add Users via CSV Upload
- **Endpoint**: `POST /api/:listId/add-users`
- **Description**: Adds users to the list via CSV upload.
- **Request**: Upload CSV file as form-data.
- **Response**:
    ```json
    {
        "success": 95,
        "failed": 5,
        "errors": [
            { "row": { "name": "John Doe" }, "error": "Duplicate email" }
        ],
        "total": 100
    }
    ```

### 3. Send Email
- **Endpoint**: `POST /api/:listId/send-emails`
- **Description**: Sends an email to all users in the list.
- **Response**:
    ```json
    {
        "status": "Emails sent successfully"
    }
    ```

### 4. Unsubscribe
- **Endpoint**: `GET /api/unsubscribe/:userId`
- **Description**: Unsubscribes the user from the list.
- **Response**:
    ```json
    {
        "status": "User unsubscribed successfully"
    }
    ```

## Postman Collection

A Postman collection is included in the repository. Import the `User List Management and Email Sending API.postman_collection` file into Postman to test the API endpoints. Set up an environment in Postman with the following variables:

- `baseUrl`: The base URL of your deployed application.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact

For any inquiries, please contact [divyankarshah1602@gmail.com].
