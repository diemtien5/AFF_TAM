-- Fix schema cache issues for consultants table
-- Add missing columns if they don't exist
DO $$
BEGIN
  -- Add zalo_link column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='consultants' AND column_name='zalo_link') THEN
    ALTER TABLE consultants ADD COLUMN zalo_link TEXT;
  END IF;

  -- Add email column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='consultants' AND column_name='email') THEN
    ALTER TABLE consultants ADD COLUMN email TEXT;
  END IF;
END $$;

-- Update existing records to have empty values if needed
UPDATE consultants
SET zalo_link = COALESCE(zalo_link, ''),
    email = COALESCE(email, '')
WHERE zalo_link IS NULL OR email IS NULL;

-- CRITICAL: Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';

-- Also try alternative cache refresh methods
SELECT pg_notify('pgrst', 'reload schema');

