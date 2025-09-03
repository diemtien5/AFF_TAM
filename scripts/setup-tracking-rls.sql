-- Enable RLS for tracking tables
ALTER TABLE offer_impressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for offer_impressions table
CREATE POLICY "Enable read access for all users" ON offer_impressions
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON offer_impressions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON offer_impressions
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON offer_impressions
    FOR DELETE USING (true);

-- Create policies for click_tracking table
CREATE POLICY "Enable read access for all users" ON click_tracking
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON click_tracking
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON click_tracking
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON click_tracking
    FOR DELETE USING (true);

-- Grant necessary permissions
GRANT ALL ON offer_impressions TO anon;
GRANT ALL ON offer_impressions TO authenticated;
GRANT ALL ON click_tracking TO anon;
GRANT ALL ON click_tracking TO authenticated;

-- Grant usage on sequences (if any)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
