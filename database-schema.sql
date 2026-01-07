-- Mom Planner Database Schema
-- PostgreSQL / Supabase compatible

-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('mom', 'user2', 'user3', 'guest')),
    display_name VARCHAR(100),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_owner_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    event_type VARCHAR(50), -- appointment, activity, task, etc.
    icon VARCHAR(50),
    color VARCHAR(7), -- hex color code
    location VARCHAR(255),
    privacy VARCHAR(20) NOT NULL CHECK (privacy IN ('private', 'user2', 'user3', 'public')),
    linked_list_id UUID REFERENCES lists(list_id) ON DELETE SET NULL,
    recurrence JSONB, -- {type: 'daily'|'weekly'|'custom', interval: 1, endDate: null}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lists (Checklists) table
CREATE TABLE lists (
    list_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_owner_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    privacy VARCHAR(20) NOT NULL CHECK (privacy IN ('private', 'user2', 'user3', 'public')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- List items table
CREATE TABLE list_items (
    item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    list_id UUID REFERENCES lists(list_id) ON DELETE CASCADE,
    content VARCHAR(500) NOT NULL,
    is_checked BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reminders table
CREATE TABLE reminders (
    reminder_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(event_id) ON DELETE CASCADE,
    reminder_type VARCHAR(20) NOT NULL CHECK (reminder_type IN ('push', 'email')),
    delay_minutes INTEGER NOT NULL, -- 5, 10, 30, 60, 1440 (1 day), custom
    sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User permissions (for shared access)
CREATE TABLE user_permissions (
    permission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    resource_type VARCHAR(20) NOT NULL CHECK (resource_type IN ('event', 'list')),
    resource_id UUID NOT NULL,
    permission_level VARCHAR(20) NOT NULL CHECK (permission_level IN ('view', 'edit')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_events_owner ON events(user_owner_id);
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_events_privacy ON events(privacy);
CREATE INDEX idx_lists_owner ON lists(user_owner_id);
CREATE INDEX idx_list_items_list ON list_items(list_id);
CREATE INDEX idx_reminders_event ON reminders(event_id);
CREATE INDEX idx_user_permissions_user ON user_permissions(user_id);
