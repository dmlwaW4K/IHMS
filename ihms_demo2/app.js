// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDiutUzakrilPP2UW4jkg1LNdaibbpETIE",
  authDomain: "ihms-login.firebaseapp.com",
  projectId: "ihms-login",
  storageBucket: "ihms-login.firebasestorage.app",
  messagingSenderId: "532734352548",
  appId: "1:532734352548:web:14a5726281b85644305a31",
  measurementId: "G-GJ901E6FJW"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Role-based login for Doctor/Admin
window.handleRoleLogin = async function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const role = new URLSearchParams(window.location.search).get('role');
  try {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    const userDoc = await db.collection('users').doc(cred.user.uid).get();
    if (!userDoc.exists || userDoc.data().role !== role) {
      throw new Error('Invalid role for this account!');
    }
    if (role === 'doctor') {
      window.location.href = 'doctor-dashboard.html';
    } else if (role === 'admin') {
      window.location.href = 'admin-dashboard.html';
    } else if (role === 'user') {
      window.location.href = 'user-dashboard.html';
    } else {
      window.location.href = 'role-login.html';
    }
  } catch (err) {
    document.getElementById('error-msg').textContent = err.message;
    auth.signOut();
  }
}

// Google Login for user
window.handleRoleLogin = async function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const role = new URLSearchParams(window.location.search).get('role');

  try {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    const userDoc = await db.collection('users').doc(cred.user.uid).get();
    if (!userDoc.exists || userDoc.data().role !== role) {
      throw new Error('Invalid role for this account!');
    }

    // Redirect: runs only if user and role are valid
    if (role === 'doctor') {
      window.location.href = 'doctor-dashboard.html';
    } else if (role === 'admin') {
      window.location.href = 'admin-dashboard.html';
    } else if (role === 'user') {
      window.location.href = 'user-dashboard.html';
    } else {
      window.location.href = 'role-login.html';
    }
  } catch (err) {
    document.getElementById('error-msg').textContent = err.message;
    auth.signOut();
  }
}

