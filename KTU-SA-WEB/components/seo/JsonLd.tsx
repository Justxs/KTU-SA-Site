type JsonLdProps = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: Readonly<JsonLdProps>) {
  const jsonString = JSON.stringify(data);
  // Escape < to prevent XSS by breaking out of the script tag (e.g., </script>)
  const escapedJson = jsonString.replaceAll('<', '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: escapedJson }} />;
}
