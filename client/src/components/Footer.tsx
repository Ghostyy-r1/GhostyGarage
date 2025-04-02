import { FaFacebookF, FaInstagram, FaTwitter, FaDiscord } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Ghosty's Garage</h3>
            <p className="text-gray-400 mb-4">
              A motorcycle enthusiast community dedicated to connecting riders, sharing knowledge, and creating memorable experiences on the road.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaDiscord className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Merchandise</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Maintenance Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Safety Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="border-gray-800" />
        
        <div className="pt-8 mt-8 text-center">
          <p className="text-gray-400">© 2025 Ghosty's Garage | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
