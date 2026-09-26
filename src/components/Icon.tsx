import React from "react";
import { StyleProp, Text, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";

export type IconName =
  | "menu"
  | "search"
  | "cart"
  | "home"
  | "coffee"
  | "plus"
  | "minus"
  | "arrow-left"
  | "back"
  | "bin"
  | "close"
  | "chevron-right"
  | "revers"
  | "heart"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "spriteHome"
  | "spriteMenu"
  | "spriteCafe"
  | "spriteCart";

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  filled?: boolean;
}

/* =========================================================
   HOME
   Exact path from sprite.svg:
   icon-home-1
   ========================================================= */

const SpriteHome = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      fill={color}
      d="M32 18.4l-6-6v-9h-4v5l-6-6-16 16v1h4v10h10v-6h4v6h10v-10h4v-1z"
    />
  </Svg>
);

/* =========================================================
   MENU
   Exact path from sprite.svg:
   icon-menu-white
   Cup with steam
   ========================================================= */

const SpriteMenu = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      fill={color}
      d="M24 12.998v-2c0-0.553-0.447-1-1-1h-22c-0.553 0-1 0.447-1 1v14.001c0 0.18 0.061 0.339 0.143 0.485 0.697 3.708 3.947 6.516 7.857 6.516h8c2.521 0 4.756-1.177 6.221-3h1.779c4.418 0 8-3.583 8-8.001 0-4.419-3.582-8.001-8-8.001zM24 24.999v-8.001c2.209 0 4 1.791 4 4.001 0 2.209-1.791 4-4 4zM5.198 8.504c-0.149 0.27-0.132 0.493 0.152 0.493 0.282 0 0.669-0.224 0.766-0.491 0.993-2.589-4.222-4.694-1.071-7.887 0.323-0.331 0.454-0.617 0.168-0.619-0.287-0.003-0.876 0.27-1.186 0.592-3.036 3.119 2.583 5.311 1.171 7.912zM8.975 8.516c-0.037 0.258 0.121 0.481 0.402 0.481 0.279 0 0.55-0.223 0.578-0.479 0.221-1.854-1.261-3.555-0.371-5.159 0.014-0.29-0.327-0.578-0.769-0.617s-0.834 0.179-0.849 0.467c-0.107 2.092 1.27 3.427 1.009 5.307zM13.402 8.997c0.279 0 0.5-0.223 0.553-0.47 0.507-2.396 4.648-3.134 1.526-7.413-0.334-0.442-0.927-0.848-1.214-0.852-0.288-0.005-0.313 0.39-0.122 0.827 3.107 2.932 0.124 5.036-1.197 7.438-0.044 0.247 0.176 0.47 0.454 0.47zM17.429 8.997c0.28 0 0.468-0.225 0.549-0.488 0.76-2.543 9.339-4.187 2.125-7.687-0.752-0.356-1.728-0.654-1.941-0.642-0.217 0.015 0.294 0.384 0.936 0.787 5.897 3.865 0.402 2.699-2.119 7.55-0.082 0.255 0.171 0.48 0.45 0.48z"
    />
  </Svg>
);

/* =========================================================
   CAFE / LOCATION
   Exact path from sprite.svg:
   icon-novigation-white
   ========================================================= */

const SpriteCafe = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      fill={color}
      d="M16 0c-6.186 0-11.2 4.477-11.2 10 0 10 11.2 22 11.2 22s11.2-12 11.2-22c0-5.523-5.014-10-11.2-10zM16 16.125c-3.789 0-6.86-2.742-6.86-6.125s3.071-6.125 6.86-6.125c3.789 0 6.86 2.742 6.86 6.125s-3.071 6.125-6.86 6.125zM11.66 10c0-2.14 1.943-3.875 4.34-3.875s4.34 1.735 4.34 3.875c0 2.14-1.943 3.875-4.34 3.875s-4.34-1.735-4.34-3.875z"
    />
  </Svg>
);

