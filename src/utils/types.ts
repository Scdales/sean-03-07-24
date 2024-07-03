export type BookEntry = [
  number,
  number,
  number
]

export type BookSnapshot = [
  number,
  BookEntry[]
]

export type Heartbeat = [
  number,
  'hb'
]

export type SubscriptionMessage = {
  event: string
  channel: string
  "chanId": number
  symbol: string
  prec: string
  freq: string
  len: string
  pair: string
}

export type WebsocketMessage = BookEntry | BookSnapshot | Heartbeat | SubscriptionMessage
