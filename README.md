# uber-clone-mern
This is a uber-clone build using MERN stack

## User API Endpoints

### 1. Register User
- **Endpoint:** `POST /api/user/register`
- **Description:** Registers a new user with email, password, and full name.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
  ```
- **Response:**
  - `201 Created` on success
  - Returns the created user object and JWT token
  ```json
  {
    "user": {
      "_id": "...",
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "user@example.com",
      ...
    },
    "token": "<jwt-token>"
  }
  ```
- **Validation Errors:**
  - Invalid email, short password, or missing first name will return `400` with error details.

---

### 2. Login User
- **Endpoint:** `POST /api/user/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - `200 OK` on success
  - Returns user object, JWT token, and message
  ```json
  {
    "user": { ... },
    "token": "<jwt-token>",
    "message": "Login successful"
  }
  ```
- **Validation Errors:**
  - Invalid credentials or missing fields will return `400` with error details.

---

### 3. Get User Profile
- **Endpoint:** `GET /api/user/profile`
- **Description:** Returns the authenticated user's profile.
- **Headers:**
  - `Authorization: Bearer <jwt-token>` or cookie `token=<jwt-token>`
- **Response:**
  - `200 OK` with user profile object
  ```json
  {
    "_id": "...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "user@example.com",
    ...
  }
  ```
- **Errors:**
  - `401 Unauthorized` if token is missing, invalid, or blacklisted.

---

### 4. Logout User
- **Endpoint:** `POST /api/user/logout`
- **Description:** Logs out the user by blacklisting the JWT token.
- **Headers:**
  - `Authorization: Bearer <jwt-token>` or cookie `token=<jwt-token>`
- **Response:**
  - `200 OK` with message and expired token
  ```json
  {
    "message": "Logout successful",
    "expiredToken": "<jwt-token>"
  }
  ```
- **Errors:**
  - `401 Unauthorized` if token is missing, invalid, or already blacklisted.

---

## Captain API Endpoints

### 1. Register Captain
- **Endpoint:** `POST /api/captain/register`
- **Description:** Registers a new captain with email, password, full name, and vehicle details.
- **Request Body:**
  ```json
  {
    "email": "captain@example.com",
    "password": "password123",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "vehicle": {
      "plate": "XYZ123",
      "vehicleType": "car",
      "color": "Red",
      "capacity": 4
    }
  }
  ```
- **Response:**
  - `201 Created` on success
  - Returns the created captain object and JWT token
  ```json
  {
    "captain": {
      "_id": "...",
      "fullname": { "firstname": "Jane", "lastname": "Smith" },
      "email": "captain@example.com",
      "vehicle": {
        "plate": "XYZ123",
        "vehicleType": "car",
        "color": "Red",
        "capacity": 4
      },
      ...
    },
    "token": "<jwt-token>"
  }
  ```
- **Validation Errors:**
  - Invalid email, short password, missing fields, or invalid vehicle details will return `400` or `401` with error details.

---

### 2. Login Captain
- **Endpoint:** `POST /api/captain/login`
- **Description:** Authenticates a captain and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "captain@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - `200 OK` on success
  - Returns captain object and JWT token
  ```json
  {
    "captain": { ... },
    "token": "<jwt-token>"
  }
  ```
- **Validation Errors:**
  - Invalid credentials or missing fields will return `400` with error details.

---

### 3. Get Captain Profile
- **Endpoint:** `GET /api/captain/profile`
- **Description:** Returns the authenticated captain's profile.
- **Headers:**
  - `Authorization: Bearer <jwt-token>` or cookie `token=<jwt-token>`
- **Response:**
  - `200 OK` with captain profile object
  ```json
  {
    "_id": "...",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "captain@example.com",
    "vehicle": {
      "plate": "XYZ123",
      "vehicleType": "car",
      "color": "Red",
      "capacity": 4
    },
    ...
  }
  ```
- **Errors:**
  - `401 Unauthorized` if token is missing, invalid, or blacklisted.

---

### 4. Logout Captain
- **Endpoint:** `POST /api/captain/logout`
- **Description:** Logs out the captain by blacklisting the JWT token.
- **Headers:**
  - `Authorization: Bearer <jwt-token>` or cookie `token=<jwt-token>`
- **Response:**
  - `200 OK` with message
  ```json
  {
    "message": "Logout successful"
  }
  ```
- **Errors:**
  - `401 Unauthorized` if token is missing, invalid, or already blacklisted.

---

**Note:** All endpoints are prefixed with `/users` for user APIs and `/captains` for captain APIs (adjust if your route prefix differs in your main app).
