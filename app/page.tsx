import { site, getImage, timeline, videos, videosIntro, gallery, audio } from "@/src/content";
import { Nav } from "@/src/components/shared/Nav";
import { AudioToggle } from "@/src/components/shared/AudioToggle";
import { Hero } from "@/src/components/landing/Hero";
import { TimelineIntro } from "@/src/components/timeline/TimelineIntro";
import { Timeline } from "@/src/components/timeline/Timeline";
import { WatchSection } from "@/src/components/watch/WatchSection";
import { GallerySection } from "@/src/components/gallery/GallerySection";

/**
 * Phase 1: the landing hero and full timeline, composed entirely from
 * /content JSON. No Sam Neill-specific copy or image path lives here — swap
 * the JSON and the page re-dresses itself.
 */
export default function Home() {
  const heroPortrait = getImage(site.hero.portrait);

  // Drop nav links that point at experiences disabled for this build.
  const navLinks = site.nav.links.filter(
    (link) => link.target !== "movie-suggestor" || site.features.movieSuggestor,
  );

  return (
    <>
      <Nav brand={site.nav.brand} links={navLinks} menuLabel={site.nav.menuLabel} />

      <main className="font-editorial text-bone">
        <Hero
          id="hero"
          name={site.hero.name}
          dates={site.hero.dates}
          tagline={site.hero.tagline}
          scrollPrompt={site.hero.scrollPrompt}
          portrait={heroPortrait}
        />

        <TimelineIntro
          id="timeline"
          title={site.timelineIntro.title}
          description={site.timelineIntro.description}
        />

        <Timeline
          id="timeline-body"
          entries={timeline.entries}
          ending={{
            id: "tribute",
            text: site.timelineEnding.text,
            signoff: site.timelineEnding.signoff,
          }}
        />

        <WatchSection
          id="watch"
          eyebrow={videosIntro.eyebrow}
          title={videosIntro.title}
          description={videosIntro.description}
          videos={videos}
        />

        <GallerySection
          id="gallery"
          eyebrow={gallery.intro.eyebrow}
          title={gallery.intro.title}
          description={gallery.intro.description}
          images={gallery.images}
        />

        <footer className="border-t border-bone/10 px-[var(--space-page-mobile)] py-12 text-center font-ui text-xs text-muted sm:px-[var(--space-page-tablet)]">
          {site.footer.copy}
        </footer>
      </main>

      {site.features.audio && audio.tracks.length ? (
        <AudioToggle tracks={audio.tracks} anecdote={audio.anecdote} />
      ) : null}
    </>
  );
}
