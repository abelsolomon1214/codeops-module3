import { NextRequest } from "next/server";
import { getOrderById } from "@/lib/ordersStore";

const NEIGHBORHOOD_COORDS: Record<string, [number, number]> = {
  Bole: [8.995, 38.7896],
  Kazanchis: [9.0182, 38.7715],
  Piassa: [9.0345, 38.7516],
  "Sarbet / Old Airport": [8.9972, 38.7368],
  "CMC / Ayat": [9.0197, 38.8378],
};

function getDestinationCoords(address: string): [number, number] {
  for (const [zone, coords] of Object.entries(NEIGHBORHOOD_COORDS)) {
    if (address.toLowerCase().includes(zone.toLowerCase())) {
      return coords;
    }
  }
  return [8.995, 38.7896];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    return new Response("Order not found", { status: 404 });
  }

  const destCoords = getDestinationCoords(order.address);
  let courierLat = destCoords[0] - 0.012;
  let courierLng = destCoords[1] - 0.008;

  let step = 0;
  const statuses = ["Confirmed", "Preparing", "Out for Delivery", "Delivered"];
  let currentStatusIndex = 1;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (payload: unknown) => {
        const message = "data: " + JSON.stringify(payload) + "\n\n";
        controller.enqueue(encoder.encode(message));
      };

      sendEvent({
        orderId: order.id,
        status: statuses[currentStatusIndex],
        courier: {
          name: "Almaz Kebede",
          phone: "+251 91 123 4567",
          position: [courierLat, courierLng],
        },
        destination: {
          address: order.address,
          position: destCoords,
        },
        estimatedArrival: new Date(Date.now() + 18 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const interval = setInterval(() => {
        step++;

        courierLat += (destCoords[0] - courierLat) * 0.25;
        courierLng += (destCoords[1] - courierLng) * 0.25;

        if (step === 2) {
          currentStatusIndex = 2;
        } else if (step >= 5) {
          currentStatusIndex = 3;
        }

        const currentStatus = statuses[currentStatusIndex];

        sendEvent({
          orderId: order.id,
          status: currentStatus,
          courier: {
            name: "Almaz Kebede",
            phone: "+251 91 123 4567",
            position: [Number(courierLat.toFixed(5)), Number(courierLng.toFixed(5))],
          },
          destination: {
            address: order.address,
            position: destCoords,
          },
          estimatedArrival: new Date(Date.now() + Math.max(2, 18 - step * 3) * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
        });

        if (currentStatus === "Delivered" || step >= 6) {
          clearInterval(interval);
          controller.close();
        }
      }, 4000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        try {
          controller.close();
        } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
