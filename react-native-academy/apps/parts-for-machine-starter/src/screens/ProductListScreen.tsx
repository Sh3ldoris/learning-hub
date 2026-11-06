import { useCallback, useEffect, useMemo, useRef } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { getProductList, Product } from '../mock-data/data';
import { ProductStackScreenProps } from '../types/NavigationParamList';

const keyExtractor = (item: Product) => item.id;

function ProductSeparator() {
  return <View style={styles.separator} />;
}

function ProductListScreen({ navigation, route }: ProductStackScreenProps<'ProductList'>) {
  const flatListRef = useRef<FlatList>(null);

  // Navigation to production detail screen
  const navigateToProductDetail = useCallback(
    (productId: string) => {
      navigation.navigate('ProductDetail', { productId });
    },
    [navigation],
  );
  const openFilter = useCallback(() => {
    navigation.navigate('ProductFilter', route.params);
  }, [navigation, route.params]);
  // Filtered products
  const productList = useMemo(() => getProductList(route.params), [route.params]);

  const openMenu = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  // Scroll to top when navigation params change (e.g., after returning from filter)
  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [route.params]);

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <Pressable style={styles.card} onPress={() => navigateToProductDetail(item.id)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>
          {item.category} • {item.manufacturer}
        </Text>
        <Text style={styles.meta}>Typ stroja: {item.machineType.join(', ')}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>
            {item.price.toFixed(2)} {item.currency}
          </Text>
          <Text style={styles.stock}>Skladom: {item.stock}</Text>
        </View>
      </Pressable>
    ),
    [navigateToProductDetail],
  );

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Pressable style={styles.menuButton} onPress={openMenu}>
          <Text style={styles.menuButtonText}>Menu</Text>
        </Pressable>
        <Pressable style={styles.menuButton} onPress={openFilter}>
          <Text style={styles.menuButtonText}>Filter</Text>
        </Pressable>
      </View>
      <FlatList
        ref={flatListRef}
        data={productList}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={ProductSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    padding: 14,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
  },
  meta: {
    color: '#6E6E73',
    marginBottom: 4,
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
  stock: {
    fontSize: 13,
    color: '#006C3C',
    fontWeight: '600',
  },
  separator: {
    height: 10,
  },
  toolbar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  menuButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ProductListScreen;