/* =========================================================
   CART / BASKET
   Exact path from sprite.svg:
   icon-basket-1
   Used both in Header and BottomNavigation
   ========================================================= */

const SpriteCart = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      fill={color}
      d="M2 0c-0.53 0-1.039 0.198-1.414 0.551s-0.586 0.832-0.586 1.331c0 0.499 0.211 0.978 0.586 1.331s0.884 0.551 1.414 0.551h2.44l0.61 2.3c0.006 0.026 0.013 0.053 0.020 0.079l2.716 10.221-1.786 1.679c-2.52 2.372-0.736 6.426 2.828 6.426h17.172c0.531 0 1.039-0.198 1.414-0.551s0.586-0.832 0.586-1.331c0-0.499-0.211-0.978-0.586-1.331s-0.884-0.551-1.414-0.551h-17.172l2-1.882h13.172c0.371 0 0.735-0.098 1.051-0.281s0.571-0.447 0.737-0.76l6-11.294c0.152-0.287 0.224-0.606 0.209-0.926s-0.117-0.632-0.296-0.905c-0.179-0.273-0.429-0.498-0.727-0.654s-0.633-0.238-0.974-0.239h-21.441l-0.62-2.34c-0.108-0.407-0.358-0.768-0.71-1.027s-0.785-0.398-1.23-0.398h-4zM28.001 29.176c0 0.749-0.316 1.467-0.879 1.996s-1.326 0.827-2.121 0.827-1.559-0.297-2.121-0.827c-0.563-0.529-0.879-1.248-0.879-1.996s0.316-1.467 0.879-1.996c0.563-0.53 1.326-0.827 2.121-0.827s1.559 0.297 2.121 0.827c0.563 0.529 0.879 1.248 0.879 1.996zM9 32c0.796 0 1.559-0.297 2.121-0.827s0.879-1.248 0.879-1.996-0.316-1.467-0.879-1.996c-0.563-0.53-1.326-0.827-2.121-0.827s-1.559 0.297-2.121 0.827c-0.563 0.53-0.879 1.248-0.879 1.996s0.316 1.467 0.879 1.996c0.563 0.529 1.326 0.827 2.121 0.827s1.559 0.297 2.121 0.827c0.563 0.53 0.879 1.248 0.879 1.996s-0.316 1.467-0.879 1.996c-0.563 0.53-1.326 0.827-2.121 0.827z"
    />
  </Svg>
);

const SpriteBin = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      fill="none"
      stroke={color}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeMiterlimit={4}
      strokeWidth={2.9091}
      d="M22.465 7.273v-1.164c0-1.629 0-2.444-0.352-3.066-0.31-0.547-0.804-0.992-1.413-1.271-0.692-0.317-1.596-0.317-3.407-0.317h-2.586c-1.81 0-2.715 0-3.407 0.317-0.608 0.279-1.103 0.724-1.413 1.271-0.352 0.622-0.352 1.437-0.352 3.066v1.164M12.768 15.273v7.273M19.232 15.273v7.273M1.455 7.273h29.091M27.313 7.273v16.291c0 2.444 0 3.666-0.528 4.599-0.465 0.821-1.207 1.489-2.119 1.907-1.037 0.476-2.395 0.476-5.11 0.476h-7.111c-2.715 0-4.073 0-5.11-0.476-0.912-0.418-1.654-1.086-2.119-1.907-0.528-0.934-0.528-2.155-0.528-4.599v-16.291"
    />
  </Svg>
);

const SpriteRevers = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32">
    <Path
      fill={color}
      d="M27.803 5.197c-2.925-3.194-7.13-5.197-11.803-5.197-8.837 0-16 7.163-16 16h3c0-7.18 5.82-13 13-13 3.844 0 7.298 1.669 9.678 4.322l-4.678 4.678h11v-11l-4.197 4.197z"
    />
    <Path
      fill={color}
      d="M29 16c0 7.18-5.82 13-13 13-3.844 0-7.298-1.669-9.678-4.322l4.678-4.678h-11v11l4.197-4.197c2.925 3.194 7.13 5.197 11.803 5.197 8.837 0 16-7.163 16-16h-3z"
    />
  </Svg>
);

