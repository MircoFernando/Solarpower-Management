import Video from "./../../../assets/videos/registration-pg.mp4";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import VignettePurchaseFormDemo from "./reg-form";

//TODO : Add the form validation and make a Registered user schema make the page responsive

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
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <div className="absolute inset-0 bg-black/50"></div> */}
      </div>
    <div className="relative flex flex-col md:flex-row items-center justify-center max-w-8xl">
      <div className="w-full max-w-screen-xl h-[80vh] flex flex-col justify-center items-center rounded-2xl backdrop-blur-md border-white/20 shadow-2xl overflow-hidden"
      style={{
                background:
                  'linear-gradient(135deg, rgba(0, 84, 97, 0.5) 0%, rgba(1, 135, 144, 0.5) 50%, rgba(0, 183, 181, 0.5) 100%)'
              }}>
  <h1 className="text-3xl font-bold mt-10 text-white text-shadow-2xs drop-shadow-lg ">
    Apply for a Solar Unit
  </h1>
  <p className="text-white/95 text-base drop-shadow-md text-center mt-5">Please fill out the following information to request for a Solar Unit<br />We will get back to you shortly after reviewing your request after, installation your dashboard will be ready!</p>
  <VignettePurchaseFormDemo />
</div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Your content */}

         <div className=" flex items-center justify-center h-screen w-full px-4">

            <div
              className="w-full max-w-[900px] h-[80vh] rounded-2xl backdrop-blur-md 
             border border-white/20 shadow-2xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0, 84, 97, 0.5) 0%, rgba(1, 135, 144, 0.5) 50%, rgba(0, 183, 181, 0.5) 100%)'
              }}
            >
            <div className="flex flex-col h-full p-20">
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                  Need Help?
                </h2>
                <p className="text-white/95 text-base drop-shadow-md">
                  Our experts are here to assist you
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">Phone</h3>
                      <p className="text-white/90 text-xs">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">Email</h3>
                      <p className="text-white/90 text-xs">support@solar.com</p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">Location</h3>
                      <p className="text-white/90 text-xs">123 Solar Street</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">Hours</h3>
                      <p className="text-white/90 text-xs">Mon - Fri: 9AM - 6PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <button className="w-full bg-white/90 hover:bg-white text-primary-dark py-3 rounded-xl font-semibold text-base shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  Schedule a Consultation
                </button>
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegistrationPage;
