import { CommonActions } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProductSortBy, SortDirection } from '../mock-data/data';
import { RootStackScreenProps } from '../types/NavigationParamList';

const SORT_OPTIONS: { value: ProductSortBy; label: string }[] = [
  { value: 'name', label: 'Názov' },
  { value: 'price', label: 'Cena' },
  { value: 'rating', label: 'Hodnotenie' },
  { value: 'condition', label: 'Stav' },
];

const DIRECTION_OPTIONS: { value: SortDirection; label: string }[] = [
  { value: 'asc', label: 'Vzostupne' },
  { value: 'desc', label: 'Zostupne' },
];

function ProductFilterScreen({ navigation, route }: RootStackScreenProps<'ProductFilter'>) {
  const [sortBy, setSortBy] = useState<ProductSortBy | undefined>(
    route.params.currentFilter?.sortBy,
  );
  const [direction, setDirection] = useState<SortDirection>(
    route.params.currentFilter?.direction ?? 'asc',
  );

  const toggleSortBy = useCallback((value: ProductSortBy) => {
    setSortBy(current => (current === value ? undefined : value));
  }, []);

  const applyFilter = useCallback(() => {
    // Need to change params for source screen as goBack function doesn't have an option for params
    // Mutate the params of provided source screen (from where the filter was opened)
    navigation.dispatch({
      ...CommonActions.setParams({
        sortBy,
        direction,
      }),
      source: route.params.sourceScreenKey,
      target: route.params.sourceNavigatorKey,
    });
    navigation.goBack();
  }, [
    navigation,
    sortBy,
    direction,
    route.params.sourceScreenKey,
    route.params.sourceNavigatorKey,
  ]);

  const resetFilter = useCallback(() => {
    setSortBy(undefined);
    setDirection('asc');
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Zoradiť podľa</Text>
          <View style={styles.chipRow}>
            {SORT_OPTIONS.map(option => {
              const selected = sortBy === option.value;
              return (
                <Pressable
                  key={option.value}
                  style={[styles.chip, selected && styles.chipSelected]}
                  onPress={() => toggleSortBy(option.value)}
                >
                  <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Smer zoradenia</Text>
          <View style={styles.chipRow}>
            {DIRECTION_OPTIONS.map(option => {
              const selected = direction === option.value;
              return (
                <Pressable
                  key={option.value}
                  style={[
                    styles.chip,
                    selected && styles.chipSelected,
                    !sortBy && styles.chipDisabled,
                  ]}
                  disabled={!sortBy}
                  onPress={() => setDirection(option.value)}
                >
                  <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {!sortBy && <Text style={styles.hint}>Najprv vyber, podľa čoho sa má zoraďovať.</Text>}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={[styles.button, styles.secondaryButton]} onPress={resetFilter}>
          <Text style={styles.secondaryButtonText}>Zrušiť filter</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.primaryButton]} onPress={applyFilter}>
          <Text style={styles.primaryButtonText}>Použiť filter</Text>
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
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    padding: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  chipSelected: {
    backgroundColor: '#1C1C1E',
    borderColor: '#1C1C1E',
  },
  chipDisabled: {
    opacity: 0.4,
  },
  chipText: {
    color: '#1C1C1E',
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  hint: {
    marginTop: 10,
    color: '#6E6E73',
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#1C1C1E',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1C1C1E',
  },
  secondaryButtonText: {
    color: '#1C1C1E',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProductFilterScreen;
