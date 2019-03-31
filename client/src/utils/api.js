// Imports:
import axios from "axios";

// Export all helper functions as a property of the export object:
export default {
  getAllUsers: id => axios.get("api/users"),
  saveQuest: (quest, userId) => axios.post("api/quest/user", { quest, userId }),
  getQuest: id => axios.get(`api/quest/user/${id}`),
  updateQuest: (user, quest, id) =>
    axios.put("api/quests/" + id + "/" + user, quest)
};
