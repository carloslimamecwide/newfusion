import Image from "next/image";
import { Icon, type IconName } from "@/components/Icon";

export function ServiceVisual({ icon, title, label, image }: { icon: IconName; title: string; label: string; image: string }) {
  return (
    <div className="service-visual" data-reveal="media">
      <Image src={image} alt={label} fill sizes="(max-width: 1480px) 100vw, 1480px" className="object-cover grayscale" />
      <div className="service-visual-caption">
        <span className="service-visual-icon"><Icon name={icon} size={27} /></span>
        <p>{title}</p>
      </div>
    </div>
  );
}
