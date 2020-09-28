import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export class NotificationService {
  get(userID) {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + "api/v1/notification/userNotification/" + userID)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  viewNotif(id) {
    return new Promise((resolve, reject) => {
      axios
        .put(baseUrl + "api/v1/notification/checkedNotification/" + id)
        .then(() => {
          resolve();
        })
        .catch((err) => reject(err));
    });
  }
}
