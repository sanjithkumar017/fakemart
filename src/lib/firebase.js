import { initializeApp, getApps } from 'firebase/app';
import { getPerformance } from 'firebase/performance';

const firebaseConfig = {
  apiKey: "AIzaSyDT3LcHyUVF_-Xn2DMeEoIvSxWKPvTrQ4E",
  authDomain: "fakemart-performance-analytics.firebaseapp.com",
  projectId: "fakemart-performance-analytics",
  storageBucket: "fakemart-performance-analytics.firebasestorage.app",
  messagingSenderId: "678311997305",
  appId: "1:678311997305:web:5364e599497e8e05d2c9a8",
  measurementId: "G-YSM55L45MF"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Performance Monitoring only on client-side
// This automatically tracks Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
let performance;

if (typeof window !== 'undefined') {
  performance = getPerformance(app);
}

export { app, performance };
