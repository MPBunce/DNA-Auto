import { Mail, Instagram, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Centered Content */}
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Your Journey Begins Here
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We understand that every vehicle has a story to tell, and we&apos;re here to help you write the next chapter. By providing us with a few key details, you&apos;re taking the first step towards transforming your automotive aspirations into tangible results.
          </p>
          <p className="text-gray-900 font-semibold">
            Contact us today, we look forward to hearing from you! Let us help you find that missing piece.
          </p>
        </div>

        {/* Contact Methods - Horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col md:flex-row md:justify-center gap-4 md:gap-6 mb-16">
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

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DNA Auto Source. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}