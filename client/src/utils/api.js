// Imports:
import axios from 'axios';

// Export all helper functions as a property of the export object:
export default {
    getAllUsers: id => axios.get('api/users')
}