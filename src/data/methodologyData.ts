import { ReviewMethodologyPoint } from '../types';

export const methodologyPoints: ReviewMethodologyPoint[] = [
  {
    icon: '🔎',
    title: 'What Actually Matters',
    description: 'We cut through marketing buzzwords and explain specs that genuinely impact daily use.',
    details: 'Rather than regurgitating manufacturer specification sheets, our assessments focus on real-world practicalities: battery longevity on British commutes, real noise decibel reduction, actual kitchen worktop clearance, and genuine build durability.'
  },
  {
    icon: '⚖️',
    title: 'Balanced Pros & Cons',
    description: 'Every recommendation makes direct trade-offs clear so you can decide with total confidence.',
    details: 'No product is perfect. For every single item we evaluate, we clearly document potential dealbreakers, ergonomic quirks, maintenance demands, and alternative options that might better suit different budgets.'
  },
  {
    icon: '🇬🇧',
    title: 'Dedicated UK Context',
    description: 'Written specifically for UK households, terminology, retail standards, and consumer rights.',
    details: 'We verify UK 3-pin fused BS 1363 plugs, domestic 230V/240V energy efficiency, compatibility with UK hard water scaling, compliance with UK Consumer Rights Act 2015 guarantees, and airline cabin baggage rules (CAA / BA / EasyJet).'
  }
];

export const staticLegalContent = {
  about: {
    title: 'About SmartPick UK',
    content: `
      <h3>Independent Product Research & UK Buying Advice</h3>
      <p>SmartPick UK is an editorial consumer research and buying-guide publication established to help UK shoppers cut through the noise of online marketplaces.</p>
      <p>With thousands of almost identical products flooding major shopping platforms, finding dependable, well-built items has become increasingly difficult. We analyse customer feedback patterns, UK regulatory certifications (UKCA/BS), warranty records, and hands-on specifications to deliver clear, unbiased product roundups.</p>
      
      <h4>Our Editorial Principles</h4>
      <ul>
        <li><strong>Independence:</strong> We do not accept paid manufacturer placements to skew rankings. Our top picks are selected strictly on merit, reliability, and value for British households.</li>
        <li><strong>UK-Focused Reality:</strong> We focus on British living spaces, UK energy costs, UK plug standards, and local retailer warranties.</li>
        <li><strong>Transparent Monetisation:</strong> We fund our ongoing research through clear, regulated affiliate partnerships at zero extra cost to our readers.</li>
      </ul>
      
      <p>For editorial inquiries, corrections, or suggestions, please contact our London team at <a href="mailto:editorial@smartpick.co.uk" class="text-[#ff7a00] font-medium underline">editorial@smartpick.co.uk</a>.</p>
    `
  },
  privacy: {
    title: 'Privacy Policy (UK & GDPR Compliant)',
    content: `
      <h3>Privacy Notice for SmartPick UK</h3>
      <p><em>Last updated: March 2026</em></p>
      <p>SmartPick UK ("we", "us", or "our") is dedicated to protecting the privacy of visitors to our website in full compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
      
      <h4>1. Information We Collect</h4>
      <p>We believe in minimal data collection:</p>
      <ul>
        <li><strong>Voluntary Newsletter Subscription:</strong> When you subscribe to our weekly deal digest, we collect your email address solely to deliver these updates. You can unsubscribe with one click at any time.</li>
        <li><strong>Local Browser Preferences:</strong> We use browser localStorage to remember your saved shortlisted products and your preferred affiliate tag preview settings. This data never leaves your device.</li>
        <li><strong>Anonymous Technical Metrics:</strong> Standard anonymised server logs (IP address, browser type, referral page) used solely to maintain server performance and security.</li>
      </ul>
      
      <h4>2. Cookies and External Links</h4>
      <p>When you click on an external link to Amazon.co.uk or other retail partners, the retailer may place an affiliate tracking cookie in accordance with their respective privacy policies. We do not operate cross-site behavioral ad tracking networks.</p>
      
      <h4>3. Your Legal Rights</h4>
      <p>Under UK data protection laws, you have the right to request access to, correction of, or erasure of any personal data we hold about you. Contact our Data Officer at <a href="mailto:privacy@smartpick.co.uk" class="text-[#ff7a00] font-medium underline">privacy@smartpick.co.uk</a>.</p>
    `
  },
  terms: {
    title: 'Terms of Use',
    content: `
      <h3>Terms & Conditions</h3>
      <p><em>Last updated: March 2026</em></p>
      <p>By accessing SmartPick UK, you agree to comply with and be bound by the following terms and conditions:</p>
      
      <h4>1. Information Accuracy & Retailer Pricing</h4>
      <p>All product information, guides, and commentary provided on SmartPick UK are published in good faith for informational purposes only. While we make every effort to ensure pricing, specifications, and availability are accurate, prices fluctuate frequently on Amazon and other retail platforms.</p>
      <p><strong>The current price, delivery terms, and product specifications listed on the retailer's official product page at the moment of purchase always supersede any data displayed on our site.</strong></p>
      
      <h4>2. Intellectual Property</h4>
      <p>All original guide editorial copy, comparative evaluations, and custom graphics are the intellectual property of SmartPick UK and may not be reproduced or republished without prior written permission.</p>
      
      <h4>3. Limitation of Liability</h4>
      <p>SmartPick UK is not a retailer or merchant. We do not process transactions, handle stock, or provide customer service for purchases made on third-party websites. Any product issues or warranty claims must be directed to the respective seller or manufacturer.</p>
    `
  },
  affiliate: {
    title: 'Amazon Associate & Affiliate Disclosure',
    content: `
      <h3>Full Affiliate & Advertising Disclosure</h3>
      <p>In accordance with the UK Advertising Standards Authority (ASA) CAP Code guidelines and the Federal Trade Commission (FTC) requirements:</p>
      
      <div class="bg-[#fff8ef] border border-[#ffdcb4] p-4 rounded-xl text-[#69400f] font-medium my-4">
        <strong>Amazon Associate Statement:</strong> SmartPick UK is a participant in the Amazon Services LLC Associates Program and Amazon EU Associates Programme, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.co.uk.
      </div>
      
      <h4>How This Works</h4>
      <ul>
        <li>When you click a link on our website pointing to a product on Amazon.co.uk (or another partner retailer) and proceed to make a qualifying purchase, we may receive a modest commission from the retailer.</li>
        <li><strong>Zero extra cost to you:</strong> The price you pay is identical whether you use our affiliate links or navigate to the retailer independently. The commission is paid entirely by the retailer out of their standard marketing budget.</li>
        <li><strong>Unbiased rankings:</strong> Our editorial reviews and product ratings are determined solely by our evaluation team. Retailers cannot pay to artificially inflate their ranking or alter our pros & cons analysis.</li>
      </ul>
      <p>We are grateful for your support, which allows us to maintain an ad-free reading experience and continue investing in deep UK product research.</p>
    `
  }
};
