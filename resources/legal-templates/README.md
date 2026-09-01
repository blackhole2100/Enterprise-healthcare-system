# Legal Onboarding & Hiring Templates

A drop-in package of legal, HIPAA, and HR documents that homecare agencies can customize once and reuse for every new client and new hire. Generic templates are stored in `client-onboarding/`, `hiring/`, and `state-addenda/`. An agency runs one script (or asks Gemini) to fill in their info, and gets a complete, printable, signable PDF and Word package back.

> **Heads up:** This package ships only `.docx` masters. PDFs are produced at convert-time from those masters (see [Producing PDFs](#producing-pdfs)). There is no committed `pdf/` directory.

---

## What's in the box (25 documents)

### Client onboarding (10) — `client-onboarding/docx/`
1. `01-homecare-services-agreement.docx` — Master service contract: scope, rates, EVV, termination, liability, indemnification, governing law.
2. `02-hipaa-notice-of-privacy-practices.docx` — Required HIPAA NPP per **45 CFR § 164.520**, including the regulator-required header.
3. `03-hipaa-authorization-for-use-disclosure.docx` — Per-recipient PHI release with the six core elements and three required statements.
4. `04-client-bill-of-rights-and-responsibilities.docx` — Standard PA / OH home-care bill of rights.
5. `05-consent-to-care.docx` — Voluntary consent for in-home services.
6. `06-financial-responsibility-and-payment-authorization.docx` — Rate schedule, billing terms, payer info, assignment of benefits.
7. `07-advance-directives-acknowledgment.docx` — Patient Self-Determination Act compliant.
8. `08-photo-media-release.docx` — Optional, opt-in only, with revocation.
9. `09-emergency-contact-and-critical-information.docx` — Contacts, allergies, meds, code status, hospital preference.
10. `10-grievance-and-complaint-policy.docx` — Internal escalation plus state APS / DOH external paths.

### Hiring / HR (13) — `hiring/docx/`
1. `01-employment-application.docx` — Pre-hire app with EEO statement, history, education, certifications, references.
2. `02-offer-letter.docx` — Comp, benefits, contingencies, at-will.
3. `03-confidentiality-nda.docx` — HIPAA-tuned, PHI, social media, return-of-materials.
4. `04-background-check-authorization-fcra.docx` — **Standalone** FCRA disclosure + auth, with PA / OH-specific add-ons.
5. `05-drug-and-alcohol-testing-consent.docx` — Pre-employment, reasonable suspicion, post-incident.
6. `06-direct-deposit-authorization.docx` — Bank info + voided check.
7. `07-employee-handbook-acknowledgment.docx` — Receipt + at-will.
8. `08-code-of-conduct-and-ethics.docx` — Boundaries, gifts, false claims, mandated reporting.
9. `09-hipaa-training-acknowledgment.docx` — Initial + annual.
10. `10-mandatory-reporter-acknowledgment.docx` — Abuse / neglect / exploitation.
11. `11-caregiver-job-description.docx` — Duties, qualifications, ADA-compliant physical requirements, essential functions.
12. `12-i9-w4-new-hire-cover-sheet.docx` — Checklist + List A / B+C reference. **Does not** include the federal forms themselves — get the latest editions from `uscis.gov` and `irs.gov`.
13. `13-driver-and-vehicle-verification.docx` — License, MVR auth, insurance limits.

### State addenda (2) — `state-addenda/docx/`
1. `pennsylvania-addendum.docx` — Older Adults Protective Services Act (OAPSA, 35 P.S. § 10225), PA Child Protective Services Law (Act 13/151 — ChildLine 1-800-932-0313), 28 Pa. Code Ch. 611 (Home Care Agency Licensure under PA DOH), PA Human Relations Act, Act 169 of 2002 (advance directives), PA Wage Payment & Collection Law.
2. `ohio-addendum.docx` — ORC § 109.572 (criminal records check) + OAC 3701-13 (BCI / FBI checks), ORC Ch. 3740 (home health agencies) / Ch. 173 (Aging Network — PASSPORT waiver), ORC § 5101.61 (Adult Protective Services mandatory reporting — 1-855-OHIO-APS), Ohio Civil Rights Act, Ohio Bureau of Workers' Compensation.

Use the addendum that matches your operating state. Your state addendum (PA or OH, depending on your operating state) is meant to be attached to the master service agreement and the hiring packet, not signed separately.

---

## Quick start

```bash
# 1) Install dependencies (one-time, kept outside the repo)
python3 -m venv /tmp/legal-templates-venv
/tmp/legal-templates-venv/bin/pip install python-docx

# 2) Generate the 25 master .docx files (run once after pulling)
cd resources/legal-templates
/tmp/legal-templates-venv/bin/python scripts/generate_docs.py

# 3) Fill in your agency details
$EDITOR agency-info.json

# 4) Produce a customized package
/tmp/legal-templates-venv/bin/python scripts/customize.py
# -> writes customized/<your-agency-slug>/docx/*.docx
```

Prefer to delegate the typing? Use `GEMINI_PROMPT.md` — paste it into Gemini along with your brochure / website screenshot and it will produce a filled `agency-info.json` for you.

---

## Customizing

`agency-info.json` holds every agency-level placeholder. Edit it once for your agency and rerun `customize.py` whenever something changes (new license number, new privacy officer, new rate schedule).

Per-client and per-employee fields (`{{CLIENT_NAME}}`, `{{HIRE_DATE}}`, `{{POSITION_TITLE}}`, etc.) intentionally remain as blank lines (`____________________`) in the customized output — fill those by hand at signing.

### Required fields in `agency-info.json`

| Group | Keys |
|---|---|
| Identity | `AGENCY_SLUG`, `AGENCY_NAME`, `AGENCY_LEGAL_ENTITY_TYPE`, `AGENCY_ADDRESS_LINE_1`, `AGENCY_ADDRESS_LINE_2`, `AGENCY_CITY`, `AGENCY_STATE`, `AGENCY_ZIP`, `AGENCY_PHONE`, `AGENCY_FAX`, `AGENCY_EMAIL`, `AGENCY_WEBSITE` |
| Licensure | `AGENCY_LICENSE_NUMBER`, `AGENCY_LICENSE_STATE`, `AGENCY_TAX_ID_EIN`, `PA_HOMECARE_LICENSE`, `OH_PROVIDER_NUMBER` |
| Roles | `PRIVACY_OFFICER_NAME/EMAIL/PHONE`, `COMPLIANCE_OFFICER_NAME/EMAIL`, `HR_CONTACT_NAME/EMAIL` |
| Rates | `HOURLY_RATE`, `OVERTIME_RATE`, `HOLIDAY_RATE`, `MILEAGE_RATE`, `MINIMUM_VISIT_HOURS` |
| Billing | `LATE_PAYMENT_FEE_PCT`, `INVOICE_FREQUENCY`, `PAYMENT_DUE_DAYS` |
| Dates / notice | `EFFECTIVE_DATE`, `NOTICE_PERIOD_DAYS` |
| Regulators | `STATE_REGULATOR_NAME/PHONE/WEBSITE`, `APS_PHONE/WEBSITE`, `PA_DEPT_HEALTH_PHONE`, `OH_DEPT_HEALTH_PHONE` |
| Insurance | `INSURANCE_LIABILITY_LIMIT`, `INSURANCE_AUTO_LIMIT`, `WORKERS_COMP_CARRIER` |

`AGENCY_SLUG` should be a kebab-case version of your agency name (e.g. `acme-homecare`); it controls the output directory under `customized/`.

---

## Producing PDFs

PDFs are not committed. Generate them on demand from the customized `.docx` files using LibreOffice:

```bash
# macOS (one-time)
brew install --cask libreoffice

# Convert all customized .docx -> .pdf
cd customized/<your-agency-slug>/docx
libreoffice --headless --convert-to pdf *.docx --outdir ../pdf
```

The same command works on Linux. On Windows use `soffice.exe --headless --convert-to pdf`.

---

## Layout

```
resources/legal-templates/
├── README.md                    (this file)
├── GEMINI_PROMPT.md             (drop-in prompt for Gemini-assisted fill)
├── agency-info.json             (your agency placeholders)
├── .gitignore                   (ignores customized/ and venv junk)
├── client-onboarding/
│   └── docx/                    (10 master templates)
├── hiring/
│   └── docx/                    (13 master templates)
├── state-addenda/
│   └── docx/                    (2 master templates: PA and OH)
├── scripts/
│   ├── generate_docs.py         (regenerates the 25 masters from source)
│   └── customize.py             (substitutes agency-info.json into the masters)
└── customized/                  (gitignored — your filled output appears here)
    └── <agency-slug>/docx/
```

---

## Disclaimer

**This package is a starting point. It is not legal advice.**

Each generated document carries a footer disclaimer reading:

> *This template is provided as a starting point and does not constitute legal advice. Have a healthcare-experienced attorney licensed in {{AGENCY_STATE}} review and customize before use.*

Before any of these documents are presented to a client, employee, regulator, or court:

- Have a healthcare-experienced attorney licensed in your operating state review every document.
- Verify state-specific citations are still current (statutes and agency phone numbers change).
- Confirm your insurance limits, license number, and tax identification are correct.
- Confirm your HIPAA Notice of Privacy Practices reflects your actual uses and disclosures, not just the regulatory floor.
- Replace synthetic example values in `agency-info.json` (such as `(215) 555-0100` or `00-0000000`) with your real agency information.

The authors of this package, the health-evv-platform project, and any contributors disclaim any liability for use of these templates without legal review.

---

## License & redistribution

Templates are written from scratch and provided to Health licensees as a working starting point. They contain no third-party copyrighted policy text. Verbatim regulatory language (e.g. the HIPAA NPP header) is included because the regulation requires it.
