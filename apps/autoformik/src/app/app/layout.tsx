"use client";
import {
  ISection,
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sections: ISection[] = [
    {
      id: "demo-1",
      name: "Demo 1",
      link: "/app/demo-1",
    },
    {
      id: "demo-2",
      name: "Demo 2",
      link: "/app/demo-2",
    },
    {
      id: "demo-3",
      name: "Demo 3",
      link: "/app/demo-3",
    },
  ];
  const sectionId = pathname.split("/app/")[1];
  return (
    <SectionLayout
      sections={sections}
      linkElement={Link}
      defaultActiveSectionId={sectionId}
    >
      <SectionLayoutContent sectionId={sectionId} className="h-screen">
        {children}
      </SectionLayoutContent>
    </SectionLayout>
  );
}
