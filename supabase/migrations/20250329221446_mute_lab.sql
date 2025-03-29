/*
  # Initial Schema Setup for Support-Res

  1. New Tables
    - users (extends auth.users)
      - id (uuid, primary key)
      - role (text)
      - full_name (text)
      - avatar_url (text)
      - created_at (timestamptz)
    
    - services
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - price (numeric)
      - category (text)
      - provider_id (uuid, foreign key)
      - estimated_duration (text)
      - created_at (timestamptz)
    
    - orders
      - id (uuid, primary key)
      - service_id (uuid, foreign key)
      - researcher_id (uuid, foreign key)
      - provider_id (uuid, foreign key)
      - status (text)
      - payment_status (text)
      - amount (numeric)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - messages
      - id (uuid, primary key)
      - order_id (uuid, foreign key)
      - sender_id (uuid, foreign key)
      - content (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for appropriate access control
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role text NOT NULL CHECK (role IN ('researcher', 'provider', 'admin')),
  full_name text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  category text NOT NULL,
  provider_id uuid REFERENCES users(id) NOT NULL,
  estimated_duration text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) NOT NULL,
  researcher_id uuid REFERENCES users(id) NOT NULL,
  provider_id uuid REFERENCES users(id) NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  payment_status text NOT NULL CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  amount numeric NOT NULL CHECK (amount >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) NOT NULL,
  sender_id uuid REFERENCES users(id) NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Services policies
CREATE POLICY "Anyone can view services"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Providers can create their own services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'provider'
    )
    AND provider_id = auth.uid()
  );

-- Orders policies
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    researcher_id = auth.uid()
    OR provider_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Researchers can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'researcher'
    )
    AND researcher_id = auth.uid()
  );

-- Messages policies
CREATE POLICY "Users can view messages for their orders"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = messages.order_id
      AND (
        orders.researcher_id = auth.uid()
        OR orders.provider_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM users
          WHERE id = auth.uid()
          AND role = 'admin'
        )
      )
    )
  );

CREATE POLICY "Users can create messages for their orders"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_id
      AND (
        orders.researcher_id = auth.uid()
        OR orders.provider_id = auth.uid()
      )
    )
    AND sender_id = auth.uid()
  );