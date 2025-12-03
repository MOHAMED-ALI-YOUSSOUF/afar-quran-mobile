import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Search, BookMarked } from 'lucide-react-native';
import surahs from '@/data/surahs.json';

interface Surah {
  number: number;
  name: string;
  transliteration: string;
  startPage: number;
  endPage: number;
  verses: number;
}

export default function SurahList() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = surahs.filter((surah) =>
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.number.toString().includes(searchQuery)
  );

  const handleSurahPress = (surah: Surah) => {
    router.push(`/page/${surah.startPage}`);
  };

  const renderSurah = ({ item }: { item: Surah }) => (
    <TouchableOpacity
      style={[styles.surahCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => handleSurahPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.surahLeft}>
        <View style={[styles.numberBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.numberText}>{item.number}</Text>
        </View>
        <View style={styles.surahInfo}>
          <Text style={[styles.surahName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.surahTransliteration, { color: colors.icon }]}>
            {item.transliteration}
          </Text>
        </View>
      </View>
      <View style={styles.surahRight}>
        <Text style={[styles.verses, { color: colors.icon }]}>{item.verses} verses</Text>
        <Text style={[styles.pageRange, { color: colors.primary }]}>
          Pages {item.startPage}-{item.endPage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <BookMarked size={28} color={colors.primary} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>Surahs</Text>
        </View>
        <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
          Browse all 114 chapters of the Quran
        </Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Search size={20} color={colors.icon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search surahs..."
          placeholderTextColor={colors.icon}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredSurahs}
        renderItem={renderSurah}
        keyExtractor={(item) => item.number.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginLeft: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  surahCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  surahLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  numberBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  surahTransliteration: {
    fontSize: 14,
  },
  surahRight: {
    alignItems: 'flex-end',
  },
  verses: {
    fontSize: 12,
    marginBottom: 4,
  },
  pageRange: {
    fontSize: 13,
    fontWeight: '600',
  },
});
