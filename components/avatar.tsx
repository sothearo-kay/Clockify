import {
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableOpacityProps,
  ImageSourcePropType,
} from "react-native";

interface AvatarProps extends TouchableOpacityProps {
  source?: ImageSourcePropType;
  seed?: string;
  size?: number;
}

export function Avatar({
  source,
  seed,
  size = 48,
  style,
  ...props
}: AvatarProps) {
  const avatarSource = source || {
    uri: `https://api.dicebear.com/9.x/identicon/png?seed=${encodeURIComponent(seed || "default")}`,
  };

  return (
    <TouchableOpacity
      style={[
        styles.avatarContainer,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <Image
        source={avatarSource}
        style={[
          styles.avatarImage,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    overflow: "hidden",
    backgroundColor: "#E5E7EB", // light gray background if image not loaded
  },
  avatarImage: {
    resizeMode: "cover",
  },
});
