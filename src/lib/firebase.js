import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

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

// Initialize Analytics only on client-side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
