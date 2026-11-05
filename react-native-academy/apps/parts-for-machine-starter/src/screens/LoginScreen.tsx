import { useCallback, useContext } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LoginContextProvider } from '../context/LoginContext';

function LoginScreen() {
  const { setIsLoggedIn } = useContext(LoginContextProvider);
  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>PM</Text>
        </View>
        <Text style={styles.title}>Parts for Machine</Text>
        <Text style={styles.subtitle}>Prihláste sa a pokračujte k náhradným dielom</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="peter.kovac@agrostroje.sk"
          placeholderTextColor="#A0A0A5"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={[styles.label]}>Heslo</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#A0A0A5"
          secureTextEntry
        />

        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          android_ripple={{ color: '#FFFFFF33' }}
          onPress={handleLogin}
        >
          <Text style={styles.primaryButtonText}>Prihlásiť sa</Text>
        </Pressable>
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>alebo</Text>
        <View style={styles.divider} />
      </View>

      <Text style={styles.footer}>
        Nemáte účet? <Text style={styles.footerLink}>Zaregistrujte sa</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#3641A3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 4,
    color: '#6E6E73',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    padding: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6E6E73',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: 'flex-end',
    fontSize: 13,
    fontWeight: '600',
    color: '#3641A3',
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: '#3641A3',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButtonPressed: {
    backgroundColor: '#2A3280',
    opacity: 0.9,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E6E6E6',
  },
  dividerText: {
    color: '#6E6E73',
    fontSize: 13,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    color: '#6E6E73',
    fontSize: 13,
  },
  footerLink: {
    color: '#3641A3',
    fontWeight: '700',
  },
});

export default LoginScreen;