const SpriteInstagram = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32">
    <Path
      fill={color}
      d="M16 2.881c4.275 0 4.781 0.019 6.462 0.094 1.563 0.069 2.406 0.331 2.969 0.55 0.744 0.288 1.281 0.638 1.837 1.194 0.563 0.563 0.906 1.094 1.2 1.838 0.219 0.563 0.481 1.412 0.55 2.969 0.075 1.688 0.094 2.194 0.094 6.463s-0.019 4.781-0.094 6.463c-0.069 1.563-0.331 2.406-0.55 2.969-0.288 0.744-0.637 1.281-1.194 1.837-0.563 0.563-1.094 0.906-1.837 1.2-0.563 0.219-1.413 0.481-2.969 0.55-1.688 0.075-2.194 0.094-6.463 0.094s-4.781-0.019-6.463-0.094c-1.563-0.069-2.406-0.331-2.969-0.55-0.744-0.288-1.281-0.637-1.838-1.194-0.563-0.563-0.906-1.094-1.2-1.837-0.219-0.563-0.481-1.413-0.55-2.969-0.075-1.688-0.094-2.194-0.094-6.463s0.019-4.781 0.094-6.463c0.069-1.563 0.331-2.406 0.55-2.969 0.288-0.744 0.638-1.281 1.194-1.838 0.563-0.563 1.094-0.906 1.838-1.2 0.563-0.219 1.412-0.481 2.969-0.55 1.681-0.075 2.188-0.094 6.463-0.094zM16 0c-4.344 0-4.887 0.019-6.594 0.094-1.7 0.075-2.869 0.35-3.881 0.744-1.056 0.412-1.95 0.956-2.837 1.85-0.894 0.888-1.438 1.781-1.85 2.831-0.394 1.019-0.669 2.181-0.744 3.881-0.075 1.713-0.094 2.256-0.094 6.6s0.019 4.887 0.094 6.594c0.075 1.7 0.35 2.869 0.744 3.881 0.413 1.056 0.956 1.95 1.85 2.837 0.887 0.887 1.781 1.438 2.831 1.844 1.019 0.394 2.181 0.669 3.881 0.744 1.706 0.075 2.25 0.094 6.594 0.094s4.888-0.019 6.594-0.094c1.7-0.075 2.869-0.35 3.881-0.744 1.050-0.406 1.944-0.956 2.831-1.844s1.438-1.781 1.844-2.831c0.394-1.019 0.669-2.181 0.744-3.881 0.075-1.706 0.094-2.25 0.094-6.594s-0.019-4.887-0.094-6.594c-0.075-1.7-0.35-2.869-0.744-3.881-0.394-1.063-0.938-1.956-1.831-2.844-0.887-0.887-1.781-1.438-2.831-1.844-1.019-0.394-2.181-0.669-3.881-0.744-1.712-0.081-2.256-0.1-6.6-0.1v0z"
    />
    <Path
      fill={color}
      d="M16 7.781c-4.537 0-8.219 3.681-8.219 8.219s3.681 8.219 8.219 8.219 8.219-3.681 8.219-8.219c0-4.537-3.681-8.219-8.219-8.219zM16 21.331c-2.944 0-5.331-2.387-5.331-5.331s2.387-5.331 5.331-5.331c2.944 0 5.331 2.387 5.331 5.331s-2.387 5.331-5.331 5.331z"
    />
    <Path
      fill={color}
      d="M26.462 7.456c0 1.060-0.859 1.919-1.919 1.919s-1.919-0.859-1.919-1.919c0-1.060 0.859-1.919 1.919-1.919s1.919 0.859 1.919 1.919z"
    />
  </Svg>
);

