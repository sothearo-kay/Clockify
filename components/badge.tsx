import {
  Text,
  View,
  StyleSheet,
  ViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { AttendanceStatus } from "@/constants/attendance";

type Variant = "default" | "outline" | "custom";

interface BadgeProps extends React.PropsWithChildren<ViewProps> {
  variant?: Variant;
  label?: string;
  status?: AttendanceStatus;
  style?: StyleProp<ViewStyle>;
}

// Base styles by variant
const badgeVariantStyles: Record<
  Variant,
  {
    container: { backgroundColor?: string; borderColor?: string };
    text: { color?: string };
  }
> = {
  default: {
    container: {
      backgroundColor: "#3B82F6",
      borderColor: "transparent",
    },
    text: {
      color: "#ffffff",
    },
  },
  outline: {
    container: {
      backgroundColor: "#F9FAFB",
      borderColor: "#D1D5DB",
    },
    text: {
      color: "#374151",
    },
  },
  custom: {
    container: {},
    text: {},
  },
};

// Status styles for `outline` variant
const outlineStatusColors: Partial<
  Record<
    AttendanceStatus,
    {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
    }
  >
> = {
  [AttendanceStatus.PRESENT]: {
    backgroundColor: "#DBEAFE",
    textColor: "#1E40AF",
    borderColor: "#93C5FD",
  },
  [AttendanceStatus.LATE]: {
    backgroundColor: "#FEF9C3",
    textColor: "#92400E",
    borderColor: "#FACC15",
  },
};

// Status styles for `default` variant (only background override)
const defaultStatusColors: Record<
  AttendanceStatus,
  {
    backgroundColor: string;
  }
> = {
  [AttendanceStatus.PRESENT]: { backgroundColor: "#2563EB" },
  [AttendanceStatus.ABSENT]: { backgroundColor: "#DC2626" },
  [AttendanceStatus.LATE]: { backgroundColor: "#CA8A04" },
};

// Utility to compute final styles
function getStatusStyles(variant: Variant, status?: AttendanceStatus) {
  if (!status) return {};

  if (variant === "outline") {
    return outlineStatusColors[status] ?? {};
  }

  if (variant === "default") {
    return {
      backgroundColor: defaultStatusColors[status]?.backgroundColor,
    };
  }

  return {};
}

export function Badge({
  variant = "default",
  label,
  status,
  style,
  children,
  ...props
}: BadgeProps) {
  const base = badgeVariantStyles[variant] ?? badgeVariantStyles.default;
  const statusStyle = getStatusStyles(variant, status);
  const hasCustomContent = !!children;

  return (
    <View
      style={[
        baseStyles.container,
        {
          backgroundColor:
            statusStyle.backgroundColor ?? base.container.backgroundColor,
          borderColor:
            (statusStyle as any).borderColor ?? base.container.borderColor,
        },
        style,
      ]}
      {...props}
    >
      {hasCustomContent ? (
        children
      ) : (
        <Text
          style={[
            baseStyles.text,
            {
              color: (statusStyle as any).textColor ?? base.text.color,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
