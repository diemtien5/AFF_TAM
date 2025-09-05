-- Add email column to consultants table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='consultants' AND column_name='email') THEN
    ALTER TABLE consultants ADD COLUMN email TEXT;
  END IF;
END $$;

-- Update existing records to have empty email if needed
UPDATE consultants
SET email = COALESCE(email, '')
WHERE email IS NULL;

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';

