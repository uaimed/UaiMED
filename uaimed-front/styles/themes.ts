/**
 * Arquivo de Colors e Estilos Globais
 * Centraliza as cores e estilos utilizados em toda a aplicação
 */

// ===== CORES PRIMÁRIAS =====
export const colors = {
  // Brand Colors
  primary: '#4CAF50', // Verde UaiMED
  primaryDark: '#388E3C',
  secondary: '#4B73B2', // Azul
  
  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#D9534F',
  info: '#2196F3',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#666666',
  lightGray: '#999999',
  veryLightGray: '#F0F0F0',
  backgroundColor: '#F9F9F9',
  borderColor: '#DDD',
  dividerColor: '#EEE',
  
  // Text Colors
  textPrimary: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textInverse: '#FFFFFF',
};

// ===== TIPOGRAFIA =====
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 12,
    color: colors.textTertiary,
  },
};

// ===== ESPAÇAMENTOS =====
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// ===== BORDER RADIUS =====
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 999,
};

// ===== SHADOWS (iOS e Android) =====
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
};

// ===== COMPONENTES REUTILIZÁVEIS =====
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
  },
  button: {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondaryText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  divider: {
    height: 1,
    backgroundColor: colors.dividerColor,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  commonStyles,
};
