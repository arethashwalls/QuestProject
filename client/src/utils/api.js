// Imports:
import axios from 'axios';

// Export all helper functions as a property of the export object:
export default {
  getAllUsers: id => axios.get('api/users'),
  saveQuest: (title, quest, userId) => axios.post('api/quest/user', { title, quest, userId }),
  getQuest: id => axios.get(`api/quest/user/${id}`),

  updateQuest: (quest, questId, userId) =>{
    
    axios.put(`api/quests/${questId}/${userId}`, quest)
  },
  getAdventures: user => axios.get(`api/quest/${user}`),
  deleteQuest: id => axios.delete(`api/quest/${id}`)
};
