-- Fix Gaia AI quadrant in both tables
UPDATE analyses SET quadrant = 'digital_coordination' WHERE entity_name = 'Gaia AI';
UPDATE map_pins SET quadrant = 'digital_coordination' WHERE name = 'Gaia AI';

-- Enable realtime for analyses table so project list updates live
ALTER PUBLICATION supabase_realtime ADD TABLE analyses;
