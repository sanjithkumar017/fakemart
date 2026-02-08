import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../lib/firebase';

export function useAnalytics() {
  useEffect(() => {
    // Analytics is only available on client-side
    if (!analytics) return;
  }, []);

  const trackEvent = (eventName, eventParams = {}) => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  };

  const trackAddToCart = (product, quantity) => {
    trackEvent('add_to_cart', {
      currency: 'USD',
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          price: product.price,
          quantity: quantity
        }
      ]
    });
  };

  const trackPurchase = (items, total) => {
    trackEvent('purchase', {
      currency: 'USD',
      value: total,
      transaction_id: `ORDER_${Date.now()}`,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.title,
        price: item.price,
        quantity: item.quantity
      }))
    });
  };

  const trackSearch = (searchTerm) => {
    trackEvent('search', {
      search_term: searchTerm
    });
  };

  const trackViewItem = (product) => {
    trackEvent('view_item', {
      currency: 'USD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          item_brand: product.brand,
          item_category: product.category,
          price: product.price
        }
      ]
    });
  };

  return {
    trackEvent,
    trackAddToCart,
    trackPurchase,
    trackSearch,
    trackViewItem
  };
}
