/**
 * Timer Service - In-memory storage and business logic for timers
 */
class TimerService {
  constructor() {
    this.timers = {};
    this.nextId = 1;
  }

  /**
   * Create a new timer
   * @param {Object} timerData - Timer data (name, duration)
   * @returns {Object} Created timer
   */
  createTimer(timerData) {
    const { name, duration } = timerData;
    
    if (!name || !duration) {
      throw new Error('Name and duration are required');
    }

    const timer = {
      id: this.nextId++,
      name,
      duration: parseInt(duration),
      status: 'stopped',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.timers[timer.id] = timer;
    return timer;
  }

  /**
   * Get all timers
   * @returns {Array} Array of all timers
   */
  getAllTimers() {
    return Object.values(this.timers);
  }

  /**
   * Get timer by ID
   * @param {number} id - Timer ID
   * @returns {Object|null} Timer object or null if not found
   */
  getTimerById(id) {
    return this.timers[id] || null;
  }

  /**
   * Update timer by ID
   * @param {number} id - Timer ID
   * @param {Object} updateData - Data to update
   * @returns {Object|null} Updated timer or null if not found
   */
  updateTimer(id, updateData) {
    const timer = this.timers[id];
    if (!timer) {
      return null;
    }

    // Allow updating name, duration, and status
    const allowedFields = ['name', 'duration', 'status'];
    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        if (field === 'duration') {
          timer[field] = parseInt(updateData[field]);
        } else {
          timer[field] = updateData[field];
        }
      }
    });

    timer.updatedAt = new Date().toISOString();
    return timer;
  }

  /**
   * Delete timer by ID
   * @param {number} id - Timer ID
   * @returns {boolean} True if deleted, false if not found
   */
  deleteTimer(id) {
    if (this.timers[id]) {
      delete this.timers[id];
      return true;
    }
    return false;
  }

  /**
   * Get count of timers
   * @returns {number} Number of timers
   */
  getTimerCount() {
    return Object.keys(this.timers).length;
  }
}

// Export a singleton instance
export default new TimerService();