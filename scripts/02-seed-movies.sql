-- Insert a default admin user (password: admin123)
INSERT INTO users (email, username, full_name, password_hash, is_admin, created_at)
VALUES ('admin@streambox.com', 'admin', 'Admin User', 'a1a55c9f31f4e41c2032c0dc3a6c6eac5e5c2a98d02c96e1d3c3c9c8a3c1f8f3f5c8f5c5b5a9e5b9a1c5e3a7d5b3f1c9e7', true, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- Insert sample movies
INSERT INTO videos (title, description, thumbnail_url, video_url, duration_seconds, genre, release_date, rating, view_count, created_by, created_at)
VALUES
('The Future of AI', 'Explore how artificial intelligence is changing the world', '/placeholder.svg?height=400&width=300', 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4', 3600, 'Documentary', '2024-01-15', 8.5, 15420, 1, CURRENT_TIMESTAMP),
('Cosmic Journey', 'A stunning journey through the cosmos and distant galaxies', '/placeholder.svg?height=400&width=300', 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4', 4200, 'Documentary', '2024-02-10', 9.2, 22100, 1, CURRENT_TIMESTAMP),
('Digital Revolution', 'How digital technology transformed business and society', '/placeholder.svg?height=400&width=300', 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4', 2700, 'Documentary', '2024-01-20', 8.8, 18500, 1, CURRENT_TIMESTAMP),
('Ocean Mysteries', 'Discover the secrets hidden in the deepest oceans', '/placeholder.svg?height=400&width=300', 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4', 3300, 'Documentary', '2024-03-05', 9.0, 24300, 1, CURRENT_TIMESTAMP),
('Mountain Adventure', 'An epic adventure across the world\'s highest mountains', '/placeholder.svg?height=400&width=300', 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4', 3900, 'Adventure', '2024-02-28', 8.7, 19800, 1, CURRENT_TIMESTAMP),
('Ancient Civilizations', 'Uncovering the mysteries of lost ancient civilizations', '/placeholder.svg?height=400&width=300', 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4', 3600, 'Documentary', '2024-01-10', 9.1, 26500, 1, CURRENT_TIMESTAMP),
('Tech Innovations 2024', 'The most groundbreaking tech innovations of the year', '/placeholder.svg?height=400&width=300', 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4', 2400, 'Documentary', '2024-03-20', 8.6, 17300, 1, CURRENT_TIMESTAMP),
('Wildlife Wonders', 'Experience the beauty and diversity of wildlife around the globe', '/placeholder.svg?height=400&width=300', 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4', 3500, 'Nature', '2024-02-15', 9.3, 28700, 1, CURRENT_TIMESTAMP);

-- Insert categories
INSERT INTO categories (name, description)
VALUES
('Documentary', 'Educational and informative content'),
('Adventure', 'Action-packed adventure stories'),
('Nature', 'Nature and wildlife content'),
('Technology', 'Technology and innovation'),
('History', 'Historical documentaries')
ON CONFLICT (name) DO NOTHING;
