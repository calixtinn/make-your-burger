import api from "./api";

export default {
    getAll: () => {
        return api.get('/burgers');
    },
    create: (burger) => {
        return api.post('/burgers', burger);
    },
    deleteById: (id) => {
        return api.delete(`/burgers/${id}`);
    },
    updateStatus: (id, status) => {
        return api.patch(`/burgers/${id}`, {status: status});
    }
}