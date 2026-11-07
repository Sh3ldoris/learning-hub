import { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getProductById } from '../mock-data/data';
import { ProductStackScreenProps } from '../types/NavigationParamList';

function ProductDetailScreen({ navigation, route }: ProductStackScreenProps<'ProductDetail'>) {
  const product = useMemo(() => {
    return getProductById(route.params.productId);
  }, [route.params.productId]);

  useEffect(() => {
    if (product?.name) {
      navigation.setOptions({ title: product.name });
    }
  }, [navigation, product]);

  if (!product) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Produkt sa nenašiel.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.subtitle}>
        {product.category} • {product.manufacturer}
      </Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>
          {product.price.toFixed(2)} {product.currency}
        </Text>
        {!!product.originalPrice && (
          <Text style={styles.originalPrice}>
            {product.originalPrice.toFixed(2)} {product.currency}
          </Text>
        )}
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Dostupnosť</Text>
        <Text style={styles.value}>Skladom: {product.stock} ks</Text>
        <Text style={styles.value}>Stav: {product.condition}</Text>
        <Text style={styles.value}>Dostupnosť: {product.availability}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Technické info</Text>
        <Text style={styles.value}>OEM: {product.oemNumber}</Text>
        <Text style={styles.value}>Hmotnosť: {product.weightKg} kg</Text>
        <Text style={styles.value}>Typ stroja: {product.machineType.join(', ')}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Popis</Text>
        <Text style={styles.value}>{product.description}</Text>
        <Text style={styles.value}>{product.compatibility}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Doručenie a záruka</Text>
        <Text style={styles.value}>{product.shipping}</Text>
        <Text style={styles.value}>{product.warranty}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Hodnotenie</Text>
        <Text style={styles.value}>
          {product.rating.toFixed(1)} / 5 ({product.reviewCount} recenzií)
        </Text>
      </View>

      <View style={styles.tags}>
        {product.tags.map(tag => (
          <View key={tag} style={styles.tagChip}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 4,
    color: '#6E6E73',
  },
  priceRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
  },
  originalPrice: {
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },
  block: {
    marginTop: 18,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  value: {
    lineHeight: 20,
    marginBottom: 4,
  },
  tags: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    backgroundColor: '#EEF2FF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    color: '#3641A3',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
