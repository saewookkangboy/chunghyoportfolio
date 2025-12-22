const ADMIN_PASSWORD_KEY = 'admin_password_hash';

// 간단한 비밀번호 해시 (실제 프로덕션에서는 더 강력한 인증 필요)
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

export const setAdminPassword = (password: string): void => {
  if (password.length < 4) {
    throw new Error('Password must be at least 4 characters');
  }
  localStorage.setItem(ADMIN_PASSWORD_KEY, hashPassword(password));
};

export const checkAdminPassword = (password: string): boolean => {
  const storedHash = localStorage.getItem(ADMIN_PASSWORD_KEY);
  if (!storedHash) {
    // 기본 비밀번호 설정 (처음 사용 시)
    if (password === 'admin') {
      setAdminPassword('admin');
      return true;
    }
    return false;
  }
  return storedHash === hashPassword(password);
};

export const isAdminAuthenticated = (): boolean => {
  return sessionStorage.getItem('admin_authenticated') === 'true';
};

export const setAdminAuthenticated = (authenticated: boolean): void => {
  if (authenticated) {
    sessionStorage.setItem('admin_authenticated', 'true');
  } else {
    sessionStorage.removeItem('admin_authenticated');
  }
};

export const logout = (): void => {
  setAdminAuthenticated(false);
};

