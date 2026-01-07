import express from 'express'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticateToken)

// Get all lists for user
router.get('/', async (req, res) => {
  try {
    const listsResult = await pool.query(
      'SELECT * FROM lists WHERE user_owner_id = $1 OR privacy = $2 ORDER BY created_at DESC',
      [req.user.userId, 'public']
    )

    const lists = await Promise.all(
      listsResult.rows.map(async (list) => {
        const itemsResult = await pool.query(
          'SELECT * FROM list_items WHERE list_id = $1 ORDER BY sort_order',
          [list.list_id]
        )
        return { ...list, items: itemsResult.rows }
      })
    )

    res.json(lists)
  } catch (error) {
    console.error('Get lists error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Create list
router.post('/', async (req, res) => {
  try {
    const { title, description, privacy } = req.body

    const result = await pool.query(
      'INSERT INTO lists (user_owner_id, title, description, privacy) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.userId, title, description, privacy]
    )

    res.status(201).json({ ...result.rows[0], items: [] })
  } catch (error) {
    console.error('Create list error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Add item to list
router.post('/:listId/items', async (req, res) => {
  try {
    const { listId } = req.params
    const { content } = req.body

    const result = await pool.query(
      'INSERT INTO list_items (list_id, content) VALUES ($1, $2) RETURNING *',
      [listId, content]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Add item error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Toggle item checked
router.patch('/:listId/items/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params
    const { isChecked } = req.body

    const result = await pool.query(
      'UPDATE list_items SET is_checked = $1 WHERE item_id = $2 RETURNING *',
      [isChecked, itemId]
    )

    res.json(result.rows[0])
  } catch (error) {
    console.error('Toggle item error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Delete list
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM lists WHERE list_id = $1 AND user_owner_id = $2 RETURNING *',
      [id, req.user.userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'List not found' })
    }

    res.json({ message: 'List deleted successfully' })
  } catch (error) {
    console.error('Delete list error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
