export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

/** Renders structured legal copy with consistent, readable typography. */
export function LegalBody({
  intro,
  sections,
  updated,
}: {
  intro: string;
  sections: LegalSection[];
  updated: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-prose">
          <p className="text-sm text-muted-foreground">{updated}</p>
          <p className="mt-4 text-lg leading-relaxed text-foreground">{intro}</p>
          <div className="mt-10 space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-display text-xl font-semibold text-primary">
                  {i + 1}. {section.heading}
                </h2>
                <div className="mt-3 space-y-4 leading-relaxed text-muted-foreground">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
