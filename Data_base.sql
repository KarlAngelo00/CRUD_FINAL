CREATE DATABASE tasks_storage;

USE tasks_storage;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Pending', 'Completed') DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
