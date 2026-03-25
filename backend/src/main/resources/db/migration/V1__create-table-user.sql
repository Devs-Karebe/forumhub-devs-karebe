-- ENUM TYPES --------------------------------------------------

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'users_role'
    ) THEN
CREATE TYPE users_role AS ENUM ('ADMIN', 'INSTRUCTOR', 'STUDENT');
END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'general_status'
    ) THEN
CREATE TYPE general_status AS ENUM ('OPEN', 'CLOSED');
END IF;
END
$$;


-- USERS TABLE -------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role users_role NOT NULL DEFAULT 'STUDENT',

    status general_status NOT NULL DEFAULT 'OPEN',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );