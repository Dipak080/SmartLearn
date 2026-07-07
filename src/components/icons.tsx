import React from 'react';
import Svg, { Path, Circle, Rect, Text as SvgText } from 'react-native-svg';

import { useAppTheme } from '../theme';

interface IconProps {
  size?: number;
  color?: string;
}

export function PlayIcon({ size = 16, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.white;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M8 5v14l11-7z" fill={iconColor} />
    </Svg>
  );
}

export function BellIcon({ size = 20, color }: IconProps) {
  const iconColor = color || '#2F3656';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"
        stroke={iconColor}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path d="M10 20a2 2 0 0 0 4 0" stroke={iconColor} strokeWidth={1.7} />
    </Svg>
  );
}

export function CheckIcon({ size = 18, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.navy;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12.5 10 17l9-10"
        stroke={iconColor}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BackIcon({ size = 20, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.navy;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M5 12l6-6M5 12l6 6"
        stroke={iconColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ClockIcon({ size = 14, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.textSecondary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={iconColor} strokeWidth={2} />
      <Path d="M12 7.5V12l3 2" stroke={iconColor} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BookOutlineIcon({ size = 14, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.textSecondary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 5c2.5-1.2 5.5-1 8 1.2C14.5 4 17.5 3.8 20 5v13.4c-2.5-1.2-5.5-1-8 1.2-2.5-2.2-5.5-2.4-8-1.2z"
        stroke={iconColor}
        strokeWidth={1.9}
        strokeLinejoin="round"
      />
      <Path d="M12 6.4v12.4" stroke={color} strokeWidth={1.9} />
    </Svg>
  );
}

export function ChevronDownIcon({ size = 14, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.navy;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9.5l6 6 6-6"
        stroke={iconColor}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PaletteIcon({ size = 18, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.navy;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.8-.5-1.3 0-1.1.9-1.9 2-1.9h2.3A3.7 3.7 0 0 0 21 10.7C21 6.4 17 3 12 3z"
        stroke={iconColor}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Circle cx={7.6} cy={11} r={1.15} fill={color} />
      <Circle cx={10.5} cy={7.3} r={1.15} fill={color} />
      <Circle cx={15.2} cy={7.3} r={1.15} fill={color} />
    </Svg>
  );
}

export function ShapesIcon({ size = 18, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.navy;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={7} cy={7} r={4} stroke={iconColor} strokeWidth={1.6} />
      <Path
        d="M16.5 3.5l4 7h-8l4-7z"
        stroke={iconColor}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Rect x={13.5} y={13.5} width={7} height={7} rx={1.2} stroke={iconColor} strokeWidth={1.6} />
      <Rect x={3.5} y={13.5} width={7} height={7} rx={1.2} stroke={iconColor} strokeWidth={1.6} />
    </Svg>
  );
}

export function WaveIcon({ size = 14, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.textSecondary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 11.5V8.5a1.5 1.5 0 0 1 3 0v2M10 8.5V6a1.5 1.5 0 0 1 3 0v2.5M13 8.5V7a1.5 1.5 0 0 1 3 0v4.5"
        stroke={iconColor}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.5 12.5c1.2 2.2 3.1 3.5 5.5 3.5s4.3-1.3 5.5-3.5"
        stroke={iconColor}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <Path
        d="M4.5 10.5 3 12l1.5 1.5M19.5 10.5 21 12l-1.5 1.5"
        stroke={iconColor}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function FireIcon({
  size = 18,
  color,
  innerColor,
  colored,
}: IconProps & { innerColor?: string; colored?: boolean }) {
  const { colors } = useAppTheme();
  const outer = colored ? colors.fire : (color || colors.navy);
  const inner = colored ? colors.fireSoft : (innerColor || colors.white);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3c1.5 2.5 4 3.5 4 7a4 4 0 1 1-8 0c0-2 1-3.2 2.5-4.5C10.5 4.5 11 3.8 12 3z"
        fill={outer}
        opacity={0.9}
      />
      <Path
        d="M12 11.5c.8 1.2 1.5 2 1.5 3a1.5 1.5 0 1 1-3 0c0-.8.4-1.5 1-2.2"
        fill={inner}
      />
    </Svg>
  );
}

export function TrophyIcon({ size = 18, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.navy;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 4h8v3.5c0 2.2-1.8 4-4 4s-4-1.8-4-4V4z"
        stroke={iconColor}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path
        d="M8 5.5H5.5a1.5 1.5 0 0 0 0 3H8M16 5.5h2.5a1.5 1.5 0 0 1 0 3H16"
        stroke={iconColor}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
      <Path d="M10 15.5h4v2.5H8.5L7 20h10l-1.5-2H14v-2.5" stroke={iconColor} strokeWidth={1.7} strokeLinejoin="round" />
    </Svg>
  );
}

export function RobotNotifIcon({ size = 18, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.navy;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={5} y={8} width={14} height={11} rx={3} stroke={iconColor} strokeWidth={1.7} />
      <Path d="M12 5V8M9 5h6" stroke={iconColor} strokeWidth={1.7} strokeLinecap="round" />
      <Circle cx={9.5} cy={13} r={1.2} fill={iconColor} />
      <Circle cx={14.5} cy={13} r={1.2} fill={iconColor} />
      <Path d="M10 16.5h4" stroke={iconColor} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

const STAR_NOTIF_PATH =
  'M19.6097 3.25166C19.9362 3.17446 20.1825 3.54501 19.9849 3.8161L14.8612 10.8473C14.799 10.9325 14.7773 11.0406 14.8015 11.1433L16.8039 19.6097C16.8811 19.9362 16.5105 20.1825 16.2395 19.9849L9.20826 14.8612C9.12303 14.7991 9.01492 14.7773 8.91229 14.8016L0.445813 16.8039C0.119385 16.8811 -0.126922 16.5106 0.070627 16.2395L5.19439 9.20827C5.2565 9.12304 5.27827 9.01493 5.254 8.91231L3.25164 0.445825C3.17444 0.119398 3.54499 -0.126909 3.81608 0.0706387L10.8473 5.1944C10.9325 5.25651 11.0406 5.27828 11.1432 5.25401L19.6097 3.25166Z';

export function StarNotifIcon({ size = 18, color }: IconProps) {
  const { colors } = useAppTheme();
  const iconColor = color || colors.navy;
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none">
      <Path d={STAR_NOTIF_PATH} fill={iconColor} />
    </Svg>
  );
}

export type NotificationIconName = 'streak' | 'badge' | 'lesson' | 'report';

export function NotificationIcon({
  name,
  size = 18,
  color,
}: {
  name: NotificationIconName;
  size?: number;
  color?: string;
}) {
  switch (name) {
    case 'streak':
      return <FireIcon size={size} color={color} />;
    case 'badge':
      return <TrophyIcon size={size} color={color} />;
    case 'lesson':
      return <RobotNotifIcon size={size} color={color} />;
    case 'report':
      return <StarNotifIcon size={size} color={color} />;
  }
}

export type TabIconName = 'home' | 'book' | 'stats' | 'profile';

export function TabIcon({
  name,
  color,
  active = false,
}: {
  name: TabIconName;
  color: string;
  active?: boolean;
}) {
  // When active: the outer shape is filled white and inner details are navy.
  const fill = active ? '#FFFFFF' : 'none';
  const detail = active ? '#1C274C' : color;
  switch (name) {
    case 'home':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Path
            d="M4 10.8 12 4l8 6.8v8.2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
            fill={fill}
            stroke={color}
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
          <Path d="M10 15.5c1.2 1 2.8 1 4 0" stroke={detail} strokeWidth={1.6} strokeLinecap="round" />
        </Svg>
      );
    case 'book':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Path
            d="M5 5a2 2 0 0 1 2-2h12v15.5H7A2 2 0 0 0 5 20z"
            fill={fill}
            stroke={color}
            strokeWidth={1.7}
            strokeLinejoin="round"
          />
          <Path d="M5 20a2 2 0 0 0 2 2h12" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
          <SvgText
            x={12}
            y={12.5}
            fontSize={7.5}
            fontWeight="bold"
            fill={detail}
            textAnchor="middle"
          >
            AI
          </SvgText>
        </Svg>
      );
    case 'stats':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Rect x={3.5} y={3.5} width={17} height={17} rx={5} fill={fill} stroke={color} strokeWidth={1.7} />
          <Path
            d="M8.5 15.5v-4M12 15.5v-7M15.5 15.5v-2.5"
            stroke={detail}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'profile':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Circle cx={12} cy={8} r={4} fill={fill} stroke={color} strokeWidth={1.8} />
          <Path
            d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"
            fill={fill}
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </Svg>
      );
  }
}
