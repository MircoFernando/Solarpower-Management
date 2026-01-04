import CountUp from "./../../../../components/CountUp";
import { Users, FolderCheck, Trophy, Star, ArrowRight } from "lucide-react";

const Stats = () => {
  return (
    <section className="relative py-16 md:py-20 mt-8 min-h-[50vh] flex items-center justify-center overflow-hidden">
      
      {/* Background with Texture & Gradient */}
      <div className="absolute inset-0 bg-blue-950">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-950 to-black opacity-90"></div>
        {/* Decorative Glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container relative mx-auto px-4 z-10">
        
        {/* Main Flex Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          
          {/* Leading Text Section */}
          <div className="text-center lg:text-left lg:w-1/3 mb-8 lg:mb-0">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-widest mb-4 border border-blue-500/30">
              OUR IMPACT
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Powering the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Future Together
              </span>
            </h2>
            <p className="text-blue-200/70 text-lg mb-6 max-w-md mx-auto lg:mx-0">
              Join thousands of satisfied clients who trust us to deliver sustainable energy solutions.
            </p>
            <button className="group flex items-center gap-2 mx-auto lg:mx-0 text-white font-semibold hover:text-cyan-300 transition-colors">
              Talk to an expert <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full lg:w-2/3">
            
            {/* Stat Card 1: Employees */}
            <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 text-blue-300 mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-center gap-1">
                <CountUp
                  from={0}
                  to={1500}
                  separator=","
                  direction="up"
                  duration={1.5}
                  className="text-3xl md:text-4xl font-bold text-white"
                />
                <span className="text-blue-400 text-2xl font-bold">+</span>
              </div>
              <p className="text-blue-200/60 text-sm font-medium uppercase tracking-wide mt-2">Team Members</p>
            </div>

            {/* Stat Card 2: Projects */}
            <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 mb-4 group-hover:scale-110 transition-transform">
                <FolderCheck className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-center gap-1">
                <CountUp
                  from={0}
                  to={599}
                  separator=","
                  direction="up"
                  duration={1.5}
                  className="text-3xl md:text-4xl font-bold text-white"
                />
              </div>
              <p className="text-blue-200/60 text-sm font-medium uppercase tracking-wide mt-2">Projects Done</p>
            </div>

            {/* Stat Card 3: Awards */}
            <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-center gap-1">
                <CountUp
                  from={0}
                  to={50}
                  separator=","
                  direction="up"
                  duration={1.5}
                  className="text-3xl md:text-4xl font-bold text-white"
                />
                <span className="text-amber-400 text-2xl font-bold">+</span>
              </div>
              <p className="text-blue-200/60 text-sm font-medium uppercase tracking-wide mt-2">Awards Won</p>
            </div>

            {/* Stat Card 4: Clients */}
            <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-center gap-1">
                <CountUp
                  from={0}
                  to={1200}
                  separator=","
                  direction="up"
                  duration={1.5}
                  className="text-3xl md:text-4xl font-bold text-white"
                />
              </div>
              <p className="text-blue-200/60 text-sm font-medium uppercase tracking-wide mt-2">Happy Clients</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;