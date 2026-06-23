import Image from "next/image";
import {
  PortableText,
  type PortableTextBlockComponent,
  type PortableTextComponents,
  type PortableTextMarkComponent,
  type PortableTextTypeComponent,
} from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

/**
 * Renders the Portable Text body of an `activitate` / `pagina` / `erasmus`
 * document. Custom renderers cover the schema's own types (localizedImage,
 * embed, callout) and keep the heading scale tight (h2/h3/h4 only — never
 * h1, that's the page title).
 */

const block: Record<string, PortableTextBlockComponent> = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 text-[clamp(1.8rem,3.4vw,2.4rem)]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-3 text-[clamp(1.4rem,2.4vw,1.7rem)]">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-8 mb-2 text-lg font-semibold text-navy">{children}</h4>
  ),
  normal: ({ children }) => (
    <p className="mb-5 text-[1.05rem] leading-relaxed text-ink/85 text-pretty">
      {children}
    </p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-gold pl-6 italic text-navy text-lg">
      {children}
    </blockquote>
  ),
};

const marks: Record<string, PortableTextMarkComponent> = {
  strong: ({ children }) => (
    <strong className="font-semibold text-navy">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="rounded bg-parchment-2 px-1.5 py-0.5 font-mono text-sm">
      {children}
    </code>
  ),
};

const types: Record<string, PortableTextTypeComponent<any>> = {
  localizedImage: ({ value }) => {
    if (!value?.asset) return null;
    const w =
      value.asset.metadata?.dimensions?.width ??
      value.metadata?.dimensions?.width ??
      1600;
    const h =
      value.asset.metadata?.dimensions?.height ??
      value.metadata?.dimensions?.height ??
      900;
    return (
      <figure className="my-10 -mx-4 sm:mx-0">
        <div className="overflow-hidden rounded-2xl border border-navy/10">
          <Image
            src={urlFor(value).width(1600).auto("format").url()}
            alt={value.alt || ""}
            width={w}
            height={h}
            sizes="(min-width: 1024px) 800px, 100vw"
            className="h-auto w-full"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-3 text-center text-sm italic text-muted">
            {value.caption}
          </figcaption>
        )}
      </figure>
    );
  },
  callout: ({ value }) => (
    <aside className="my-10 rounded-2xl border-l-4 border-gold bg-paper p-6 shadow-sm">
      <p className="font-serif text-xl italic text-navy">{value.text}</p>
      {value.attribution && (
        <p className="mt-3 text-sm text-muted">— {value.attribution}</p>
      )}
    </aside>
  ),
  embed: ({ value }) => {
    if (!value?.url) return null;
    return (
      <div className="my-10 aspect-video overflow-hidden rounded-2xl">
        <iframe
          src={value.url}
          title={value.title || "Conținut încorporat"}
          loading="lazy"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  },
};

const components: PortableTextComponents = { block, marks, types };

export function PortableArticleBody({ value }: { value: unknown[] }) {
  if (!value?.length) return null;
  return (
    <div className="prose-wrap">
      <PortableText value={value as never} components={components} />
    </div>
  );
}
