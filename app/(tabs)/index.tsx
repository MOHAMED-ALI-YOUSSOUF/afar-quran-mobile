import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BookOpen, BookMarked, Moon, Sun } from 'lucide-react-native';
import surahs from '@/data/surahs.json';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const popularSurahs = [
    surahs[0],
    surahs[1],
    surahs[17],
    surahs[35],
    surahs[54],
  ];

  const handleReadQuran = () => {
    router.push('/page/1');
  };

  const handleSurahPress = (startPage: number) => {
    router.push(`/page/${startPage}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>As-salamu Alaykum</Text>
            <Text style={[styles.subtitle, { color: colors.icon }]}>
              Read and listen to the Quran
            </Text>
          </View>
          <View style={[styles.iconBadge, { backgroundColor: colors.primary }]}>
            {colorScheme === 'dark' ? (
              <Moon size={24} color="#FFFFFF" />
            ) : (
              <Sun size={24} color="#FFFFFF" />
            )}
          </View>
        </View>

        <View style={[styles.heroCard, { backgroundColor: colors.primary }]}>
          <View style={styles.heroContent}>
            <BookOpen size={40} color="#FFFFFF" />
            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>Quran Kareem</Text>
              <Text style={styles.heroSubtitle}>604 pages • Afar translation & audio</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: colors.card }]}
            onPress={handleReadQuran}
            activeOpacity={0.8}
          >
            <Text style={[styles.startButtonText, { color: colors.primary }]}>Start Reading</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookMarked size={22} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Surahs</Text>
          </View>

          {popularSurahs.map((surah) => (
            <TouchableOpacity
              key={surah.number}
              style={[styles.surahCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => handleSurahPress(surah.startPage)}
              activeOpacity={0.7}
            >
              <View style={styles.surahLeft}>
                <View style={[styles.numberBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.numberText}>{surah.number}</Text>
                </View>
                <View style={styles.surahInfo}>
                  <Text style={[styles.surahName, { color: colors.text }]}>{surah.name}</Text>
                  <Text style={[styles.surahTransliteration, { color: colors.icon }]}>
                    {surah.transliteration}
                  </Text>
                </View>
              </View>
              <Text style={[styles.verses, { color: colors.icon }]}>{surah.verses} verses</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCard: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  startButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
  },
  surahTransliteration: {
    fontSize: 13,
  },
  verses: {
    fontSize: 12,
  },
  bottomPadding: {
    height: 40,
  },
});
