# Notes App Backend API

## Introduction

RESTful API sederhana untuk aplikasi pencatatan (Notes App). Backend ini memungkinkan pengguna membuat, membaca, memperbarui, dan menghapus catatan.

## Technology

- Programming Language: Typescript
- Runtime: pnpm
- Framework: Hapi.js
- Linter: ESLint

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/AnamSadat/notes-app-backend-api.git
cd note-app-backend-api
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run ESLint

```bash
pnpm run lint

# Use fix
pnpm run lint:fix
```

### 3. Development Server

```bash
# development
pnpm run dev

# production
pnpm run start
```

## Structure Project

```plaintext
notes-api-backend-api/
├── src/
│   ├── data/
│   │   └── notes.ts/
│   ├── handler/
│   │   └── handler.ts/
│   ├── routes/
│   │   └── routes.ts/
│   ├── type/
│   │   └── type.ts/
│   └── server.ts/
├── .gitignore
├── eslint.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

## API Endpoint

### 1. Create Note

- Method: `POST`
- Path: `/note`
- Description: Endpoint for create note
- Request Body:

  ```json
  {
    "title": "Note Title",
    "tags": ["Tag 1", "Tag 2"],
    "body": "Note Content"
  }
  ```

- Response Body:

  - `201 (created)`

    ```json
    {
      "status": "success",
      "message": "Note has been successfully added",
      "data": {
        "noteId": "V09YExygSUYogwWJ"
      }
    }
    ```

  - `500 (internal server error)`

    ```json
    {
      "status": "error",
      "message": "Note failed to added"
    }
    ```

### 2. View Notes

- Method: `GET`,
- Path: `/note`
- Description: Retrieves and displays a list of all available notes stored in the system.
- Response Body:

  - `200 (ok)`

    ```json
    {
      "status": "success",
      "data": {
        "notes": [
          {
            "id": "notes-V1StGXR8_Z5jdHi6B-myT",
            "title": "Catatan 1",
            "createdAt": "2020-12-23T23:00:09.686Z",
            "updatedAt": "2020-12-23T23:00:09.686Z",
            "tags": ["Tag 1", "Tag 2"],
            "body": "Isi dari catatan 1"
          },
          {
            "id": "notes-V1StGXR8_98apmLk3mm1",
            "title": "Catatan 2",
            "createdAt": "2020-12-23T23:00:09.686Z",
            "updatedAt": "2020-12-23T23:00:09.686Z",
            "tags": ["Tag 1", "Tag 2"],
            "body": "Isi dari catatan 2"
          }
        ]
      }
    }
    ```

  - if notes empty

    ```json
    {
      "status": "success",
      "data": {
        "notes": []
      }
    }
    ```

### 3. View Detail Note

- Method: `GET`
- Path: `/notes/{id}`
- Description: Click to view the full content of this note.
- Response Body:

  - `200 (ok)`

    ```json
    {
      "status": "success",
      "data": {
        "note": {
          "id": "notes-V1StGXR8_Z5jdHi6B-myT",
          "title": "Catatan 1",
          "createdAt": "2020-12-23T23:00:09.686Z",
          "updatedAt": "2020-12-23T23:00:09.686Z",
          "tags": ["Tag 1", "Tag 2"],
          "body": "Isi dari catatan 1"
        }
      }
    }
    ```

  - `404 (not found)`

    ```json
    {
      "status": "fail",
      "message": "Catatan tidak ditemukan"
    }
    ```

### 4. Update Note

- Method: `PUT`
- Path: `/notes/{id}`
- Description: Edit and update this note's content.
- Request Body:

  ```json
  {
    "title": "Judul Catatan Revisi",
    "tags": ["Tag 1", "Tag 2"],
    "body": "Konten catatan"
  }
  ```

- Response Body:

  - `200 (ok)`

    ```json
    {
      "status": "success",
      "message": "Catatan berhasil diperbaharui"
    }
    ```

  - `404 (not found)`

    ```json
    {
      "status": "fail",
      "message": "Gagal memperbarui catatan. Id catatan tidak ditemukan"
    }
    ```

### 5. Delete Note

- Method: `DELETE`
- Path: `/notes/{id}`
- Description: Permanently remove this note.
- Response Body:

  - `200 (ok)`

    ```json
    {
      "status": "success",
      "message": "Catatan berhasil dihapus"
    }
    ```

  - `404 (not found)`

    ```json
    {
      "status": "fail",
      "message": "Catatan gagal dihapus. Id catatan tidak ditemukan"
    }
    ```
