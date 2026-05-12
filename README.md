# 🛒 Go-Local

**Go-Local** is a local food management system where customers can browse and purchase locally sourced products listed by an admin. It bridges the gap between local food producers and everyday consumers through a simple, easy-to-use platform.

Live demo: [go-local-five.vercel.app](https://go-local-five.vercel.app)

---

## 🌟 Features

### 👤 Customer
- Browse locally sourced food products
- View product details with images
- Add to cart and place orders
- Real-time order status updates

### 🔐 Admin
- Secure admin dashboard
- Add, update, and remove products
- Upload product images
- Manage and monitor customer orders

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (client/) |
| Backend | Node.js / Express (server/) |
| Database | MongoDB |
| Real-time | Socket.IO |
| File Uploads | Multer |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/Sundarkhanal/Go-Local.git
cd Go-Local
```

#### Start the server

```bash
cd server
npm install
npm start
```

#### Start the client

```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

## 📁 Project Structure

```
Go-Local/
├── client/          # React frontend
├── server/          # Node.js backend
├── .gitignore
└── jsonconfig.json
```

---

## 👥 Roles

| Role | Access |
|------|--------|
| Customer | Browse products, place and track orders |
| Admin | Manage products and orders via dashboard |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

