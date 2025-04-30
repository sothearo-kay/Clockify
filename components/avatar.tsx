import React from "react";
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

// @ts-ignore: suppress value-used-as-type error for TouchableOpacity
export const Avatar = React.forwardRef<TouchableOpacity, AvatarProps>(
  ({ source, seed, size = 48, style, ...props }, ref) => {
    const avatarSource = source || {
      uri: `https://api.dicebear.com/9.x/identicon/png?seed=${encodeURIComponent(seed || "default")}`,
    };

    return (
      <TouchableOpacity
        ref={ref}
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
          resizeMode="cover"
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      </TouchableOpacity>
    );
  },
);

Avatar.displayName = "Avatar";

const styles = StyleSheet.create({
  avatarContainer: {
    overflow: "hidden",
    backgroundColor: "#E5E7EB", // light gray background if image not loaded
  },
});
