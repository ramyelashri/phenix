import create from 'zustand';

const useUserStore = create(set => ({
  user: null,
  setUser: (obj) => set(state => ({ user: obj })),
  login: (credentials) => {
    // const {data} = await axios.post('somewhere', {
    //   username: credentials.username,
    //   password: credentials.password
    // });
    // const user = {
    // id: data.user.id,
    // username: data.user.username,
    // token: data.jwt,
    // };
    const user = { id: 123, username: credentials.username };
    localStorage.setItem('user', JSON.stringify(user));
    set({ user: user })
  },
  logout: () => {
    localStorage.removeItem('user');
    set(state => ({ user: null }));
  },
}))
export default useUserStore;