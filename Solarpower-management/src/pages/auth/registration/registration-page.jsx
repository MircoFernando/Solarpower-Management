import Video from "./../../../assets/videos/registration-pg.mp4";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import VignettePurchaseFormDemo from "./reg-form";
import { useGetAllRegisteredUsersByClerkUserIdQuery } from "../../../lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const RegistrationPage = () => {
  const [isSubmitted, SetisSubmitted] = useState(null);
  const { user } = useUser();
  const { data, isLoading, isError, error } =
    useGetAllRegisteredUsersByClerkUserIdQuery(undefined, { skip: !user });

  useEffect(() => {
    if (!data || !user) return;

    if (data === "User has not applied") {
      SetisSubmitted(false);
      return;
    }

    if (data?.clerkUserId === user.id) {
      SetisSubmitted(true);
    }
  }, [data, user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 max-w-md text-center shadow-lg">
          <p className="font-semibold">Error fetching Users</p>
          <p className="text-sm mt-2">{error.toString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full font-sans">
      <div className="fixed inset-0 z-0">
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
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-4 md:p-8 lg:p-12">
        
        
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          
          <div
            className="w-full flex flex-col justify-center items-center rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden p-6 md:p-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 84, 97, 0.6) 0%, rgba(1, 135, 144, 0.6) 50%, rgba(0, 183, 181, 0.6) 100%)",
            }}
          >
            <div className="text-center mb-8 max-w-lg mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4">
                Apply for a Solar Unit
              </h1>
              <p className="text-white/90 text-sm md:text-base leading-relaxed drop-shadow-md">
                Please fill out the following information to request a Solar Unit.
                <br className="hidden md:block" />
                We will get back to you shortly after reviewing your request.
                Once installed, your dashboard will be ready!
              </p>
            </div>

            
            <div className="w-full max-w-md mx-auto bg-white/5 rounded-xl p-2 md:p-4 backdrop-blur-sm">
              <VignettePurchaseFormDemo />
            </div>
          </div>

       
          <div
            className="w-full flex flex-col justify-center rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden p-6 md:p-10 lg:h-auto lg:sticky lg:top-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 84, 97, 0.6) 0%, rgba(1, 135, 144, 0.6) 50%, rgba(0, 183, 181, 0.6) 100%)",
            }}
          >
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                Need Help?
              </h2>
              <p className="text-white/90 text-sm md:text-base drop-shadow-md">
                Our experts are here to assist you with your application.
              </p>
            </div>

            <div className="space-y-4 max-w-md mx-auto lg:mx-0 w-full">
              <ContactCard
                icon={<Phone className="w-5 h-5 text-white" />}
                title="Phone"
                detail="+1 (555) 123-4567"
              />
              <ContactCard
                icon={<Mail className="w-5 h-5 text-white" />}
                title="Email"
                detail="support@solar.com"
              />
              <ContactCard
                icon={<MapPin className="w-5 h-5 text-white" />}
                title="Location"
                detail="123 Solar Street, Green City"
              />
              <ContactCard
                icon={<Clock className="w-5 h-5 text-white" />}
                title="Working Hours"
                detail="Mon - Fri: 9AM - 6PM"
              />

              {/* CTA Button */}
              <div className="mt-8 pt-4">
                <button className="w-full bg-white/90 hover:bg-white text-teal-900 py-3.5 rounded-xl font-bold text-base shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 backdrop-blur-sm">
                  Schedule a Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {isSubmitted && (
        <AlertDialog open={isSubmitted} onOpenChange={SetisSubmitted}>
          <AlertDialogContent className="bg-white/95 backdrop-blur-xl border-white/20">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-teal-900 text-xl">
                Request Already Submitted!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                We have received your request. After reviewing your application and completing the solar unit installation, your dashboard will be activated. Thank you for your patience!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="bg-teal-700 hover:bg-teal-800 text-white">
                <Link to="/" className="w-full h-full flex items-center justify-center px-4">
                  Return Home
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};


const ContactCard = ({ icon, title, detail }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/10 group cursor-default">
    <div className="flex items-center gap-4">
      <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-semibold text-sm mb-0.5">{title}</h3>
        <p className="text-white/90 text-sm font-light">{detail}</p>
      </div>
    </div>
  </div>
);

export default RegistrationPage;