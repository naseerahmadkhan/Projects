Here is a list of all the endpoints for the **UserAuth Service**, along with the required headers and body for testing using **Thunder Client** (or any other API testing tool):

---

### 1. **User Registration**

* **Endpoint**: `POST /api/v1/auth/register`
* **Description**: Registers a new user.
* **Headers**:

  * `Content-Type`: `application/json`
* **Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "passwordConfirmation": "password123",
    "name": "John Doe"
  }
  ```

---

### 2. **User Login**

* **Endpoint**: `POST /api/v1/auth/login`
* **Description**: Logs in a user and generates a JWT token.
* **Headers**:

  * `Content-Type`: `application/json`
* **Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

---

### 3. **User Logout**

* **Endpoint**: `POST /api/v1/auth/logout`
* **Description**: Logs out the user (removes the session).
* **Headers**:

  * `Content-Type`: `application/json`
  * `Authorization`: `Bearer <JWT_TOKEN>`  *(JWT token required for authentication)*
* **Body**:
  None

---

### 4. **Get User Profile**

* **Endpoint**: `GET /api/v1/auth/me`
* **Description**: Retrieves the authenticated user's profile.
* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>`  *(JWT token required for authentication)*
* **Body**:
  None

---

### 5. **Verify JWT Token**

* **Endpoint**: `POST /api/v1/auth/verify-token`
* **Description**: Verifies the provided JWT token and checks if it's valid.
* **Headers**:

  * `Content-Type`: `application/json`
* **Body**:

  ```json
  {
    "token": "<JWT_TOKEN>"
  }
  ```

---

### 6. **Request Password Reset**

* **Endpoint**: `POST /api/v1/password/reset-request`
* **Description**: Initiates the password reset process (by sending an email).
* **Headers**:

  * `Content-Type`: `application/json`
* **Body**:

  ```json
  {
    "email": "user@example.com"
  }
  ```

---

### 7. **Reset Password**

* **Endpoint**: `POST /api/v1/password/reset`
* **Description**: Resets the password using a token (sent via email).
* **Headers**:

  * `Content-Type`: `application/json`
* **Body**:

  ```json
  {
    "token": "<RESET_TOKEN>",
    "newPassword": "newpassword123",
    "confirmPassword": "newpassword123"
  }
  ```

---

### 8. **Get All Users** *(Admin only)*

* **Endpoint**: `GET /api/v1/users`
* **Description**: Retrieves a list of all users (accessible by admin only).
* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>` *(JWT token required, admin role required)*
* **Body**:
  None

---

### 9. **Get User By ID** *(Admin only)*

* **Endpoint**: `GET /api/v1/users/:id`
* **Description**: Retrieves a user by their ID.
* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>` *(JWT token required, admin role required)*
* **Body**:
  None

---

### 10. **Update User Profile**

* **Endpoint**: `PUT /api/v1/users/:id`
* **Description**: Updates the profile of a user.
* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>` *(JWT token required)*
* **Body**:

  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com"
  }
  ```

---

### 11. **Invalidate User Session** *(Admin only)*

* **Endpoint**: `POST /api/v1/sessions/invalidate`
* **Description**: Invalidates a user's session (admin only).
* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>` *(JWT token required, admin role required)*
* **Body**:

  ```json
  {
    "userId": "<USER_ID>"
  }
  ```

---

### Example of Headers for Testing in Thunder Client:

* For most requests, you'll need to set the `Authorization` header with the JWT token:

  * **Authorization**: `Bearer <JWT_TOKEN>`
  * **Content-Type**: `application/json`

---

### Example Test Requests in Thunder Client:

#### 1. **User Registration**:

* **Method**: `POST`
* **URL**: `http://localhost:5000/api/v1/auth/register`
* **Body** (raw JSON):

  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "passwordConfirmation": "password123",
    "name": "John Doe"
  }
  ```

#### 2. **User Login**:

* **Method**: `POST`
* **URL**: `http://localhost:5000/api/v1/auth/login`
* **Body** (raw JSON):

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### 3. **Verify JWT Token**:

* **Method**: `POST`
* **URL**: `http://localhost:5000/api/v1/auth/verify-token`
* **Body** (raw JSON):

  ```json
  {
    "token": "<JWT_TOKEN>"
  }
  ```

---

### Testing with Thunder Client

* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>` for requests that require authentication.
  * `Content-Type`: `application/json` for requests with a body.

* **Body**:

  * Use raw JSON in the body for all POST/PUT requests that accept a JSON payload.

---

With this setup, you'll be able to test all the endpoints for **User Authentication Service** in **Thunder Client** or any other similar API testing tool. Make sure to replace placeholders like `<JWT_TOKEN>` with actual tokens obtained during the login process.
