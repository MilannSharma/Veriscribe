export const isLoggedIn = (): boolean => {
  try {
    return localStorage.getItem('veriscribe_logged_in') === 'true';
  } catch (e) {
    return false;
  }
};

export const loginUser = (name: string, email: string, phone: string) => {
  try {
    localStorage.setItem('veriscribe_logged_in', 'true');
    localStorage.setItem('veriscribe_user_name', name);
    localStorage.setItem('veriscribe_user_email', email);
    localStorage.setItem('veriscribe_user_phone', phone);
    
    // Dispatch custom event to let other components react immediately
    window.dispatchEvent(new Event('veriscribe_auth_change'));
  } catch (e) {
    console.error('Failed to save login state:', e);
  }
};

export const logoutUser = () => {
  try {
    localStorage.removeItem('veriscribe_logged_in');
    localStorage.removeItem('veriscribe_user_name');
    localStorage.removeItem('veriscribe_user_email');
    localStorage.removeItem('veriscribe_user_phone');
    
    window.dispatchEvent(new Event('veriscribe_auth_change'));
  } catch (e) {
    console.error('Failed to log out:', e);
  }
};
