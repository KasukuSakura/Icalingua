import { ipcMain } from "electron";
import Message from "../../types/Message";
import OnlineData from "../../types/OnlineData";
import Room from "../../types/Room";
import { updateAppMenu } from "../ipc/menuManager";
import { updateTrayIcon } from "./trayManager";
import {sendToMainWindow, sendToRequestWindow} from './windowManager'

let selectedRoomId = 0;
let selectedRoomName = "";
ipcMain.on("setSelectedRoom", (_, id: number, name: string) => {
  selectedRoomId = id;
  selectedRoomName = name;
  updateAppMenu();
  if (id === 0) updateTrayIcon();
});

export default {
  closeLoading() {
    sendToMainWindow("closeLoading");
  },
  notify(data: { title: string; message: string }) {
    sendToMainWindow("notify", data);
  },
  notifyError(data: { title: string; message: string }) {
    sendToMainWindow("notifyError", data);
  },
  notifySuccess(data: { title: string; message: string }) {
    sendToMainWindow("notifySuccess", data);
  },
  message(string: string) {
    sendToMainWindow("message", string);
  },
  messageError(string: string) {
    sendToMainWindow("messageError", string);
  },
  messageSuccess(string: string) {
    sendToMainWindow("messageSuccess", string);
  },
  updateRoom(room: Room) {
    sendToMainWindow("updateRoom", room);
  },
  setShutUp(isShutUp: boolean) {
    sendToMainWindow("setShutUp", isShutUp);
  },
  addMessage(roomId: number, message: Message) {
    sendToMainWindow("addMessage", { roomId, message });
  },
  chroom(roomId: number) {
    sendToMainWindow("chroom", roomId);
  },
  deleteMessage(messageId: string | number) {
    sendToMainWindow("deleteMessage", messageId);
  },
  revealMessage(messageId: string | number) {
    sendToMainWindow("revealMessage", messageId);
  },
  setOnline() {
    sendToMainWindow("setOnline");
  },
  setOffline(message: string) {
    sendToMainWindow("setOffline", message);
  },
  clearCurrentRoomUnread() {
    sendToMainWindow("clearCurrentRoomUnread");
  },
  setAllRooms(rooms: Room[]) {
    sendToMainWindow("setAllRooms", rooms);
  },
  setMessages(messages: Message[]) {
    sendToMainWindow("setMessages", messages);
  },
  replyMessage(message: Message) {
    sendToMainWindow("replyMessage", message);
  },
  startChat(id: number, name: string) {
    sendToMainWindow("startChat", { id, name });
  },
  closePanel() {
    sendToMainWindow("closePanel");
  },
  updatePriority(lev: 1 | 2 | 3 | 4 | 5) {
    sendToMainWindow("updatePriority", lev);
  },
  addHistoryCount(count: number) {
    sendToMainWindow("addHistoryCount", count);
  },
  clearHistoryCount() {
    sendToMainWindow("clearHistoryCount");
  },
  stopGettingHistory() {
    sendToMainWindow("stopGettingHistory");
  },
  sendOnlineData(data: OnlineData) {
    sendToMainWindow("gotOnlineData", data);
  },
  addMessageText(text: string) {
    sendToMainWindow("addMessageText", text);
  },
  getSelectedRoomId: () => selectedRoomId,
  getSelectedRoomName: () => selectedRoomName,
  sendAddRequest(data: any) {
    sendToMainWindow("sendAddRequest", data)
    sendToRequestWindow("sendAddRequest", data)
  }
};
