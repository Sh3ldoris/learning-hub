import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const user = {
  name: 'Ing. Peter Kováč',
  role: 'Servisný technik',
  company: 'AgroStroje s.r.o.',
  email: 'peter.kovac@agrostroje.sk',
  phone: '+421 903 123 456',
  address: 'Hlavná 42, 010 01 Žilina',
  memberSince: '12. 3. 2019',
  orders: 47,
  favorites: 12,
  machines: ['Bager JCB 3CX', 'Traktor Zetor 7745', 'Nakladač Bobcat S450'],
};

const userPhotoUri = { uri: 'https://i.pravatar.cc/200?img=12' };

function UserDetailScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image source={userPhotoUri} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>
          {user.role} • {user.company}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.orders}</Text>
          <Text style={styles.statLabel}>Objednávky</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.favorites}</Text>
          <Text style={styles.statLabel}>Obľúbené</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user.machines.length}</Text>
          <Text style={styles.statLabel}>Stroje</Text>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Kontakt</Text>
        <Text style={styles.value}>E-mail: {user.email}</Text>
        <Text style={styles.value}>Telefón: {user.phone}</Text>
        <Text style={styles.value}>Adresa: {user.address}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Moje stroje</Text>
        {user.machines.map(machine => (
          <Text key={machine} style={styles.value}>
            • {machine}
          </Text>
        ))}
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Členstvo</Text>
        <Text style={styles.value}>Registrovaný od: {user.memberSince}</Text>
        <Text style={styles.value}>Vernostný program: Zlatý partner</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E6E6E6',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  role: {
    marginTop: 4,
    color: '#6E6E73',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    marginTop: 2,
    fontSize: 12,
    color: '#6E6E73',
  },
  block: {
    marginTop: 20,
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
});

export default UserDetailScreen;
