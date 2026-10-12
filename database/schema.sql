-- User profiles = the 4 user types in the spec
CREATE TABLE IF NOT EXISTS user_profile (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL UNIQUE,
    description TEXT,
    is_active   INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS user_account (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL,
    email         TEXT,
    profile_id    INTEGER NOT NULL REFERENCES user_profile(id),
    is_active     INTEGER NOT NULL DEFAULT 1,
    created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO user_profile (name, description) VALUES
    ('User Admin',          'Manages user accounts and user profiles'),
    ('Interior Designer',   'Manages company information and IDP portfolio'),
    ('Customer',            'Searches, views and saves IDPs'),
    ('Platform Management', 'Manages IDP categories and views reports');
