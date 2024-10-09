import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'| 'weather'|'error'|'catlogTitle'| 'details' | 'greenTitle';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'catlogTitle' ? styles.catlogTitle : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'weather' ? styles.weather : undefined,
        type === "error" ? styles.error : undefined,
        type === "details" ? styles.details : undefined,
        type === "greenTitle" ? styles.greenTitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weather: {
    fontSize: 14,
    fontWeight: '600',
    color:"#FFA500",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  error: {
    fontSize: 14,
    fontWeight: '600',
    color: "#FF9494",
    // Color / FF9494
  },
  catlogTitle: {
    fontSize: 16,
    fontWeight:'500'
  },
   details: {
    fontSize: 16,
     marginBottom: 3,
    fontWeight:'300'
   },
   greenTitle: {
     fontSize: 17,
     lineHeight: 24,
    color: "#00A86B",
    fontWeight: '600',
   },
  
});
