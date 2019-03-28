// Imports:
// import axios from 'axios';

// Export all helper functions as a property of the export object:
<<<<<<< HEAD
// export default {
//     getAllUsers: id => axios.get('api/users')
// }
=======
export default {
    getAllUsers: id => axios.get('api/users'),
    saveQuest: (quest) => axios.post('api/quests', quest),
    getQuest: () => axios.get('api/quests')
}
>>>>>>> master
