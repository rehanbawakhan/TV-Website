import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal - Team Vegavath',
  description: 'Privacy Policy and Terms of Service for Team Vegavath',
}

export default function Legal() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-orange mb-4">
            Legal Information
          </h1>
          <p className="text-gray-400 text-lg">
            Privacy Policy & Terms of Service
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Last Updated: October 25, 2025
          </p>
        </div>

        {/* Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Privacy Policy */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-orange-500 mb-6 flex items-center gap-3">
              <span>🔒</span>
              Privacy Policy
            </h2>

            <div className="space-y-6 text-gray-300">
              <section>
                <h3 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h3>
                <p className="text-sm leading-relaxed">
                  We collect information you provide when registering for events, joining our club, 
                  or subscribing to our newsletter. This may include your name, email address, 
                  university details, and contact information.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h3>
                <ul className="text-sm space-y-2 list-disc list-inside">
                  <li>To communicate about club events and activities</li>
                  <li>To manage event registrations and hackathon participation</li>
                  <li>To send newsletters and important updates</li>
                  <li>To improve our website and services</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">3. Data Protection</h3>
                <p className="text-sm leading-relaxed">
                  We implement reasonable security measures to protect your personal information. 
                  However, no method of transmission over the Internet is 100% secure. We store 
                  data securely and limit access to authorized personnel only.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">4. Third-Party Services</h3>
                <p className="text-sm leading-relaxed">
                  We may use third-party services (like email providers and analytics tools) 
                  that have their own privacy policies. We do not sell or rent your personal 
                  information to third parties.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">5. Cookies</h3>
                <p className="text-sm leading-relaxed">
                  Our website may use cookies to enhance user experience and analyze site traffic. 
                  You can choose to disable cookies through your browser settings.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">6. Your Rights</h3>
                <p className="text-sm leading-relaxed">
                  You have the right to access, correct, or delete your personal information. 
                  You can unsubscribe from our communications at any time. Contact us to exercise 
                  these rights.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">7. Changes to Privacy Policy</h3>
                <p className="text-sm leading-relaxed">
                  We may update this policy from time to time. We will notify users of significant 
                  changes via email or website announcement.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">8. Contact Us</h3>
                <p className="text-sm leading-relaxed">
                  For privacy-related questions or concerns, please contact us through our official 
                  channels or email.
                </p>
              </section>
            </div>
          </div>

          {/* Terms of Service */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-orange-500 mb-6 flex items-center gap-3">
              <span>📜</span>
              Terms of Service
            </h2>

            <div className="space-y-6 text-gray-300">
              <section>
                <h3 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h3>
                <p className="text-sm leading-relaxed">
                  By accessing and using the Team Vegavath website and services, you accept and 
                  agree to be bound by these Terms of Service. If you do not agree, please do not 
                  use our services.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">2. About Team Vegavath</h3>
                <p className="text-sm leading-relaxed">
                  Team Vegavath is a student-run technical club. We organize events, hackathons, 
                  and workshops. Participation is voluntary and subject to these terms.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h3>
                <ul className="text-sm space-y-2 list-disc list-inside">
                  <li>Provide accurate information during registration</li>
                  <li>Respect other members and maintain professional conduct</li>
                  <li>Follow event rules and guidelines</li>
                  <li>Not misuse or abuse our services or platform</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">4. Event Participation</h3>
                <p className="text-sm leading-relaxed">
                  Event registrations are subject to availability. We reserve the right to cancel 
                  or modify events. Participants must adhere to specific event rules and code of 
                  conduct. Team Vegavath is not liable for any injuries or damages during events.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">5. Intellectual Property</h3>
                <p className="text-sm leading-relaxed">
                  The website and its content are licensed under the MIT License. Projects created 
                  during hackathons belong to their respective teams. We may feature projects and 
                  photos from events on our platforms with appropriate credit.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">6. MIT License</h3>
                <p className="text-sm leading-relaxed">
                  This project is open source under the MIT License. You may use, modify, and 
                  distribute the code with proper attribution. See our GitHub repository for 
                  full license details.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">7. Disclaimer</h3>
                <p className="text-sm leading-relaxed">
                  Services are provided "as is" without warranties. We are not liable for any 
                  direct, indirect, or consequential damages arising from use of our services. 
                  As a student club, resources and services may change without notice.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">8. Modifications</h3>
                <p className="text-sm leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of our 
                  services after changes constitutes acceptance of modified terms.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">9. Termination</h3>
                <p className="text-sm leading-relaxed">
                  We reserve the right to terminate or suspend access to our services for users 
                  who violate these terms or engage in harmful behavior.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">10. Contact & Disputes</h3>
                <p className="text-sm leading-relaxed">
                  For questions about these terms, please contact us through official channels. 
                  Any disputes will be handled in good faith through our club administration.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
            <p className="text-gray-400 text-sm mb-2">
              <span className="text-orange-500 font-semibold">Open Source Project</span>
            </p>
            <p className="text-gray-500 text-xs">
              This website is licensed under the MIT License. 
              <br />
              View the source code on{' '}
              <a 
                href="https://github.com/Team-Vegavath" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 underline"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
