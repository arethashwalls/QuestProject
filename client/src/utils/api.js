// Imports:
import axios from 'axios';

// Export all helper functions as a property of the export object:
export default {
    getAllUsers: id => axios.get('api/users'),
    saveQuest: (quest) => axios.post('api/quests', quest),
    getQuest: id => axios.get('api/quests/' + id),
    updateQuest: (user, quest,id) => axios.put('api/quests/' + id + "/" + user, quest)
}
