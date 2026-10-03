/** Preserve the brand's spelling inside labels styled with text-transform: uppercase. */
export function BrandNameText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(7oz Espresso)/g).map((part, index) =>
        part === "7oz Espresso" ? (
          <span key={index} className="normal-case">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
