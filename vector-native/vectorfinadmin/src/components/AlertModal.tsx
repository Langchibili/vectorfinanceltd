import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import APP from '../config/app';

export interface AlertData { title?: string; body?: string; data?: any }

export function AlertModal({ open, alert, onOpen, onDismiss }: { open: boolean; alert: AlertData | null; onOpen: (a: AlertData) => void; onDismiss: () => void }) {
  if (!alert) return null;
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={s.backdrop}>
        <View style={[s.card, { backgroundColor: APP.colors.card, borderColor: APP.colors.accent }]}>
          <Text style={[s.title, { color: APP.colors.text }]}>{alert.title}</Text>
          <Text style={[s.body, { color: APP.colors.muted }]}>{alert.body}</Text>
          <View style={s.row}>
            <Pressable style={s.ghost} onPress={onDismiss}><Text style={{ color: APP.colors.muted, fontWeight: '600' }}>Dismiss</Text></Pressable>
            <Pressable style={[s.primary, { backgroundColor: APP.colors.accent }]} onPress={() => onOpen(alert)}><Text style={s.primaryTxt}>View</Text></Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 24 },
  card: { borderRadius: 18, borderWidth: 1, padding: 22 },
  title: { fontSize: 18, fontWeight: '800' }, body: { fontSize: 15, marginTop: 8, lineHeight: 21 },
  row: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, gap: 10 },
  ghost: { paddingVertical: 12, paddingHorizontal: 16 }, primary: { paddingVertical: 12, paddingHorizontal: 22, borderRadius: 10 },
  primaryTxt: { color: '#fff', fontWeight: '700' },
});
