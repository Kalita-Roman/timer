// Timer Management Frontend
class TimerManager {
    constructor() {
        this.currentEditId = null;
        this.timerToDelete = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTimers();
    }

    bindEvents() {
        // Form submission
        document.getElementById('timer-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Cancel edit button
        document.getElementById('cancel-edit').addEventListener('click', () => {
            this.cancelEdit();
        });

        // Delete modal events
        document.getElementById('confirm-delete').addEventListener('click', () => {
            this.deleteTimer(this.timerToDelete);
        });

        document.getElementById('cancel-delete').addEventListener('click', () => {
            this.hideDeleteModal();
        });

        // Close modal when clicking outside
        document.getElementById('delete-modal').addEventListener('click', (e) => {
            if (e.target.id === 'delete-modal') {
                this.hideDeleteModal();
            }
        });
    }

    async handleFormSubmit() {
        const formData = new FormData(document.getElementById('timer-form'));
        const timerData = {
            name: formData.get('name').trim(),
            duration: parseInt(formData.get('duration'))
        };

        if (!timerData.name || !timerData.duration || timerData.duration < 1) {
            this.showError('Please provide valid name and duration (greater than 0)');
            return;
        }

        try {
            if (this.currentEditId) {
                await this.updateTimer(this.currentEditId, timerData);
            } else {
                await this.createTimer(timerData);
            }
        } catch (error) {
            this.showError('Failed to save timer: ' + error.message);
        }
    }

    async loadTimers() {
        this.showLoading(true);
        this.hideMessages();

        try {
            const response = await fetch('/api/timers');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to load timers');
            }

            this.renderTimers(result.data);
            this.showLoading(false);
        } catch (error) {
            this.showLoading(false);
            this.showError('Failed to load timers: ' + error.message);
        }
    }

    async createTimer(timerData) {
        const response = await fetch('/api/timers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(timerData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to create timer');
        }

        this.showSuccess('Timer created successfully!');
        this.resetForm();
        this.loadTimers();
    }

    async updateTimer(id, timerData) {
        const response = await fetch(`/api/timers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(timerData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to update timer');
        }

        this.showSuccess('Timer updated successfully!');
        this.cancelEdit();
        this.loadTimers();
    }

    async deleteTimer(id) {
        try {
            const response = await fetch(`/api/timers/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete timer');
            }

            this.showSuccess('Timer deleted successfully!');
            this.hideDeleteModal();
            this.loadTimers();
        } catch (error) {
            this.showError('Failed to delete timer: ' + error.message);
            this.hideDeleteModal();
        }
    }

    renderTimers(timers) {
        const tbody = document.getElementById('timers-tbody');
        const emptyState = document.getElementById('empty-state');
        const table = document.getElementById('timers-table');

        if (timers.length === 0) {
            table.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        table.style.display = 'table';
        emptyState.style.display = 'none';

        tbody.innerHTML = timers.map(timer => `
            <tr>
                <td>${timer.id}</td>
                <td>${this.escapeHtml(timer.name)}</td>
                <td>${timer.duration}</td>
                <td><span class="status ${timer.status}">${timer.status}</span></td>
                <td>${this.formatDate(timer.createdAt)}</td>
                <td>${this.formatDate(timer.updatedAt)}</td>
                <td>
                    <button class="btn btn-success btn-small" onclick="timerManager.editTimer(${timer.id})">
                        Edit
                    </button>
                    <button class="btn btn-danger btn-small" onclick="timerManager.confirmDelete(${timer.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }

    editTimer(id) {
        fetch(`/api/timers/${id}`)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const timer = result.data;
                    document.getElementById('timer-name').value = timer.name;
                    document.getElementById('timer-duration').value = timer.duration;
                    
                    this.currentEditId = id;
                    document.getElementById('cancel-edit').style.display = 'inline-block';
                    document.querySelector('button[type="submit"]').textContent = 'Update Timer';
                    
                    // Scroll to form
                    document.getElementById('timer-form').scrollIntoView({ behavior: 'smooth' });
                } else {
                    this.showError('Failed to load timer details');
                }
            })
            .catch(error => {
                this.showError('Failed to load timer: ' + error.message);
            });
    }

    cancelEdit() {
        this.currentEditId = null;
        this.resetForm();
        document.getElementById('cancel-edit').style.display = 'none';
        document.querySelector('button[type="submit"]').textContent = 'Add Timer';
    }

    confirmDelete(id) {
        this.timerToDelete = id;
        document.getElementById('delete-modal').style.display = 'flex';
    }

    hideDeleteModal() {
        this.timerToDelete = null;
        document.getElementById('delete-modal').style.display = 'none';
    }

    resetForm() {
        document.getElementById('timer-form').reset();
    }

    showLoading(show) {
        document.getElementById('loading').style.display = show ? 'block' : 'none';
    }

    showError(message) {
        this.hideMessages();
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideMessages();
        }, 5000);
    }

    showSuccess(message) {
        this.hideMessages();
        const successDiv = document.getElementById('success-message');
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.hideMessages();
        }, 3000);
    }

    hideMessages() {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('success-message').style.display = 'none';
    }

    formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }
}

// Initialize the timer manager when the page loads
let timerManager;

document.addEventListener('DOMContentLoaded', () => {
    timerManager = new TimerManager();
});