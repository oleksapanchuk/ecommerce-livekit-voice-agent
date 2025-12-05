import { DataPacket_Kind, RemoteParticipant, Room, RoomEvent } from 'livekit-client';

export type CartItem = {
  code: string;
  amount: number;
};

const dec = new TextDecoder();

export function attachCartListener(
  room: Room,
  onCart: (cart: CartItem[]) => void,
  onOrderCompleted: () => void
) {
  room.on(
    RoomEvent.DataReceived,
    (
      payload: Uint8Array,
      _participant?: RemoteParticipant,
      _kind?: DataPacket_Kind,
      topic?: string
    ) => {
      if (topic && topic === 'order') {
        onOrderCompleted();
        return;
      }

      if (topic && topic !== 'cart:update') return;

      // Data is bytes -> decode to string
      let text = '';
      try {
        text = dec.decode(payload);
      } catch {
        // Some senders might send string directly in older builds;
        // but in current SDK it's Uint8Array.
        return;
      }

      try {
        const data = JSON.parse(text);

        // Accept either topic via arg or in-payload fallback
        const isCart = topic === 'cart:update' || data?.topic === 'cart:update';

        if (!isCart) return;

        // Your agent sends { topic, type, cart}
        if (Array.isArray(data?.cart)) {
          onCart(data.cart);
        }
      } catch (e) {
        console.warn('Non-JSON datachannel message:', e);
      }
    }
  );
}
