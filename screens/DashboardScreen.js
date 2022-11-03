import React from 'react';
import Card from '../components/Card/Card';
import {ScrollView} from 'native-base';

const DashboardScreen = () => {
  return (
    <ScrollView>
      <Card
        amount={80}
        title="Orders Count"
        hasCurrency={false}
        bgColor="#6CB2EB"
      />
      <Card
        amount={800.0}
        title="Income"
        hasCurrency={true}
        bgColor="#38C172"
      />
      <Card
        amount={0.0}
        title="Income Today"
        hasCurrency={true}
        bgColor="#E3342F"
      />

      <Card
        amount={1}
        title="Customers Count"
        hasCurrency={false}
        bgColor="#FFED4A"
      />
    </ScrollView>
  );
};

export default DashboardScreen;
