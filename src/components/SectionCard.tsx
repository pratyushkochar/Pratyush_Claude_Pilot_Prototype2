interface Props {
  title: string;
  badges?: { text: string; style: "blue" | "success" | "caution" }[];
  children: React.ReactNode;
  annotation?: string;
}

const BADGE_STYLES = {
  blue:    "bg-primary-3 text-primary-9 border border-primary-4",
  success: "bg-success-3 text-success-11 border border-success-4",
  caution: "bg-caution-3 text-caution-11 border border-caution-4",
};

export default function SectionCard({ title, badges, children, annotation }: Props) {
  return (
    <div className="bg-white rounded-lg border border-primary-6 overflow-hidden shadow-[0px_1px_3px_rgba(13,15,20,0.1),0px_1px_2px_rgba(13,15,20,0.06)]">
      <div className="px-5 py-4 border-b border-primary-5 flex items-center gap-2 flex-wrap">
        <h2 className="text-heading6 text-primary-13">{title}</h2>
        {badges?.map((b) => (
          <span key={b.text} className={`inline-flex items-center px-2 py-0.5 rounded text-label3 font-semibold ${BADGE_STYLES[b.style]}`}>
            {b.text}
          </span>
        ))}
      </div>
      {annotation && (
        <div className="px-5 py-2 bg-caution-3 border-b border-caution-4 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-caution-11">info</span>
          <span className="text-body3 text-caution-11">{annotation}</span>
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}
