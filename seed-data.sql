-- =====================================================
-- SEED DATA FOR MONETA APP
-- =====================================================
-- Run this AFTER you've run supabase-schema.sql
-- Replace YOUR_EMAIL and the IDs with your actual values
-- =====================================================

-- STEP 1: Get your user ID
-- Run this first and copy your user id
SELECT id, email FROM auth.users WHERE email = 'YOUR_EMAIL@example.com';
-- Result: Copy the 'id' value (looks like: 123e4567-e89b-12d3-a456-426614174000)

-- STEP 2: Create a workspace
-- Replace 'My Family Budget' with your preferred name
INSERT INTO workspaces (name) 
VALUES ('My Family Budget') 
RETURNING id;
-- Result: Copy the 'id' value returned

-- STEP 3: Add yourself as workspace owner
-- Replace USER_ID and WORKSPACE_ID with values from steps 1 and 2
INSERT INTO workspace_members (workspace_id, user_id, role)
VALUES (
  'WORKSPACE_ID_FROM_STEP_2',  -- e.g., '123e4567-e89b-12d3-a456-426614174000'
  'USER_ID_FROM_STEP_1',        -- e.g., '987fcdeb-51a2-43f7-8765-123456789abc'
  'owner'
);

-- STEP 4: Create accounts (replace WORKSPACE_ID)
INSERT INTO accounts (workspace_id, name, type, balance, currency, icon) VALUES 
  ('WORKSPACE_ID', 'Aleksandra DSK', 'bank', 0, 'USD', '🏦'),
  ('WORKSPACE_ID', 'Aleksandra Revolut', 'bank', 0, 'USD', '💳'),
  ('WORKSPACE_ID', 'Aleksandra Cash', 'cash', 0, 'USD', '💵'),
  ('WORKSPACE_ID', 'Stoyan Unicredit', 'bank', 0, 'USD', '🏦'),
  ('WORKSPACE_ID', 'Stoyan Revolut', 'bank', 0, 'USD', '💳'),
  ('WORKSPACE_ID', 'Stoyan Cash', 'cash', 0, 'USD', '💵');

-- STEP 5: Create expense categories (replace WORKSPACE_ID)
INSERT INTO categories (workspace_id, name, type, icon) VALUES 
  ('WORKSPACE_ID', 'Food & Dining', 'expense', '🍔'),
  ('WORKSPACE_ID', 'Transportation', 'expense', '🚗'),
  ('WORKSPACE_ID', 'Shopping', 'expense', '🛍️'),
  ('WORKSPACE_ID', 'Entertainment', 'expense', '🎬'),
  ('WORKSPACE_ID', 'Bills & Utilities', 'expense', '📄'),
  ('WORKSPACE_ID', 'Healthcare', 'expense', '⚕️'),
  ('WORKSPACE_ID', 'Education', 'expense', '📚'),
  ('WORKSPACE_ID', 'Travel', 'expense', '✈️'),
  ('WORKSPACE_ID', 'Groceries', 'expense', '🛒'),
  ('WORKSPACE_ID', 'Subscriptions', 'expense', '📱');

-- STEP 6: Create income categories (replace WORKSPACE_ID)
INSERT INTO categories (workspace_id, name, type, icon) VALUES 
  ('WORKSPACE_ID', 'Salary', 'income', '💰'),
  ('WORKSPACE_ID', 'Freelance', 'income', '💼'),
  ('WORKSPACE_ID', 'Business', 'income', '🏢'),
  ('WORKSPACE_ID', 'Investments', 'income', '📈'),
  ('WORKSPACE_ID', 'Gift', 'income', '🎁'),
  ('WORKSPACE_ID', 'Sold Items', 'income', '🏷️'),
  ('WORKSPACE_ID', 'Refund', 'income', '💸');

-- =====================================================
-- OPTIONAL: Add a second user to share the workspace
-- =====================================================

-- Get second user's ID (after they register)
SELECT id, email FROM auth.users WHERE email = 'SECOND_USER_EMAIL@example.com';
-- Copy their user id

-- Add them to the workspace as a member
INSERT INTO workspace_members (workspace_id, user_id, role)
VALUES (
  'WORKSPACE_ID',              -- Your workspace ID
  'SECOND_USER_ID',            -- Their user ID from above
  'member'                     -- They'll be a member, not owner
);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check your workspaces
SELECT w.*, wm.role 
FROM workspaces w
JOIN workspace_members wm ON w.id = wm.workspace_id
WHERE wm.user_id = 'YOUR_USER_ID';

-- Check your accounts
SELECT * FROM accounts WHERE workspace_id = 'WORKSPACE_ID';

-- Check your categories
SELECT * FROM categories WHERE workspace_id = 'WORKSPACE_ID' ORDER BY type, name;

-- Check workspace members
SELECT 
  wm.role,
  u.email,
  u.raw_user_meta_data->>'full_name' as full_name
FROM workspace_members wm
JOIN auth.users u ON wm.user_id = u.id
WHERE wm.workspace_id = 'WORKSPACE_ID';

-- =====================================================
-- EXAMPLE: Add a test transaction
-- =====================================================

-- First, get an account ID and category ID
SELECT id, name FROM accounts WHERE workspace_id = 'WORKSPACE_ID' LIMIT 1;
SELECT id, name FROM categories WHERE workspace_id = 'WORKSPACE_ID' AND type = 'expense' LIMIT 1;

-- Add a test expense
INSERT INTO transactions (
  workspace_id,
  account_id,
  category_id,
  user_id,
  amount,
  type,
  note,
  date
) VALUES (
  'WORKSPACE_ID',
  'ACCOUNT_ID',              -- From query above
  'CATEGORY_ID',             -- From query above
  'YOUR_USER_ID',
  50.00,
  'expense',
  'Test expense',
  NOW()
);

-- Check that the account balance was updated automatically
SELECT id, name, balance FROM accounts WHERE workspace_id = 'WORKSPACE_ID';
-- The balance should now be -50.00!

-- View your transactions
SELECT 
  t.*,
  a.name as account_name,
  c.name as category_name
FROM transactions t
JOIN accounts a ON t.account_id = a.id
JOIN categories c ON t.category_id = c.id
WHERE t.workspace_id = 'WORKSPACE_ID'
ORDER BY t.date DESC;
