import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const PALETTE = {
  nodeFill: "#D7E2EA",
  muted: "#D7E2EA",
  nodeStroke: "#D7E2EA",
  accentPurple: "#7621B0",
  accentMagenta: "#B600A8",
  accentBlue: "#657FC0",
};

type BrandIconName = "kmp" | "android" | "apple" | "kotlin" | "compose" | "swift";

function BrandIcon({
                     name,
                     size,
                   }: {
  name: BrandIconName;
  size: number;
}) {
  if (name === "kmp") {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
          <path
              d="M0 22.5629V.0835L22.4794 22.5629H0ZM0 25.4372V48h.0573L22.6201 25.4372H0ZM25.9906 22.0094 48 0H3.9813l22.0093 22.0094ZM26.0193 26.1028 4.1221 48h43.7943L26.0193 26.1028Z"
              fill="url(#brandKmpGradient)"
          />
        </svg>
    );
  }

  if (name === "android") {
    return (
        <svg width={size} height={size} viewBox="0 0 152 89" aria-hidden="true">
          <path
              fill="#34A853"
              d="M151.025 85.224q-.071-.464-.147-.92a75.665 75.665 0 0 0-7.546-22.597 76.5 76.5 0 0 0-5.511-8.995 76 76 0 0 0-8.322-9.808 76.034 76.034 0 0 0-13.398-10.626q.042-.074.085-.148 2.286-3.948 4.572-7.897l4.47-7.712a3946 3946 0 0 0 3.208-5.54q.38-.658.604-1.355a6.97 6.97 0 0 0-.652-5.702 6.9 6.9 0 0 0-2.406-2.398 7 7 0 0 0-2.954-.95 7 7 0 0 0-2.376.206 6.93 6.93 0 0 0-4.22 3.227q-1.606 2.77-3.208 5.54l-4.47 7.712c-1.523 2.634-3.05 5.263-4.573 7.897q-.25.43-.5.865c-.232-.092-.46-.184-.692-.272-8.398-3.205-17.511-4.958-27.036-4.958q-.39-.001-.78.004A75.7 75.7 0 0 0 50.977 25q-1.317.46-2.608.968-.234-.404-.467-.806-2.286-3.95-4.573-7.897l-4.47-7.713a4385 4385 0 0 1-3.208-5.54A6.93 6.93 0 0 0 29.055.58a6.9 6.9 0 0 0-2.954.95 6.92 6.92 0 0 0-3.157 4.185 6.96 6.96 0 0 0 .703 5.27l3.208 5.54 4.47 7.713c1.523 2.634 3.05 5.263 4.573 7.897.01.022.025.044.036.066a76.3 76.3 0 0 0-13.527 10.711 76.5 76.5 0 0 0-8.322 9.808 75.4 75.4 0 0 0-5.51 8.995 75.7 75.7 0 0 0-7.546 22.597 76.038 76.038 0 0 0-.581 4.247h151a77 77 0 0 0-.434-3.327z"
          />
          <path
              fill="#202124"
              d="M115.225 67.663c3.022-2.012 3.461-6.668.981-10.4-2.48-3.73-6.939-5.123-9.96-3.11-3.021 2.012-3.46 6.668-.98 10.4 2.479 3.73 6.938 5.123 9.959 3.11M46.762 64.564c2.48-3.73 2.04-8.387-.98-10.4-3.022-2.012-7.481-.619-9.96 3.112s-2.041 8.387.98 10.4 7.48.62 9.96-3.112"
          />
        </svg>
    );
  }

  if (name === "apple") {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path
              fill="#D7E2EA"
              d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
          />
        </svg>
    );
  }

  if (name === "kotlin") {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
          <path d="M48 48H0V0h48L23.505 23.6475 48 48Z" fill="url(#brandKotlinGradient)" />
        </svg>
    );
  }

  if (name === "compose") {
    return (
        <svg width={size} height={size} viewBox="0 0 50 56" aria-hidden="true">
          <path d="M49 14v28L25 56 1 42V14L25 0l24 14Z" fill="#6075F2" />
          <path d="M34.5 22.5v11L25 39v17l24-14V14L34.5 22.5Z" fill="#6B57FF" />
          <path d="M25 39l-9.5-5.5v-11L1 14v28l24 14V39Z" fill="url(#brandComposeRadial)" />
          <path d="M15.5 22.5 25 17l9.5 5.5L49 14 25 0 1 14l14.5 8.5Z" fill="url(#brandComposeLinear)" />
          <path d="m25 17 9.5 5.5v11L25 39l-9.5-5.5v-11L25 17Z" fill="#0C0C0C" />
        </svg>
    );
  }

  return (
      <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
        <path
            fill="#F05138"
            d="M59.387 16.45a82 82 0 0 0-.027-1.792c-.035-1.301-.112-2.614-.343-3.9-.234-1.307-.618-2.614-1.222-3.71a12.46 12.46 0 0 0-5.453-5.452C51.156.992 49.941.609 48.635.374 47.347.142 46.035.066 44.733.031A85 85 0 0 0 42.941.004C42.23 0 41.52 0 40.813 0H18.578c-.71 0-1.419 0-2.128.004-.597.004-1.195.01-1.792.027-1.302.035-2.615.112-3.902.343-1.307.235-2.522.618-3.708 1.222a12.46 12.46 0 0 0-5.452 5.452C.992 8.235.61 9.45.374 10.758.143 12.044.066 13.357.031 14.658.015 15.255.008 15.853.004 16.45 0 17.16 0 17.869 0 18.578v22.235c0 .71 0 1.418.004 2.128.004.597.01 1.194.027 1.791.035 1.302.112 2.615.343 3.901.235 1.307.618 2.523 1.222 3.71a12.46 12.46 0 0 0 5.453 5.453c1.186.603 2.401.986 3.707 1.22 1.287.232 2.6.31 3.902.344.597.016 1.195.023 1.793.027.709.005 1.417.004 2.127.004h22.235c.709 0 1.418 0 2.128-.004.597-.004 1.194-.011 1.792-.027 1.302-.035 2.614-.112 3.902-.343 1.306-.235 2.521-.618 3.707-1.222a12.46 12.46 0 0 0 5.453-5.452c.604-1.187.987-2.403 1.222-3.71.231-1.286.308-2.6.343-3.9.016-.598.023-1.194.027-1.792.004-.71.004-1.419.004-2.129V18.578c0-.71 0-1.419-.004-2.128Z"
        />
        <path
            fill="#FFF"
            d="m47.06 36.66-.004-.004c.066-.224.134-.446.191-.675 2.465-9.821-3.55-21.432-13.731-27.546 4.461 6.048 6.434 13.374 4.681 19.78-.156.571-.344 1.12-.552 1.653-.225-.148-.51-.316-.89-.527 0 0-10.127-6.252-21.103-17.312-.288-.29 5.852 8.777 12.822 16.14-3.284-1.843-12.434-8.5-18.227-13.802.712 1.187 1.558 2.33 2.489 3.43C17.573 23.932 23.882 31.5 31.44 37.314c-5.31 3.25-12.814 3.502-20.285.003a30.6 30.6 0 0 1-5.193-3.098c3.162 5.058 8.033 9.423 13.96 11.97 7.07 3.039 14.1 2.833 19.336.05l-.004.007c.024-.016.055-.032.08-.047.214-.116.428-.234.636-.358 2.516-1.306 7.485-2.63 10.152 2.559.654 1.27 2.041-5.46-3.061-11.74Z"
        />
      </svg>
  );
}

