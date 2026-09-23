import { assets } from "../content/assets";
import { ui } from "../content/slides";
import type { Ground } from "../content/slides";

interface Props {
  ground: Ground;
  width: number;
  className?: string;
}

/**
 * The client logo has a white box behind it. On the light ground it is knocked
 * out with multiply; on the dark ground (or if the file is missing) the company
 * name is set as text instead (brief Section 3).
 */
export function Wordmark({ ground, width, className = "" }: Props) {
  if (assets.logo && ground === "glass") {
    return <img className={`wordmark wordmark--img ${className}`} src={assets.logo} alt={ui.logoAlt} width={width} />;
  }
  return <span className={`wordmark wordmark--text ${className}`}>{ui.companyName}</span>;
}
