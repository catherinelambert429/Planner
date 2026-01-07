# Mom Planner Backend API

Node.js/Express backend for Mom Planner application.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Database Setup

You need PostgreSQL installed. You can use:
- **Local PostgreSQL** (recommended for development)
- **Supabase** (free cloud PostgreSQL)
- **Other PostgreSQL providers**

#### Option A: Local PostgreSQL

1. Install PostgreSQL from https://www.postgresql.org/download/
2. Create a database:
```sql
CREATE DATABASE mom_planner;
```

3. Run the schema from `database-schema.sql` in the root folder

#### Option B: Supabase (Free Cloud Database)

1. Go to https://supabase.com
2. Create a free account
3. Create a new project
4. Copy the connection string from Settings > Database
5. In the SQL Editor, paste the contents of `database-schema.sql`

### 3. Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cp .env.example .env
```

Edit `.env` with your settings:
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/mom_planner
JWT_SECRET=your-random-secret-key-here
NODE_ENV=development
```

### 4. Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Lists
- `GET /api/lists` - Get all lists with items
- `POST /api/lists` - Create list
- `POST /api/lists/:listId/items` - Add item to list
- `PATCH /api/lists/:listId/items/:itemId` - Toggle item checked
- `DELETE /api/lists/:id` - Delete list

### Health Check
- `GET /api/health` - Check if API is running

## Testing

Test the API with:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Mom Planner API is running"
}
```

## Next Steps

After setting up the backend, you'll need to update the frontend to use the API instead of mock authentication.
