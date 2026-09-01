/**
 * BrandLogo, the single source of truth for the HealthEVV brand mark.
 *
 * Renders the official logo (teal "Health" + orange "EVV" with the
 * person/ribbon/check mark). Two variants:
 *  - "full": the horizontal lockup with wordmark + tagline (default)
 *  - "mark": the icon-only square mark (nav-collapsed, favicons, avatars)
 *
 * Do NOT hand-draw another logo anywhere. Import this instead.
 */

export type BrandLogoVariant = 'full' | 'mark';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  /** Rendered height in px; width scales automatically. */
  height?: number;
  className?: string;
  alt?: string;
}

const SRC: Record<BrandLogoVariant, string> = {
  full: '/brand/healthevv-logo.png',
  mark: '/brand/healthevv-mark.png',
};

export function BrandLogo({
  variant = 'full',
  height = 34,
  className,
  alt = 'HealthEVV. Electronic Visit Verification',
}: BrandLogoProps) {
  return (
    <img
      src={SRC[variant]}
      alt={alt}
      className={className}
      style={{ height, width: 'auto', display: 'block' }}
    />
  );
}
