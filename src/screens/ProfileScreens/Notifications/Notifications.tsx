import { StyleSheet, Switch, View } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'components/Text';
import { useTranslation } from 'context/LanguageContext';

const Notifications = () => {
  const [emailNotification, setEmailNotification] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);
  const [monthlyNotification, setMonthlyNotification] = useState(false);

  const { NotificationsContext } = useTranslation();

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text text={NotificationsContext.email} header4 />
          <Switch
            onChange={() => setEmailNotification(!emailNotification)}
            value={emailNotification}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text text={NotificationsContext.push} header4 />
          <Switch
            onChange={() => setPushNotification(!pushNotification)}
            value={pushNotification}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text text={NotificationsContext.monthly} header4 />
          <Switch
            onChange={() => setMonthlyNotification(!monthlyNotification)}
            value={monthlyNotification}
          />
        </View>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 24,
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 16,

    borderRadius: 16,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 63,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#EDF2F7',
  },
});
