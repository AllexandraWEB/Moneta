# Quick Start Guide - Moneta Supabase Integration

## ✅ What's Been Done

Your Moneta app now has full Supabase integration with:
- ✅ Database schema for workspaces, accounts, categories, and transactions
- ✅ Shared workspaces (2 users can share the same budget)
- ✅ Automatic account balance tracking
- ✅ Dynamic account cards on home screen
- ✅ Forms that save to Supabase
- ✅ Categories and accounts loaded from database

## 🚀 Setup Steps

### 1. Run Database Migration (5 minutes)

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Open the file `supabase-schema.sql` in your project root
4. Copy and paste the entire content into the SQL Editor
5. Click **Run** to execute

This creates all tables, security policies, and triggers.

### 2. Create Your Workspace & Seed Data (5 minutes)

Copy this SQL and replace `YOUR_EMAIL` with your actual email, then run it in SQL Editor:

```sql
-- 1. Get your user ID
SELECT id, email FROM auth.users WHERE email = 'YOUR_EMAIL';
-- Copy the id value

-- 2. Create workspace
INSERT INTO workspaces (name) VALUES ('My Family Budget') RETURNING id;
-- Copy the workspace id

-- 3. Add yourself as owner (replace with your actual IDs)
INSERT INTO workspace_members (workspace_id, user_id, role)
VALUES ('WORKSPACE_ID_HERE', 'USER_ID_HERE', 'owner');

-- 4. Create accounts
INSERT INTO accounts (workspace_id, name, type, balance, currency, icon) VALUES 
  ('WORKSPACE_ID_HERE', 'Main Bank Account', 'bank', 0, 'USD', '🏦'),
  ('WORKSPACE_ID_HERE', 'Credit Card', 'credit', 0, 'USD', '💳'),
  ('WORKSPACE_ID_HERE', 'Cash', 'cash', 0, 'USD', '💵');

-- 5. Create expense categories
INSERT INTO categories (workspace_id, name, type, icon) VALUES 
  ('WORKSPACE_ID_HERE', 'Food & Dining', 'expense', '🍔'),
  ('WORKSPACE_ID_HERE', 'Transportation', 'expense', '🚗'),
  ('WORKSPACE_ID_HERE', 'Shopping', 'expense', '🛍️'),
  ('WORKSPACE_ID_HERE', 'Entertainment', 'expense', '🎬'),
  ('WORKSPACE_ID_HERE', 'Bills & Utilities', 'expense', '📄');

-- 6. Create income categories
INSERT INTO categories (workspace_id, name, type, icon) VALUES 
  ('WORKSPACE_ID_HERE', 'Salary', 'income', '💰'),
  ('WORKSPACE_ID_HERE', 'Freelance', 'income', '💼'),
  ('WORKSPACE_ID_HERE', 'Gift', 'income', '🎁');
```

### 3. Test Your App (2 minutes)

1. **Login** to your app
2. You should see your accounts on the home screen as cards
3. Click **"Show Balance"** on a card to view the balance
4. Tap the **+ button** in the navigation
5. Enter an amount, select category and account
6. Click **Continue**
7. Check the account balance updates automatically!

### 4. Add Second User for Sharing (Optional)

If you want to share the workspace with another person:

```sql
-- 1. Have them register in your app first
-- 2. Get their user ID
SELECT id, email FROM auth.users WHERE email = 'SECOND_USER_EMAIL';

-- 3. Add them to your workspace
INSERT INTO workspace_members (workspace_id, user_id, role)
VALUES ('YOUR_WORKSPACE_ID', 'SECOND_USER_ID', 'member');
```

Now both users will see the same accounts and transactions!

## 📝 How to Use

### Adding an Expense
1. Tap the **+** button in navigation
2. Modal opens with "New Expense"
3. Enter amount using numeric keyboard
4. Type a note (optional)
5. Select category from dropdown
6. Select account from dropdown
7. Click Continue
8. ✅ Saved! Account balance decreases automatically

### Adding Income
1. Tap the **+** button
2. Click **"New Expense"** title to switch to "New Income"
3. Enter amount
4. Select income category
5. Select account
6. Click Continue
7. ✅ Saved! Account balance increases automatically

### Viewing Accounts
- Home screen shows all your accounts as cards
- Click "Show Balance" to reveal current balance
- Balances update in real-time as you add transactions

## 🔧 Key Files Created/Modified

### New Files
- `supabase-schema.sql` - Database schema
- `src/types/database.ts` - TypeScript types
- `src/app/actions/accounts.ts` - Account operations
- `src/app/actions/transactions.ts` - Transaction operations
- `src/app/actions/workspaces.ts` - Workspace management
- `src/app/actions/categories.ts` - Category operations
- `src/contexts/WorkspaceContext.tsx` - Workspace state
- `SUPABASE_SETUP.md` - Detailed setup guide
- `IMPLEMENTATION_SUMMARY.md` - Technical documentation

### Modified Files
- `src/app/(app)/_components/forms/expense-form/expense-form.tsx` - Now saves to Supabase
- `src/app/(app)/_components/forms/income-form/income-form.tsx` - Now saves to Supabase
- `src/app/(app)/[workspace]/_components/card/index.tsx` - Displays real account data
- `src/app/(app)/[workspace]/_components/home-section/index.tsx` - Fetches accounts from DB
- `src/app/(app)/layout.tsx` - Provides workspace context
- `src/components/navigation-wrapper/index.tsx` - Passes workspace ID to modal

## 💡 Features

✅ **Shared Workspaces** - Two users can share budgets
✅ **Multiple Accounts** - Bank, cash, credit cards
✅ **Auto Balance Updates** - Via database triggers
✅ **Categories** - Organize income and expenses
✅ **Security** - Row Level Security policies
✅ **Multi-Currency** - Each account can have different currency

## 🎯 Next Steps

You can now:
- Create more categories via Supabase
- Add more accounts
- Build transaction history view
- Add budget tracking
- Create reports and analytics
- Add account management UI

## 🐛 Troubleshooting

**"No workspace found"**
- Run the database migration
- Create a workspace and add yourself as member

**Empty dropdowns**
- Make sure you've created categories and accounts
- Check the workspace_id matches

**Balance not updating**
- Verify the database trigger was created
- Check RLS policies in Supabase

## 📚 More Info

See `SUPABASE_SETUP.md` for detailed setup instructions
See `IMPLEMENTATION_SUMMARY.md` for technical details

---

**You're all set! 🎉**
Your app now has a complete Supabase backend with shared workspace support!