function Node({
                id,
                x,
                y,
                width,
                height,
                icon,
                label,
                sublabel,
                isActive,
                reduceMotion,
              }: {
  id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  icon?: React.ReactNode;
  label: string;
  sublabel?: string;
  isActive: boolean;
  reduceMotion: boolean;
}) {
  return (
      <g id={id}>
        <motion.rect
            x={x - width / 2}
            y={y - height / 2}
            width={width}
            height={height}
            rx={16}
            fill={isActive ? "url(#kmpNodeActive)" : "url(#kmpNode)"}
            stroke={PALETTE.nodeStroke}
            strokeOpacity={isActive ? 0.32 : 0.18}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}
        />
        {icon && <g transform={`translate(${x - width / 2 + 14}, ${y - 9})`}>{icon}</g>}
        <text
            x={x - width / 2 + (icon ? 40 : 16)}
            y={sublabel ? y - 1 : y + 4}
            fill={PALETTE.nodeFill}
            fontSize={12}
            fontWeight={700}
            letterSpacing={1}
        >
          {label}
        </text>
        {sublabel && (
            <text x={x - width / 2 + (icon ? 40 : 16)} y={y + 14} fill={PALETTE.muted} fillOpacity={0.6} fontSize={9.5} fontWeight={600} letterSpacing={0.8}>
              {sublabel}
            </text>
        )}
      </g>
  );
}

function BranchPath({
                      d,
                      delay,
                      reduceMotion,
                    }: {
  d: string;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
      <>
        <path d={d} fill="none" stroke={PALETTE.muted} strokeOpacity={0.14} strokeWidth={2} />
        <motion.path
            d={d}
            fill="none"
            stroke="url(#kmpLine)"
            strokeWidth={2.2}
            strokeLinecap="round"
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : delay, ease: EASE }}
        />
      </>
  );
}

