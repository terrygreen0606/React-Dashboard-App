import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export class emailService {
  get(status) {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + "api/v1/messages/getMessage")
        .then((res) => {
          resolve(res.data[status]);
        })
        .catch((err) => reject(err));
    });
  }

  getOne(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + "api/v1/messages/messageInfo/" + id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  getCounts() {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + "api/v1/messages/getMessage")
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  getActivityTypes() {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + "api/v1/messages/getActivityType")
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  getDocumentTypes() {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + "api/v1/messages/getDocType")
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  sendEmail(formData, headers) {
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + "api/v1/messages/sendMessage", formData, { headers })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  trashMessages(id, flag) {
    const request = id ? [id] : undefined;
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + "api/v1/messages/trashMessage", {
          selected_msgs: request,
          flag,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  removeMessages(id) {
    const request = id ? [id] : undefined;
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + "api/v1/messages/removeMessage", {
          selected_msgs: request,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  toggleRead(id) {
    return new Promise((resolve, reject) => {
      axios
        .put(baseUrl + "api/v1/messages/changeCheckedStatus/" + id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }
}
