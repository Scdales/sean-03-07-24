import { BTC_ID, WEBSOCKET_URL } from '../constants';
import { addBookSnapshot, addBookEntry } from '../store/ordersSlice';
import { BookEntry, BookSnapshot } from './types';
import { store } from '../store/store';
import { addPriceEntry, addPriceSnapshot } from '../store/pricesSlice';

export const getWebsocket = (setConnected: (connected: boolean) => void, precision: string) => {
  let receivedSnapshot = false
  const websocket = new WebSocket(WEBSOCKET_URL);

  websocket.onopen = () => {
    setConnected(true)
    console.log('websocket opened');
    websocket?.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: BTC_ID,
        prec:	`P${precision}`
      })
    );
  };

  websocket.onmessage = (event: MessageEvent) => {
    const parsedMessage = JSON.parse(event.data);
    if (receivedSnapshot && Array.isArray(parsedMessage[1]) && parsedMessage[1].length === 3) {
      store.dispatch(addBookEntry(parsedMessage[1] as BookEntry))
      store.dispatch(addPriceEntry(parsedMessage[1] as BookEntry))
    } else if (!receivedSnapshot && Array.isArray(parsedMessage[1])) {
      receivedSnapshot = true
      store.dispatch(addBookSnapshot(parsedMessage[1] as BookSnapshot))
      store.dispatch(addPriceSnapshot(parsedMessage[1] as BookSnapshot))
    } else {
      console.log('received unhandled message:', parsedMessage)
    }
  };

  websocket.onerror = (err: Event) => {
    console.error('websocket error', err);
    setConnected(false)
  };

  websocket.onclose = () => {
    console.log('websocket closed')
    setConnected(false)
  }

  return websocket
};
