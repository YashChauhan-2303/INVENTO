# INVENTO - Inventory Management System

INVENTO is a comprehensive inventory management system designed to help businesses track, manage, and optimize their inventory. This modern web application features a sleek, responsive user interface with powerful functionality to streamline inventory operations.

![INVENTO Screenshot](public/assets/screenshot.png)

## Features

- **User Authentication**: Secure login and registration with Google OAuth support
- **Dashboard**: Visual overview of inventory statistics and key performance indicators
- **Inventory Management**: Add, edit, and delete inventory items with detailed information
- **Activity History**: Track and review all system activities with filtering options
- **Reports & Analytics**: Generate and view detailed reports with interactive charts
- **Advanced Search**: Find items across inventory, transactions, and activities
- **Settings**: Customize application preferences including dark mode and language

## UI Redesign

The application underwent a comprehensive UI redesign inspired by premium e-commerce platforms like [Boosted USA](https://boostedusa.com/). The redesign focused on:

### Design Improvements
- **Modern Aesthetics**: Clean, minimalist design with premium visuals
- **Consistent Branding**: Applied INVENTO color scheme throughout the application
- **Enhanced Readability**: Improved typography and spacing for better content consumption
- **Card-Based Layout**: Premium card design with subtle shadows and hover effects
- **Gradient Accents**: Subtle gradient elements to add visual interest

### UX Enhancements
- **Fixed Sidebar**: Resolved overlap issues with a properly positioned fixed sidebar
- **Responsive Design**: Fully responsive layout that works across all device sizes
- **Mobile-Optimized Navigation**: Custom mobile experience with slide-out sidebar
- **Micro-Interactions**: Small animations and transitions to enhance user feedback
- **Improved Navigation**: Intuitive navigation with clear visual hierarchy

### Animation & Effects
- **Fade-In Animations**: Smooth fade-in transitions for content elements
- **Slide Animations**: Subtle slide effects for UI elements
- **Hover Effects**: Interactive elements respond to hover with subtle transitions
- **Loading States**: Improved loading indicators and transitions between states

### Code Improvements
- **Organized CSS**: Added component-specific styles and utility classes
- **Animation Library**: Custom animation utilities for consistent motion design
- **Reusable Components**: Enhanced styling of reusable UI components
- **Accessibility**: Improved color contrast and interactive element states

## Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- React Router for navigation
- React Query for state management

### Backend
- Supabase for database, authentication and storage
- Row-Level Security (RLS) for data protection
- PostgreSQL database with PL/pgSQL triggers and functions

## Database Structure

### Tables
1. **profiles**
   - User profile information
   - Connected to auth.users via Row-Level Security

2. **inventory_items**
   - Core inventory data including product details, stock levels, and location
   - Linked to individual users via user_id

3. **activity_logs**
   - System activity tracking (inventory changes, user logins, etc.)
   - Connected to users and inventory items

4. **transactions**
   - Inbound/outbound inventory movements
   - Linked to inventory items and users

5. **warning**
   - High stock warning system for quantities above 1000
   - Generated via database trigger

### Security
- Row-Level Security (RLS) policies ensure users can only access their own data
- Database triggers for automatic activity logging and warnings
- User authentication with email/password and Google OAuth

## Getting Started

### Prerequisites
- Node.js and npm installed
- Supabase account (for database and authentication)

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd invento
```

2. Install dependencies:
```sh
npm install
```

3. Configure Supabase:
   - Create a new Supabase project
   - Run the database migrations in the `supabase/migrations` folder
   - Update the Supabase URL and anon key in the configuration

4. Start the development server:
```sh
npm run dev
```

## Usage

### Dashboard

The dashboard provides a comprehensive overview of your inventory system, featuring:
- Total inventory count with trend indicators
- Monthly orders with performance metrics
- Low stock alerts with visual indicators
- Inventory trends chart with historical data
- Recent activity feed with real-time updates
- Category breakdown chart for stock distribution

### Inventory Management

The inventory page allows you to:
- View all inventory items in a sortable table
- Add new inventory items through an intuitive form
- Edit existing items with inline validation
- Delete items with confirmation dialog
- Filter by category and location
- Search by name or SKU

### Reports & Analytics

Generate and view detailed reports:
- Sales overview with revenue, expenses, and profit data
- Inventory levels by category with optimal stock comparison
- Recent trends with performance against targets
- Export reports in various formats

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UI components from shadcn/ui
- Icons from Lucide React
- Design inspiration from [Boosted USA](https://boostedusa.com/)
