-- Create loan_packages table with all required columns
CREATE TABLE IF NOT EXISTS loan_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  loan_limit TEXT,
  interest_rate TEXT,
  disbursement_speed TEXT,
  logo TEXT,
  image TEXT,
  register_link TEXT DEFAULT '',
  detail_link TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add columns if they don't exist (for existing tables)
DO $$
BEGIN
  -- Add register_link column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='loan_packages' AND column_name='register_link') THEN
    ALTER TABLE loan_packages ADD COLUMN register_link TEXT DEFAULT '';
  END IF;

  -- Add detail_link column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='loan_packages' AND column_name='detail_link') THEN
    ALTER TABLE loan_packages ADD COLUMN detail_link TEXT DEFAULT '';
  END IF;
END $$;

-- Update existing records to have empty strings instead of NULL
UPDATE loan_packages
SET register_link = COALESCE(register_link, ''),
    detail_link = COALESCE(detail_link, '')
WHERE register_link IS NULL OR detail_link IS NULL;

-- Create consultants table
CREATE TABLE IF NOT EXISTS consultants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT,
  phone TEXT,
  zalo TEXT,
  zalo_link TEXT,
  facebook TEXT,
  email TEXT,
  credit_cards TEXT,
  loans TEXT,
  ewallets TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics_stats table
CREATE TABLE IF NOT EXISTS analytics_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  value INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create navbar_links table
CREATE TABLE IF NOT EXISTS navbar_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';
