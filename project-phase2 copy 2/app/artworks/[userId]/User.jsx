import React from 'react';
import styles from '@/app/styles/page.module.css';

export default function User({ user, moneyBalance, shippingAddress }) {
  const isCustomer = user?.moneyBalance !== undefined && user?.shippingAddress !== undefined;

  return (
    <>
      <section className={styles.accountInfo} id="account-info">
        <p>Hello, {user.username}!</p>
        <img className={styles.img} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" width="100" height="100" alt="User Avatar" />
        <p className={styles.cardText}>Username: {user.username}</p>
        <p className={styles.cardText}>Email: {user.email}</p>
        {/* Conditionally display additional information if user is a customer */}
        {isCustomer && (
          <>
            {moneyBalance && <p className={styles.cardText}>Balance: {moneyBalance}</p>}
            {shippingAddress && <p className={styles.cardText}>Shipping Address: {shippingAddress}</p>}
          </>
        )}
      </section>
    </>
  );
}

