import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import {
  LuArrowDown,
  LuBadgeCheck,
  LuBookOpen,
  LuBox,
  LuBoxes,
  LuCircleHelp,
  LuCloudDownload,
  LuClock3,
  LuCopy,
  LuDatabase,
  LuExternalLink,
  LuFileKey2,
  LuFingerprint,
  LuKeyRound,
  LuLink2,
  LuLockKeyhole,
  LuNetwork,
  LuPanelTop,
  LuRoute,
  LuServerCog,
  LuShieldCheck,
  LuSparkles,
  LuUsers,
  LuWorkflow,
} from "react-icons/lu";

export const metadata: Metadata = {
  title: "Quickbase Sharing Architecture",
  description:
    "Learn how Quickbase links, authentication, authorization, roles, EOTI, secure links, Exchange copies, and API credentials fit together.",
};

/* ============================================================
   REUSABLE UI
   ============================================================ */

function LessonLabel({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "green" | "amber" | "blue" | "gray";
}) {
  const styles = {
    green: "border-[#b7d8c2] bg-[#f0fff4] text-[#205c38]",
    amber: "border-amber-300 bg-amber-50 text-amber-900",
    blue: "border-sky-300 bg-sky-50 text-sky-900",
    gray: "border-gray-300 bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

function ConceptCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="group rounded-2xl border border-gray-300 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#276749] hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-200 group-hover:scale-110">
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-[#205c38]">{title}</h3>
          <div className="mt-2 leading-7 text-gray-700">{children}</div>
        </div>
      </div>
    </article>
  );
}

function FlowStep({
  icon,
  title,
  description,
  final = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  final?: boolean;
}) {
  return (
    <div
      className={`group w-full rounded-2xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6 ${
        final
          ? "border-[#276749] bg-[#276749] text-white"
          : "border-[#b7d8c2] bg-white"
      }`}
    >
      <div className="flex items-start gap-5">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110 ${
            final
              ? "bg-white/15 text-white"
              : "bg-[#f0fff4] text-[#276749]"
          }`}
        >
          {icon}
        </div>

        <div>
          <h3
            className={`text-xl font-extrabold ${
              final ? "text-white" : "text-[#205c38]"
            }`}
          >
            {title}
          </h3>

          <p
            className={`mt-1 leading-7 ${
              final ? "text-white/85" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex h-12 items-center justify-center">
      <LuArrowDown
        aria-hidden="true"
        className="text-2xl text-[#276749]/60"
      />
    </div>
  );
}

function ComparisonRow({
  label,
  left,
  right,
}: {
  label: string;
  left: string;
  right: string;
}) {
  return (
    <div className="grid gap-3 border-t border-gray-200 py-4 md:grid-cols-[180px_1fr_1fr]">
      <div className="font-bold text-gray-900">{label}</div>
      <div className="text-gray-700">{left}</div>
      <div className="text-gray-700">{right}</div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function AppSharingLessonPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-[#17452a] bg-[#276749] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab
          </p>

          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Quickbase Sharing Architecture
          </h1>

          <p className="mt-5 max-w-4xl text-xl leading-9 text-white">
            What actually happens when someone clicks a Quickbase link?
          </p>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
            This lesson connects app sharing, authentication, authorization,
            roles, Everyone on the Internet, secure links, Quickbase Exchange,
            browser sessions, API credentials, and realm-aware routing into one
            coherent mental model.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <LessonLabel>Architecture Lesson</LessonLabel>
            <LessonLabel tone="blue">Sharing + Security</LessonLabel>
            <LessonLabel tone="amber">Experimental Finding</LessonLabel>
          </div>
        </div>
      </header>

      {/* ======================================================
          ORIGIN STORY
      ====================================================== */}

      <section className="border-b border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl text-[#7a5200]">
                <LuCircleHelp />
              </div>

              <div>
                <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
                  The Question That Started It
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  A Discord link opened Quickbase in our own realm.
                </h2>

                <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-800">
                  The original link pointed to{" "}
                  <code className="rounded bg-white px-2 py-1 text-sm">
                    login.quickbase.com
                  </code>{" "}
                  and used a universal-link style request associated with a
                  Quickbase/Pendo feedback experience. After authentication,
                  Quickbase resolved the request into the authenticated
                  user&apos;s own realm.
                </p>

                <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-800">
                  That observation became a much larger lesson: a link does not
                  by itself explain who the visitor is, what they may access, or
                  whether the target is a shared app, a public resource, a
                  copied Exchange app, or a platform-level experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          LEARNING OBJECTIVES
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-4xl">
          <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
            Learning Objectives
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38] sm:text-4xl">
            Separate the systems that people casually call “sharing.”
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-700">
            By the end of this lesson, a student should be able to explain why
            Quickbase links, identities, roles, permissions, public access,
            Exchange installs, and API tokens are related without being
            interchangeable.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <ConceptCard icon={<LuLink2 />} title="Explain What a Link Does">
            Distinguish routing and destination from actual permission to use a
            Quickbase resource.
          </ConceptCard>

          <ConceptCard icon={<LuFingerprint />} title="Separate Identity from Access">
            Explain authentication as proving identity and authorization as
            determining what that identity may access.
          </ConceptCard>

          <ConceptCard icon={<LuUsers />} title="Understand Roles and Permissions">
            Show how a Quickbase user can be inside an app while still having
            carefully limited capabilities.
          </ConceptCard>

          <ConceptCard icon={<LuPanelTop />} title="Compare Public Access Models">
            Distinguish authenticated sharing, EOTI, secure links, and public
            resources.
          </ConceptCard>

          <ConceptCard icon={<LuCloudDownload />} title="Understand Exchange Copies">
            Explain why installing from Quickbase Exchange produces an
            independent app copy rather than access to the publisher&apos;s
            original.
          </ConceptCard>

          <ConceptCard icon={<LuKeyRound />} title="Connect Sharing to the API">
            Place browser sessions, temporary tokens, user tokens, and app
            tokens inside the same identity and authorization architecture.
          </ConceptCard>
        </div>
      </section>

      {/* ======================================================
          CORE MODEL
      ====================================================== */}

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
              Core Mental Model
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#205c38] sm:text-4xl">
              A Quickbase link begins a decision chain.
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              Treat every Quickbase link as the beginning of a routing,
              identity, and permission process rather than as permission by
              itself.
            </p>
          </div>

          <div className="mt-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <FlowStep
                icon={<LuLink2 />}
                title="Link or Request"
                description="The URL identifies or routes toward a Quickbase destination or platform experience."
              />

              <FlowArrow />

              <FlowStep
                icon={<LuRoute />}
                title="Realm / Platform Resolution"
                description="Quickbase determines the relevant realm or platform context for the request."
              />

              <FlowArrow />

              <FlowStep
                icon={<LuFingerprint />}
                title="Identity"
                description="Quickbase determines which user or anonymous context is making the request."
              />

              <FlowArrow />

              <FlowStep
                icon={<LuLockKeyhole />}
                title="Authentication"
                description="Quickbase or an identity provider proves who that visitor is."
              />

              <FlowArrow />

              <FlowStep
                icon={<LuShieldCheck />}
                title="Authorization"
                description="Quickbase determines whether that identity may access the requested resource."
              />

              <FlowArrow />

              <FlowStep
                icon={<LuUsers />}
                title="Role + Permissions"
                description="The assigned role and permissions control what the identity can view, add, modify, share, or administer."
              />

              <FlowArrow />

              <FlowStep
                icon={<LuBadgeCheck />}
                title="Rendered Quickbase Experience"
                description="The user finally sees the app, report, form, Exchange resource, public page, or platform experience they are allowed to use."
                final
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          AUTH VS AUTHZ
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-4xl">
          <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
            Identity and Permission
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Authentication and authorization are not the same thing.
          </h2>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <ConceptCard icon={<LuFingerprint />} title="Authentication">
            <p>
              Authentication answers the question:{" "}
              <strong>“Who are you?”</strong>
            </p>
            <p className="mt-3">
              The identity might be established through normal Quickbase sign
              in, SSO, or a SAML identity provider.
            </p>
          </ConceptCard>

          <ConceptCard icon={<LuShieldCheck />} title="Authorization">
            <p>
              Authorization answers the question:{" "}
              <strong>“What are you allowed to use?”</strong>
            </p>
            <p className="mt-3">
              Once Quickbase knows the identity, it can evaluate app access,
              role membership, table permissions, field permissions, and other
              security rules.
            </p>
          </ConceptCard>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl text-[#276749]">
              <LuNetwork />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#205c38]">
                SAML fits into the identity step.
              </h3>

              <p className="mt-3 max-w-5xl text-lg leading-8 text-gray-700">
                With SAML, an Identity Provider can authenticate the user before
                Quickbase evaluates what that recognized identity may access.
                The important lesson is that proving the identity still does not
                automatically grant unrestricted access to every Quickbase app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          SHARING MODES
      ====================================================== */}

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
              Four Different Meanings of Sharing
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#205c38] sm:text-4xl">
              “Share my Quickbase app” is an ambiguous sentence.
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              Quickbase supports several mechanisms that may all feel like
              sharing to an end user, but they have different security and
              ownership consequences.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <ConceptCard icon={<LuUsers />} title="1. Authenticated App Sharing">
              Add named users or groups to the same app and assign them roles.
              Everyone is using the same underlying application.
            </ConceptCard>

            <ConceptCard icon={<LuPanelTop />} title="2. Everyone on the Internet">
              EOTI provides an anonymous-user group that can be assigned a role.
              Public users still receive only the permissions granted to that
              role.
            </ConceptCard>

            <ConceptCard icon={<LuFileKey2 />} title="3. Secure Public Links">
              Secure links add a constrained access key and can expose a
              particular form or report without granting ordinary navigation
              through the entire application.
            </ConceptCard>

            <ConceptCard icon={<LuCloudDownload />} title="4. Quickbase Exchange">
              Exchange distribution creates an independent copy of an app or
              resource. The installer receives their own copy rather than access
              to the publisher&apos;s live application.
            </ConceptCard>
          </div>
        </div>
      </section>

      {/* ======================================================
          EOTI
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-4xl">
          <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
            Everyone on the Internet
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            EOTI is still role-based access.
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-700">
            EOTI should not be understood as “turn Quickbase security off.”
            It is better understood as a special anonymous-access group that
            receives a deliberately constrained role.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <ConceptCard icon={<LuUsers />} title="Anonymous Identity Context">
            Visitors do not need a named Quickbase login, but Quickbase still
            evaluates them through the public-access mechanism.
          </ConceptCard>

          <ConceptCard icon={<LuShieldCheck />} title="Role-Based Permissions">
            The role assigned to EOTI determines what anonymous users can view,
            add, or modify.
          </ConceptCard>

          <ConceptCard icon={<LuPanelTop />} title="Public Workflow Use Cases">
            Typical public workflows can include surveys, appointment requests,
            feedback forms, and other carefully constrained interactions.
          </ConceptCard>
        </div>

        <div className="mt-8 rounded-2xl border-2 border-red-200 bg-red-50 p-6 sm:p-8">
          <p className="font-bold uppercase tracking-[0.12em] text-red-800">
            Security Warning
          </p>

          <h3 className="mt-2 text-2xl font-bold text-red-950">
            Public access does not mean unrestricted access.
          </h3>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-red-950/80">
            Treat EOTI as an intentionally narrow public workflow. Do not expose
            confidential data merely because the app can technically be made
            available to anonymous users.
          </p>
        </div>
      </section>

      {/* ======================================================
          SECURE LINKS
      ====================================================== */}

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
              Secure Links
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#205c38] sm:text-4xl">
              Public access can be narrowed to a specific page.
            </h2>
          </div>

          <div className="mt-10 mx-auto flex max-w-3xl flex-col items-center">
            <FlowStep
              icon={<LuPanelTop />}
              title="Anonymous Visitor"
              description="The recipient does not need to behave like a normal named Quickbase user."
            />

            <FlowArrow />

            <FlowStep
              icon={<LuLink2 />}
              title="Secure Link"
              description="The link identifies a particular form or report and carries the public-access context needed for that page."
            />

            <FlowArrow />

            <FlowStep
              icon={<LuFileKey2 />}
              title="Access Key Evaluation"
              description="Quickbase evaluates the access key and the configured public permissions."
            />

            <FlowArrow />

            <FlowStep
              icon={<LuPanelTop />}
              title="Specific Form or Report"
              description="The visitor gets the intended page rather than unrestricted access to the entire application."
              final
            />
          </div>

          <div className="mt-10 rounded-2xl border border-amber-300 bg-amber-50 p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-amber-900">
              API Detail
            </p>

            <p className="mt-3 max-w-5xl text-lg leading-8 text-amber-950">
              One of the more surprising help-center details is that secure
              public links can support some legacy XML/formula-link behaviors,
              while JSON REST API calls are not a supported anonymous-access
              path in the same way. That is a useful reminder that Quickbase
              contains multiple architectural generations that do not always
              overlap perfectly.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          EXCHANGE
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-4xl">
          <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
            Quickbase Exchange
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Exchange is distribution by copy, not shared access.
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-700">
            When someone installs an app from Quickbase Exchange, they receive
            an independent copy that can be customized without changing the
            publisher&apos;s original.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="rounded-2xl border border-gray-300 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749]">
                <LuBox />
              </div>
              <div>
                <p className="font-bold uppercase tracking-[0.12em] text-gray-500">
                  Publisher
                </p>
                <h3 className="text-2xl font-bold text-[#205c38]">
                  Original App
                </h3>
              </div>
            </div>
            <p className="mt-4 leading-7 text-gray-700">
              The publisher prepares the app for Exchange submission.
            </p>
          </div>

          <div className="flex justify-center text-3xl text-[#276749] lg:rotate-[-90deg]">
            <LuArrowDown />
          </div>

          <div className="rounded-2xl border border-[#276749] bg-[#276749] p-7 text-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl">
                <LuCopy />
              </div>
              <div>
                <p className="font-bold uppercase tracking-[0.12em] text-white/70">
                  Installer
                </p>
                <h3 className="text-2xl font-bold">Independent Copy</h3>
              </div>
            </div>
            <p className="mt-4 leading-7 text-white/85">
              New app DBIDs and table DBIDs are assigned to the copied
              application.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-[#205c38]">
            Why aliases and relative links matter
          </h3>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-700">
            Hard-coded DBIDs are fragile in a distributable app because copied
            apps receive new identifiers. Table aliases and relative URLs help
            make formulas and navigation more portable across copies.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="font-bold text-red-900">Fragile</p>
              <code className="mt-2 block break-all text-sm text-red-950">
                https://realm.quickbase.com/db/bxxxxxxxx
              </code>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="font-bold text-emerald-900">More Portable</p>
              <code className="mt-2 block break-all text-sm text-emerald-950">
                [_DBID_TASKS] or relative navigation
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          API CONNECTION
      ====================================================== */}

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
              Connect the Lesson to the REST API
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#205c38] sm:text-4xl">
              UI access and API access meet at identity and permission.
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              A browser and an API client are different entrances into
              Quickbase, but both must operate inside Quickbase&apos;s security
              model.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <ConceptCard icon={<LuPanelTop />} title="Browser Session">
              Represents the interactive logged-in user context inside
              Quickbase.
            </ConceptCard>

            <ConceptCard icon={<LuClock3 />} title="Temporary Token">
              A short-lived client-side authorization mechanism that can be
              derived from the authenticated browser context for a specific
              Quickbase DBID.
            </ConceptCard>

            <ConceptCard icon={<LuKeyRound />} title="User Token">
              An API credential tied to a Quickbase user identity. It should be
              protected like a password.
            </ConceptCard>

            <ConceptCard icon={<LuFileKey2 />} title="App Token">
              An additional application security requirement. It is not the
              user&apos;s identity.
            </ConceptCard>
          </div>

          <div className="mt-10 mx-auto flex max-w-3xl flex-col items-center">
            <FlowStep
              icon={<LuFingerprint />}
              title="Identity"
              description="A browser session, SSO identity, or API credential establishes who is acting."
            />

            <FlowArrow />

            <FlowStep
              icon={<LuServerCog />}
              title="Quickbase Security Evaluation"
              description="Quickbase evaluates the identity against app, role, record, and field permissions."
            />

            <FlowArrow />

            <FlowStep
              icon={<LuDatabase />}
              title="UI or API Data Access"
              description="The user or integration receives only the data and operations allowed by those permissions."
              final
            />
          </div>
        </div>
      </section>

      {/* ======================================================
          APP API PROPERTIES
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-4xl">
          <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
            What the App Definition Knows
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Security posture is part of the application itself.
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-700">
            The Quickbase REST API exposes application-level properties that
            reinforce the lesson: an app is more than tables, fields, and
            records.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ConceptCard icon={<LuPanelTop />} title="hasEveryoneOnTheInternet">
            Indicates whether the app includes EOTI access.
          </ConceptCard>

          <ConceptCard icon={<LuCopy />} title="allowClone">
            Controls whether non-administrators may copy the application.
          </ConceptCard>

          <ConceptCard icon={<LuExternalLink />} title="allowExport">
            Controls whether non-administrators may export app data.
          </ConceptCard>

          <ConceptCard icon={<LuFileKey2 />} title="enableAppTokens">
            Indicates whether application tokens are required.
          </ConceptCard>

          <ConceptCard icon={<LuNetwork />} title="useIPFilter">
            Restricts access according to approved IP addresses when configured.
          </ConceptCard>

          <ConceptCard icon={<LuShieldCheck />} title="mustBeRealmApproved">
            Restricts app access to users who are approved in the realm.
          </ConceptCard>
        </div>
      </section>

      {/* ======================================================
          ORIGINAL LINK
      ====================================================== */}

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
              Return to the Original Experiment
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#205c38] sm:text-4xl">
              What did the Discord link actually demonstrate?
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              The captured page showed authenticated user, account, and realm
              context while the current app DBID was empty. That means the
              experience could exist at the Quickbase platform level without
              requiring the user to already be inside a specific application.
            </p>
          </div>

          <div className="mt-10 mx-auto flex max-w-3xl flex-col items-center">
            <FlowStep
              icon={<LuExternalLink />}
              title="External Link"
              description="A user clicks a Quickbase universal-style link from outside the realm."
            />

            <FlowArrow />

            <FlowStep
              icon={<LuRoute />}
              title="Quickbase Routing"
              description="Quickbase resolves the request through its login/platform entry point."
            />

            <FlowArrow />

            <FlowStep
              icon={<LuFingerprint />}
              title="Authenticated User Context"
              description="Quickbase establishes the user, account, and realm context."
            />

            <FlowArrow />

            <FlowStep
              icon={<LuSparkles />}
              title="Requested Platform Experience"
              description="The Pendo-backed feedback experience is initialized in the authenticated Quickbase environment."
            />

            <FlowArrow />

            <FlowStep
              icon={<LuBadgeCheck />}
              title="Rendered in the User’s Realm"
              description="The user sees the intended experience in their own authenticated Quickbase environment without the original URL hard-coding their realm."
              final
            />
          </div>

          <div className="mt-10 rounded-2xl border border-gray-300 bg-white p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-[#205c38]">
              The conservative conclusion
            </h3>

            <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-700">
              Treat the observed universal-link behavior as a{" "}
              <strong>routing mechanism</strong>, not as proof that arbitrary
              Quickbase links can grant permissions or install arbitrary apps.
              Identity, authorization, roles, public-access rules, and Exchange
              distribution remain separate mechanisms.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          COMPARISON
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-4xl">
          <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
            Comparison
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Same app vs. copied app
          </h2>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
          <div className="grid bg-[#205c38] text-white md:grid-cols-[180px_1fr_1fr]">
            <div className="p-4 font-bold">Question</div>
            <div className="p-4 font-bold">Authenticated Sharing</div>
            <div className="p-4 font-bold">Quickbase Exchange</div>
          </div>

          <div className="px-5">
            <ComparisonRow
              label="Underlying app"
              left="Same app"
              right="Independent copy"
            />
            <ComparisonRow
              label="DBIDs"
              left="Unchanged"
              right="New app and table DBIDs"
            />
            <ComparisonRow
              label="Publisher changes"
              left="Visible to shared users if permissions allow"
              right="Do not automatically update installed copies"
            />
            <ComparisonRow
              label="Access model"
              left="Users/groups + roles"
              right="Install/copy + new ownership"
            />
            <ComparisonRow
              label="Best use"
              left="Collaboration in one application"
              right="Templates, samples, reusable apps, community distribution"
            />
          </div>
        </div>
      </section>

      {/* ======================================================
          PRACTICAL EXERCISE
      ====================================================== */}

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
              Student Exercise
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#205c38] sm:text-4xl">
              Classify the access mechanism before touching the app.
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              For each Quickbase URL or workflow encountered, identify the
              access model before assuming what the link itself can do.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <ConceptCard icon={<LuLink2 />} title="Question 1 — What kind of link is this?">
              Is it a normal app URL, a secure public link, an Exchange resource,
              or a platform/universal routing link?
            </ConceptCard>

            <ConceptCard icon={<LuFingerprint />} title="Question 2 — Who is the visitor?">
              Named Quickbase user, SSO-authenticated user, API identity, or
              anonymous/EOTI visitor?
            </ConceptCard>

            <ConceptCard icon={<LuShieldCheck />} title="Question 3 — Where is authorization defined?">
              App membership, role, EOTI role, secure-link access key, API
              permissions, or another Quickbase security mechanism?
            </ConceptCard>

            <ConceptCard icon={<LuBoxes />} title="Question 4 — Same app or a copy?">
              Is this workflow granting access to the original application, or
              creating an independent Exchange/copy instance?
            </ConceptCard>
          </div>
        </div>
      </section>

      {/* ======================================================
          FINAL MODEL
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="rounded-2xl border-2 border-[#276749] bg-white p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749]">
              <LuWorkflow />
            </div>

            <div>
              <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
                Final Mental Model
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
                A Quickbase link is only the doorway.
              </h2>

              <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-700">
                The complete experience comes from the interaction of routing,
                realm context, identity, authentication, authorization, roles,
                permissions, and the particular resource being requested.
              </p>

              <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-700">
                Once that model is understood, authenticated app sharing, EOTI,
                secure links, Exchange installs, browser sessions, temporary
                tokens, and REST API calls stop looking like unrelated
                Quickbase tricks. They become different expressions of the same
                platform architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <section className="border-t border-[#17452a] bg-[#205c38] text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold uppercase tracking-[0.14em] text-white/70">
                Quickbase Automation Developer Lab
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Return to the lesson roadmap or continue exploring the lab.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/lessons"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-bold text-[#205c38] transition hover:-translate-y-0.5 hover:bg-[#f0fff4]"
              >
                <LuBookOpen />
                Lesson Roadmap
              </Link>

              <Link
                href="/"
                className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:bg-white hover:text-[#205c38]"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
