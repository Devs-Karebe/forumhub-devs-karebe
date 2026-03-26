-- BD FORUM HUB DEVS KAREBE

-- =========================
-- ENUMS
-- =========================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_role') THEN
CREATE TYPE users_role AS ENUM ('ADMIN', 'INSTRUCTOR', 'STUDENT');
END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'forum_type_enum') THEN
CREATE TYPE forum_type_enum AS ENUM ('DISCUSSION', 'QUESTION');
END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'general_status') THEN
CREATE TYPE general_status AS ENUM ('OPEN', 'CLOSED');
END IF;
END $$;

-- =========================
-- USERS
-- =========================
CREATE TABLE IF NOT EXISTS users (
                                     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                     name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role users_role NOT NULL DEFAULT 'STUDENT',
    status general_status NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
    );

-- =========================
-- INSTITUTION
-- =========================
CREATE TABLE IF NOT EXISTS institution (
                                           cnpj VARCHAR(14) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

-- =========================
-- ADDRESS
-- =========================
CREATE TABLE IF NOT EXISTS address (
                                       id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                       street VARCHAR(255) NOT NULL,
    number VARCHAR(10) NOT NULL,
    complement VARCHAR(100),
    neighborhood VARCHAR(100),
    state VARCHAR(100),
    cep VARCHAR(9),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

-- =========================
-- USER ADDRESS
-- =========================
CREATE TABLE IF NOT EXISTS user_address (
                                            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                            user_id BIGINT NOT NULL,
                                            address_id BIGINT NOT NULL,
                                            CONSTRAINT uq_user_address UNIQUE (user_id, address_id),
    CONSTRAINT fk_user_address_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_user_address_address
    FOREIGN KEY (address_id)
    REFERENCES address(id)
    ON DELETE CASCADE
    );

-- =========================
-- INSTITUTION ADDRESS
-- =========================
CREATE TABLE IF NOT EXISTS institution_address (
                                                   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                                   institution_cnpj VARCHAR(14) NOT NULL,
    address_id BIGINT NOT NULL,
    CONSTRAINT uq_institution_address UNIQUE (institution_cnpj, address_id),
    CONSTRAINT fk_institution_address_institution
    FOREIGN KEY (institution_cnpj)
    REFERENCES institution(cnpj)
    ON DELETE CASCADE,
    CONSTRAINT fk_institution_address_address
    FOREIGN KEY (address_id)
    REFERENCES address(id)
    ON DELETE CASCADE
    );

-- =========================
-- COURSE
-- =========================
CREATE TABLE IF NOT EXISTS course (
                                      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                      name VARCHAR(200) NOT NULL,
    description TEXT,
    status general_status NOT NULL DEFAULT 'OPEN',
    institution_cnpj VARCHAR(14) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT fk_course_institution
    FOREIGN KEY (institution_cnpj)
    REFERENCES institution(cnpj)
    ON DELETE CASCADE
    );

-- =========================
-- DISCIPLINE
-- =========================
CREATE TABLE IF NOT EXISTS discipline (
                                          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                          title VARCHAR(255) NOT NULL,
    description TEXT,
    status general_status NOT NULL DEFAULT 'OPEN',
    course_id BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT fk_discipline_course
    FOREIGN KEY (course_id)
    REFERENCES course(id)
    ON DELETE CASCADE
    );

-- =========================
-- FORUM
-- =========================
CREATE TABLE IF NOT EXISTS forum (
                                     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                     title VARCHAR(255) NOT NULL,
    status general_status NOT NULL DEFAULT 'OPEN',
    type forum_type_enum NOT NULL DEFAULT 'QUESTION',
    discipline_id BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT fk_forum_discipline
    FOREIGN KEY (discipline_id)
    REFERENCES discipline(id)
    ON DELETE CASCADE
    );

-- =========================
-- STUDENT REGISTRATION
-- =========================
CREATE TABLE IF NOT EXISTS student_registration (
                                                    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                                    status general_status NOT NULL DEFAULT 'OPEN',
                                                    user_id BIGINT NOT NULL,
                                                    course_id BIGINT NOT NULL,
                                                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_student_registration UNIQUE (user_id, course_id),
    CONSTRAINT fk_student_registration_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_student_registration_course
    FOREIGN KEY (course_id)
    REFERENCES course(id)
    ON DELETE CASCADE
    );

-- =========================
-- INSTRUCTOR REGISTRATION
-- =========================
CREATE TABLE IF NOT EXISTS instructor_registration (
                                                       id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                                       status general_status NOT NULL DEFAULT 'OPEN',
                                                       user_id BIGINT NOT NULL,
                                                       course_id BIGINT NOT NULL,
                                                       created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_instructor_registration UNIQUE (user_id, course_id),
    CONSTRAINT fk_instructor_registration_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_instructor_registration_course
    FOREIGN KEY (course_id)
    REFERENCES course(id)
    ON DELETE CASCADE
    );

-- =========================
-- MODERATOR ASSIGNMENT
-- =========================
CREATE TABLE IF NOT EXISTS moderator_assignment (
                                                    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                                    instructor_registration_id BIGINT NOT NULL,
                                                    forum_id BIGINT NOT NULL,
                                                    status general_status NOT NULL DEFAULT 'OPEN',
                                                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_moderator_assignment UNIQUE (instructor_registration_id, forum_id),
    CONSTRAINT fk_moderator_assignment_instructor
    FOREIGN KEY (instructor_registration_id)
    REFERENCES instructor_registration(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_moderator_assignment_forum
    FOREIGN KEY (forum_id)
    REFERENCES forum(id)
    ON DELETE CASCADE
    );

-- =========================
-- TOPIC
-- =========================
CREATE TABLE IF NOT EXISTS topic (
                                     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                     title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status general_status NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    forum_id BIGINT NOT NULL,
    student_registration_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_topic_forum
    FOREIGN KEY (forum_id)
    REFERENCES forum(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_topic_student_registration
    FOREIGN KEY (student_registration_id)
    REFERENCES student_registration(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_topic_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    );

-- =========================
-- REPLY
-- =========================
CREATE TABLE IF NOT EXISTS reply (
                                     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                     title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    topic_id BIGINT NOT NULL,
    student_registration_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_reply_topic
    FOREIGN KEY (topic_id)
    REFERENCES topic(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_reply_student_registration
    FOREIGN KEY (student_registration_id)
    REFERENCES student_registration(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_reply_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    );

-- =========================
-- INDEXES
-- =========================
CREATE INDEX IF NOT EXISTS idx_course_institution_cnpj ON course(institution_cnpj);
CREATE INDEX IF NOT EXISTS idx_discipline_course_id ON discipline(course_id);
CREATE INDEX IF NOT EXISTS idx_forum_discipline_id ON forum(discipline_id);

CREATE INDEX IF NOT EXISTS idx_student_registration_user_id ON student_registration(user_id);
CREATE INDEX IF NOT EXISTS idx_student_registration_course_id ON student_registration(course_id);

CREATE INDEX IF NOT EXISTS idx_instructor_registration_user_id ON instructor_registration(user_id);
CREATE INDEX IF NOT EXISTS idx_instructor_registration_course_id ON instructor_registration(course_id);

CREATE INDEX IF NOT EXISTS idx_moderator_assignment_instructor_id ON moderator_assignment(instructor_registration_id);
CREATE INDEX IF NOT EXISTS idx_moderator_assignment_forum_id ON moderator_assignment(forum_id);

CREATE INDEX IF NOT EXISTS idx_topic_forum_id ON topic(forum_id);
CREATE INDEX IF NOT EXISTS idx_topic_student_registration_id ON topic(student_registration_id);
CREATE INDEX IF NOT EXISTS idx_topic_user_id ON topic(user_id);

CREATE INDEX IF NOT EXISTS idx_reply_topic_id ON reply(topic_id);
CREATE INDEX IF NOT EXISTS idx_reply_student_registration_id ON reply(student_registration_id);
CREATE INDEX IF NOT EXISTS idx_reply_user_id ON reply(user_id);

CREATE INDEX IF NOT EXISTS idx_user_address_user_id ON user_address(user_id);
CREATE INDEX IF NOT EXISTS idx_user_address_address_id ON user_address(address_id);

CREATE INDEX IF NOT EXISTS idx_institution_address_cnpj ON institution_address(institution_cnpj);
CREATE INDEX IF NOT EXISTS idx_institution_address_address_id ON institution_address(address_id);