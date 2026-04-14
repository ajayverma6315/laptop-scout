import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — LaptopScout',
  description: 'Learn about our zero data collection policy and how we protect your privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        <div className="mb-16">
          <h1 className="font-space text-5xl font-bold text-[#F9FAFB] mb-6 tracking-tight">
            Privacy <span className="bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-[#9CA3AF]">Last updated: October 2023</p>
        </div>

        <div className="prose prose-invert max-w-none text-[#E5E7EB] space-y-8">
          <section>
            <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">1. Zero Data Collection Policy</h2>
            <p>
              At LaptopScout, your privacy is our highest priority. Our core diagnostic tool operates entirely within your web browser. 
              <strong> We do not collect, store, or transmit any of your personal data or hardware diagnostic reports to our servers.</strong>
            </p>
          </section>

          <section>
            <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">2. How the Tool Works</h2>
            <p>
              When you use our diagnostic script, it generates a report locally on your machine. When you upload that report to our website, the parsing and evaluation happen locally in your browser using JavaScript. No data leaves your device.
            </p>
          </section>

          <section>
            <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">3. Analytics and Cookies</h2>
            <p>
              We use basic, privacy-friendly analytics to understand how many people visit our website and which pages are most popular. This data is aggregated and completely anonymous. We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">4. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@laptopscout.in" className="text-[#C6A96B] hover:underline">privacy@laptopscout.in</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
