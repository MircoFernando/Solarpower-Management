import CountUp from "./../../../../components/CountUp";

const Stats = () => {
  return (
    <section className="py-5 bg-gray-100 mt-2 md:h-[40vh] h-auto min-h-[40vh]">
      <div className="flex justify-center container mx-auto px-4">
        <div 
          className="flex flex-col md:flex-row p-4 md:p-8 justify-center items-center w-[100%] md:h-[30vh] h-auto bg-blue-900 text-white"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)'
          }}
        >
          <div className="flex items-baseline md:items-baseline items-center justify-between flex-col h-auto md:h-[18vh] mb-6 md:mb-0 text-center md:text-left">
            <h2 className="font-extralight mb-3 text-sm md:text-base">TALK TO US</h2>
            <p className="font-bold text-2xl md:text-4xl md:mr-8">
              Powering the
              <br />
              Future
              <br />
              with the Renew
            </p>
          </div>
          
          <div className="hidden md:block h-[20vh] w-px bg-gray-200 opacity-30 mb-5 mr-20"></div>
          <div className="block md:hidden w-full h-px bg-gray-200 opacity-30 my-4"></div>
          
          <div className="flex items-center md:items-baseline justify-between flex-col h-auto md:h-[18vh] md:mr-20 mb-6 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-[80px] md:h-[80px]"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <CountUp
              from={0}
              to={1500}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-3xl md:text-4xl font-bold mt-2"
            />
            <h2 className="font-extralight text-sm md:text-base">Employees</h2>
          </div>
          
          <div className="hidden md:block h-[20vh] w-px bg-gray-200 opacity-30 mb-5 mr-20"></div>
          <div className="block md:hidden w-full h-px bg-gray-200 opacity-30 my-4"></div>
          
          <div className="flex items-center md:items-baseline justify-between flex-col h-auto md:h-[18vh] md:mr-20 mb-6 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[70px] md:h-[75px]">
              <path d="M11 2h2"/>
              <path d="m14.28 14-4.56 8"/>
              <path d="m21 22-1.558-4H4.558"/>
              <path d="M3 10v2"/>
              <path d="M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z"/>
              <path d="M7 2a4 4 0 0 1-4 4"/>
              <path d="m8.66 7.66 1.41 1.41"/>
            </svg>
            <CountUp
              from={0}
              to={599}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-3xl md:text-4xl font-bold mt-2"
            />
            <h2 className="font-extralight text-sm md:text-base">Projects Completed</h2>
          </div>
          
          <div className="hidden md:block h-[20vh] w-px bg-gray-200 opacity-30 mb-5 mr-20"></div>
          <div className="block md:hidden w-full h-px bg-gray-200 opacity-30 my-4"></div>
          
          <div className="flex items-center md:items-baseline justify-between flex-col h-auto md:h-[18vh] md:mr-20 mb-6 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[70px] md:h-[70px]">
              <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/>
              <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/>
              <path d="M18 9h1.5a1 1 0 0 0 0-5H18"/>
              <path d="M4 22h16"/>
              <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>
              <path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>
            </svg>
            <CountUp
              from={0}
              to={1500}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-3xl md:text-4xl font-bold mt-2"
            />
            <h2 className="font-extralight text-sm md:text-base">Winning Awards</h2>
          </div>
          
          <div className="hidden md:block h-[20vh] w-px bg-gray-200 opacity-30 mb-5 mr-20"></div>
          <div className="block md:hidden w-full h-px bg-gray-200 opacity-30 my-4"></div>
          
          <div className="flex items-center md:items-baseline justify-between flex-col h-auto md:h-[18vh] md:mr-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[80px] md:h-[80px]">
              <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/>
              <path d="M8 15H7a4 4 0 0 0-4 4v2"/>
              <circle cx="10" cy="7" r="4"/>
            </svg>
            <CountUp
              from={0}
              to={1500}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-3xl md:text-4xl font-bold mt-2"
            />
            <h2 className="font-extralight text-sm md:text-base">Clients Reviews</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;