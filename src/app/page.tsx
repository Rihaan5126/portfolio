import { profile, socialLinks } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { AllProjects } from "@/components/sections/AllProjects";
import { About } from "@/components/sections/About";
import { Toolkit } from "@/components/sections/Toolkit";
import { Experience } from "@/components/sections/Experience";
import { Now } from "@/components/sections/Now";
import { Contact } from "@/components/sections/Contact";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Birmingham",
    addressCountry: "GB",
  },
  affiliation: { "@type": "CollegeOrUniversity", name: "University of Birmingham" },
  sameAs: socialLinks.filter((link) => link.icon !== "email").map((link) => link.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <SelectedWork />
      <AllProjects />
      <About />
      <Toolkit />
      <Experience />
      <Now />
      <Contact />
    </>
  );
}
