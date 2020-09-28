import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL + "api/v1/dashboard/";

export class DashboardService {
  // Initial Call in Dashboard to Fetch All
  fetchAll(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + url)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  refetchMetrics(url, date) {
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + url, { date })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  fetchPaginated(url, page) {
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + url + "?page=" + page)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}
