import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { QuranPage } from '@/components/quran-page';
import { AudioPlayer } from '@/components/audio-player';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ArrowLeft, BookOpen } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PageViewer() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const pageNumber = parseInt(id as string, 10) || 1;
  const [showControls, setShowControls] = useState(true);

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      router.replace(`/page/${pageNumber - 1}`);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < 604) {
      router.replace(`/page/${pageNumber + 1}`);
    }
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar hidden />

      {showControls && (
        <SafeAreaView style={[styles.header, { backgroundColor: colors.card }]} edges={['top']}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <BookOpen size={20} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Page {pageNumber}</Text>
          </View>
          <View style={styles.placeholder} />
        </SafeAreaView>
      )}

      <TouchableOpacity
        activeOpacity={1}
        onPress={toggleControls}
        style={styles.pageContainer}
      >
        <QuranPage
          pageNumber={pageNumber}
          onSwipeLeft={handleNextPage}
          onSwipeRight={handlePreviousPage}
        />
      </TouchableOpacity>

      {showControls && (
        <AudioPlayer
          pageNumber={pageNumber}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
          canGoPrevious={pageNumber > 1}
          canGoNext={pageNumber < 604}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  pageContainer: {
    flex: 1,
  },
});
