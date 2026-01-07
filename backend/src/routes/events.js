import express from 'express'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticateToken)

// Get all events for user
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE user_owner_id = $1 OR privacy = $2 ORDER BY start_time',
      [req.user.userId, 'public']
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Get events error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Create event
router.post('/', async (req, res) => {
  try {
    const { title, description, startTime, endTime, eventType, icon, color, location, privacy } = req.body

    const result = await pool.query(
      `INSERT INTO events (user_owner_id, title, description, start_time, end_time, event_type, icon, color, location, privacy)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [req.user.userId, title, description, startTime, endTime, eventType, icon, color, location, privacy]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Create event error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Update event
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, startTime, endTime, eventType, icon, color, location, privacy } = req.body

    const result = await pool.query(
      `UPDATE events
       SET title = $1, description = $2, start_time = $3, end_time = $4,
           event_type = $5, icon = $6, color = $7, location = $8, privacy = $9, updated_at = NOW()
       WHERE event_id = $10 AND user_owner_id = $11
       RETURNING *`,
      [title, description, startTime, endTime, eventType, icon, color, location, privacy, id, req.user.userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Update event error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM events WHERE event_id = $1 AND user_owner_id = $2 RETURNING *',
      [id, req.user.userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Delete event error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
