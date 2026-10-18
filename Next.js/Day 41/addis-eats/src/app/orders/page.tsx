import Link from "next/link";
import { getSession, listOrders } from "@/lib/ordersStore";
import { CancelOrderButton, SessionToolbar } from "./CancelOrderControls";
import styles from "./page.module.css";

export default async function OrdersPage() {
  const [orders, session] = await Promise.all([listOrders(), getSession()]);

  return (
    <div className={styles.ordersPage}>
      <section className={styles.ordersHeader}>
        <span className="eyebrow">SERVER ACTIONS & REVALIDATION</span>
        <h1>Orders & Authorisation</h1>
        <p>
          New orders placed via the <code>placeOrder</code> server action call{" "}
          <code>revalidatePath(&quot;/orders&quot;)</code> and appear here immediately.
          Every <code>cancelOrder</code> call verifies both the session and record
          ownership inside the server action itself.
        </p>
      </section>

      <SessionToolbar
        currentUserId={session?.id ?? null}
        currentUserName={session?.name ?? null}
      />

      <section className={styles.ordersList}>
        {orders.map((order) => (
          <article key={order.id} className={styles.orderCard}>
            <div className={styles.orderCardTop}>
              <div>
                <span className={styles.orderId}>{order.id}</span>
                <h2>{order.customerName}</h2>
                <p className={styles.orderMeta}>
                  Owner: <code>{order.userId}</code> · Phone: {order.phone} ·
                  Address: {order.address}
                </p>
              </div>

              <div className={styles.orderStatusWrap}>
                <span
                  className={
                    order.status === "Cancelled"
                      ? styles.statusCancelled
                      : styles.statusConfirmed
                  }
                >
                  {order.status}
                </span>
                <strong className={styles.orderTotal}>
                  {order.total} {order.currency}
                </strong>
              </div>
            </div>

            <div className={styles.orderItems}>
              {order.items.map((item) => (
                <span key={item.id} className={styles.orderItemPill}>
                  {item.name} × {item.quantity} ({item.price * item.quantity} ETB)
                </span>
              ))}
            </div>

            <div className={styles.orderFooter}>
              <CancelOrderButton
                orderId={order.id}
                orderOwnerId={order.userId}
                currentUserId={session?.id ?? null}
                isCancelled={order.status === "Cancelled"}
              />
            </div>
          </article>
        ))}
      </section>

      <div className={styles.ordersActions}>
        <Link href="/checkout" className="button button--primary">
          Place another order →
        </Link>
        <Link href="/menu" className="button button--secondary">
          Back to menu
        </Link>
      </div>
    </div>
  );
}
