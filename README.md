## Backend API Documentation

### Base URL

```
http://localhost:<PORT>/
```

---

## User API Endpoints

### 1. Register User
- **Endpoint:** `POST /users/register`
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
  - `201 Created`
  ```json
  {
    "user": { ... },
    "token": "<jwt-token>"
  }
  ```

### 2. Login User
- **Endpoint:** `POST /users/login`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - `200 OK`
  ```json
  {
    "user": { ... },
    "token": "<jwt-token>",
    "message": "Login successful"
  }
  ```

### 3. Get User Profile
- **Endpoint:** `GET /users/profile`
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK`
  ```json
  {
    "_id": "...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "user@example.com",
    ...
  }
  ```

### 4. Logout User
- **Endpoint:** `POST /users/logout`
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK`
  ```json
  {
    "message": "Logout successful",
    "expiredToken": "<jwt-token>"
  }
  ```

---

## Captain API Endpoints

### 1. Register Captain
- **Endpoint:** `POST /captains/register`
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
  - `201 Created`
  ```json
  {
    "captain": { ... },
    "token": "<jwt-token>"
  }
  ```

### 2. Login Captain
- **Endpoint:** `POST /captains/login`
- **Request Body:**
  ```json
  {
    "email": "captain@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - `200 OK`
  ```json
  {
    "captain": { ... },
    "token": "<jwt-token>"
  }
  ```

### 3. Get Captain Profile
- **Endpoint:** `GET /captains/profile`
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK`
  ```json
  {
    "_id": "...",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "captain@example.com",
    "vehicle": { ... }
  }
  ```

### 4. Logout Captain
- **Endpoint:** `POST /captains/logout`
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK`
  ```json
  {
    "message": "Logout successful"
  }
  ```

---

## Ride API Endpoints

### 1. Get Fares
- **Endpoint:** `GET /ride/get-fares`
- **Query Params:** `pickup`, `destination`
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK`
  ```json
  {
    "moto": 25,
    "auto": 40,
    "car": 80
  }
  ```

### 2. Create Ride
- **Endpoint:** `POST /ride/create-ride`
- **Request Body:**
  ```json
  {
    "pickup": "Location A",
    "destination": "Location B",
    "vehicleType": "car"
  }
  ```
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `201 Created`
  ```json
  {
    "ride": { ... }
  }
  ```

### 3. Confirm Ride (Captain)
- **Endpoint:** `POST /ride/confirm-ride`
- **Request Body:**
  ```json
  {
    "rideId": "<ride-id>",
    "captainId": "<captain-id>"
  }
  ```
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK`
  ```json
  {
    "ride": { ... }
  }
  ```

### 4. Start Ride (Captain)
- **Endpoint:** `POST /ride/start-ride`
- **Request Body:**
  ```json
  {
    "rideId": "<ride-id>",
    "otp": "123456"
  }
  ```
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK`
  ```json
  {
    "ride": { ... }
  }
  ```

### 5. End Ride (Captain)
- **Endpoint:** `POST /ride/end-ride`
- **Request Body:**
  ```json
  {
    "rideId": "<ride-id>"
  }
  ```
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK`
  ```json
  {
    "ride": { ... }
  }
  ```

---

## Map API Endpoints

### 1. Get Coordinates
- **Endpoint:** `GET /map/get-coordinates`
- **Query Params:** `address`
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK`
  ```json
  {
    "lat": 12.9716,
    "lng": 77.5946
  }
  ```

### 2. Get Distance & Time
- **Endpoint:** `GET /map/get-distance-time`
- **Query Params:** `origin`, `destination`
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK`
  ```json
  {
    "distance": { "text": "5 km", "value": 5000 },
    "duration": { "text": "15 mins", "value": 900 }
  }
  ```

### 3. Get Suggestions
- **Endpoint:** `GET /map/get-suggestions`
- **Query Params:** `location`
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Response:**
  - `200 OK`
  ```json
  [
    "Location A",
    "Location B",
    ...
  ]
  ```

---

## Payment API Endpoints

### 1. Create Checkout Session
- **Endpoint:** `POST /payment/create-checkout-session`
- **Request Body:**
  ```json
  {
    "amount": 100
  }
  ```
- **Response:**
  - `200 OK`
  ```json
  {
    "id": "<stripe-session-id>",
    "url": "<stripe-checkout-url>"
  }
  ```

---

**Note:** All endpoints require proper authentication via JWT token in the `Authorization` header or cookie unless specified otherwise.