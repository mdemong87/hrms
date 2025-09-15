import { create } from 'zustand';

const useStore = create((set) => ({
    email: '',
    setemail: (newemail) => set({ email: newemail }),
}));

export default useStore;