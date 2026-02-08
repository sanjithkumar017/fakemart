import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../components/CartProvider';
import styles from './checkout.module.css';

export default function Checkout() {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearCart();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    });
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '') && items.length > 0;
  };

  if (items.length === 0 && !showSuccess) {
    return (
      <>
        <Head>
          <title>Checkout - FakeMart</title>
        </Head>
        <div className="container">
          <div className={styles.emptyCart}>
            <h1 className={styles.emptyCartTitle}>Your cart is empty</h1>
            <p className={styles.emptyCartText}>
              Add some products to your cart to continue shopping.
            </p>
            <Link href="/" className={styles.shopButton}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - FakeMart</title>
        <meta name="description" content="Complete your purchase at FakeMart" />
      </Head>

      <div className="container">
        <div className={styles.checkoutPage}>
          <h1 className={styles.title}>Checkout</h1>

          <div className={styles.checkoutContainer}>
            <div className={styles.mainSection}>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Shopping Cart</h2>
                <div className={styles.cartItems}>
                  {items.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={80}
                        height={80}
                        className={styles.itemImage}
                      />
                      <div className={styles.itemInfo}>
                        <div className={styles.itemTitle}>{item.title}</div>
                        <div className={styles.itemPrice}>${item.price.toFixed(2)} each</div>
                        <div className={styles.itemControls}>
                          <div className={styles.quantityControl}>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className={styles.quantityButton}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className={styles.quantityValue}>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className={styles.quantityButton}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className={styles.removeButton}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Shipping Information</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName" className={styles.label}>
                        First Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="lastName" className={styles.label}>
                        Last Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="address" className={styles.label}>
                      Address <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="city" className={styles.label}>
                        City <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="state" className={styles.label}>
                        State <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="zip" className={styles.label}>
                      ZIP Code <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className={styles.sidebar}>
              <div className={styles.summary}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                
                <div className={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className={styles.summaryRow}>
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
                <div className={styles.summaryRow}>
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className={styles.summaryTotal}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  className={styles.placeOrderButton}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className={styles.successModal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Order Successful!</h2>
            <p className={styles.modalText}>
              Thank you for your order! Your order has been placed successfully.
              You will receive a confirmation email shortly.
            </p>
            <Link href="/" className={styles.modalButton} onClick={handleSuccessClose}>
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
