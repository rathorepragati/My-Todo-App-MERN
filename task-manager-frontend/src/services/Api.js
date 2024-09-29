import axios from "axios";

const apiUrl = "http://localhost:5000/api/tasks";

export function getTasks() {
  return axios.get(apiUrl);
}

export function getTask(id) {
  return axios.get(`${apiUrl}/${id}`);
}

export function createTask(task) {
  return axios.post(apiUrl, task);
}

export function updateTask(id, task) {
  return axios.put(`${apiUrl}/${id}`, task);
}

export function deleteTask(id) {
  return axios.delete(`${apiUrl}/${id}`);
}
