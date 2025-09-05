-- Enable RLS for consultants table
ALTER TABLE consultants ENABLE ROW LEVEL SECURITY;

-- Create policies for consultants table
CREATE POLICY "Enable read access for all users" ON consultants
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON consultants
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON consultants
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON consultants
    FOR DELETE USING (true);

-- Grant necessary permissions
GRANT ALL ON consultants TO anon;
GRANT ALL ON consultants TO authenticated;

-- Grant usage on sequences (if any)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';

