import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8fa] px-6 py-16 text-black">
      {/* ======================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#276749]/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-24 h-112 w-md rounded-full bg-emerald-300/15 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(39,103,73,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(39,103,73,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#276749]/40 to-transparent" />
      </div>

      {/* ======================================================
          MAIN ERROR CARD
      ====================================================== */}

      <div className="relative w-full max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white/95 shadow-2xl shadow-slate-300/50 backdrop-blur-sm">
          {/* ==================================================
              TOP STATUS BAR
          ================================================== */}

          <div className="flex flex-col gap-4 border-b border-gray-200 bg-[#f7f8fa] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#276749]">
                Quickbase Automation
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-600">
                Automation Developer Lab
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-30" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500" />
              </span>

              <span className="rounded-full border border-amber-500/40 bg-amber-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-amber-800">
                Automation Misfired
              </span>
            </div>
          </div>

          {/* ==================================================
              MAIN CONTENT
          ================================================== */}

          <div className="grid gap-10 px-6 py-10 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-12 lg:py-14">
            {/* -----------------------------------------------
                LEFT — ERROR MESSAGE
            ----------------------------------------------- */}

            <section>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                Workflow Status
              </p>

              <div className="mt-1 bg-linear-to-br from-[#17452a] via-[#276749] to-emerald-500 bg-clip-text text-[7rem] font-black leading-none tracking-tighter text-transparent sm:text-[9rem]">
                404
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                The Trigger Fired. The Page Did Not.
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-700">
                Something definitely happened. Quickbase noticed it. Conditions
                were considered. A workflow may even have felt optimistic for a
                moment.
              </p>

              <p className="mt-4 max-w-xl leading-7 text-gray-600">
                Unfortunately, the requested page never made it to the Action
                step.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/lessons"
                  className="group inline-flex items-center justify-center rounded-xl bg-[#276749] px-5 py-3 font-bold text-white shadow-lg shadow-[#276749]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#205c38] hover:shadow-xl hover:shadow-[#276749]/25 focus:outline-none focus:ring-2 focus:ring-[#276749] focus:ring-offset-2"
                >
                  Browse Lessons
                  <span
                    aria-hidden="true"
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-[#276749] bg-white px-5 py-3 font-bold text-[#276749] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f0fff4] focus:outline-none focus:ring-2 focus:ring-[#276749] focus:ring-offset-2"
                >
                  Return Home
                </Link>
              </div>
            </section>

            {/* -----------------------------------------------
                RIGHT — MOCK PIPELINE RUN
            ----------------------------------------------- */}

            <section className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-xl shadow-gray-200/70">
              <div className="flex items-center justify-between border-b border-gray-200 bg-[#f7f8fa] px-5 py-3">
                <div className="flex gap-2" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                </div>

                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  pipeline-run.log
                </p>
              </div>

              <div className="p-5 sm:p-6">
                {/* -------------------------------------------
                    TRIGGER
                ------------------------------------------- */}

                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                        Step A
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        Trigger: User requested a page
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white">
                      SUCCESS
                    </span>
                  </div>

                  <p className="mt-3 font-mono text-sm text-gray-600">
                    event.url = &quot;/where-did-that-page-go&quot;
                  </p>
                </div>

                <div className="flex justify-center py-2 text-2xl font-bold text-[#276749]">
                  ↓
                </div>

                {/* -------------------------------------------
                    CONDITION
                ------------------------------------------- */}

                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                        Step B
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        Condition: Does the page exist?
                      </p>
                    </div>

                    <span className="rounded-full bg-amber-600 px-3 py-1 text-xs font-bold text-white">
                      FALSE
                    </span>
                  </div>

                  <p className="mt-3 font-mono text-sm text-gray-600">
                    page.exists == true
                  </p>
                </div>

                <div className="flex justify-center py-2 text-2xl font-bold text-[#276749]">
                  ↓
                </div>

                {/* -------------------------------------------
                    ACTION
                ------------------------------------------- */}

                <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-red-800">
                        Step C
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        Action: Render requested page
                      </p>
                    </div>

                    <span className="rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white">
                      SKIPPED
                    </span>
                  </div>

                  <p className="mt-3 font-mono text-sm leading-6 text-gray-600">
                    No page was available to render.
                  </p>

                  <p className="mt-2 font-mono text-sm leading-6 text-gray-600">
                    Pipeline offered no further comment.
                  </p>
                </div>

                {/* -------------------------------------------
                    RUN SUMMARY
                ------------------------------------------- */}

                <div className="mt-6 border-t border-gray-200 pt-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                    Run Summary
                  </p>

                  <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                    <li>
                      <span className="mr-2 font-bold text-[#276749]">›</span>
                      Trigger executed successfully.
                    </li>

                    <li>
                      <span className="mr-2 font-bold text-[#276749]">›</span>
                      Condition evaluated with ruthless accuracy.
                    </li>

                    <li>
                      <span className="mr-2 font-bold text-[#276749]">›</span>
                      Requested page remains spectacularly absent.
                    </li>

                    <li>
                      <span className="mr-2 font-bold text-[#276749]">›</span>
                      No records were created to commemorate the failure.
                    </li>

                    <li>
                      <span className="mr-2 font-bold text-[#276749]">›</span>
                      Jinja has denied involvement.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* ==================================================
              AUTOMATION DIAGNOSTIC
          ================================================== */}

          <div className="border-t border-gray-200 bg-linear-to-r from-[#f0fff4] via-emerald-50/60 to-white px-6 py-6 md:px-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <span className="w-fit rounded-md border border-[#276749]/20 bg-white px-2 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#276749]">
                  Automation Diagnostic
                </span>

                <p className="text-sm leading-6 text-gray-600 sm:ml-2">
                  The workflow technically succeeded at discovering that it
                  could not succeed.
                </p>
              </div>

              <span className="w-fit rounded-full border border-gray-300 bg-white px-4 py-2 font-mono text-xs font-bold text-gray-600">
                STATUS: SUCCESSFULLY_FAILED
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================
            FOOTNOTE
        ====================================================== */}

        <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          This automation completed successfully. Nothing useful happened.
        </p>
      </div>
    </main>
  );
}
