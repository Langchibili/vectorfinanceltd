import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export function ConnectionLostBanner({ visible, onRetry, message }: { visible: boolean; onRetry: () => void; message: string }) {
  if (!visible) return null;
  return (
    <View style={s.bar}>
      <Text style={s.txt}>{message}</Text>
      <Pressable onPress={onRetry}><Text style={s.btn}>Retry</Text></Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  bar: { backgroundColor: '#B91C1C', paddingVertical: 8, paddingHorizontal: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  txt: { color: '#fff', fontSize: 13 }, btn: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
