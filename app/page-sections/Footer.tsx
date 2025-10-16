import { Mail, Instagram, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Your Journey Begins Here
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We understand that every vehicle has a story to tell, and we're here to help you write the next chapter. By providing us with a few key details, you're taking the first step towards transforming your automotive aspirations into tangible results.
            </p>
            <p className="text-gray-900 font-semibold">
              Contact us today, we look forward to hearing from you! Let us help you find that missing piece.
            </p>
          </div>

          {/* Right Column - Contact Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
            <div className="space-y-4">
              {/* Email */}
              <a 
                href="mailto:dnaautosource@gmail.com"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-gray-200 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm">dnaautosource@gmail.com</span>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com/dnaautosource"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-gray-200 transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-sm">@dnaautosource</span>
              </a>

              {/* Google Forms */}
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdWKgsSi188YHn0mxofNgdklR1E4aJADlrLF1zUBPR0yzIxXA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-gray-200 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-sm">Google Forms</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DNA Auto Source. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}