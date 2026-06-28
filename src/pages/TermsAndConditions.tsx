import { useEffect } from "react";
import { useTheme } from "../utils/ThemeContext";

const sections = [
    {
        title: "1. Acceptance of Terms",
        body: `By accessing or using LiService24 ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree to all terms herein, you must not use the Platform. We reserve the right to update these terms at any time; continued use of the Platform constitutes acceptance of the revised terms.`,
    },
    {
        title: "2. Description of Service",
        body: `LiService24 provides social media promotion services including, but not limited to, increasing followers, likes, views, and engagement across platforms such as Facebook, Instagram, YouTube, TikTok, Telegram, and LinkedIn. All services are delivered on a best-effort basis within the stated average delivery time shown on each service listing.`,
    },
    {
        title: "3. Account Registration",
        body: `You must register an account with accurate information to use the Platform. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must be at least 18 years old or the age of majority in your jurisdiction to use this service. LiService24 reserves the right to suspend or terminate accounts found to contain false information.`,
    },
    {
        title: "4. Payment & Balance",
        body: `All payments are processed in Bangladeshi Taka (BDT). You must top up your account balance before placing orders. Payments are subject to the applicable conversion rate and service fee displayed at the time of transaction. Once a top-up request is submitted and verified, the balance will be credited to your account. LiService24 is not responsible for delays caused by incorrect transaction IDs or payment details provided by the user.`,
    },
    {
        title: "5. Refund Policy",
        body: `Refunds are only issued in the following circumstances:\n\n• A service cannot be delivered due to a platform restriction or technical error on our end.\n• The order was not started within the stated average delivery window and you request a cancellation before delivery begins.\n\nRefunds are credited as account balance, not returned to the original payment method. No refund will be issued for partially completed orders. Orders for services where delivery has commenced are non-refundable.`,
    },
    {
        title: "6. Service Delivery",
        body: `Delivery times are estimates only and are not guaranteed. Factors outside our control — including changes to third-party platform algorithms, account privacy settings, or content removal — may affect delivery. LiService24 will not be liable for any loss arising from delayed or incomplete delivery due to such factors. You must ensure that your social media account or content URL is public and accessible at the time of order.`,
    },
    {
        title: "7. Prohibited Uses",
        body: `You agree NOT to use the Platform to:\n\n• Promote content that is illegal, hateful, discriminatory, violent, or sexually explicit.\n• Target accounts or content belonging to individuals or organisations without their consent.\n• Circumvent or attempt to reverse-engineer the Platform's systems.\n• Resell services obtained from the Platform without explicit written permission.\n• Submit fraudulent payment details or false transaction IDs.\n\nViolation of these prohibitions may result in immediate account suspension and forfeiture of any remaining balance.`,
    },
    {
        title: "8. Intellectual Property",
        body: `All content on the Platform — including logos, text, graphics, and software — is the property of LiService24 and is protected by applicable intellectual property laws. You may not copy, reproduce, or distribute any part of the Platform without prior written consent.`,
    },
    {
        title: "9. Limitation of Liability",
        body: `To the fullest extent permitted by law, LiService24 shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of the Platform, including but not limited to loss of followers, account suspension by third-party platforms, or loss of revenue. Our total liability to you for any claim shall not exceed the amount credited to your LiService24 account balance at the time of the claim.`,
    },
    {
        title: "10. Third-Party Platforms",
        body: `LiService24 is not affiliated with, endorsed by, or sponsored by Facebook, Instagram, YouTube, TikTok, Telegram, LinkedIn, or any other social media platform. Use of our services is at your own risk and must comply with the terms of service of the respective platforms. LiService24 is not responsible for any action taken by those platforms against your account as a result of using our services.`,
    },
    {
        title: "11. Privacy",
        body: `We collect only the personal information necessary to provide our services. We do not sell or share your personal data with third parties except where required to process payments or comply with legal obligations. By using the Platform, you consent to the collection and use of your information as described in our Privacy Policy.`,
    },
    {
        title: "12. Governing Law",
        body: `These Terms are governed by and construed in accordance with the laws of Bangladesh. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Bangladesh.`,
    },
    {
        title: "13. Contact",
        body: `If you have any questions about these Terms and Conditions, please contact us at:\n\nsupport@liservice24.com`,
    },
];

export default function TermsAndConditions() {
    const { isDark } = useTheme();

    useEffect(() => {
        document.title = "Terms & Conditions — LiService24";
    }, []);

    const bg   = isDark ? "#070b09" : "#f4f7f5";
    const card = isDark ? "rgba(255,255,255,0.03)" : "#ffffff";
    const bdr  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
    const t0   = isDark ? "#f3fbf5" : "#0d1a11";
    const t1   = isDark ? "#aebcb2" : "#3a5040";
    const t2   = isDark ? "#74877b" : "#74877b";

    return (
        <div style={{ background: bg, minHeight: "100vh", color: t0, fontFamily: "'Inter',sans-serif" }}>
            {/* Header */}
            <div style={{ borderBottom: `1px solid ${bdr}`, padding: "20px 24px" }}>
                <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                        width: 32, height: 32, borderRadius: 8, display: "inline-flex",
                        alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14,
                        color: "#06150d", background: "linear-gradient(155deg,#6ee7a8,#149656 60%,#2dd4cf)",
                    }}>L</span>
                    <span style={{ fontWeight: 700, fontSize: 16, color: t0, fontFamily: "'Space Grotesk',sans-serif" }}>
                        LiService24
                    </span>
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 80px" }}>
                {/* Title */}
                <div style={{ marginBottom: 40 }}>
                    <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, color: t0, margin: "0 0 10px" }}>
                        Terms &amp; Conditions
                    </h1>
                    <p style={{ fontSize: 14, color: t2, margin: 0 }}>
                        Last updated: June 2026 &nbsp;·&nbsp; Please read these terms carefully before using our services.
                    </p>
                </div>

                {/* Intro card */}
                <div style={{
                    background: "rgba(31,191,108,0.07)", border: "1px solid rgba(31,191,108,0.2)",
                    borderRadius: 14, padding: "16px 20px", marginBottom: 32,
                    fontSize: 14, color: t1, lineHeight: 1.65,
                }}>
                    These Terms and Conditions govern your access to and use of LiService24, a social media promotion platform. By creating an account or placing an order, you acknowledge that you have read, understood, and agreed to be bound by these terms.
                </div>

                {/* Sections */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {sections.map((s) => (
                        <div key={s.title} style={{
                            background: card, border: `1px solid ${bdr}`,
                            borderRadius: 14, padding: "20px 24px",
                        }}>
                            <h2 style={{
                                fontFamily: "'Space Grotesk',sans-serif", fontSize: 15,
                                fontWeight: 700, color: t0, margin: "0 0 10px",
                            }}>{s.title}</h2>
                            <p style={{
                                fontSize: 14, color: t1, lineHeight: 1.75, margin: 0,
                                whiteSpace: "pre-line",
                            }}>{s.body}</p>
                        </div>
                    ))}
                </div>

                {/* Footer note */}
                <p style={{ marginTop: 40, fontSize: 13, color: t2, textAlign: "center" }}>
                    © {new Date().getFullYear()} LiService24. All rights reserved.
                </p>
            </div>
        </div>
    );
}
