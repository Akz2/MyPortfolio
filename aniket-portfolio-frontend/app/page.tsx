// app/page.tsx
'use client';

import { useEffect, useState } from 'react';

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string | null;
  githubUrl: string;
};

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [loading, setLoading] = useState(!!baseUrl);

  useEffect(() => {
    if (!baseUrl) {
      console.error('NEXT_PUBLIC_API_BASE_URL is missing');
      return;
    }

    async function fetchData() {
      try {
        const [projectsRes, resumeRes] = await Promise.all([
          fetch(`${baseUrl}/api/projects`),
          fetch(`${baseUrl}/api/resume`),
        ]);

        if (!projectsRes.ok || !resumeRes.ok) {
          throw new Error('API response was not ok');
        }

        const projectsData = await projectsRes.json();
        const resumeData = await resumeRes.json();

        setProjects(projectsData);
        setResumeUrl(resumeData?.url ?? null);
      } catch (error) {
        console.error('Failed to load data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [baseUrl]);

  return (
    <main className="min-h-screen bg-zinc-50 text-black">
      {/* Hero */}
      <section className="border-b-4 border-black px-6 py-12 md:px-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] mb-4 text-zinc-500">
            Portfolio / 2026
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            ANIKET SINGH
          </h1>
          <p className="text-xl md:text-2xl italic font-serif text-zinc-700 mb-8 max-w-2xl">
            Computer Science graduate crafting minimal, brutalist web experiences with React,
            Node.js and SQL backends.
          </p>
          <div className="flex flex-wrap gap-4">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border-2 border-black bg-black text-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.15em] shadow-[6px_6px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#000] transition-transform"
              >
                View Resume
              </a>
            )}
            <a
              href="mailto:fentonptc890@gmail.com"
              className="inline-flex items-center border-2 border-black bg-white text-black px-5 py-2 text-sm font-semibold uppercase tracking-[0.15em] hover:bg-red-500 hover:text-white transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 py-12 md:px-16 md:py-16 bg-zinc-100 border-b-4 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-[0.15em]">
              Projects
            </h2>
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Featured work
            </span>
          </div>

          {loading ? (
            <p className="text-sm text-zinc-500">Loading projects…</p>
          ) : projects.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No projects in the database yet. We&apos;ll seed some soon.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="border-2 border-black bg-white p-5 shadow-[6px_6px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#000] transition-transform"
                >
                  <h3 className="text-lg font-bold uppercase tracking-[0.12em] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-700 mb-4">{project.description}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-4">
                    {project.techStack.join(' • ')}
                  </p>
                  <div className="flex gap-3 text-xs font-semibold uppercase tracking-[0.15em]">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 decoration-[3px] decoration-red-500 hover:bg-black hover:text-white px-2 py-1"
                    >
                      GitHub
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 decoration-[3px] decoration-red-500 hover:bg-black hover:text-white px-2 py-1"
                      >
                        Live Site
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Certifications */}
      <section className="px-6 py-12 md:px-16 md:py-16 bg-white border-b-4 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-[0.15em]">
              Certifications
            </h2>
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Professional Training
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="border-2 border-black bg-zinc-50 p-5 shadow-[6px_6px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#000] transition-transform">
              <h3 className="text-lg font-bold uppercase tracking-[0.12em] mb-2">
                IBM Developing Front-End Apps with React
              </h3>
              <p className="text-sm text-zinc-700 mb-4">Professional certification from IBM verifying frontend development skills with React.</p>
              <div className="flex gap-3 text-xs font-semibold uppercase tracking-[0.15em]">
                <a
                  href="https://drive.google.com/file/d/1oA2kwwScuyrwUqry6dMzXoZouQuHyv_0/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-[3px] decoration-red-500 hover:bg-black hover:text-white px-2 py-1"
                >
                  View Certificate
                </a>
              </div>
            </article>

            <article className="border-2 border-black bg-zinc-50 p-5 shadow-[6px_6px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#000] transition-transform">
              <h3 className="text-lg font-bold uppercase tracking-[0.12em] mb-2">
                IBM Developing Back-End Apps with Node.js and Express
              </h3>
              <p className="text-sm text-zinc-700 mb-4">Professional certification from IBM verifying backend development skills with Node.js and Express.</p>
              <div className="flex gap-3 text-xs font-semibold uppercase tracking-[0.15em]">
                <a
                  href="https://drive.google.com/file/d/1dSGsDcqmd6f1UB9XFWb9SenZs5o98SMH/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-[3px] decoration-red-500 hover:bg-black hover:text-white px-2 py-1"
                >
                  View Certificate
                </a>
              </div>
            <article className="border-2 border-black bg-zinc-50 p-5 shadow-[6px_6px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#000] transition-transform">
              <h3 className="text-lg font-bold uppercase tracking-[0.12em] mb-2">
                Data Analytics with Python
              </h3>
              <p className="text-sm text-zinc-700 mb-4">Professional certification verifying data analysis, visualization, and statistical modeling skills using Python libraries like Pandas, Numpy, and Seaborn.</p>
              <div className="flex gap-3 text-xs font-semibold uppercase tracking-[0.15em]">
                <a
                  href="https://drive.google.com/file/d/1Mzs8C40FDQ1uu4wEQ6TNEgyBZbbtxk0A/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-[3px] decoration-red-500 hover:bg-black hover:text-white px-2 py-1"
                >
                  View Certificate
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

    </main>
  );
}