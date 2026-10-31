"use client";

import { useState, useTransition } from "react";
import {
  cancelOrder,
  signInAsDemoUser,
  signOutDemoUser,
} from "@/app/actions";
import styles from "./page.module.css";

type SessionToolbarProps = {
  currentUserId: string | null;
  currentUserName: string | null;
};

export function SessionToolbar({
  currentUserId,
  currentUserName,
}: SessionToolbarProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className={styles.sessionBar}>
      <div>
        <span className={styles.sessionLabel}>Current Server Session:</span>{" "}
        <strong>
          {currentUserId
            ? `${currentUserName} (${currentUserId})`
            : "Not signed in (Anonymous)"}
        </strong>
      </div>

      <div className={styles.sessionActions}>
        <button
          type="button"
          className={styles.sessionBtn}
          disabled={isPending || currentUserId === "user_abel"}
          onClick={() => startTransition(() => signInAsDemoUser("user_abel"))}
        >
          Sign in as Abel (user_abel)
        </button>

        <button
          type="button"
          className={styles.sessionBtn}
          disabled={isPending || currentUserId === "user_hana"}
          onClick={() => startTransition(() => signInAsDemoUser("user_hana"))}
        >
          Sign in as Hana (user_hana)
        </button>

        <button
          type="button"
          className={styles.sessionBtnSecondary}
          disabled={isPending || !currentUserId}
          onClick={() => startTransition(() => signOutDemoUser())}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

type CancelOrderButtonProps = {
  orderId: string;
  orderOwnerId: string;
  currentUserId: string | null;
  isCancelled: boolean;
};

export function CancelOrderButton({
  orderId,
  orderOwnerId,
  currentUserId,
  isCancelled,
}: CancelOrderButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCancel = () => {
    setFeedback(null);
    startTransition(async () => {
      try {
        await cancelOrder(orderId);
        setFeedback("Order cancelled on server.");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Cancellation failed";
        setFeedback(message);
      }
    });
  };

  if (isCancelled) {
    return <span className={styles.cancelledBadge}>Cancelled</span>;
  }

  const isOwner = currentUserId === orderOwnerId;

  return (
    <div className={styles.cancelControl}>
      <button
        type="button"
        onClick={handleCancel}
        disabled={isPending}
        className={isOwner ? styles.cancelBtn : styles.cancelBtnTestBypass}
      >
        {isPending
          ? "Checking server auth..."
          : isOwner
            ? "Cancel my order"
            : `Attempt cancelOrder("${orderId}")`}
      </button>

      {feedback && (
        <p className={styles.cancelFeedback} role="alert">
          {feedback}
        </p>
      )}
    </div>
  );
}
