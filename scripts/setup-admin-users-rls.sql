-- Enable RLS for admin_users table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users table
-- Allow read access for authentication (checking username/password)
CREATE POLICY "Allow read for authentication" ON admin_users
    FOR SELECT USING (true);

-- Allow update for password changes (only for authenticated users)
CREATE POLICY "Allow update for password change" ON admin_users
    FOR UPDATE USING (true);

-- Grant necessary permissions
GRANT ALL ON admin_users TO anon;
GRANT ALL ON admin_users TO authenticated;

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';
