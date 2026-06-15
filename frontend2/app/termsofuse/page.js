'use client'

import { Box, Paper, Typography } from "@mui/material";

export default function TermsOfUsePage() {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", my: 6, px: 2, mt: 10 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Vector Finance Limited — Terms of Use (Loans Portal)
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          <strong>Effective Date:</strong> September 2, 2025
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          These Terms of Use ("Terms") govern your access to and use of the VectorFinanceLimited loans portal ("Portal", "we", "us", "Vector"). By registering for an account, using the Portal, or submitting any information to Vector, you accept and agree to these Terms. If you do not agree, do not register or use the Portal.
        </Typography>
        <hr />
        <Typography variant="h6" sx={{ mt: 3 }}>1. Who we are</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          VectorFinanceLimited is a company that provides loan services and related credit verification solutions. We operate the Portal to accept applications, verify applicant information, assess creditworthiness, and manage loan lifecycles.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>2. Your agreement to collect and process identity and verification materials</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          When you register for an account or apply for a loan, you give Vector explicit consent to request, collect, store, and process personal and identifying information to verify your identity, evaluate credit risk, and secure repayment. This includes, but is not limited to:
        </Typography>
        <ul>
          <li>National registration cards (e.g., NRC, ID card, passport)</li>
          <li>Photographic images of collateral where applicable (vehicle, land, house, or other pledged assets)</li>
          <li>Payslips, salary advices, employment letters, and other proof-of-income documents</li>
          <li>Bank statements and transaction history necessary for income/affordability verification</li>
          <li>Verification videos, live selfie checks, or recorded identity confirmation videos</li>
          <li>Contact details and other information you provide through the Portal</li>
        </ul>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You acknowledge that some loans require collateral or proof of salary; in those cases we may ask for additional supporting documents specific to the loan product you requested.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>3. Purpose of collection and scope of use</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We collect the above information for specific, limited purposes:
        </Typography>
        <ul>
          <li>Identity verification to prevent fraud and confirm who you are</li>
          <li>Credit and affordability assessment to decide loan eligibility and terms</li>
          <li>Collateral assessment (for asset-backed loans)</li>
          <li>Compliance with legal, regulatory, and anti-money-laundering requirements</li>
          <li>Ongoing account management, repayment monitoring, and enforcement where necessary</li>
        </ul>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We do not use the information for unrelated commercial purposes without first obtaining your separate consent.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>4. Data sharing and disclosure</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          VectorFinanceLimited <strong>does not sell your personal identification or verification documents</strong>. We will not disclose your sensitive documents to the public or to third parties for marketing.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          However, to operate the Portal and provide services to you, we may do either of the following under strict controls:
        </Typography>
        <ul>
          <li>Share necessary information with trusted third-party service providers engaged to perform verification services (for example identity-check vendors, document verification services, or forensic specialists). Those providers are contractually required to use the information only to perform verification services on our behalf and to maintain data confidentiality and security.</li>
          <li>Disclose information when required by law, regulation, court order, or other legal process.</li>
          <li>Disclose information if we have a good-faith belief it is necessary to prevent fraud, theft, misuse of the Portal, or to protect the rights, property, or safety of Vector, our users, or the public.</li>
        </ul>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We will limit any permitted sharing to the minimum data necessary for the specific verification task.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>5. Security and storage</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We maintain administrative, technical, and physical safeguards designed to protect information you provide against unauthorized access, disclosure, or loss. Examples include access controls, encryption in transit and at rest where feasible, and internal policies limiting access to authorized personnel only.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          No system is perfectly secure. By using the Portal you acknowledge that while we take reasonable steps to secure your information, we cannot guarantee absolute security. If a breach affecting your data occurs, we will follow applicable law and notify you in a timely manner as required.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>6. Data retention</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We retain your personal information only as long as necessary to fulfill the purposes set out in these Terms and to meet legal or regulatory obligations. After the retention period has ended, we will securely delete or anonymize your information in accordance with our retention policies.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>7. Your responsibilities and accuracy of information</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You must provide accurate, complete, and current information when registering or applying for a loan. You warrant that documents and images you submit are genuine and that you have the right to provide them.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Providing false, forged, or misleading information is a violation of these Terms and may result in immediate rejection of your application, account suspension, legal action, or reporting to relevant authorities.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>8. Consent and authorization to verify</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          By registering and applying, you authorize VectorFinanceLimited and our authorized agents to:
        </Typography>
        <ul>
          <li>Verify any information you supply with third parties (employers, banks, credit references, public registries) where necessary for verification and credit assessment</li>
          <li>Request and obtain credit reports or other trade information necessary for credit decisions (where allowed by law)</li>
          <li>Use third-party verification services to confirm identity and document authenticity</li>
        </ul>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If you revoke consent, we may be unable to process or continue your loan application.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>9. Third-party links and services</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The Portal may link to or integrate third-party services. Those services have their own terms and privacy practices. Vector is not responsible for those third parties’ practices. When you authorize a third party to access your data, that access is subject to the third party’s terms.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>10. Limitations of liability</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          To the maximum extent permitted by law, VectorFinanceLimited and its directors, officers, employees, contractors, and agents will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Portal or our services, even if we were advised of the possibility of such damages. Our aggregate liability for direct damages will be limited to the fees you paid us in the 12 months before the claim, or a statutory minimum if required by applicable law.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>11. Indemnity</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You agree to indemnify and hold Vector, its affiliates, and their personnel harmless from any claims, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of your breach of these Terms or your negligent, fraudulent, or unlawful use of the Portal.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>12. Changes to these Terms</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We may update these Terms from time to time. When we do, we will post the updated Terms with a new effective date. Continued use of the Portal after the updated Terms take effect constitutes acceptance of the new Terms.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>13. Termination</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We may suspend or terminate your account, access, or services at any time for violations of these Terms, suspected fraud, or for other legitimate business reasons. Termination does not relieve you of obligations accrued before termination.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>14. Governing law and disputes</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          These Terms are governed by the laws of the jurisdiction in which VectorFinanceLimited is incorporated (unless otherwise required by local law). Any dispute arising under these Terms will be resolved in the competent courts of that jurisdiction unless the parties agree to arbitration.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>15. Contact</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If you have questions about these Terms, your data, or our verification practices, contact us at:
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>VectorFinanceLimited</strong><br />
          Email: <a href="mailto:info@vectorfinancelimited.com">info@vectorfinancelimited.com</a><br />
          Address: Plot 15 Lagos Road, GardenView Properties Rhodes Park Lusaka
        </Typography>
        <hr />
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>
            By registering or submitting documents on the Portal, you confirm that you have read, understood, and agreed to these Terms.
          </strong>
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
          End of document
        </Typography>
      </Paper>
    </Box>
  );
}