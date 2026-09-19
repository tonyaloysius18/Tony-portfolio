import { useEffect, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

const EMAIL = "ynotlabs.dev@gmail.com";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-[#D7E2EA]/12 py-8 sm:py-10">
      <h2 className="text-lg font-semibold tracking-[-0.01em] text-[#D7E2EA] sm:text-xl">{title}</h2>
      <div className="mt-4 space-y-3 text-sm font-light leading-relaxed text-[#D7E2EA]/68 sm:text-base">
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[220px_1fr] sm:gap-6">
      <dt className="text-[#D7E2EA]/46">{label}</dt>
      <dd className="text-[#D7E2EA]/82">{value}</dd>
    </div>
  );
}

export default function LegalNotice() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Mentions légales | YNOT Labs — Tony Aloysius";
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#080909] px-5 py-12 text-[#D7E2EA] sm:px-8 sm:py-16 md:px-10">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="group inline-flex min-h-11 items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#D7E2EA]/56 transition-colors hover:text-[#D7E2EA]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Retour au portfolio
        </a>

        <img
          src="/ynot-labs-logo-light.webp"
          alt="YNOT Labs"
          width={1962}
          height={339}
          className="mt-8 h-auto w-56 sm:w-72"
        />

        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Mentions légales</h1>
        <p className="mt-4 text-sm text-[#D7E2EA]/46">Dernière mise à jour : septembre 2026</p>

        <div className="mt-10">
          <Block title="Éditeur du site">
            <dl className="space-y-3">
              <Row label="Nom commercial" value="YNOT Labs" />
              <Row label="Exploitant" value="Tony Ajay Aloysius Suresh, entrepreneur individuel" />
              <Row label="SIREN" value="108 766 288" />
              <Row label="SIRET" value="108 766 288 00014" />
              <Row label="Code APE" value="58.29C — Édition de logiciels applicatifs" />
              <Row label="Immatriculation au RNE" value="14 août 2026" />
              <Row label="Adresse" value="5 Rue Arnaud Baric, 31300 Toulouse, France" />
              <Row
                label="E-mail"
                value={
                  <a href={`mailto:${EMAIL}`} className="border-b border-[#D7E2EA]/35 hover:border-[#D7E2EA]/80">
                    {EMAIL}
                  </a>
                }
              />
              <Row label="Directeur de la publication" value="Tony Ajay Aloysius Suresh" />
            </dl>
          </Block>

          <Block title="Hébergement">
            <dl className="space-y-3">
              <Row label="Hébergeur" value="Vercel Inc." />
              <Row label="Adresse" value="440 N Barranca Ave #4133, Covina, CA 91723, États-Unis" />
              <Row
                label="Site web"
                value={
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-[#D7E2EA]/35 hover:border-[#D7E2EA]/80"
                  >
                    vercel.com
                  </a>
                }
              />
            </dl>
          </Block>

          <Block title="Propriété intellectuelle">
            <p>
              L’ensemble du contenu de ce site (textes, visuels, logo YNOT Labs, captures d’écran, code
              source de l’interface) est la propriété de son éditeur, sauf mention contraire. Les noms et
              logos des applications et des marques citées appartiennent à leurs titulaires respectifs.
            </p>
            <p>
              Toute reproduction, représentation ou réutilisation, totale ou partielle, sans autorisation
              écrite préalable est interdite.
            </p>
          </Block>

          <Block title="Données personnelles">
            <p>
              Le responsable du traitement est Tony Ajay Aloysius Suresh (YNOT Labs), joignable à
              l’adresse {EMAIL}.
            </p>
            <p>
              <strong className="font-medium text-[#D7E2EA]/86">Formulaire de contact.</strong> Les
              informations saisies (nom, adresse e-mail, message) sont utilisées uniquement pour répondre à
              votre demande, sur la base de votre consentement. Elles sont acheminées par e-mail via le
              service d’envoi Resend et conservées le temps nécessaire au traitement de votre demande, puis
              pendant la durée de la relation commerciale le cas échéant.
            </p>
            <p>
              <strong className="font-medium text-[#D7E2EA]/86">Compteur de visiteurs.</strong> Un
              identifiant aléatoire est enregistré dans le stockage local de votre navigateur afin de
              compter les visiteurs uniques. Il est conservé pendant 12 mois côté serveur et ne permet pas
              de vous identifier. Aucun cookie de suivi ni outil de mesure d’audience tiers n’est utilisé.
            </p>
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d’un droit d’accès,
              de rectification, d’effacement, d’opposition et de limitation du traitement de vos données.
              Pour l’exercer, écrivez à{" "}
              <a href={`mailto:${EMAIL}`} className="border-b border-[#D7E2EA]/35 hover:border-[#D7E2EA]/80">
                {EMAIL}
              </a>
              . Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).
            </p>
          </Block>

          <Block title="Responsabilité">
            <p>
              L’éditeur s’efforce de fournir des informations exactes et à jour, mais ne peut garantir leur
              exhaustivité. Il ne saurait être tenu responsable des dommages résultant de l’utilisation du
              site ou de liens externes vers des sites tiers.
            </p>
          </Block>

          <Block title="Droit applicable">
            <p>Le présent site et ses mentions légales sont soumis au droit français.</p>
          </Block>
        </div>
      </div>
    </main>
  );
}
