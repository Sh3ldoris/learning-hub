import { usePreventRemove } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { getCartProducts } from '../mock-data/data';
import { RootStackScreenProps } from '../types/NavigationParamList';

const cartProducts = getCartProducts();
const totalPrice = cartProducts.reduce((sum, product) => sum + product.price, 0);

function CheckoutCartScreen({ navigation }: RootStackScreenProps<'CheckoutCart'>) {
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');

  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const hasUnsavedChanges = useMemo(() => {
    return (
      fullName !== '' ||
      street !== '' ||
      city !== '' ||
      zip !== '' ||
      phone !== '' ||
      cardHolder !== '' ||
      cardNumber !== '' ||
      expiry !== '' ||
      cvc !== ''
    );
  }, [fullName, street, city, zip, phone, cardHolder, cardNumber, expiry, cvc]);

  usePreventRemove(hasUnsavedChanges, ({ data }) => {
    Alert.alert('Zahodiť zmeny?', 'Máš neuložené zmeny. Naozaj chceš odísť a zahodiť ich?', [
      { text: 'Zostať', style: 'cancel', onPress: () => {} },
      {
        text: 'Zahodiť',
        style: 'destructive',
        onPress: () => navigation.dispatch(data.action),
      },
    ]);
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>Tvoj košík</Text>

        {cartProducts.map(product => (
          <View key={product.id} style={styles.card}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.meta}>
              {product.category} • {product.manufacturer}
            </Text>
            <View style={styles.row}>
              <Text style={styles.price}>
                {product.price.toFixed(2)} {product.currency}
              </Text>
              <Text style={styles.quantity}>1 ks</Text>
            </View>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Spolu</Text>
          <Text style={styles.totalValue}>{totalPrice.toFixed(2)} EUR</Text>
        </View>

        <Text style={[styles.sectionTitle]}>Doručovacia adresa</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Meno a priezvisko</Text>
          <TextInput
            style={styles.input}
            placeholder="Peter Kováč"
            placeholderTextColor="#A0A0A5"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={[styles.label]}>Ulica a číslo</Text>
          <TextInput
            style={styles.input}
            placeholder="Hlavná 42"
            placeholderTextColor="#A0A0A5"
            value={street}
            onChangeText={setStreet}
          />

          <Text style={[styles.label, styles.labelSpacing]}>Mesto</Text>
          <TextInput
            style={styles.input}
            placeholder="Žilina"
            placeholderTextColor="#A0A0A5"
            value={city}
            onChangeText={setCity}
          />

          <Text style={[styles.label, styles.labelSpacing]}>PSČ</Text>
          <TextInput
            style={styles.input}
            placeholder="010 01"
            placeholderTextColor="#A0A0A5"
            keyboardType="number-pad"
            value={zip}
            onChangeText={setZip}
          />

          <Text style={[styles.label, styles.labelSpacing]}>Telefón</Text>
          <TextInput
            style={styles.input}
            placeholder="+421 903 123 456"
            placeholderTextColor="#A0A0A5"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Text style={[styles.sectionTitle]}>Platba kartou</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Držiteľ karty</Text>
          <TextInput
            style={styles.input}
            placeholder="PETER KOVAC"
            placeholderTextColor="#A0A0A5"
            autoCapitalize="characters"
            autoCorrect={false}
            value={cardHolder}
            onChangeText={setCardHolder}
          />

          <Text style={[styles.label, styles.labelSpacing]}>Číslo karty</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            placeholderTextColor="#A0A0A5"
            keyboardType="number-pad"
            maxLength={19}
            value={cardNumber}
            onChangeText={setCardNumber}
          />

          <View style={styles.inlineRow}>
            <View style={styles.inlineField}>
              <Text style={[styles.label, styles.labelSpacing]}>Platnosť (MM/RR)</Text>
              <TextInput
                style={styles.input}
                placeholder="09/29"
                placeholderTextColor="#A0A0A5"
                keyboardType="number-pad"
                maxLength={5}
                value={expiry}
                onChangeText={setExpiry}
              />
            </View>

            <View style={styles.inlineField}>
              <Text style={[styles.label, styles.labelSpacing]}>CVC</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                placeholderTextColor="#A0A0A5"
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
                value={cvc}
                onChangeText={setCvc}
              />
            </View>
          </View>
        </View>

        <Text style={styles.note}>Platba je zabezpečená. Údaje o karte neukladáme.</Text>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          android_ripple={{ color: '#FFFFFF33' }}
        >
          <Text style={styles.primaryButtonText}>Kúpiť</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    padding: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  meta: {
    color: '#6E6E73',
    fontSize: 13,
  },
  row: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  quantity: {
    fontSize: 13,
    color: '#6E6E73',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6E6E73',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6E6E73',
    marginBottom: 6,
  },
  labelSpacing: {
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
  inlineRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inlineField: {
    flex: 1,
  },
  note: {
    marginTop: 4,
    color: '#6E6E73',
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: '#3641A3',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonPressed: {
    backgroundColor: '#2A3280',
    opacity: 0.9,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CheckoutCartScreen;
