import create from 'zustand';
import axios from 'axios';

const useCheckoutStore = create(set => ({
  address: {},
  setAddress: (obj) => set(state => ({ address: obj })),
  payment: {},
  setPayment: (obj) => set(state => ({ payment: obj })),
  orderItems: {},
  getOrderItems: async ()=> {
    const response = await axios.get('/api/products')
    set({ orderItems: response.data.products })
  },
  createOrder: (orderData) => {
    set({loading: true});
    axios.post('/api/checkout', orderData)
    .then((response) => {
      console.log(response);
      set({ isOrderSuccess: true })
      set({loading: false});
    })
    .catch((error) => {
      set({ isOrderSuccess: false })
      console.log(error);
      set({loading: false});
    });
  },
  isOrderSuccess: false,
  loading: false,
  setLoading: (value) => set(state => ({ loading: value })),
}))

export default useCheckoutStore;