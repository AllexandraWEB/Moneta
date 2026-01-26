# Supabase Setup Guide for Moneta

## Step 1: Run the Database Migration

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `supabase-schema.sql` from the root of this project
4. Paste and execute it in the SQL Editor

This will create all the necessary tables, indexes, RLS policies, and triggers.

## Step 2: Create Initial Workspace and Seed Data

After running the migration, you can create your initial workspace and add some seed data:

```sql
-- Get your user ID (replace with your actual email)
SELECT id FROM auth.users WHERE email = 'your-email@example.com';

-- Create a workspace
INSERT INTO workspaces (name) VALUES ('Personal Finances');

-- Get the workspace ID
SELECT id FROM workspaces WHERE name = 'Personal Finances';

-- Add yourself as owner (replace USER_ID and WORKSPACE_ID with actual IDs)
INSERT INTO workspace_members (workspace_id, user_id, role)
VALUES ('WORKSPACE_ID', 'USER_ID', 'owner');

-- Create some accounts
INSERT INTO accounts (workspace_id, name, type, balance, currency, icon)
VALUES 
  ('WORKSPACE_ID', 'Aleksandra DSK', 'bank', 0, 'USD', '🏦'),
  ('WORKSPACE_ID', 'Aleksandra Revolut', 'bank', 0, 'USD', '💳'),
  ('WORKSPACE_ID', 'Aleksandra Cash', 'cash', 0, 'USD', '💵'),
  ('WORKSPACE_ID', 'Stoyan Unicredit', 'bank', 0, 'USD', '🏦'),
  ('WORKSPACE_ID', 'Stoyan Revolut', 'bank', 0, 'USD', '💳'),
  ('WORKSPACE_ID', 'Stoyan Cash', 'cash', 0, 'USD', '💵');

-- Create expense categories
INSERT INTO categories (workspace_id, name, type, icon)
VALUES 
  ('WORKSPACE_ID', 'Food', 'expense', '🍔'),
  ('WORKSPACE_ID', 'Transport', 'expense', '🚗'),
  ('WORKSPACE_ID', 'Shopping', 'expense', '🛍️'),
  ('WORKSPACE_ID', 'Entertainment', 'expense', '🎬'),
  ('WORKSPACE_ID', 'Bills', 'expense', '📄'),
  ('WORKSPACE_ID', 'Health', 'expense', '⚕️');

-- Create income categories
INSERT INTO categories (workspace_id, name, type, icon)
VALUES 
  ('WORKSPACE_ID', 'Salary', 'income', '💰'),
  ('WORKSPACE_ID', 'Sold Item', 'income', '🏷️'),
  ('WORKSPACE_ID', 'Gift', 'income', '🎁'),
  ('WORKSPACE_ID', 'Freelance', 'income', '💼');
```

## Step 3: Add a Second User to Workspace (Optional)

To share the workspace with another user:

1. Make sure the second user has registered in your app
2. Get their user ID from the auth.users table
3. Add them to the workspace:

```sql
-- Add second user as member
INSERT INTO workspace_members (workspace_id, user_id, role)
VALUES ('WORKSPACE_ID', 'SECOND_USER_ID', 'member');
```

## Step 4: Update Your Application Code

### Get Your Workspace ID

You'll need to use your workspace ID in the application. You can either:

1. Hard-code it temporarily for development
2. Fetch it from the database when the user logs in
3. Use it in your URL structure (e.g., `/workspace/[workspaceId]`)

### Example: Fetch User's First Workspace

```typescript
// In your root layout or page
const { data } = await supabase
  .from('workspace_members')
  .select('workspaces(*)')
  .eq('user_id', user.id)
  .single();

const workspaceId = data.workspaces.id;
```

## Database Schema Overview

### Tables

- **workspaces**: Stores workspace information (for shared budgets)
- **workspace_members**: Links users to workspaces (allows 2 users to share)
- **accounts**: Bank accounts, cash, credit cards with balances
- **categories**: Income and expense categories
- **transactions**: All income and expense transactions

### Key Features

1. **Automatic Balance Updates**: When you create/update/delete a transaction, the account balance is automatically updated via database triggers
2. **Row Level Security**: Users can only see data from workspaces they're members of
3. **Shared Workspaces**: Two users can share the same workspace and see each other's transactions
4. **Multi-currency Support**: Each account can have its own currency

## Usage in Your App

### Creating a Transaction

Transactions are created through the forms. The `createTransaction` action will:
1. Save the transaction
2. Automatically update the account balance (via trigger)
3. Link it to the user who created it

### Viewing Accounts

Accounts are displayed on the home screen as cards, showing:
- Account name
- Account type
- Current balance (click to reveal)
- Account icon

### Categories and Accounts in Dropdowns

Both forms dynamically fetch:
- **Accounts**: All accounts in the current workspace
- **Categories**: Expense categories for expense form, income categories for income form

## Environment Variables

Make sure you have these in your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

## Testing

1. Register/login as first user
2. Create a workspace and seed data
3. Create a transaction - check that account balance updates
4. Register second user and add them to workspace
5. Login as second user - verify they can see the transactions