const SpriteFacebook = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32">
    <Path
      fill={color}
      d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z"
    />
  </Svg>
);

const SpriteTiktok = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32">
    <Path
      fill={color}
      d="M16.707 0.027c1.747-0.027 3.48-0.013 5.213-0.027 0.107 2.040 0.84 4.12 2.333 5.56 1.493 1.48 3.6 2.16 5.653 2.387v5.373c-1.92-0.067-3.853-0.467-5.6-1.293-0.76-0.347-1.467-0.787-2.16-1.24-0.013 3.893 0.013 7.787-0.027 11.667-0.107 1.867-0.72 3.72-1.8 5.253-1.747 2.56-4.773 4.227-7.88 4.28-1.907 0.107-3.813-0.413-5.44-1.373-2.693-1.587-4.587-4.493-4.867-7.613-0.027-0.667-0.040-1.333-0.013-1.987 0.24-2.533 1.493-4.96 3.44-6.613 2.213-1.92 5.307-2.84 8.2-2.293 0.027 1.973-0.053 3.947-0.053 5.92-1.32-0.427-2.867-0.307-4.027 0.493-0.84 0.547-1.48 1.387-1.813 2.333-0.28 0.68-0.2 1.427-0.187 2.147 0.32 2.187 2.427 4.027 4.667 3.827 1.493-0.013 2.92-0.88 3.693-2.147 0.253-0.44 0.533-0.893 0.547-1.413 0.133-2.387 0.080-4.76 0.093-7.147 0.013-5.373-0.013-10.733 0.027-16.093z"
    />
  </Svg>
);

/* =========================================================
   MAIN ICON COMPONENT
   ========================================================= */

export default function Icon({
  name,
  size = 24,
  color = "#000000",
  style,
  filled = false,
}: IconProps) {
  switch (name) {
    /* Header hamburger */
    case "menu":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
          <Path
            d="M3 6h18M3 12h18M3 18h18"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );

    /* Search */
    case "search":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
          <Path
            d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            fill="none"
            stroke={color}
            strokeWidth={2}
          />
          <Path
            d="m21 21-4.35-4.35"
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );

    /* Header cart */
    case "cart":
      return <SpriteCart size={size} color={color} />;

    /* Home */
    case "home":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
          <Path
            d="M3 11.5 12 4l9 7.5V21H3v-9.5z"
            stroke={color}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <Path
            d="M9 21v-6h6v6"
            stroke={color}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </Svg>
      );

    case "bin":
      return <SpriteBin size={size} color={color} />;

    /* Coffee fallback */
    case "coffee":
      return <SpriteMenu size={size} color={color} />;

    /* Plus */
    case "plus":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
          <Path
            d="M12 5v14M5 12h14"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );

    /* Minus */
    case "minus":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
          <Path
            d="M5 12h14"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );

    /* Back / Arrow left */
    case "back":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
          <Path
            d="M15 5L8 12L15 19"
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case "heart":
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          style={style}
          fill="none"
        >
          <Path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
            fill={filled ? color : "none"}
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    /* Close */
    case "close":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
          <Path
            d="M6 6l12 12M18 6 6 18"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      );

    case "revers":
      return <SpriteRevers size={size} color={color} />;

    case "instagram":
      return <SpriteInstagram size={size} color={color} />;

    case "facebook":
      return <SpriteFacebook size={size} color={color} />;

    case "tiktok":
      return <SpriteTiktok size={size} color={color} />;

    /* Chevron right */
    case "chevron-right":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
          <Path
            d="m9 18 6-6-6-6"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    /* =====================================================
       EXACT SPRITE ICONS
       ===================================================== */

    case "spriteHome":
      return <SpriteHome size={size} color={color} />;

    case "spriteMenu":
      return <SpriteMenu size={size} color={color} />;

    case "spriteCafe":
      return <SpriteCafe size={size} color={color} />;

    case "spriteCart":
      return <SpriteCart size={size} color={color} />;

    default:
      return null;
  }
}
