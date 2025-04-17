# INVENTO - Inventory Management System

INVENTO is a modern, full-stack inventory management system designed to help businesses efficiently track, manage, and optimize their inventory operations. Built with a robust tech stack, it offers a seamless and intuitive experience for users.

## 🚀 Features

- **User Authentication**: Secure login and registration with Google OAuth support.
- **Dashboard Overview**: Real-time insights into inventory levels and key metrics.
- **Product Management**: Add, update, and categorize products with ease.
- **Inventory Tracking**: Monitor stock levels, movements, and history.
- **Responsive Design**: Accessible across devices for on-the-go management.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth)
- **Build Tools**: Vite, Bun
- **Deployment**: Vercel

## 📦 Getting Started

### Prerequisites

- Node.js and Bun installed
- Supabase project set up with necessary tables and authentication

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YashChauhan-2303/INVENTO.git
   cd INVENTO
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Configure environment variables:

   Create a `.env` file and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   bun dev
   ```

## 🌐 Live Demo

Experience INVENTO live: [invento-yash.vercel.app](https://invento-yash.vercel.app)

## 📁 Project Structure

- `src/`: Main application source code
- `public/`: Static assets
- `supabase/`: Supabase configuration and SQL scripts
- `components.json`: UI component definitions
- `tailwind.config.ts`: Tailwind CSS configuration

## 🧑‍💻 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
