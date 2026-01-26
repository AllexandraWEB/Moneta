# Moneta - Supabase Integration Summary

## What Has Been Implemented

### 1. Database Schema (`supabase-schema.sql`)
- **workspaces**: For shared budgets between users
- **workspace_members**: Links users to workspaces (supports 2+ users sharing)
- **accounts**: Bank accounts, cash, credit cards with balances
- **categories**: Income and expense categories
- **transactions**: All income and expense records

**Key Features:**
- Automatic balance updates via database triggers
- Row Level Security (RLS) for data privacy
- Shared workspace support
- Multi-currency support

### 2. TypeScript Types (`src/types/database.ts`)
- Complete type definitions for all database tables
- Type-safe database operations

### 3. Server Actions

#### `src/app/actions/workspaces.ts`
- `createWorkspace()` - Create new workspace
- `getUserWorkspaces()` - Get user's workspaces
- `addWorkspaceMember()` - Add user to workspace
- `getWorkspaceMembers()` - List workspace members

#### `src/app/actions/accounts.ts`
- `getWorkspaceAccounts()` - Fetch all accounts
- `createAccount()` - Create new account
- `updateAccount()` - Update account details
- `deleteAccount()` - Delete account
- `getAccountBalance()` - Get current balance

#### `src/app/actions/transactions.ts`
- `createTransaction()` - Create income/expense
- `getWorkspaceTransactions()` - Fetch transactions
- `getAccountTransactions()` - Fetch by account
- `updateTransaction()` - Update transaction
- `deleteTransaction()` - Delete transaction

#### `src/app/actions/categories.ts`
- `getWorkspaceCategories()` - Fetch categories
- `createCategory()` - Create new category

### 4. Updated Components

#### Forms
- **expense-form.tsx**: Now saves to Supabase, fetches accounts/categories dynamically
- **income-form.tsx**: Same functionality for income transactions
- Both forms include validation and loading states

#### Home Screen
- **card/index.tsx**: Shows account name, type, and balance (toggle to view)
- **home-section/index.tsx**: Fetches and displays accounts from Supabase
- Dynamic rendering based on actual data

#### Context
- **WorkspaceContext**: Provides workspace ID throughout the app
- Used in navigation wrapper and forms

### 5. How It Works

#### Creating a Transaction
1. User opens expense/income modal
2. Form fetches accounts and categories for current workspace
3. User enters amount, selects category and account
4. On submit:
   - Transaction is saved to database
   - Account balance is automatically updated (via trigger)
   - Form closes and data refreshes

#### Viewing Accounts
1. Home screen loads
2. Fetches all accounts for current workspace
3. Displays as cards with:
   - Account name and type
   - Click to show/hide balance
   - Currency formatting

#### Workspace Sharing
- Two users can be added to same workspace
- Both see all transactions and accounts
- Changes by one user are visible to the other
- RLS policies ensure users only see their workspace data

## Next Steps

### 1. Run the Database Migration
Open Supabase SQL Editor and run `supabase-schema.sql`

### 2. Seed Initial Data
Follow `SUPABASE_SETUP.md` to:
- Create your first workspace
- Add accounts (Aleksandra DSK, Revolut, Cash, etc.)
- Add categories for income and expenses
- Optionally add a second user to the workspace

### 3. Test the App
1. Login to your app
2. You should see your accounts on the home screen
3. Click "Show Balance" to view account balances
4. Tap the + button to add a transaction
5. Select category and account from dropdowns
6. Enter amount and note
7. Click Continue to save
8. Account balance will update automatically

### 4. Add Second User (Optional)
1. Have the second user register
2. In Supabase, add their user_id to workspace_members
3. They'll now see the same workspace data

## File Structure
```
src/
├── app/
│   ├── actions/
│   │   ├── accounts.ts         # Account CRUD
│   │   ├── categories.ts       # Category operations
│   │   ├── transactions.ts     # Transaction CRUD
│   │   └── workspaces.ts       # Workspace management
│   └── (app)/
│       ├── layout.tsx           # Provides workspace context
│       └── _components/
│           └── forms/
│               ├── expense-form/
│               └── income-form/
├── contexts/
│   └── WorkspaceContext.tsx    # Workspace state management
├── types/
│   └── database.ts             # Supabase type definitions
└── components/
    └── navigation-wrapper/      # Updated to pass workspace ID

supabase-schema.sql              # Database migration
SUPABASE_SETUP.md               # Detailed setup guide
```

## Important Notes

1. **Balance Updates**: Account balances update automatically when transactions are created/updated/deleted via database triggers

2. **RLS Security**: Users can only access data from workspaces they're members of

3. **Workspace Context**: The workspace ID is provided via React Context and available throughout the app

4. **Error Handling**: Forms show alerts for errors, but you may want to add toast notifications

5. **Currency**: Currently defaults to USD, but accounts support different currencies

## Common Issues

### "No workspace found"
- Run the database migration first
- Create a workspace and add yourself as a member

### Categories/Accounts not showing in dropdowns
- Make sure you've seeded categories and accounts in Supabase
- Check the workspace_id matches

### Balance not updating
- Check that the database trigger is created
- Verify RLS policies allow the operation

## Future Enhancements

- Workspace creation UI
- Category management UI
- Account creation UI
- Transaction history view
- Budget tracking
- Reports and analytics
- Multi-workspace support
- Invitation system for adding users
