import { Link } from "react-router-dom";
import { ShieldCheck, AlertTriangle, Mail } from "lucide-react";

const LAST_UPDATED = "July 16, 2026";

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-slate-200 py-10 last:border-b-0">
      <h2 className="text-xl font-bold tracking-tight text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-secondary">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50/80 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
        <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
        Legal
      </span>
      <h1 className="mt-4 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
        Privacy Policy &amp; Terms of Use
      </h1>
      <p className="mt-3 text-sm text-ink-muted">Last updated: {LAST_UPDATED}</p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-secondary">
        This page explains what information MetaVariant collects through the Shopify App Store
        listing, the MetaVariant app, and this website, and how that information is used, stored,
        and deleted. It's written to follow{" "}
        <a
          href="https://shopify.dev/docs/apps/launch/privacy-requirements"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          Shopify's privacy requirements for app developers
        </a>
        .
      </p>

      <div className="mt-8 flex gap-3 rounded-xl2 border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" strokeWidth={2} />
        <p className="text-xs leading-relaxed text-amber-800">
          This policy describes MetaVariant's actual data practices as implemented in the app's
          source code, but it isn't legal advice. Privacy laws vary by jurisdiction and change
          over time, so have a lawyer review this before relying on it, especially the sections
          marked <code className="rounded bg-amber-100 px-1 py-0.5">[fill in]</code> below.
        </p>
      </div>

      <div className="mt-4">
        <Section id="overview" title="1. Overview">
          <p>
            MetaVariant is a Shopify app that lets merchants attach content, like a badge,
            description, image, or spec sheet, to individual product variants, and display that
            content on the storefront. It's built and operated by{" "}
            <span className="font-semibold text-ink">MetaVariant</span>, based in{" "}
            <span className="font-semibold text-ink">Kenya</span>.
          </p>
        </Section>

        <Section id="information-we-collect" title="2. Information We Collect">
          <p className="font-semibold text-ink">Through Shopify's APIs</p>
          <p>
            When you install MetaVariant, Shopify asks you to approve three permissions:{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">
              write_products
            </code>{" "}
            (to create and manage the variant metafield definitions and values you configure),{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">
              read_files
            </code>{" "}
            and{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-ink">
              write_files
            </code>{" "}
            (to power the image and file picker on the Add Content page). MetaVariant does not
            request access to your customers, orders, discounts, or any other store data: those
            permissions are never asked for, so the app has no access to them.
          </p>
          <p className="font-semibold text-ink">Directly from you, the merchant</p>
          <p>
            We store your shop domain, an authentication session (including an access token
            Shopify issues us to make API calls on your behalf), and, if you use the app with
            per-staff-member login enabled, the name, email, and locale Shopify provides for the
            staff account that's using it. We also store what you explicitly configure: your
            selected pricing plan, any Custom CSS or backend URL override you set in Settings, and
            a record of which product IDs you've added content to (used to enforce your plan's
            product limit).
          </p>
          <p className="font-semibold text-ink">From your customers (shoppers)</p>
          <p>
            None. The storefront script that displays your variant content calls a public,
            read-only endpoint scoped to a product variant ID. It doesn't set cookies, use local
            storage, fingerprint devices, or log how a shopper navigates your store. We don't
            collect, receive, or store any personal data about your customers.
          </p>
        </Section>

        <Section id="how-we-use-it" title="3. How We Use Information">
          <p>
            We use the information above only to operate the app: authenticating your sessions,
            rendering the content you've configured on your storefront, enforcing your plan's
            product limit, and remembering your settings between visits. We don't sell or share
            your information with third parties for advertising or marketing purposes, and
            MetaVariant doesn't embed any analytics, advertising, or tracking SDKs, in the admin
            app or in the storefront script.
          </p>
        </Section>

        <Section id="retention" title="4. Data Retention & Deletion">
          <p>
            We keep your shop's configuration data for as long as MetaVariant is installed on
            your store. When you uninstall the app, Shopify notifies us automatically, and within
            48 hours every record tied to your shop, session, settings, plan, and product usage
            history, is permanently deleted from our database.
          </p>
          <p>
            The metafield values you create with MetaVariant (your Product Label text, Variant
            Description content, and so on) are stored by Shopify as standard product metafields,
            not duplicated in our database. They remain under your store's control and follow
            Shopify's own data retention rules, even after you uninstall MetaVariant.
          </p>
        </Section>

        <Section id="billing" title="5. Payments & Billing">
          <p>
            MetaVariant's paid plans are billed entirely through Shopify's built-in billing
            system. When you upgrade, Shopify handles the charge and adds it to your regular
            Shopify invoice. We never receive, transmit, or store your credit card or other
            payment details.
          </p>
        </Section>

        <Section id="storage-transfers" title="6. Data Storage & International Transfers">
          <p>
            MetaVariant's database and application servers run on cloud hosting infrastructure.
            <span className="font-semibold text-ink"> [Confirm hosting region(s) and add any
            cross-border transfer safeguards that apply, e.g. Standard Contractual Clauses, if you
            store EU/UK data outside the EEA/UK, fill in]</span>.
          </p>
        </Section>

        <Section id="your-rights" title="7. Your Rights">
          <p>
            Because MetaVariant doesn't collect or store personal data about your customers,
            there's nothing for a shopper to request or have deleted from us directly, any such
            request should go to you, the merchant, as the data controller for your store.
          </p>
          <p>
            For the account and configuration data we do hold on your behalf (session info, plan,
            settings), you can have it erased at any time by uninstalling the app, which triggers
            the automatic deletion described in Section 4, or by emailing us using the contact
            details in Section 10.
          </p>
        </Section>

        <Section id="cookies" title="8. Cookies & Tracking">
          <p>
            The MetaVariant admin app runs inside Shopify Admin and uses Shopify's standard
            session mechanism to keep you logged in. Neither the admin app nor the storefront
            script sets its own tracking cookies or uses browser fingerprinting.
          </p>
        </Section>

        <Section id="changes" title="9. Changes to This Policy">
          <p>
            If we change what data MetaVariant collects or how it's used, we'll update this page
            and revise the "Last updated" date above. If a change is significant, we'll also try
            to notify installed merchants directly.
          </p>
        </Section>

        <Section id="contact" title="10. Contact Us">
          <p>
            Questions about this policy or how MetaVariant handles your data can go to:
          </p>
          <a
            href="mailto:support@metavariantapp.com"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700"
          >
            <Mail className="h-4 w-4" strokeWidth={2} />
            support@metavariantapp.com
          </a>
          <p className="text-xs text-ink-muted">
            [Some jurisdictions require a physical mailing address here, fill in]
          </p>
        </Section>

        <Section id="terms" title="11. Terms of Use">
          <p>
            By installing or using MetaVariant, you agree to these terms in addition to{" "}
            <a
              href="https://www.shopify.com/legal/terms"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              Shopify's own Terms of Service
            </a>
            , which govern your use of the Shopify platform.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-ink">License.</span> We grant you a
              non-exclusive, non-transferable right to use MetaVariant on your Shopify store while
              your subscription is active.
            </li>
            <li>
              <span className="font-semibold text-ink">Your content.</span> You own the metafield
              content you create with MetaVariant. We only display and manage it on your behalf.
            </li>
            <li>
              <span className="font-semibold text-ink">Acceptable use.</span> Don't use MetaVariant
              to store or display unlawful content, or to try to circumvent your plan's product
              limit or Shopify's own policies.
            </li>
            <li>
              <span className="font-semibold text-ink">Availability.</span> We aim for reliable
              uptime but don't guarantee the app will be uninterrupted or error-free.
            </li>
            <li>
              <span className="font-semibold text-ink">Disclaimer & liability.</span> MetaVariant
              is provided "as is," without warranties of any kind. To the extent permitted by law,
              we aren't liable for indirect, incidental, or consequential damages arising from
              your use of the app.
            </li>
            <li>
              <span className="font-semibold text-ink">Termination.</span> You can stop using
              MetaVariant at any time by uninstalling it from your Shopify Admin. We may suspend
              or terminate access for accounts that violate these terms.
            </li>
            <li>
              <span className="font-semibold text-ink">Governing law.</span> These terms are
              governed by the laws of Kenya, without regard to conflict-of-law principles.
            </li>
          </ul>
        </Section>
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        Looking for setup help instead? See the{" "}
        <Link to="/docs" className="font-semibold text-brand-600 hover:text-brand-700">
          documentation
        </Link>
        .
      </p>
    </div>
  );
}
