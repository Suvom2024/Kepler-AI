import { create } from "zustand"

export const useSidebarState = create((set) => ({
  open: true,
  historyByIdLoading: false,
  chatLoading: false,
  answers: [],
  faqData: [],
  historyData: {},
  question: "",
  selectedHistoryId: "",
  selectedUserId: "",
  setOpen: () => set((state) => ({ open: !state.open })),
  setHistoryByIdLoading: () =>
    set((state) => ({ historyByIdLoading: !state.historyByIdLoading })),
  setChatLoading: () => set((state) => ({ chatLoading: !state.chatLoading })),
  setAnswers: (items) => set(() => ({ answers: items })),
  setFaqData: (items) => set(() => ({ faqData: items })),
  setHistoryData: (items) => set(() => ({ historyData: items })),
  setQuestion: (item) => set(() => ({ question: item })),
  setSelectedHistoryId: (item) => set(() => ({ selectedHistoryId: item })),
  setSelectedUserId: (item) => set(() => ({ selectedUserId: item })),
}))
