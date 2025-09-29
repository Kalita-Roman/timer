const timerService = require('../services/timerService');

/**
 * Timer Controller - Handles HTTP requests for timer CRUD operations
 */
class TimerController {
  /**
   * Get all timers
   * GET /api/timers
   */
  async getAllTimers(req, res) {
    try {
      const timers = timerService.getAllTimers();
      res.json({
        success: true,
        data: timers,
        count: timers.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get timer by ID
   * GET /api/timers/:id
   */
  async getTimerById(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid timer ID'
        });
      }

      const timer = timerService.getTimerById(id);
      if (!timer) {
        return res.status(404).json({
          success: false,
          error: 'Timer not found'
        });
      }

      res.json({
        success: true,
        data: timer
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Create a new timer
   * POST /api/timers
   */
  async createTimer(req, res) {
    try {
      const { name, duration } = req.body;
      
      if (!name || !duration) {
        return res.status(400).json({
          success: false,
          error: 'Name and duration are required'
        });
      }

      const timer = timerService.createTimer({ name, duration });
      res.status(201).json({
        success: true,
        data: timer
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Update timer by ID
   * PUT /api/timers/:id
   */
  async updateTimer(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid timer ID'
        });
      }

      const timer = timerService.updateTimer(id, req.body);
      if (!timer) {
        return res.status(404).json({
          success: false,
          error: 'Timer not found'
        });
      }

      res.json({
        success: true,
        data: timer
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Delete timer by ID
   * DELETE /api/timers/:id
   */
  async deleteTimer(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid timer ID'
        });
      }

      const deleted = timerService.deleteTimer(id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Timer not found'
        });
      }

      res.json({
        success: true,
        message: 'Timer deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new TimerController();