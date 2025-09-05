-- Enable RLS for all main tables
ALTER TABLE loan_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultants ENABLE ROW LEVEL SECURITY;
ALTER TABLE navbar_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for loan_packages table
CREATE POLICY "Enable read access for all users" ON loan_packages
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON loan_packages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON loan_packages
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON loan_packages
    FOR DELETE USING (true);

-- Create policies for consultants table
CREATE POLICY "Enable read access for all users" ON consultants
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON consultants
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON consultants
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON consultants
    FOR DELETE USING (true);

-- Create policies for navbar_links table
CREATE POLICY "Enable read access for all users" ON navbar_links
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON navbar_links
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON navbar_links
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON navbar_links
    FOR DELETE USING (true);

-- Create policies for analytics_stats table
CREATE POLICY "Enable read access for all users" ON analytics_stats
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON analytics_stats
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON analytics_stats
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON analytics_stats
    FOR DELETE USING (true);

-- Grant necessary permissions to all tables
GRANT ALL ON loan_packages TO anon;
GRANT ALL ON loan_packages TO authenticated;
GRANT ALL ON consultants TO anon;
GRANT ALL ON consultants TO authenticated;
GRANT ALL ON navbar_links TO anon;
GRANT ALL ON navbar_links TO authenticated;
GRANT ALL ON analytics_stats TO anon;
GRANT ALL ON analytics_stats TO authenticated;

-- Grant usage on sequences (if any)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';

