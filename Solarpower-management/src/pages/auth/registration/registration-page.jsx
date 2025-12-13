import Video from "./../../../assets/videos/registration-pg.mp4"
import { Phone, Mail, MapPin, Clock } from "lucide-react";


//TODO : Add the form and make a new schema and use that schema to store form details from that fix the user section in  admin
export const RegistrationPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src={Video}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Your content */}
 
    {/* Contact Consultation Section */}
        <div className="w-full max-w-5xl">
          <div 
            className="rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20"
            style={{
              background: 'linear-gradient(135deg, #005461 0%, #018790 50%, #00B7B5 100%)'
            }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Need Help? Book a Consultation
              </h2>
              <p className="text-white/90 text-lg">
                Our experts are here to assist you with your solar unit registration
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Phone */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Phone</h3>
                <p className="text-white/90 text-sm mb-1">+1 (555) 123-4567</p>
                <p className="text-white/90 text-sm">+1 (555) 987-6543</p>
              </div>

              {/* Email */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Email</h3>
                <p className="text-white/90 text-sm mb-1">support@solar.com</p>
                <p className="text-white/90 text-sm">info@solar.com</p>
              </div>

              {/* Location */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Location</h3>
                <p className="text-white/90 text-sm mb-1">123 Solar Street</p>
                <p className="text-white/90 text-sm">Green City, ST 12345</p>
              </div>

              {/* Hours */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Hours</h3>
                <p className="text-white/90 text-sm mb-1">Mon - Fri: 9AM - 6PM</p>
                <p className="text-white/90 text-sm">Sat: 10AM - 4PM</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-10">
              <button className="bg-white hover:bg-gray-100 text-primary-dark px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;