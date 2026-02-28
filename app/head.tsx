export default function Head() {
  return (
    <>
      {/* Recommended by Google for connecting a site */}
      <meta name="google-adsense-account" content="ca-pub-8427240368416109" />

      {/* AdSense loader (must be in <head>) */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8427240368416109"
        crossOrigin="anonymous"
      />
    </>
  );
}