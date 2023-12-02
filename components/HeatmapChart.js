import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryAxis, VictoryHeatmap, VictoryLabel } from 'victory-native';

const HeatmapChart = ({ data, xLabels, yLabels }) => {
  // Calculate max value for color scale
  const maxValue = Math.max(...data.map(row => Math.max(...row)));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heatmap</Text>
      <VictoryChart domainPadding={10}>
        <VictoryHeatmap
          data={data}
          colorScale="heatmap"
          domain={{ x: [0, xLabels.length], y: [0, yLabels.length] }}
          interpolation="natural"
          style={{
            data: {
              stroke: '#fff',
              strokeWidth: 1,
            },
          }}
          labels={(d) => d.y === 0 || d.x === 0 ? d.value : null}
          labelComponent={<VictoryLabel dy={10} />}
        />
        <VictoryAxis
          tickValues={xLabels}
          tickFormat={(tickValue) => xLabels[tickValue]}
        />
        <VictoryAxis dependentAxis tickValues={yLabels} tickFormat={(tickValue) => yLabels[tickValue]} />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HeatmapChart;
