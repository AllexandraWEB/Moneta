# Moneta - Personal Finance Tracker

A modern, shared-workspace personal finance application built with Next.js and Supabase.

## ✨ Features

- 💰 **Shared Workspaces** - Share budgets with family members (up to 2+ users)
- 🏦 **Multiple Accounts** - Track bank accounts, cash, and credit cards
- 📊 **Smart Categorization** - Organize income and expenses
- ⚡ **Real-time Balance Updates** - Automatic balance tracking with database triggers
- 🎨 **Dark/Light Mode** - Beautiful UI with theme support
- 🔐 **Secure** - Row-level security with Supabase
- 💱 **Multi-currency** - Support for different currencies per account

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A Supabase account
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Moneta
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

4. **Setup Supabase**
- Open `supabase-schema.sql` in your Supabase SQL Editor
- Run the entire script to create tables and policies
- Follow `seed-data.sql` to add your initial data

5. **Run the development server**
```bash
npm run dev
```

6. **Open your app**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get up and running in 15 minutes
- **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** - Detailed Supabase configuration
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical documentation

## 🗂️ Database Schema

### Tables
- `workspaces` - Shared budget spaces
- `workspace_members` - User-workspace relationships
- `accounts` - Bank accounts, cash, credit cards
- `categories` - Income and expense categories
- `transactions` - All financial transactions

### Key Features
- Automatic balance updates via triggers
- Row Level Security (RLS) for data privacy
- Workspace sharing support
- Multi-currency support

## 🎯 Usage

### Adding an Expense
1. Tap the **+** button in navigation
2. Enter amount using the numeric keyboard
3. Add a note (optional)
4. Select category and account
5. Click Continue

### Adding Income
1. Tap the **+** button
2. Click the title to switch to "New Income"
3. Enter amount and details
4. Click Continue

### Viewing Accounts
- Accounts appear as cards on the home screen
- Click "Show Balance" to reveal the current balance
- Balances update automatically with transactions

### Sharing with Another User
1. Have the second user register
2. In Supabase, add their user_id to `workspace_members`
3. Both users now see the same data!

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Language**: TypeScript

## 📁 Project Structure

```
Moneta/
├── src/
│   ├── app/
│   │   ├── (app)/              # Protected routes
│   │   │   ├── _components/    # App-specific components
│   │   │   │   └── forms/      # Transaction forms
│   │   │   └── [workspace]/    # Workspace pages
│   │   ├── actions/            # Server actions
│   │   │   ├── accounts.ts
│   │   │   ├── categories.ts
│   │   │   ├── transactions.ts
│   │   │   └── workspaces.ts
│   │   └── auth/               # Authentication pages
│   ├── components/             # Reusable components
│   │   ├── ui/                 # UI primitives
│   │   └── navigation/         # Navigation components
│   ├── contexts/               # React contexts
│   ├── lib/                    # Utilities
│   │   └── supabase/          # Supabase clients
│   └── types/                  # TypeScript types
├── supabase-schema.sql         # Database schema
├── seed-data.sql               # Seed data script
└── public/                     # Static assets
```

## 🔧 Development

### Server Actions
All database operations use Next.js server actions for security and performance:
- `src/app/actions/accounts.ts` - Account CRUD
- `src/app/actions/transactions.ts` - Transaction CRUD
- `src/app/actions/workspaces.ts` - Workspace management
- `src/app/actions/categories.ts` - Category operations

### State Management
- **Workspace Context** - Provides current workspace ID throughout the app
- **React State** - For component-level state
- **Supabase Realtime** - (Future enhancement for live updates)

## 🚧 Roadmap

- [ ] Transaction history view
- [ ] Budget tracking and alerts
- [ ] Reports and analytics
- [ ] Export to CSV/PDF
- [ ] Recurring transactions
- [ ] Multi-workspace support
- [ ] Mobile app (React Native)
- [ ] Realtime sync between users

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database by [Supabase](https://supabase.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For issues and questions:
1. Check the documentation files (QUICK_START.md, SUPABASE_SETUP.md)
2. Review the implementation summary
3. Open an issue on GitHub

---

**Happy Budgeting! 💰**
