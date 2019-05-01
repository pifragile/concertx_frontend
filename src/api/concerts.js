import session from './session';

export default {
  listConcerts() {
    return session.get('/concerts/');
  },
  addConcert(location, date) {
    return session.post('/concerts/', { location, date, confirmed: false });
  },
  modifyConcert(id, data) {
    return session.patch(`/concerts/${id}/`, data);
  },
  accept(id) {
    return session.get(`/concerts/${id}/accept/`);
  },
  cancel(id) {
    return session.get(`/concerts/${id}/cancel/`);
  },
};