export default function CrossPlatformDiagram() {
  const reduceMotion = Boolean(useReducedMotion());
  const version = 8;

  return (
      <svg
          viewBox="0 0 640 340"
          role="img"
          aria-labelledby="kmp-diagram-title kmp-diagram-description"
          className="h-auto w-full text-[#D7E2EA]"
          key={version}
      >
        <title id="kmp-diagram-title">Shared Kotlin Multiplatform architecture</title>
        <desc id="kmp-diagram-description">
          A shared KMP core branches to Android and iOS, with Kotlin, Compose, and Swift shown beneath the platform apps.
        </desc>

        <defs>
          <linearGradient id="kmpLine" x1="120" y1="170" x2="520" y2="170" gradientUnits="userSpaceOnUse">
            <stop stopColor={PALETTE.accentMagenta} />
            <stop offset={0.48} stopColor={PALETTE.accentPurple} />
            <stop offset={1} stopColor={PALETTE.accentBlue} />
          </linearGradient>
          <linearGradient id="kmpNode" x1="150" y1="60" x2="490" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor={PALETTE.nodeFill} stopOpacity={0.16} />
            <stop offset={1} stopColor={PALETTE.accentPurple} stopOpacity={0.12} />
          </linearGradient>
          <linearGradient id="kmpNodeActive" x1="150" y1="60" x2="490" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor={PALETTE.nodeFill} stopOpacity={0.22} />
            <stop offset={1} stopColor={PALETTE.accentPurple} stopOpacity={0.18} />
          </linearGradient>
          <radialGradient
              id="brandKmpGradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(43.5 4.5) rotate(135) scale(61.5183)"
          >
            <stop stopColor="#37BCFD" />
            <stop offset={0.58} stopColor="#7F52FF" />
            <stop offset={1} stopColor="#C711E1" />
          </radialGradient>
          <radialGradient
              id="brandKotlinGradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(48 0) rotate(180) scale(48)"
          >
            <stop stopColor="#E44857" />
            <stop offset={0.504} stopColor="#C711E1" />
            <stop offset={1} stopColor="#7F52FF" />
          </radialGradient>
          <radialGradient
              id="brandComposeRadial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(16.13 14.44) scale(42.13)"
          >
            <stop stopColor="#5383EC" />
            <stop offset={0.867} stopColor="#7F52FF" />
          </radialGradient>
          <linearGradient
              id="brandComposeLinear"
              x1="37.17"
              y1="0.38"
              x2="10.97"
              y2="30.04"
              gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#33C3FF" />
            <stop offset={0.878} stopColor="#5383EC" />
          </linearGradient>
        </defs>

        <BranchPath d="M310 82 C310 120,190 132,190 152" delay={0} reduceMotion={reduceMotion} />
        <BranchPath d="M310 82 C310 120,430 132,430 152" delay={0.18} reduceMotion={reduceMotion} />

        <BranchPath d="M190 172 C190 202,95 214,95 236" delay={0.42} reduceMotion={reduceMotion} />
        <BranchPath d="M190 172 C190 202,250 214,250 236" delay={0.52} reduceMotion={reduceMotion} />

        <BranchPath d="M430 172 C430 202,400 214,400 236" delay={0.62} reduceMotion={reduceMotion} />
        <BranchPath d="M430 172 C430 202,545 214,545 236" delay={0.72} reduceMotion={reduceMotion} />

        {!reduceMotion && (
            <g aria-hidden="true">
              <motion.circle
                  cx={310}
                  cy={82}
                  r={3}
                  fill="#D7E2EA"
                  fillOpacity={0.5}
                  animate={{ cx: [310, 250, 190], cy: [82, 126, 152], opacity: [0, 0.5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay: 1.0 }}
              />
              <motion.circle
                  cx={310}
                  cy={82}
                  r={3}
                  fill="#B600A8"
                  fillOpacity={0.5}
                  animate={{ cx: [310, 370, 430], cy: [82, 126, 152], opacity: [0, 0.5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay: 1.8 }}
              />
            </g>
        )}

        <Node
            id="kmp-node"
            x={310}
            y={58}
            width={160}
            height={56}
            icon={<BrandIcon name="kmp" size={22} />}
            label="KMP"
            sublabel="SHARED CODE"
            isActive
            reduceMotion={reduceMotion}
        />

        <Node
            id="android-node"
            x={190}
            y={152}
            width={170}
            height={56}
            icon={<BrandIcon name="android" size={22} />}
            label="ANDROID"
            sublabel="KOTLIN • COMPOSE"
            isActive={false}
            reduceMotion={reduceMotion}
        />

        <Node
            id="ios-node"
            x={430}
            y={152}
            width={170}
            height={56}
            icon={<BrandIcon name="apple" size={22} />}
            label="iOS"
            sublabel="SWIFT • SWIFTUI"
            isActive={false}
            reduceMotion={reduceMotion}
        />

        <Node
            x={95}
            y={260}
            width={118}
            height={44}
            icon={<BrandIcon name="kotlin" size={18} />}
            label="KOTLIN"
            isActive={false}
            reduceMotion={reduceMotion}
        />

        <Node
            x={250}
            y={260}
            width={118}
            height={44}
            icon={<BrandIcon name="compose" size={18} />}
            label="COMPOSE"
            isActive={false}
            reduceMotion={reduceMotion}
        />

        <Node
            x={400}
            y={260}
            width={118}
            height={44}
            icon={<BrandIcon name="swift" size={18} />}
            label="SWIFT"
            isActive={false}
            reduceMotion={reduceMotion}
        />

        <Node
            x={545}
            y={260}
            width={118}
            height={44}
            icon={<BrandIcon name="compose" size={18} />}
            label="COMPOSE"
            isActive={false}
            reduceMotion={reduceMotion}
        />
      </svg>
  );
}