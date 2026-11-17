# Todo List REST API

REST API sederhana untuk aplikasi Todo List menggunakan Node.js dan Express.
Data disimpan sementara di memory (hilang saat server restart).

## Cara Menjalankan

```bash
npm install
npm start
```

Server jalan di `http://localhost:3000`.

## Endpoint

| Method | Endpoint   | Deskripsi        | Status sukses |
| ------ | ---------- | ---------------- | ------------- |
| GET    | /todos     | Ambil semua todo | 200           |
| GET    | /todos/:id | Ambil satu todo  | 200           |
| POST   | /todos     | Tambah todo baru | 201           |
| PUT    | /todos/:id | Ubah todo        | 200           |
| DELETE | /todos/:id | Hapus todo       | 204           |

## Status Error

| Status | Kapan terjadi                                      |
| ------ | -------------------------------------------------- |
| 400    | Input tidak valid, id bukan angka, atau JSON rusak |
| 404    | Todo atau route tidak ditemukan                    |
| 500    | Error tak terduga di server                        |

## Contoh Request

### POST /todos

```json
{ "title": "Belajar Express" }
```

Response `201`:

```json
{ "id": 4, "title": "Belajar Express", "completed": false }
```

### PUT /todos/:id

Kirim `title` dan/atau `completed`:

```json
{ "title": "Belajar Express sampai paham", "completed": true }
```

Response `200`:

```json
{ "id": 1, "title": "Belajar Express sampai paham", "completed": true }
```

### DELETE /todos/:id

Response `204` tanpa body.
