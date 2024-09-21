import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface ExpandableTextProps {
  text: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text }) => {
    console.debug("descript", text);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : text.substring(0, 100) + '...';
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>{displayText}</ThemedText>
      <TouchableOpacity onPress={toggleExpand}>
        <ThemedText type="link" style={{fontSize:12,margin:1}} >
          {isExpanded ? 'Show Less' : 'Show More'}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  link: {
    color: 'blue',
    marginTop: 5,
  },
});

export default ExpandableText;